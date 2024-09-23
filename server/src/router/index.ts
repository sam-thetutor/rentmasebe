import { Router } from "express";
import auth from "./auth";
import services from "./services";
const router = Router();

export default (): Router => {
  auth(router);
  services(router);
  return router;
};
