import React from "react";

type TabPanelProps = {
  direction?: string;
  index: number;
  value: number;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role={"tabpanel"}
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tabpanel-${index}`}
    >
      {value === index && children}
    </div>
  );
};

export default TabPanel;
