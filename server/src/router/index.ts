import { Router } from "express";
import auth from "./auth";
import purchases from "./services";
const router = Router();

export default (): Router => {
  auth(router);
  purchases(router);
  return router;
};
