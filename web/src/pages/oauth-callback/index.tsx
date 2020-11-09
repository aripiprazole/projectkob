import React, { useEffect } from "react";

import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { authenticationTokenState, loggedUserState } from "~/store/auth";

const OAuthCallback: React.VFC = () => {
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

  return null;
};

export default OAuthCallback;
