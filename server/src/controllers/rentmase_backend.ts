//@ts-ignore
export const idlFactory = ({ IDL }) => {
  const TxnStatus = IDL.Variant({
    'TokensTransfered' : IDL.Null,
    'Initiated' : IDL.Null,
    'Completed' : IDL.Null,
  });
  const Account = IDL.Record({
    'owner' : IDL.Principal,
    'subaccount' : IDL.Opt(IDL.Vec(IDL.Nat8)),
  });
  const TransferData = IDL.Record({ 'from' : Account, 'amount' : IDL.Nat });
  const GiftCardPurchase = IDL.Record({
    'productId' : IDL.Text,
    'countryCode' : IDL.Text,
    'quantity' : IDL.Int,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
    'recipientEmail' : IDL.Text,
  });
  const BillsPayment = IDL.Record({
    'subscriberAccount' : IDL.Text,
    'reference' : IDL.Text,
    'billerId' : IDL.Text,
    'amount' : IDL.Text,
    'biller' : IDL.Text,
  });
  const AirtimeTopup = IDL.Record({
    'operator' : IDL.Text,
    'countryCode' : IDL.Text,
    'operaterId' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const DataTopup = IDL.Record({
    'operator' : IDL.Text,
    'countryCode' : IDL.Text,
    'operaterId' : IDL.Text,
    'phoneNumber' : IDL.Text,
    'amount' : IDL.Text,
  });
  const TxnType = IDL.Variant({
    'GiftCardPurchase' : GiftCardPurchase,
    'BillsPayment' : BillsPayment,
    'AirtimeTopup' : AirtimeTopup,
    'DataTopup' : DataTopup,
  });
  const Time = IDL.Int;
  const InternalTxn = IDL.Record({
    'id' : IDL.Nat,
    'status' : TxnStatus,
    'userEmail' : IDL.Text,
    'transferData' : TransferData,
    'txnType' : TxnType,
    'userPrincipal' : IDL.Principal,
    'timestamp' : Time,
  });
  const Result_1 = IDL.Variant({ 'ok' : InternalTxn, 'err' : IDL.Text });
  const Rentmase = IDL.Service({
    'completeTxn' : IDL.Func([IDL.Int], [Result_1], []),
    'transferTransaction' : IDL.Func([IDL.Int], [Result_1], []),
  });
  return Rentmase;
};