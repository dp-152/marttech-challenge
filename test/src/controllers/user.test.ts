import MemoryUserRepo from "../../../src/repositories/MemoryUserRepo";
import { UserInboundDto, UserOutboundDto } from "../../../src/dtos/user";
import * as subject from "../../../src/controllers/user";

beforeEach(() => {
  subject.init(new MemoryUserRepo());
});

async function createUser(): Promise<[UserInboundDto, UserOutboundDto]> {
  const testUser = new UserInboundDto({
    name: "SomeName",
    username: "somename123",
    password: "s&pers@afeP4sSw0rd",
  });

  const returnedUser = await subject.newUser(testUser);

  return [testUser, returnedUser];
}

test("Creates a user", async () => {
  const [testUser, returnedUser] = await createUser();

  expect(returnedUser.id).toBeDefined();
  expect(returnedUser.name).toMatch(testUser.name);
  expect(returnedUser.username).toMatch(testUser.username);
});

test("Finds a created user", async () => {
  const [, returnedUser] = await createUser();
  const foundUser = await subject.userById(returnedUser.id);

  expect(foundUser).toMatchObject(returnedUser);
});

test("Returns an error for an invalid user ID", async () => {
  await expect(subject.userById(5597)).rejects.toThrow();
});

test("Returns an error for invalid/incomplete user data", async () => {
  const badUser = {} as UserInboundDto;
  await expect(subject.newUser(badUser)).rejects.toThrow();
});
