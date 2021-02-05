import { AppTest } from "../server/app/app";
import { GetManyProjectsQuery } from "../server/projects/read";
import {
  CreateProjectCommand,
  DeleteProjectCommand,
} from "../server/projects/write/project-commands";
import { User, UserId } from "../server/auth/user/contracts";
import { ProjectAdminId } from "../server/projects/domain";

describe("creating a project", () => {
  it("create a new project", async () => {
    const app = AppTest();

    const user = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    const query = GetManyProjectsQuery({
      where: {
        projectAdminId: ProjectAdminId(user.userId),
      },
    });

    const command = CreateProjectCommand({
      userId: user.userId,
      projectName: "Bug Tracker",
      projectDescription: "👨‍💻🐛🐛🐛",
    });

    const before = await app.runQuery(query);

    await app.runCommand(command);

    const after = await app.runQuery(query);

    expect(before).toHaveLength(0);
    expect(after).toHaveLength(1);
  });

  it("delete project", async () => {
    const app = AppTest();

    const user = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    const query = GetManyProjectsQuery({
      where: {
        projectAdminId: ProjectAdminId(user.userId),
      },
    });

    const createProjectCommand = CreateProjectCommand({
      userId: user.userId,
      projectName: "Bug Tracker",
      projectDescription: "👨‍💻🐛🐛🐛",
    });

    await app.runCommand(createProjectCommand);

    const before = await app.runQuery(query);

    const deleteProjectCommand = DeleteProjectCommand({
      userId: user.userId,
      projectId: before[0].projectId,
    });

    await app.runCommand(deleteProjectCommand);

    const after = await app.runQuery(query);

    expect(before).toHaveLength(1);
    expect(after).toHaveLength(0);
  });

  it("only allowd admin to delete project", async () => {
    const app = AppTest();

    const admin = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    const query = GetManyProjectsQuery({
      where: {
        projectAdminId: ProjectAdminId(admin.userId),
      },
    });

    const before = await app.runQuery(query);

    const [project] = before;

    const errors = await app.runCommand(
      DeleteProjectCommand({
        userId: UserId(),
        projectId: project?.projectId,
      })
    );
    const after = await app.runQuery(query);

    expect(errors).toHaveLength(1);
    expect(before.length).toBe(after.length);
  });
});
