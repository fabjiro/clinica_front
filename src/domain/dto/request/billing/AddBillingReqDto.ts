export interface IAddBillingReqDto {
  ClientName: string;
  paymentReceived: number;
  facturationDetails: IFacturationDetail[];
}

interface IFacturationDetail {
  product: string;
  quantity: number;
}
