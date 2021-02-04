import { User } from "../users/contracts";
import { CreateProjectCommand } from "../projects/create-project/domain";

describe("creating a project", () => {
  it("create a new project", async () => {
    const user = User({
      displayName: "Test",
      emailAddress: "test@test.test",
    });

    const command = CreateProjectCommand({
      adminId: user.userId,
      projectName: "Bug Tracker",
      projectDescription: "track bugs",
    });

    console.log(command);
  });
});
