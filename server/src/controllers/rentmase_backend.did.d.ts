import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface AirtimeTopup {
  'operator' : string,
  'countryCode' : string,
  'operaterId' : string,
  'phoneNumber' : string,
  'amount' : string,
}
export interface BillsPayment {
  'subscriberAccount' : string,
  'reference' : string,
  'billerId' : string,
  'amount' : string,
  'biller' : string,
}
export interface Cashback { 'amount' : bigint, 'percentage' : number }
export type CashbackType = [] | [
  { 'products' : Array<Product>, 'percentage' : number }
];
export interface DataTopup {
  'operator' : string,
  'countryCode' : string,
  'operaterId' : string,
  'phoneNumber' : string,
  'amount' : string,
}
export interface GiftCardPurchase {
  'productId' : string,
  'countryCode' : string,
  'quantity' : bigint,
  'phoneNumber' : string,
  'amount' : string,
  'recipientEmail' : string,
}
export interface InternalTxn {
  'id' : bigint,
  'status' : TxnStatus,
  'userEmail' : string,
  'transferData' : TransferData,
  'txnType' : TxnType,
  'userPrincipal' : Principal,
  'reloadlyTxnId' : [] | [string],
  'timestamp' : Time,
  'cashback' : [] | [Cashback],
}
export type Product = { 'GiftCardPurchase' : null } |
  { 'BillsPayment' : null } |
  { 'AirtimeTopup' : null } |
  { 'DataTopup' : null };
export interface PublicUser {
  'id' : Principal,
  'referrals' : Array<Principal>,
  'lastName' : string,
  'firstName' : string,
}
export interface ReferralReward {
  'referralCode' : string,
  'referred' : Principal,
  'timestamp' : Time,
  'amount' : bigint,
}
export interface Rentmase {
  'cashbackTxn' : ActorMethod<[bigint, number, string], Result_2>,
  'completeTxn' : ActorMethod<[bigint, string], Result_1>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getCashback' : ActorMethod<[], CashbackType>,
  'getPublicUsers' : ActorMethod<[], Array<PublicUser>>,
  'getRewards' : ActorMethod<[], Array<Rewards>>,
  'getTxnsByEmail' : ActorMethod<[string], Array<InternalTxn>>,
  'getUser' : ActorMethod<[], Result>,
  'getUserRewards' : ActorMethod<[], Result_3>,
  'intiateTxn' : ActorMethod<[TxnPayload], Result_1>,
  'isReferralCodeUnique' : ActorMethod<[string], boolean>,
  'isUserNameUnique' : ActorMethod<[string], boolean>,
  'redeemRewards' : ActorMethod<[Principal, bigint], Result_2>,
  'refundFailedTxn' : ActorMethod<[bigint], Result_1>,
  'registerUser' : ActorMethod<[UserPayload], Result>,
  'setCashback' : ActorMethod<[CashbackType], undefined>,
  'transferTransaction' : ActorMethod<[bigint], Result_1>,
  'updateProfile' : ActorMethod<[UserUpdatePayload], Result>,
}
export type Result = { 'ok' : User } |
  { 'err' : string };
export type Result_1 = { 'ok' : InternalTxn } |
  { 'err' : string };
export type Result_2 = { 'ok' : null } |
  { 'err' : string };
export type Result_3 = { 'ok' : Rewards } |
  { 'err' : string };
export interface ReviewReward { 'timestamp' : Time, 'amount' : bigint }
export type RewardType = { 'SocialShare' : SocialShareReward } |
  { 'ReviewReward' : ReviewReward } |
  { 'Signup' : SignupReward } |
  { 'Referral' : ReferralReward };
export interface Rewards {
  'created' : Time,
  'username' : string,
  'balance' : bigint,
  'user' : Principal,
  'rewards' : Array<RewardType>,
  'totalAmountEarned' : bigint,
}
export interface SignupReward { 'timestamp' : Time, 'amount' : bigint }
export interface SocialShareReward { 'timestamp' : Time, 'amount' : bigint }
export type Time = bigint;
export interface TransferData { 'from' : Account, 'amount' : bigint }
export interface TxnPayload {
  'userEmail' : string,
  'transferAmount' : bigint,
  'txnType' : TxnType,
  'cashback' : [] | [Cashback],
}
export type TxnStatus = { 'FailedNRefunded' : null } |
  { 'TokensTransfered' : null } |
  { 'Initiated' : null } |
  { 'Completed' : null };
export type TxnType = { 'GiftCardPurchase' : GiftCardPurchase } |
  { 'BillsPayment' : BillsPayment } |
  { 'AirtimeTopup' : AirtimeTopup } |
  { 'DataTopup' : DataTopup };
export interface User {
  'id' : Principal,
  'dob' : [] | [Time],
  'referralCode' : string,
  'username' : string,
  'createdAt' : Time,
  'referrals' : Array<Principal>,
  'email' : string,
  'lastupdated' : Time,
  'gender' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export interface UserPayload {
  'dob' : [] | [Time],
  'referralCode' : string,
  'username' : string,
  'referrerCode' : [] | [string],
  'email' : string,
  'gender' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export interface UserUpdatePayload {
  'dob' : [] | [Time],
  'refferalCode' : string,
  'username' : string,
  'email' : string,
  'gender' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export interface _SERVICE extends Rentmase {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
