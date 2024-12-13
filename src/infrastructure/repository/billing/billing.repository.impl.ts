import { BillingDataSource } from "../../../domain/datasource/billing/billing.datasource";
import { IAddBillingReqDto } from "../../../domain/dto/request/billing/AddBillingReqDto";
import { BillingRepository } from "../../../domain/repository/billing/billing.repository";

export class BillingRepositoryImpl implements BillingRepository {
  private readonly datasource: BillingDataSource;

  constructor(datasource: BillingDataSource) {
    this.datasource = datasource;
  }
  async addBilling(billing: IAddBillingReqDto): Promise<void> {
    await this.datasource.addBilling(billing);
  }
}
