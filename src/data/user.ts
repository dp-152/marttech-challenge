class User {
  id: number = -1;
  name: string = "";
  username: string = "";
  password: string = "";

  constructor(init: User) {
    Object.assign(this, init);
  }
}

export default User;
