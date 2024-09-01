import { Router } from "express";
import auth from "./auth";
import purchases from "./purchases";
const router = Router();

export default (): Router => {
  auth(router);
  purchases(router);
  return router;
};
