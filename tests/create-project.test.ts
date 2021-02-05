import { AppTest } from "../app/app";
import { GetManyProjectsQuery } from "../projects/read";
import { CreateProjectCommand } from "../projects/write/project-commands";
import { User } from "../users/contracts";
import { ProjectAdminId } from "../projects/domain";

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
});
