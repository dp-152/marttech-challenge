class RoomDtobase {
  name: string = "";
}
export class RoomOutboundDto extends RoomDtobase {
  id: number = -1;

  constructor(init: RoomOutboundDto) {
    super();
    Object.assign(this, init);
  }
}

export class RoomInboundDto extends RoomDtobase {
  constructor(init: RoomInboundDto) {
    super();
    Object.assign(this, init);
  }
}
