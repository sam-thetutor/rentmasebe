
import { getAccessToken } from "../controllers/auth";
import { Router } from "express";

export default (router: Router) => {
  router.get("/auth/get-access-token", getAccessToken)
};
