import React from "react";

// import { LoremIpsum } from "lorem-ipsum";

import MaterialTable from "material-table";

import { useStyles } from "./styles";

export type LogsContainerProps = {
  applicationId: string;
};

// const loremIpsum = new LoremIpsum();
// @ts-ignore
// const defaultLogs = [...Array(100).keys()].map(() =>
//   loremIpsum.generateSentences(1)
// );

const LogsContainer: React.VFC<LogsContainerProps> = () => {
  const classes = useStyles();

  //   const [logs, setLogs] = useState(defaultLogs);

  return (
    <div className={classes.root}>
      <MaterialTable columns={[]} data={[]} />
    </div>
  );
};

export default LogsContainer;
