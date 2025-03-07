import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Account {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface Account__1 {
  'owner' : Principal,
  'subaccount' : [] | [Uint8Array | number[]],
}
export interface AirtimeTopup {
  'operator' : string,
  'more' : PuerchaseTypeField,
  'operaterId' : string,
}
export interface AirtimeTopup__1 {
  'operator' : string,
  'more' : PuerchaseTypeField__1,
  'operaterId' : string,
}
export interface BillsPayment {
  'subscriberAccount' : string,
  'more' : PuerchaseTypeField,
  'reference' : string,
  'billerId' : string,
  'biller' : string,
}
export interface BillsPayment__1 {
  'subscriberAccount' : string,
  'more' : PuerchaseTypeField__1,
  'reference' : string,
  'billerId' : string,
  'biller' : string,
}
export interface Cashback { 'amount' : bigint, 'percentage' : number }
export type CashbackType = [] | [
  { 'products' : Array<Product>, 'percentage' : number }
];
export interface Cashback__1 { 'amount' : bigint, 'percentage' : number }
export interface DataTopup {
  'operator' : string,
  'more' : PuerchaseTypeField,
  'operaterId' : string,
}
export interface DataTopup__1 {
  'operator' : string,
  'more' : PuerchaseTypeField__1,
  'operaterId' : string,
}
export interface FaucetTxn {
  'id' : bigint,
  'user' : Principal,
  'timestamp' : Time,
  'amount' : bigint,
}
export interface GiftCardPurchase {
  'more' : PuerchaseTypeField,
  'productId' : string,
  'quantity' : bigint,
  'recipientEmail' : string,
}
export interface GiftCardPurchase__1 {
  'more' : PuerchaseTypeField__1,
  'productId' : string,
  'quantity' : bigint,
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
  'quantity' : bigint,
  'cashback' : [] | [Cashback],
}
export interface InternalTxn__1 {
  'id' : bigint,
  'status' : TxnStatus__1,
  'userEmail' : string,
  'transferData' : TransferData__1,
  'txnType' : TxnType__1,
  'userPrincipal' : Principal,
  'reloadlyTxnId' : [] | [string],
  'timestamp' : Time,
  'quantity' : bigint,
  'cashback' : [] | [Cashback__1],
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
export interface PuerchaseTypeField {
  'name' : string,
  'countryCode' : string,
  'logoUrl' : string,
  'phoneNumber' : string,
  'amount' : string,
}
export interface PuerchaseTypeField__1 {
  'name' : string,
  'countryCode' : string,
  'logoUrl' : string,
  'phoneNumber' : string,
  'amount' : string,
}
export interface ReferralReward {
  'referralCode' : string,
  'referred' : Principal,
  'timestamp' : Time,
  'amount' : bigint,
}
export interface Rentmase {
  'addSocialShereRequest' : ActorMethod<
    [SocialShareRewardRequestPayload],
    undefined
  >,
  'approveSocialShareReuest' : ActorMethod<[string], Result_1>,
  'cashbackTxn' : ActorMethod<[string, number, string], Result_3>,
  'completeTxn' : ActorMethod<[string, string], Result_2>,
  'getAllSocialShareRequest' : ActorMethod<[], Array<SocialShareRewardRequest>>,
  'getAllUsers' : ActorMethod<[], Array<User>>,
  'getCashback' : ActorMethod<[], CashbackType>,
  'getMyFaucetTxn' : ActorMethod<[], Result_5>,
  'getMySocialShareRequest' : ActorMethod<[], Array<SocialShareRewardRequest>>,
  'getPublicUsers' : ActorMethod<[], Array<PublicUser>>,
  'getRewards' : ActorMethod<[], [Array<RewardsReturn>, bigint]>,
  'getTestTokens' : ActorMethod<[], Result_3>,
  'getTxnsByEmail' : ActorMethod<[string], Array<InternalTxn>>,
  'getUser' : ActorMethod<[], Result>,
  'getUserRewards' : ActorMethod<[], Result_4>,
  'getUsersCashbackTxns' : ActorMethod<[], Array<InternalTxn>>,
  'getUsersTxns' : ActorMethod<[], Array<InternalTxn>>,
  'intiateTxn' : ActorMethod<[TxnPayload], Result_2>,
  'isReferralCodeUnique' : ActorMethod<[string], boolean>,
  'isUserNameUnique' : ActorMethod<[string], boolean>,
  'migrateUser' : ActorMethod<
    [User__1, Rewards, Array<SocialShareRewardRequest__1>],
    Result_3
  >,
  'migrateUserTransactions' : ActorMethod<[Array<InternalTxn__1>], undefined>,
  'redeemRewards' : ActorMethod<[Principal, bigint], Result_3>,
  'refundFailedTxn' : ActorMethod<[string], Result_2>,
  'registerUser' : ActorMethod<[UserPayload], Result>,
  'setCashback' : ActorMethod<[CashbackType], undefined>,
  'transferTransaction' : ActorMethod<[string], Result_2>,
  'updateMyShareRequest' : ActorMethod<
    [SocialShareRewardRequestPayload, bigint],
    Result_1
  >,
  'updateProfile' : ActorMethod<[UserUpdatePayload], Result>,
}
export type Result = { 'ok' : User } |
  { 'err' : string };
export type Result_1 = { 'ok' : SocialShareRewardRequest } |
  { 'err' : string };
export type Result_2 = { 'ok' : InternalTxn } |
  { 'err' : string };
export type Result_3 = { 'ok' : null } |
  { 'err' : string };
export type Result_4 = { 'ok' : Rewards__1 } |
  { 'err' : string };
export type Result_5 = { 'ok' : FaucetTxn } |
  { 'err' : string };
export interface ReviewReward { 'timestamp' : Time, 'amount' : bigint }
export interface RewardType {
  'review' : { 'numberOfTimes' : bigint, 'amount' : bigint },
  'referral' : { 'numberOfTimes' : bigint, 'amount' : bigint },
  'balance' : bigint,
  'socialShare' : { 'numberOfTimes' : bigint, 'amount' : bigint },
  'signup' : { 'numberOfTimes' : bigint, 'amount' : bigint },
  'totalAmountEarned' : bigint,
}
export type RewardType__1 = { 'SocialShare' : SocialShareReward } |
  { 'ReviewReward' : ReviewReward } |
  { 'Signup' : SignupReward } |
  { 'Referral' : ReferralReward };
export interface Rewards {
  'created' : Time,
  'username' : string,
  'balance' : bigint,
  'user' : Principal,
  'rewards' : Array<RewardType__1>,
  'totalAmountEarned' : bigint,
}
export interface RewardsReturn {
  'created' : Time,
  'username' : string,
  'balance' : bigint,
  'user' : Principal,
  'referrals' : bigint,
  'rewards' : bigint,
  'totalAmountEarned' : bigint,
}
export interface Rewards__1 {
  'created' : Time,
  'username' : string,
  'balance' : bigint,
  'user' : Principal,
  'referrals' : bigint,
  'rewards' : bigint,
  'totalAmountEarned' : bigint,
}
export interface SignupReward { 'timestamp' : Time, 'amount' : bigint }
export interface SocialShareReward { 'timestamp' : Time, 'amount' : bigint }
export interface SocialShareRewardRequest {
  'id' : bigint,
  'postUrl' : string,
  'user' : Principal,
  'platform' : string,
  'approved' : boolean,
  'timestamp' : Time,
}
export interface SocialShareRewardRequestPayload {
  'postUrl' : string,
  'platform' : string,
}
export interface SocialShareRewardRequest__1 {
  'id' : bigint,
  'postUrl' : string,
  'user' : Principal,
  'platform' : string,
  'approved' : boolean,
  'timestamp' : Time,
}
export type Time = bigint;
export interface TransferData { 'from' : Account, 'amount' : bigint }
export interface TransferData__1 { 'from' : Account__1, 'amount' : bigint }
export interface TxnPayload {
  'userEmail' : string,
  'transferAmount' : bigint,
  'txnType' : TxnType,
  'quantity' : bigint,
  'cashback' : [] | [Cashback],
}
export type TxnStatus = { 'FailedNRefunded' : null } |
  { 'TokensTransfered' : null } |
  { 'Initiated' : null } |
  { 'Completed' : null };
export type TxnStatus__1 = { 'FailedNRefunded' : null } |
  { 'TokensTransfered' : null } |
  { 'Initiated' : null } |
  { 'Completed' : null };
export type TxnType = { 'GiftCardPurchase' : GiftCardPurchase } |
  { 'BillsPayment' : BillsPayment } |
  { 'AirtimeTopup' : AirtimeTopup } |
  { 'DataTopup' : DataTopup };
export type TxnType__1 = { 'GiftCardPurchase' : GiftCardPurchase__1 } |
  { 'BillsPayment' : BillsPayment__1 } |
  { 'AirtimeTopup' : AirtimeTopup__1 } |
  { 'DataTopup' : DataTopup__1 };
export interface User {
  'id' : Principal,
  'dob' : [] | [Time],
  'referralCode' : string,
  'username' : string,
  'createdAt' : Time,
  'email' : string,
  'lastupdated' : Time,
  'gender' : [] | [string],
  'rewards' : RewardType,
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
export interface User__1 {
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
export interface _SERVICE extends Rentmase {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];