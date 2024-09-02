
import { airTimeDataTopUp } from "../controllers/reloadly";
import { Router } from "express";

export default (router: Router) => {
  router.post("/buy/topup-airtime", airTimeDataTopUp);
};
