
import { airTimeDataTopUp, getAllOperators, getCountryOperators, getNumberOperator } from "../controllers/reloadly";
import { Router } from "express";

export default (router: Router) => {
  router.post("/topup-airtime", airTimeDataTopUp);
  router.get("/get-operators", getAllOperators);
  router.get("/country-operators", getCountryOperators);
  router.get("/number-operator", getNumberOperator);
};
