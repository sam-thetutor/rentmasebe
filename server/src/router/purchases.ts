
import { airTimeDataTopUp, getAllOperators, getCountryOperators, getNumberOperator } from "../controllers/reloadly";
import { Router } from "express";

export default (router: Router) => {
  router.post("/buy/topup-airtime", airTimeDataTopUp);
  router.get("/buy/get-operators", getAllOperators);
  router.get("/buy/country-operators", getCountryOperators);
  router.post("/buy/number-operator", getNumberOperator);
};
