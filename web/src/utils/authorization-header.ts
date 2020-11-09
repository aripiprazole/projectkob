import { GetRecoilValue } from "recoil";
import { authenticationTokenState } from "~/store/auth";

const authorizationHeader = (get: GetRecoilValue) => ({
  Authorization: `Bearer ${get(authenticationTokenState)}`,
});

export default authorizationHeader;
