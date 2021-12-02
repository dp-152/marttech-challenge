import IUserRepo from "../repositories/IUserRepo";
import User from "../data/user";
import { UserInboundDto, UserOutboundDto } from "../dtos/user";

export default class UserController {
  userRepo: IUserRepo;

  constructor(repo: IUserRepo) {
    this.userRepo = repo;
  }

  newUser(newUser: UserInboundDto): Promise<UserOutboundDto> {
    return new Promise((res, rej) => {
      if (
        !newUser.name ||
        newUser.name === "" ||
        !newUser.username ||
        newUser.username === "" ||
        !newUser.password ||
        newUser.password === ""
      ) {
        rej(new Error("One or more required fields are empty"));
        return;
      }
      const mappedUser = new User({ ...newUser, id: -1 });
      const createdUser = this.userRepo.create(mappedUser);
      res(new UserOutboundDto({ ...createdUser }));
    });
  }

  userById(id: number): Promise<UserOutboundDto> {
    return new Promise((res, rej) => {
      const foundUser = this.userRepo.getById(id);
      if (!foundUser) {
        rej(new Error("User not found"));
        return;
      }

      res(new UserOutboundDto({ ...foundUser! }));
    });
  }
}
