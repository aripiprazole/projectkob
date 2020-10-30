import React, { PureComponent } from "react";

type A = {
  error?: Error;
};

class ErrorHandler extends PureComponent<{}, A> {
  public state: A = {};

  public componentDidCatch(error: Error) {
    this.setState({ error });
  }

  public render() {
    const { error } = this.state;

    if (error) {
      return <div>Error: {error.toString()}</div>;
    }

    return this.props.children;
  }
}

export default ErrorHandler;
