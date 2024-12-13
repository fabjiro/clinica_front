import axiosInstance from "../../../config/axios.config";
import { BillingDataSource } from "../../../domain/datasource/billing/billing.datasource";
import { IAddBillingReqDto } from "../../../domain/dto/request/billing/AddBillingReqDto";

export class BillingDataSourceImpl implements BillingDataSource {
  private readonly BASE_URL: string = "/facturation";
  async addBilling(billing: IAddBillingReqDto): Promise<void> {
    await axiosInstance.post(`${this.BASE_URL}`, billing);
  }
}
