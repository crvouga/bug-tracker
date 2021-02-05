import {
  CreateProjectCommand,
  DeleteProjectCommand,
} from "../projects/commands";
import { HandleProjectCommand } from "../projects/logic";
import { HandleProjectQueryInMemory } from "../projects/query";
import { ProjectEventStoreInMemory } from "../projects/store/project-event-store";
import { User } from "../users/contracts";

const setup = () => {
  const projectEventStore = ProjectEventStoreInMemory();

  const handleProjectCommand = HandleProjectCommand({
    projectEventStore,
  });

  const handleProjectQuery = HandleProjectQueryInMemory({
    projectEventStore,
  });

  return {
    handleProjectCommand,
    handleProjectQuery,
  };
};

describe("creating a project", () => {
  it("create a new project", async () => {
    const { handleProjectQuery, handleProjectCommand } = setup();

    const user = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    const before = handleProjectQuery({
      where: {
        adminId: user.userId,
      },
    });

    await handleProjectCommand(
      CreateProjectCommand({
        userId: user.userId,
        projectName: "Bug Tracker",
        projectDescription: "👨‍💻🐛🐛🐛",
      })
    );

    const after = handleProjectQuery({
      where: {
        adminId: user.userId,
      },
    });

    expect(before).toHaveLength(0);
    expect(after).toHaveLength(1);
  });

  it("deletes existing project", async () => {
    const { handleProjectQuery, handleProjectCommand } = setup();

    const user = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    await handleProjectCommand(
      CreateProjectCommand({
        userId: user.userId,
        projectName: "Bug Tracker",
        projectDescription: "👨‍💻🐛🐛🐛",
      })
    );

    const before = handleProjectQuery({
      where: {
        adminId: user.userId,
      },
    });

    await handleProjectCommand(
      DeleteProjectCommand({
        userId: user.userId,
        projectId: before[0].projectId,
      })
    );

    const after = handleProjectQuery({
      where: {
        adminId: user.userId,
      },
    });

    expect(before).toHaveLength(1);
    expect(after).toHaveLength(0);
  });
});
