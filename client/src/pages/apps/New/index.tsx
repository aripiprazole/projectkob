import React, { useState } from "react";

import clsx from "clsx";
import { object, string } from "yup";
import { container } from "tsyringe";

import { useHistory } from "react-router";

import {
  Button,
  CircularProgress,
  Collapse,
  TextField,
} from "@material-ui/core";
import { ArrowBack } from "@material-ui/icons";
import { Alert, AlertTitle } from "@material-ui/lab";

import { APP_SERVICE_KEY } from "services/AppService";
import App from "models/App";

import Layout from "components/Layout";

import { useButtonStyles, useStyles } from "./styles";

const DEFAULT_APPLICATION_IMAGE = "openjdk-8:latest";

const schema = object().shape({
  name: string().required().min(4).max(24),
  image: string().required().min(4).max(24),
});

const AppNewPage: React.VFC = () => {
  const classes = useStyles();
  const buttonClasses = useButtonStyles();

  const history = useHistory();

  const [app, setApp] = useState<App>();

  const [name, setName] = useState(generateName());
  const [image, setImage] = useState(DEFAULT_APPLICATION_IMAGE);

  const [canCreate, setCanCreate] = useState(true);
  const [creating, setCreating] = useState(false);
  const [success, setSuccess] = useState(false);

  const [errorAlertOpen, setErrorAlertOpen] = useState(false);
  const [error, setError] = useState<Error>();
  const [validationErrors, setValidationErrors] = useState<string[]>();

  const appService = container.resolve(APP_SERVICE_KEY);

  const buttonClassName = clsx({
    [buttonClasses.buttonSuccess]: success,
  });

  async function validate() {
    try {
      return await schema.validate({
        name,
        image,
      });
    } catch (error) {
      setErrorAlertOpen(true);
      setError({
        ...error,
        message: "Constraint violations",
      });
      setValidationErrors(error.errors);
    }
  }

  async function handleCreateApplication(event: React.FormEvent) {
    event.preventDefault();

    if (!canCreate) return;

    setCanCreate(false);
    setCreating(true);

    if (!(await validate())) {
      setCanCreate(true);
      setCreating(false);

      return;
    }

    try {
      const app = await appService.create({
        name,
        image,
      });

      setApp(app);
      setSuccess(true);
      setCreating(false);
    } catch (error) {
      setErrorAlertOpen(true);
      setError(error);
    }
  }

  function handleViewApp() {
    if (!app) return;

    history.push(`/apps/view?uuid=${app.id}`);
  }

  return (
    <Layout header={<h2>Create a new application</h2>}>
      <div className={classes.root}>
        <Collapse in={errorAlertOpen}>
          <Alert
            className={classes.errorAlert}
            variant={"outlined"}
            severity={"error"}
            onClose={() => setErrorAlertOpen(false)}
          >
            <AlertTitle>
              <strong>{error?.message}</strong>
            </AlertTitle>

            {validationErrors?.map((message, index) => (
              <div key={index}>{message}</div>
            ))}
          </Alert>
        </Collapse>

        <form className={classes.form} onSubmit={handleCreateApplication}>
          <TextField
            className={classes.input}
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            size={"small"}
            id={"application-name"}
            label={"App name"}
            placeholder={"App name"}
            variant={"outlined"}
          />

          <TextField
            className={classes.input}
            required
            value={image}
            onChange={(event) => setImage(event.target.value)}
            size={"small"}
            id={"application-image"}
            label={"App image"}
            placeholder={"App image"}
            variant={"outlined"}
          />

          <div className={buttonClasses.root}>
            <div className={buttonClasses.wrapper}>
              <Button
                type={"submit"}
                className={`${buttonClassName} ${buttonClasses.button}`}
                variant={"contained"}
                color={"primary"}
                disabled={creating}
                onClick={success ? handleViewApp : handleCreateApplication}
              >
                {success ? (
                  <>
                    <ArrowBack className={buttonClasses.buttonSuccessIcon} />
                    CREATED
                  </>
                ) : (
                  "Create"
                )}
              </Button>

              {creating && (
                <CircularProgress
                  size={24}
                  className={buttonClasses.buttonProgress}
                />
              )}
            </div>

            <Button
              className={"back"}
              color={"secondary"}
              onClick={() => history.push("/apps")}
            >
              Back
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

function generateName() {
  return `My app ${Math.round(Math.random() * 100000)}`;
}

export default AppNewPage;
