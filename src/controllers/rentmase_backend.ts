//@ts-ignore
export const idlFactory = ({ IDL }) => {
  const SocialShareRewardRequestPayload = IDL.Record({
    'postUrl' : IDL.Text,
    'platform' : IDL.Text,
  });
  const Time = IDL.Int;
  const SocialShareRewardRequest = IDL.Record({
    'id' : IDL.Nat,
    'postUrl' : IDL.Text,
    'user' : IDL.Principal,
    'platform' : IDL.Text,
    'approved' : IDL.Bool,
    'timestamp' : Time,
  });
  const Result_1 = IDL.Variant({
    'ok' : SocialShareRewardRequest,
    'err' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
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
  const Result_2 = IDL.Variant({ 'ok' : InternalTxn, 'err' : IDL.Text });
  const RewardType = IDL.Record({
    'review' : IDL.Record({ 'numberOfTimes' : IDL.Nat, 'amount' : IDL.Nat }),
    'referral' : IDL.Record({ 'numberOfTimes' : IDL.Nat, 'amount' : IDL.Nat }),
    'balance' : IDL.Nat,
    'socialShare' : IDL.Record({
      'numberOfTimes' : IDL.Nat,
      'amount' : IDL.Nat,
    }),
    'signup' : IDL.Record({ 'numberOfTimes' : IDL.Nat, 'amount' : IDL.Nat }),
    'totalAmountEarned' : IDL.Nat,
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'username' : IDL.Text,
    'createdAt' : Time,
    'email' : IDL.Text,
    'lastupdated' : Time,
    'gender' : IDL.Opt(IDL.Text),
    'rewards' : RewardType,
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
  const FaucetTxn = IDL.Record({
    'id' : IDL.Nat,
    'user' : IDL.Principal,
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const Result_5 = IDL.Variant({ 'ok' : FaucetTxn, 'err' : IDL.Text });
  const PublicUser = IDL.Record({
    'id' : IDL.Principal,
    'referrals' : IDL.Vec(IDL.Principal),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const RewardsReturn = IDL.Record({
    'created' : Time,
    'username' : IDL.Text,
    'balance' : IDL.Nat,
    'user' : IDL.Principal,
    'referrals' : IDL.Nat,
    'rewards' : IDL.Nat,
    'totalAmountEarned' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Rewards__1 = IDL.Record({
    'created' : Time,
    'username' : IDL.Text,
    'balance' : IDL.Nat,
    'user' : IDL.Principal,
    'referrals' : IDL.Nat,
    'rewards' : IDL.Nat,
    'totalAmountEarned' : IDL.Nat,
  });
  const Result_4 = IDL.Variant({ 'ok' : Rewards__1, 'err' : IDL.Text });
  const TxnPayload = IDL.Record({
    'userEmail' : IDL.Text,
    'transferAmount' : IDL.Nat,
    'txnType' : TxnType,
    'quantity' : IDL.Nat,
    'cashback' : IDL.Opt(Cashback),
  });
  const User__1 = IDL.Record({
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
  const RewardType__1 = IDL.Variant({
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
    'rewards' : IDL.Vec(RewardType__1),
    'totalAmountEarned' : IDL.Nat,
  });
  const SocialShareRewardRequest__1 = IDL.Record({
    'id' : IDL.Nat,
    'postUrl' : IDL.Text,
    'user' : IDL.Principal,
    'platform' : IDL.Text,
    'approved' : IDL.Bool,
    'timestamp' : Time,
  });
  const TxnStatus__1 = IDL.Variant({
    'FailedNRefunded' : IDL.Null,
    'TokensTransfered' : IDL.Null,
    'Initiated' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const Account__1 = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferData__1 = IDL.Record({
    'from' : Account__1,
    'amount' : IDL.Nat,
  });
  const PuerchaseTypeField__1 = IDL.Record({
    'name' : IDL.Text,
    'countryCode' : IDL.Text,
    'logoUrl' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const GiftCardPurchase__1 = IDL.Record({
    'more' : PuerchaseTypeField__1,
    'productId' : IDL.Text,
    'quantity' : IDL.Int,
    'recipientEmail' : IDL.Text,
  });
  const BillsPayment__1 = IDL.Record({
    'subscriberAccount' : IDL.Text,
    'more' : PuerchaseTypeField__1,
    'reference' : IDL.Text,
    'billerId' : IDL.Text,
    'biller' : IDL.Text,
  });
  const AirtimeTopup__1 = IDL.Record({
    'operator' : IDL.Text,
    'more' : PuerchaseTypeField__1,
    'operaterId' : IDL.Text,
  });
  const DataTopup__1 = IDL.Record({
    'operator' : IDL.Text,
    'more' : PuerchaseTypeField__1,
    'operaterId' : IDL.Text,
  });
  const TxnType__1 = IDL.Variant({
    'GiftCardPurchase' : GiftCardPurchase__1,
    'BillsPayment' : BillsPayment__1,
    'AirtimeTopup' : AirtimeTopup__1,
    'DataTopup' : DataTopup__1,
  });
  const Cashback__1 = IDL.Record({
    'amount' : IDL.Nat,
    'percentage' : IDL.Float64,
  });
  const InternalTxn__1 = IDL.Record({
    'id' : IDL.Nat,
    'status' : TxnStatus__1,
    'userEmail' : IDL.Text,
    'transferData' : TransferData__1,
    'txnType' : TxnType__1,
    'userPrincipal' : IDL.Principal,
    'reloadlyTxnId' : IDL.Opt(IDL.Text),
    'timestamp' : Time,
    'quantity' : IDL.Nat,
    'cashback' : IDL.Opt(Cashback__1),
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
    'addSocialShereRequest' : IDL.Func(
        [SocialShareRewardRequestPayload],
        [],
        [],
      ),
    'approveSocialShareReuest' : IDL.Func([IDL.Text], [Result_1], []),
    'cashbackTxn' : IDL.Func([IDL.Text, IDL.Float64, IDL.Text], [Result_3], []),
    'completeTxn' : IDL.Func([IDL.Text, IDL.Text], [Result_2], []),
    'getAllSocialShareRequest' : IDL.Func(
        [],
        [IDL.Vec(SocialShareRewardRequest)],
        ['query'],
      ),
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getCashback' : IDL.Func([], [CashbackType], ['query']),
    'getMyFaucetTxn' : IDL.Func([], [Result_5], ['query']),
    'getMySocialShareRequest' : IDL.Func(
        [],
        [IDL.Vec(SocialShareRewardRequest)],
        ['query'],
      ),
    'getPublicUsers' : IDL.Func([], [IDL.Vec(PublicUser)], ['query']),
    'getRewards' : IDL.Func([], [IDL.Vec(RewardsReturn), IDL.Nat], ['query']),
    'getTestTokens' : IDL.Func([], [Result_3], []),
    'getTxnsByEmail' : IDL.Func([IDL.Text], [IDL.Vec(InternalTxn)], ['query']),
    'getUser' : IDL.Func([], [Result], ['query']),
    'getUserRewards' : IDL.Func([], [Result_4], ['query']),
    'getUsersCashbackTxns' : IDL.Func([], [IDL.Vec(InternalTxn)], ['query']),
    'getUsersTxns' : IDL.Func([], [IDL.Vec(InternalTxn)], ['query']),
    'intiateTxn' : IDL.Func([TxnPayload], [Result_2], []),
    'isReferralCodeUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'isUserNameUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'migrateUser' : IDL.Func(
        [User__1, Rewards, IDL.Vec(SocialShareRewardRequest__1)],
        [Result_3],
        [],
      ),
    'migrateUserTransactions' : IDL.Func([IDL.Vec(InternalTxn__1)], [], []),
    'redeemRewards' : IDL.Func([IDL.Principal, IDL.Nat], [Result_3], []),
    'refundFailedTxn' : IDL.Func([IDL.Text], [Result_2], []),
    'registerUser' : IDL.Func([UserPayload], [Result], []),
    'setCashback' : IDL.Func([CashbackType], [], []),
    'transferTransaction' : IDL.Func([IDL.Text], [Result_2], []),
    'updateMyShareRequest' : IDL.Func(
        [SocialShareRewardRequestPayload, IDL.Nat],
        [Result_1],
        [],
      ),
    'updateProfile' : IDL.Func([UserUpdatePayload], [Result], []),
  });
  return Rentmase;
};

