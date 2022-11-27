import { DataSource } from "typeorm";
import { Statement } from "./src/modules/statements/entities/Statement";
import { User } from "./src/modules/users/mappers/entities/User";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.NODE_ENV === "test" ? "localhost" : "database",
  port: 5432,
  username: "docker",
  password: "ignite",
  database: process.env.NODE_ENV === "test" ? "findapi_test" : "findapi",
  entities: [Statement, User],
  migrations: ["src/database/migrations/*.ts"],
  migrationsTableName: "custom_migration_table",
});
