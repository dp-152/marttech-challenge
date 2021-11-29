import User from "../data/user";

interface IUserRepo {
  create: (user: User) => User;
  getById: (id: number) => User | null;
  getByUsername: (username: string) => User | null;
}

export default IUserRepo;
