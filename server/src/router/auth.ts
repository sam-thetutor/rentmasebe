
import { getAccessToken, logout } from "../controllers/auth";
import { Router } from "express";

export default (router: Router) => {
  router.post("/auth/get-access-token", getAccessToken)
 router.post("/auth/logout", logout)
};
