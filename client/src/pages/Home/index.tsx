import React, { useContext, createContext, useState } from "react";

import Layout from "components/Layout";
import { useSelector } from "react-redux";

type ContextoFoda = {
  count: number;
  setCount: (value: number) => void;
};

const ContextoFoda = createContext<ContextoFoda | null>(null);

const ComponenteFilho: React.VFC = () => {
  const contextoFoda = useContext(ContextoFoda);

  if (!contextoFoda) return null;

  return (
    <>
      <div>Count: {contextoFoda.count}</div>

      <button onClick={() => contextoFoda.setCount(contextoFoda.count + 1)}>
        Aumentar
      </button>
    </>
  );
};

const HomePage: React.VFC = () => {
  const user = useSelector((state) => state.session.user);
  const [count, setCount] = useState(0);

  if (!user) return null;

  return (
    <Layout header={<h2>Welcome, {user.login}</h2>}>
      Hello, welcome to <strong>projectkob</strong>
      <ContextoFoda.Provider
        value={{
          count,
          setCount,
        }}
      >
        <ComponenteFilho />
      </ContextoFoda.Provider>
    </Layout>
  );
};

export default HomePage;
