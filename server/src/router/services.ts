
import {  buyGiftCard, getCountryGiftCards } from "../controllers/giftcards";
import { Router } from "express";
import { airTimeDataTopUp, getAllOperators, getCountryOperators, getNumberOperator } from '../controllers/airtime';
import { getBillers, payBills } from "../controllers/bills";

export default (router: Router) => {
  router.post("/topup-airtime", airTimeDataTopUp);
  router.get("/get-operators", getAllOperators);
  router.get("/country-operators", getCountryOperators);
  router.get("/number-operator", getNumberOperator);
  router.get("/country-giftcards", getCountryGiftCards);
  router.post("/buy-giftcard", buyGiftCard);
  router.get("/billers", getBillers);
  router.post("/pay-bill", payBills);
};
