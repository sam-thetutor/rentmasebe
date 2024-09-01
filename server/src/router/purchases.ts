
import { airTimeDataTopUp } from "../controllers/reloadly";
import { Router } from "express";

export default (router: Router) => {
  router.get("/buy/topup-airtime", airTimeDataTopUp);
};
