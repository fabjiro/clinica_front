import { IAddBillingReqDto } from "../../dto/request/billing/AddBillingReqDto";

export interface BillingRepository {
  addBilling(billing: IAddBillingReqDto): Promise<void>;
}
