import React from "react";

import { Button } from "@material-ui/core";

export type TodoProps = {
  message?: string;
};

const Todo: React.VFC<TodoProps> = ({ message = "Not implemented" }) => {
  return (
    <Button disabled color={"primary"} variant={"outlined"}>
      TODO: {message}
    </Button>
  );
};

export default Todo;
