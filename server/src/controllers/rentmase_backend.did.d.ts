import type { Principal } from "@dfinity/principal";
import type { ActorMethod } from "@dfinity/agent";
import type { IDL } from "@dfinity/candid";

export interface Account {
  owner: Principal;
  subaccount: [] | [Uint8Array | number[]];
}
export interface AirtimeTopup {
  operator: string;
  countryCode: string;
  operaterId: string;
  phoneNumber: string;
  amount: string;
}
export interface BillsPayment {
  subscriberAccount: string;
  reference: string;
  billerId: string;
  amount: string;
  biller: string;
}
export interface DataTopup {
  operator: string;
  countryCode: string;
  operaterId: string;
  phoneNumber: string;
  amount: string;
}
export interface GiftCardPurchase {
  productId: string;
  countryCode: string;
  quantity: bigint;
  phoneNumber: string;
  amount: string;
  recipientEmail: string;
}
export interface InternalTxn {
  id: bigint;
  status: TxnStatus;
  userEmail: string;
  transferData: TransferData;
  txnType: TxnType;
  userPrincipal: Principal;
  timestamp: Time;
}
export interface PublicUser {
  id: Principal;
  referrals: Array<Principal>;
  rewards: Array<Reward>;
  lastName: string;
  firstName: string;
}
export interface Rentmase {
  completeTxn: ActorMethod<[bigint], Result_1>;
  getAllUsers: ActorMethod<[], Array<User>>;
  getPublicUsers: ActorMethod<[], Array<PublicUser>>;
  getTxnsByEmail: ActorMethod<[string], Array<InternalTxn>>;
  getUnclaimedRewards: ActorMethod<[], Result_3>;
  getUser: ActorMethod<[], Result>;
  intiateTxn: ActorMethod<[TxnPayload], Result_1>;
  isReferralCodeUnique: ActorMethod<[string], boolean>;
  redeemRewards: ActorMethod<[Principal, bigint], Result_2>;
  registerUser: ActorMethod<[UserPayload], Result>;
  transferTransaction: ActorMethod<[bigint], Result_1>;
  updateProfile: ActorMethod<[UserUpdatePayload], Result>;
}
export type Result = { ok: User } | { err: string };
export type Result_1 = { ok: InternalTxn } | { err: string };
export type Result_2 = { ok: null } | { err: string };
export type Result_3 = { ok: Array<Reward> } | { err: string };
export interface Reward {
  claimed: boolean;
  claimedAt: [] | [Time];
  timestamp: Time;
  amount: bigint;
}
export type Time = bigint;
export interface TransferData {
  from: Account;
  amount: bigint;
}
export interface TxnPayload {
  userEmail: string;
  transferAmount: bigint;
  txnType: TxnType;
}
export type TxnStatus =
  | { TokensTransfered: null }
  | { Initiated: null }
  | { Completed: null };
export type TxnType =
  | { GiftCardPurchase: GiftCardPurchase }
  | { BillsPayment: BillsPayment }
  | { AirtimeTopup: AirtimeTopup }
  | { DataTopup: DataTopup };
export interface User {
  id: Principal;
  dob: [] | [Time];
  referralCode: string;
  createdAt: Time;
  referrals: Array<Principal>;
  email: string;
  lastupdated: Time;
  gender: [] | [string];
  rewards: Array<Reward>;
  lastName: string;
  firstName: string;
}
export interface UserPayload {
  dob: [] | [Time];
  referralCode: string;
  referrerCode: [] | [string];
  email: string;
  gender: [] | [string];
  lastName: string;
  firstName: string;
}
export interface UserUpdatePayload {
  dob: [] | [Time];
  refferalCode: string;
  email: string;
  gender: [] | [string];
  lastName: string;
  firstName: string;
}
export interface _SERVICE extends Rentmase {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
