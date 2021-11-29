import IUserRepo from "../repositories/IUserRepo";
import User from "../data/user";
import { UserInboundDto, UserOutboundDto } from "../dtos/user";

let userRepo: IUserRepo;

export function init(repo: IUserRepo) {
  userRepo = repo;
}

export function newUser(newUser: UserInboundDto): Promise<UserOutboundDto> {
  return new Promise((res, rej) => {
    const mappedUser = new User({ ...newUser, id: -1 });
    if (
      mappedUser.name === "" ||
      mappedUser.username === "" ||
      mappedUser.password === ""
    ) {
      rej(new Error("One or more required fields are empty"));
    }
    const createdUser = userRepo.create(mappedUser);
    res(new UserOutboundDto({ ...createdUser }));
  });
}

export function userById(id: number): Promise<UserOutboundDto> {
  return new Promise((res, rej) => {
    const foundUser = userRepo.getById(id);
    if (!foundUser) {
      rej(new Error("User not found"));
    }

    res(new UserOutboundDto({ ...foundUser! }));
  });
}
