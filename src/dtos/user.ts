class UserDtoBase {
  name: string = "";
  username: string = "";

  constructor(init: UserDtoBase) {
    this.name = init.name;
    this.username = init.username;
  }
}

export class UserOutboundDto extends UserDtoBase {
  id: number = -1;

  constructor(init: UserOutboundDto) {
    super(init);
    this.id = init.id;

    Object.seal(this);
  }
}

export class UserInboundDto extends UserDtoBase {
  password: string = "";

  constructor(init: UserInboundDto) {
    super(init);
    this.password = init.password;

    Object.assign(this, init);
  }
}
