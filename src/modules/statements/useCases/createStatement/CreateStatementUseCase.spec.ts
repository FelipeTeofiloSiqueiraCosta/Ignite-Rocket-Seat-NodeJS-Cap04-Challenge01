import { InMemoryUsersRepository } from "../../../users/repositories/in-memory/InMemoryUsersRepository";
import { AuthenticateUserUseCase } from "../../../users/useCases/authenticateUser/AuthenticateUserUseCase";
import { CreateUserUseCase } from "../../../users/useCases/createUser/CreateUserUseCase";
import { InMemoryStatementsRepository } from "../../repositories/in-memory/InMemoryStatementsRepository";
import { OperationType } from "./CreateStatementController";
import { CreateStatementUseCase } from "./CreateStatementUseCase";

let authenticateUserUseCase: AuthenticateUserUseCase;
let createUserUseCase: CreateUserUseCase;
let createStatementUseCase: CreateStatementUseCase;

let inMemoryUsersRepository: InMemoryUsersRepository;
let inMemoryStatementsRepository: InMemoryStatementsRepository;
describe("Create statement", () => {
  beforeAll(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository();
    inMemoryStatementsRepository = new InMemoryStatementsRepository();

    createUserUseCase = new CreateUserUseCase(inMemoryUsersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository
    );
    createStatementUseCase = new CreateStatementUseCase(
      inMemoryUsersRepository,
      inMemoryStatementsRepository
    );
  });

  it("should be able make a deposit", async () => {
    await createUserUseCase.execute({
      name: "name test",
      email: "email test",
      password: "pass test",
    });
    const auth = await authenticateUserUseCase.execute({
      email: "email test",
      password: "pass test",
    });
    var statement;
    if (auth.user) {
      statement = await createStatementUseCase.execute({
        amount: 100,
        description: "",
        type: OperationType.DEPOSIT,
        user_id: auth.user.id + "",
      });
    }
    expect(statement).toHaveProperty("id");
    expect(statement?.type).toBe("deposit");
  });

  it("should be able make a withdraw", async () => {
    const auth = await authenticateUserUseCase.execute({
      email: "email test",
      password: "pass test",
    });
    var statement;
    if (auth.user) {
      statement = await createStatementUseCase.execute({
        amount: 50,
        description: "",
        type: OperationType.WITHDRAW,
        user_id: auth.user.id + "",
      });
    }

    expect(statement).toHaveProperty("id");
    expect(statement?.type).toBe("withdraw");
  });
});
