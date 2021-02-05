import { Button, List, ListItem, ListItemText } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Container from "@material-ui/core/Container";
import { GetServerSideProps } from "next";
import React from "react";
import { IUser } from "../server/auth/user/contracts";
import { Layout } from "../components/layout";
import { useQuerySession } from "../components/users/user-session";
import {
  CreateProjectForm,
  useCreateProjectForm,
} from "../components/projects";
import { ProjectAdminId } from "../server/projects/domain";
import { GetManyProjectsQuery } from "../server/projects/read";
import { getProtectedRouteProps } from "./api/auth/[...nextauth]";
import { useAppQuery } from "./api/query";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const props = await getProtectedRouteProps(context);

  return {
    ...props,
  };
};

const ProjectList = ({ currentUser }: { currentUser: IUser }) => {
  const query = useAppQuery(
    GetManyProjectsQuery({
      where: {
        projectAdminId: ProjectAdminId(currentUser.userId),
      },
    })
  );

  if (query.isError || query.isIdle || query.isLoading) {
    return <CircularProgress />;
  }

  const projects = query.data;

  return (
    <React.Fragment>
      <Button
        onClick={() => {
          query.refetch();
        }}
      >
        refetch
      </Button>
      <List>
        {projects.map((project) => (
          <ListItem key={project.projectId}>
            <ListItemText
              primary={project.projectName}
              secondary={project.projectDescription}
            />
          </ListItem>
        ))}
      </List>
    </React.Fragment>
  );
};

const Index = () => {
  const form = useCreateProjectForm();

  const query = useQuerySession();

  if (query.isError || query.isIdle || query.isLoading) {
    return <CircularProgress />;
  }

  const currentUser = query.data;

  return (
    <Layout title="Home">
      <Container disableGutters maxWidth="xs">
        <CreateProjectForm form={form} />
      </Container>
      <ProjectList currentUser={currentUser} />
    </Layout>
  );
};

export default Index;
