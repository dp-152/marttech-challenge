class RoomDtoBase {
  name: string;

  constructor(init: RoomDtoBase) {
    this.name = init.name;
  }
}
export class RoomOutboundDto extends RoomDtoBase {
  id: number;

  constructor(init: RoomOutboundDto) {
    super(init);
    this.id = init.id;

    Object.seal(this);
  }
}

export class RoomInboundDto extends RoomDtoBase {
  constructor(init: RoomInboundDto) {
    super(init);
    Object.seal(this);
  }
}
