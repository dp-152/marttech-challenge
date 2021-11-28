class MessageDtoBase {
  roomId: number = -1;
  senderId: number = -1;
  body: string = "";
}

export class MessageInboundDto extends MessageDtoBase {
  constructor(init: MessageInboundDto) {
    super();
    Object.assign(this, init);
  }
}

export class MessageOutboundDto extends MessageDtoBase {
  id: number = -1;
  timestamp: Date = {} as Date;

  constructor(init: MessageOutboundDto) {
    super();
    Object.assign(this, init);
  }
}
