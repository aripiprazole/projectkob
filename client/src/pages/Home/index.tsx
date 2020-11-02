import React, { useState } from "react";

import Layout from "components/Layout";
import { useSelector } from "react-redux";

const HomePage: React.VFC = () => {
  const user = useSelector((state) => state.session.user);

  if (!user) return null;

  return (
    <Layout header={<h2>Welcome, {user.login}</h2>}>
      Hello, welcome to <strong>projectkob</strong>
    </Layout>
  );
};

export default HomePage;
