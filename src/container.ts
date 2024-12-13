import "reflect-metadata"; // this should be the first import
import { Container } from "inversify";
import { TYPES } from "./types";
import { AuthRepository } from "./domain/repository/auth/auth.repository";
import { AuthRepositoryImpl } from "./infrastructure/repository/auth/auth.repository.impl";
import { AuthDataSourceImpl } from "./infrastructure/datasource/auth/auth.datasource.impl";
import { BackupRespository } from "./domain/repository/backup/backup.repository";
import { BackupRepositoryImpl } from "./infrastructure/repository/backup/backup.repository.impl";
import { BackupDataSourceImpl } from "./infrastructure/datasource/backup/backup.datasource.impl";
import { UserRepository } from "./domain/repository/user/user.repository";
import { UserRepositoryImpl } from "./infrastructure/repository/user/user.repository.impl";
import { UserDataSourceImpl } from "./infrastructure/datasource/user/user.datasource.impl";
import { RolRepository } from "./domain/repository/rol/rol.repository";
import { RolRepositoryImpl } from "./infrastructure/repository/rol/rol.repository.impl";
import { RolDataSourceImpl } from "./infrastructure/datasource/rol/rol.datasource.impl";
import { StatusRepository } from "./domain/repository/status/status.repository";
import { StatusRepositoryImpl } from "./infrastructure/repository/status/status.repository.impl";
import { StatusDataSourceImpl } from "./infrastructure/datasource/status/status.datasource.impl";
import { CategoryRepository } from "./domain/repository/category/category.repository";
import { CategoryDataSourceImpl } from "./infrastructure/datasource/category/category.datasource.impl";
import { CategoryRepositoryImpl } from "./infrastructure/repository/category/category.repository.impl";
import { ProductRepository } from "./domain/repository/product/product.repository";
import { ProductRepositoryImpl } from "./infrastructure/repository/product/product.repository.impl";
import { ProductDataSourceImpl } from "./infrastructure/datasource/product/product.datasource.impl";
import { ShopRepository } from "./domain/repository/shop/shop.repository";
import { ShopRepositoryImpl } from "./infrastructure/repository/shop/shop.repository.impl";
import { ShopDataSourceImpl } from "./infrastructure/datasource/shop/shop.datasource.impl";
import { InventoryDataSource } from "./domain/datasource/inventory/inventory.datasource";
import { InventoryDataSourceImpl } from "./infrastructure/datasource/inventory/inventory.datasource.impl";
import { InventoryRepositoryImpl } from "./infrastructure/repository/inventory/inventory.repository.impl";
import { BillingDataSource } from "./domain/datasource/billing/billing.datasource";
import { BillingDataSourceImpl } from "./infrastructure/datasource/billing/billing.datasource.impl";
import { BillingRepositoryImpl } from "./infrastructure/repository/billing/billing.repository.impl";

const container = new Container();

container
  .bind<AuthRepository>(TYPES.AuthRepository)
  .toDynamicValue(() => new AuthRepositoryImpl(new AuthDataSourceImpl()))
  .inSingletonScope();
container
  .bind<BackupRespository>(TYPES.BackupRepository)
  .toDynamicValue(() => new BackupRepositoryImpl(new BackupDataSourceImpl()))
  .inSingletonScope();
container
  .bind<UserRepository>(TYPES.UserRepository)
  .toDynamicValue(() => new UserRepositoryImpl(new UserDataSourceImpl()))
  .inSingletonScope();
container
  .bind<RolRepository>(TYPES.RolRepository)
  .toDynamicValue(() => new RolRepositoryImpl(new RolDataSourceImpl()))
  .inSingletonScope();
container
  .bind<StatusRepository>(TYPES.StatusRepository)
  .toDynamicValue(() => new StatusRepositoryImpl(new StatusDataSourceImpl()))
  .inSingletonScope();

container
  .bind<CategoryRepository>(TYPES.CategoryRepository)
  .toDynamicValue(
    () => new CategoryRepositoryImpl(new CategoryDataSourceImpl())
  )
  .inSingletonScope();

container
  .bind<ProductRepository>(TYPES.ProductRepository)
  .toDynamicValue(() => new ProductRepositoryImpl(new ProductDataSourceImpl()))
  .inSingletonScope();

container
  .bind<ShopRepository>(TYPES.ShopRepository)
  .toDynamicValue(() => new ShopRepositoryImpl(new ShopDataSourceImpl()))
  .inSingletonScope();

container
  .bind<InventoryDataSource>(TYPES.InventoryRepository)
  .toDynamicValue(() => new InventoryRepositoryImpl(new InventoryDataSourceImpl()))
  .inSingletonScope();

container
  .bind<BillingDataSource>(TYPES.BillingRepository)
  .toDynamicValue(() => new BillingRepositoryImpl(new BillingDataSourceImpl()))
  .inSingletonScope();

  export { container };
