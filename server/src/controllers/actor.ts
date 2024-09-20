import dotenv from "dotenv";
dotenv.config();

import { Actor, ActorSubclass, HttpAgent } from "@dfinity/agent";
import { _SERVICE } from "./rentmase_backend.did";
import { idlFactory } from "./rentmase_backend";

export const getActor = async () => {
  const agent = await HttpAgent.create({
    host: "http://localhost:4943",
  });

  if (process.env.ENV === "local") {
    agent.fetchRootKey();
  }

  const actor: ActorSubclass<_SERVICE> = Actor.createActor(idlFactory, {
    agent,
    canisterId: process.env.CANISTER_ID,
  });
  return actor;
};