import React, { useEffect } from "react";

import { useHistory, useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress } from "@material-ui/core";

import { Container } from "./styles";
import { updateTokenAction } from "store/modules/session/actions";

const OAuthCallbackPage: React.VFC = () => {
  const user = useSelector((state) => state.session.user);
  const token = useSelector((state) => state.session.token);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("code");
    if (!token) return;

    dispatch(updateTokenAction(token));
  }, [dispatch, location.search]);

  useEffect(() => {
    if (!token) return;
    if (!user) return;

    history.push("/");
  }, [history, token, user]);

  return (
    <Container>
      <CircularProgress size={48} />
    </Container>
  );
};

export default OAuthCallbackPage;
