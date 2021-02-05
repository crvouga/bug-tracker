import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import React from "react";
import { ICreateProjectForm } from "./contracts";

const useStyles = makeStyles((theme) => ({
  textField: {
    margin: theme.spacing(1, 0),
  },
  button: {
    margin: theme.spacing(1, 0),
  },
}));

export const CreateProjectForm = ({ form }: { form: ICreateProjectForm }) => {
  const classes = useStyles();

  return (
    <div>
      <Typography gutterBottom variant="h5" color="initial">
        Create Project
      </Typography>
      <form onSubmit={form.onSubmit}>
        <TextField
          className={classes.textField}
          id="projectName"
          name="projectName"
          label="Project Name"
          fullWidth
          error={form.errors.projectName.length > 0}
          helperText={form.errors.projectName[0]?.message ?? ""}
          onChange={() => {
            if (form.errors.projectName.length > 0) {
              form.clearError("projectName");
            }
          }}
          variant="outlined"
        />
        <TextField
          className={classes.textField}
          id="projectDescription"
          name="projectDescription"
          label="Project Description"
          fullWidth
          error={form.errors.projectDescription.length > 0}
          helperText={form.errors.projectDescription[0]?.message ?? ""}
          variant="outlined"
          onChange={() => {
            if (form.errors.projectDescription.length > 0) {
              form.clearError("projectDescription");
            }
          }}
        />
        <Button
          type="submit"
          className={classes.button}
          size="large"
          fullWidth
          variant="outlined"
        >
          Create Project
        </Button>
      </form>
    </div>
  );
};
