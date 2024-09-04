export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const Reward = IDL.Record({
    'claimed' : IDL.Bool,
    'claimedAt' : IDL.Opt(Time),
    'timestamp' : Time,
    'amount' : IDL.Nat,
  });
  const User = IDL.Record({
    'id' : IDL.Principal,
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'createdAt' : Time,
    'referrals' : IDL.Vec(IDL.Principal),
    'email' : IDL.Text,
    'lastupdated' : Time,
    'gender' : IDL.Opt(IDL.Text),
    'rewards' : IDL.Vec(Reward),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const PublicUser = IDL.Record({
    'id' : IDL.Principal,
    'referrals' : IDL.Vec(IDL.Principal),
    'rewards' : IDL.Vec(Reward),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Vec(Reward), 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : User, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const UserPayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'referralCode' : IDL.Text,
    'referrerCode' : IDL.Opt(IDL.Text),
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  const UserUpdatePayload = IDL.Record({
    'dob' : IDL.Opt(Time),
    'refferalCode' : IDL.Text,
    'email' : IDL.Text,
    'gender' : IDL.Opt(IDL.Text),
    'lastName' : IDL.Text,
    'firstName' : IDL.Text,
  });
  return IDL.Service({
    'getAllUsers' : IDL.Func([], [IDL.Vec(User)], ['query']),
    'getPublicUsers' : IDL.Func([], [IDL.Vec(PublicUser)], ['query']),
    'getUnclaimedRewards' : IDL.Func([], [Result_2], ['query']),
    'getUser' : IDL.Func([], [Result], ['query']),
    'isReferralCodeUnique' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'redeemRewards' : IDL.Func([IDL.Principal, IDL.Nat], [Result_1], []),
    'registerUser' : IDL.Func([UserPayload], [Result], []),
    'updateProfile' : IDL.Func([UserUpdatePayload], [Result], []),
  });
};
export const init = ({ IDL }) => { return []; };
