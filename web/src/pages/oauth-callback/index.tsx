import React, { Suspense, useEffect } from "react";

import { NextPage } from "next";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { useRecoilState, useRecoilValue } from "recoil";

import { authenticationTokenState, loggedUserState } from "~/store/auth";

const OAuthCallback: NextPage = () => {
  return (
    <Suspense fallback="Loading">
      <Content />
    </Suspense>
  );
};

const Content: React.VFC = () => {
  const router = useRouter();

  const user = useRecoilValue(loggedUserState);
  const [token, setToken] = useRecoilState(authenticationTokenState);

  useEffect(() => {
    const code = router.query.code?.toString();
    if (!code) return;

    setToken(code);
  }, [router]);

  useEffect(() => {
    if (!token || !user) return;

    router.push("/");
  }, [router, token]);

  return <div>Loading...</div>;
};

export default OAuthCallback;
