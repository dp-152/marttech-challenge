class MessageDtoBase {
  roomId: number;
  senderId: number;
  body: string;

  constructor(init: MessageDtoBase) {
    this.roomId = init.roomId;
    this.senderId = init.senderId;
    this.body = init.body;
  }
}

export class MessageInboundDto extends MessageDtoBase {
  constructor(init: MessageInboundDto) {
    super(init);
    Object.seal(this);
  }
}

export class MessageOutboundDto extends MessageDtoBase {
  id: number;
  timestamp: Date;

  constructor(init: MessageOutboundDto) {
    super(init);
    this.id = init.id;
    this.timestamp = init.timestamp;

    Object.seal(this);
  }
}
