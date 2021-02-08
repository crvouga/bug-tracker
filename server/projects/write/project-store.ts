import { IProjectState } from "./project-state";
import { findOne } from "../../../shared/store.hash-map";

export type IProjectStore = {
  findOne({
    where,
  }: {
    where: Partial<IProjectState>;
  }): Promise<IProjectState | null>;
};

export const Project = (): IProjectStore => {
  const db: {
    [id: string]: IProjectState;
  } = {};

  return {
    async findOne({ where }) {
      return findOne({ where }, db);
    },
  };
};
