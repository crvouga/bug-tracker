import { ILogger } from "../../app/logging/contracts";
import { findMany } from "../../shared/store.hash-map";
import {
  IProjectAdminId,
  IProjectDescription,
  IProjectId,
  IProjectName,
} from "../domain";
import { IProjectEventStore } from "../write/project-event-store";
import { ProjectEventType } from "../write/project-events";

type IProject = {
  projectId: IProjectId;
  projectAdminId: IProjectAdminId;
  projectName: IProjectName;
  projectDescription: IProjectDescription;
};

export type IProjectQueryRespnse = IProject[];

export type IProjectQuery = {
  type: "ProjectQuery";
  where: Partial<IProject>;
};

export const GetManyProjectsQuery = ({
  where,
}: {
  where: Partial<IProject>;
}): IProjectQuery => {
  return {
    type: "ProjectQuery",
    where,
  };
};

let db: {
  [id: string]: IProject;
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
