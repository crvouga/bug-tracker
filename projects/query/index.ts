import { findMany } from "../../shared/store.hash-map";
import { IUserId } from "../../users/contracts";
import { IProject, IProjectId } from "../domain";
import { ProjectEventType } from "../events";
import { IProjectEventStore } from "../store/contracts";

export type IProjectQuery = {
  where: {
    projectId?: IProjectId;
    adminId?: IUserId;
  };
};

export const HandleProjectQueryInMemory = ({
  projectEventStore,
}: {
  projectEventStore: IProjectEventStore;
}) => {
  let db: {
    [id: string]: IProject;
  } = {};

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
  });

  return (query: IProjectQuery) => {
    return findMany(query, db);
  };
};
