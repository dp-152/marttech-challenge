class RoomDtobase {
  name: string = "";
}
export class RoomOutboundDto extends RoomDtobase {
  id: number;

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
