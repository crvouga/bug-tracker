import { ILogger } from "../../app/logging/contracts";
import { findMany } from "../../../shared/store.hash-map";
import {
  IProjectAdminId,
  IProjectDescription,
  IProjectId,
  IProjectName,
} from "../domain";
import { IProjectEventStore } from "../write/project-event-store";
import { IProjectEvent, ProjectEventType } from "../write/project-events";

type IProjectReadModel = {
  projectId: IProjectId;
  projectAdminId: IProjectAdminId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
};

export type IProjectQueryRespnse = IProjectReadModel[];

export type IProjectQuery = {
  type: "ProjectQuery";
  where: Partial<IProjectReadModel>;
};

export const GetManyProjectsQuery = ({
  where,
}: {
  where: Partial<IProjectReadModel>;
}): IProjectQuery => {
  return {
    type: "ProjectQuery",
    where,
  };
};

let db: {
  [id: string]: IProjectReadModel;
} = {};

export const HandleProjectQueryInMemory = ({
  logger,
  projectEventStore,
}: {
  logger: ILogger;
  projectEventStore: IProjectEventStore;
}) => {
  projectEventStore.subscribe(async (event) => {
    switch (event.type) {
      case ProjectEventType.ProjectCreated:
        db[event.payload.projectId] = event.payload;
        break;

      case ProjectEventType.ProjectDeleted:
        const { [event.payload.projectId]: project, ...restOfDb } = db;
        db = restOfDb;
        break;
    }
    logger.debug("[projects][query][updated]", { db, event });
  });

  return async (query: IProjectQuery) => {
    const queryResult = findMany(query, db);

    logger.debug("[projects][query]", { db, queryResult, query });

    return queryResult;
  };
};

const updatePrisma = (prisma: any) => async (event: IProjectEvent) => {
  switch (event.type) {
    case ProjectEventType.ProjectCreated:
      await prisma.projects.create({
        data: {
          ...event.payload,
        },
      });
      break;

    case ProjectEventType.ProjectDeleted:
      await prisma.projects.delete({
        where: {
          projectId: event.payload.projectId,
        },
      });
      break;
  }
};

export const ProjectReadsPrisma = ({
  logger,
  projectEventStore,
}: {
  logger: ILogger;
  projectEventStore: IProjectEventStore;
}) => {
  projectEventStore.subscribe(updatePrisma);

  return async (query: IProjectQuery) => {
    const queryResult = findMany(query, db);

    logger.debug("[projects][query]", { db, queryResult, query });

    return queryResult;
  };
};
