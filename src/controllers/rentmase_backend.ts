//@ts-ignore
export const idlFactory = ({ IDL }) => {
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const TxnStatus = IDL.Variant({
    'FailedNRefunded' : IDL.Null,
    'TokensTransfered' : IDL.Null,
    'Initiated' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferData = IDL.Record({ 'from' : Account, 'amount' : IDL.Nat });
  const PuerchaseTypeField = IDL.Record({
    'name' : IDL.Text,
    'countryCode' : IDL.Text,
    'logoUrl' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const GiftCardPurchase = IDL.Record({
    'more' : PuerchaseTypeField,
    'productId' : IDL.Text,
    'quantity' : IDL.Int,
    'recipientEmail' : IDL.Text,
  });
  const BillsPayment = IDL.Record({
    'subscriberAccount' : IDL.Text,
    'more' : PuerchaseTypeField,
    'reference' : IDL.Text,
    'billerId' : IDL.Text,
    'biller' : IDL.Text,
  });
  const AirtimeTopup = IDL.Record({
    'operator' : IDL.Text,
    'more' : PuerchaseTypeField,
    'operaterId' : IDL.Text,
  });
  const DataTopup = IDL.Record({
    'operator' : IDL.Text,
    'more' : PuerchaseTypeField,
    'operaterId' : IDL.Text,
  });
  const TxnType = IDL.Variant({
    'GiftCardPurchase' : GiftCardPurchase,
    'BillsPayment' : BillsPayment,
    'AirtimeTopup' : AirtimeTopup,
    'DataTopup' : DataTopup,
  });
  const Time = IDL.Int;
  const Cashback = IDL.Record({
    'amount' : IDL.Nat,
    'percentage' : IDL.Float64,
  });
  const InternalTxn = IDL.Record({
    'id' : IDL.Nat,
    'status' : TxnStatus,
    'userEmail' : IDL.Text,
    'transferData' : TransferData,
    'txnType' : TxnType,
    'userPrincipal' : IDL.Principal,
    'reloadlyTxnId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'cashback' : IDL.Opt(Cashback),
  });
  const Result_1 = IDL.Variant({ 'ok' : InternalTxn, 'err' : IDL.Text });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'username' : IDL.Text,
    'createdAt' : Time,
    'referrals' : IDL.Vec(IDL.Principal),
    'email' : IDL.Text,
    'lastupdated' : Time,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Product = IDL.Variant({
    'GiftCardPurchase' : IDL.Null,
    'BillsPayment' : IDL.Null,
    'AirtimeTopup' : IDL.Null,
    'DataTopup' : IDL.Null,
  });
  const CashbackType = IDL.Opt(
    IDL.Record({ 'products' : IDL.Vec(Product), 'percentage' : IDL.Float64 })
  );
  const PublicUser = IDL.Record({
    'id' : IDL.Principal,
    'referrals' : IDL.Vec(IDL.Principal),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const SocialShareReward = IDL.Record({
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const ReviewReward = IDL.Record({ 'timestamp' : Time, 'amount' : IDL.Nat });
  const SignupReward = IDL.Record({ 'timestamp' : Time, 'amount' : IDL.Nat });
  const ReferralReward = IDL.Record({
    'referralCode' : IDL.Text,
    'referred' : IDL.Principal,
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const RewardType = IDL.Variant({
    'SocialShare' : SocialShareReward,
    'ReviewReward' : ReviewReward,
    'Signup' : SignupReward,
    'Referral' : ReferralReward,
  });
  const Rewards = IDL.Record({
    'created' : Time,
    'username' : IDL.Text,
    'balance' : IDL.Nat,
    'user' : IDL.Principal,
    'rewards' : IDL.Vec(RewardType),
    'totalAmountEarned' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result_3 = IDL.Variant({ 'ok' : Rewards, 'err' : IDL.Text });
  const TxnPayload = IDL.Record({
    'userEmail' : IDL.Text,
    'transferAmount' : IDL.Nat,
    'txnType' : TxnType,
    'quantity' : IDL.Nat,
    'cashback' : IDL.Opt(Cashback),
  });
  const UserPayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'username' : IDL.Text,
    'referrerCode' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserUpdatePayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'refferalCode' : IDL.Text,
    'username' : IDL.Text,
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Rentmase = IDL.Service({
    'cashbackTxn' : IDL.Func([IDL.Nat, IDL.Float64, IDL.Text], [Result_2], []),
    'completeTxn' : IDL.Func([IDL.Int, IDL.Text], [Result_1], []),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getCashback' : IDL.Func([], [CashbackType], ['query']),
    'getPublicUsers' : IDL.Func([], [IDL.Vec(PublicUser)], ['query']),
    'getRewards' : IDL.Func([], [IDL.Vec(Rewards)], ['query']),
    'getTxnsByEmail' : IDL.Func([IDL.Text], [IDL.Vec(InternalTxn)], ['query']),
    'getUser' : IDL.Func([], [Result], ['query']),
    'getUserRewards' : IDL.Func([], [Result_3], ['query']),
    'getUsersCashbackTxns' : IDL.Func([], [IDL.Vec(InternalTxn)], ['query']),
    'getUsersTxns' : IDL.Func([], [IDL.Vec(InternalTxn)], ['query']),
    'intiateTxn' : IDL.Func([TxnPayload], [Result_1], []),
    'isReferralCodeUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'isUserNameUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'redeemRewards' : IDL.Func([IDL.Principal, IDL.Nat], [Result_2], []),
    'refundFailedTxn' : IDL.Func([IDL.Int], [Result_1], []),
    'registerUser' : IDL.Func([UserPayload], [Result], []),
    'setCashback' : IDL.Func([CashbackType], [], []),
    'transferTransaction' : IDL.Func([IDL.Int], [Result_1], []),
    'updateProfile' : IDL.Func([UserUpdatePayload], [Result], []),
  });
  return Rentmase;
};


