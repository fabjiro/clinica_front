import { StatusDataSource } from "../../../domain/datasource/status/status.datasource";
import { StatusEntity } from "../../../domain/entity/status/status.entity";
import { StatusRepository } from "../../../domain/repository/status/status.repository";

export class StatusRepositoryImpl implements StatusRepository {
  private readonly datasource: StatusDataSource;

  constructor(datasource: StatusDataSource) {
    this.datasource = datasource;
  }
  async getAll(): Promise<StatusEntity[]> {
    const response = await this.datasource.getAll();
    return response.map((item) => new StatusEntity(item.id, item.name));
  }
}
