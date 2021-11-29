class UserDtoBase {
  name: string = "";
  username: string = "";
}

export class UserOutboundDto extends UserDtoBase {
  id: number = -1;

  constructor(init: UserOutboundDto) {
    super();
    Object.assign(this, init);
  }
}

export class UserInboundDto extends UserDtoBase {
  password: string = "";

  constructor(init: UserInboundDto) {
    super();
    Object.assign(this, init);
  }
}
