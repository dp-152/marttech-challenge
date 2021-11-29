import IUserRepo from "./IUserRepo";
import User from "../data/user";

class MemoryUserRepo implements IUserRepo {
  private users: User[] = [] as User[];
  private currentID = 0;

  create(user: User): User {
    user.id = ++this.currentID;
    this.users.push(user);
    return user;
  }

  getById(id: number): User | null {
    const existingUser = this.users.find(el => el.id === id);
    if (!existingUser) {
      return null;
    }

    return existingUser;
  }

  getByUsername(username: string): User | null {
    const existingUser = this.users.find(el => el.username === username);
    if (!existingUser) {
      return null;
    }

    return existingUser;
  }
}

export default MemoryUserRepo;
