import { IAddBillingReqDto } from "../../dto/request/billing/AddBillingReqDto";

export interface BillingDataSource {
  addBilling(billing: IAddBillingReqDto): Promise<void>;
}
