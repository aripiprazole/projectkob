import React, { useEffect } from "react";

import { NextPage } from "next";

import { useRecoilValue } from "recoil";

import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { authenticationTokenState } from "~/store/auth";

const guest = (Component: NextPage) =>
  dynamic(
    async () => () => {
      const router = useRouter();
      const authenticationToken = useRecoilValue(authenticationTokenState);

      useEffect(() => {
        if (authenticationToken) router.push("/");
      }, [authenticationToken]);

      if (authenticationToken) return <></>;

      return <Component />;
    },
    { ssr: false }
  );

export default guest;
