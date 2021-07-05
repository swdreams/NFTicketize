// THIS IS AN AUTOGENERATED FILE. DO NOT EDIT THIS FILE DIRECTLY.

import {
  ethereum,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Approval extends ethereum.Event {
  get params(): Approval__Params {
    return new Approval__Params(this);
  }
}

export class Approval__Params {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get approved(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class ApprovalForAll extends ethereum.Event {
  get params(): ApprovalForAll__Params {
    return new ApprovalForAll__Params(this);
  }
}

export class ApprovalForAll__Params {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get approved(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class NewEvent extends ethereum.Event {
  get params(): NewEvent__Params {
    return new NewEvent__Params(this);
  }
}

export class NewEvent__Params {
  _event: NewEvent;

  constructor(event: NewEvent) {
    this._event = event;
  }

  get id(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get creator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get startDate(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get metadataIpfsCid(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class NewTicket extends ethereum.Event {
  get params(): NewTicket__Params {
    return new NewTicket__Params(this);
  }
}

export class NewTicket__Params {
  _event: NewTicket;

  constructor(event: NewTicket) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get ticketCategoryId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get id(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get forBid(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class NewTicketCategory extends ethereum.Event {
  get params(): NewTicketCategory__Params {
    return new NewTicketCategory__Params(this);
  }
}

export class NewTicketCategory__Params {
  _event: NewTicketCategory;

  constructor(event: NewTicketCategory) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get currentMintTickets(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get maxTickets(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get ticketPrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get resellTicketValue(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get metadataIpfsCid(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class RoyaltiesSet extends ethereum.Event {
  get params(): RoyaltiesSet__Params {
    return new RoyaltiesSet__Params(this);
  }
}

export class RoyaltiesSet__Params {
  _event: RoyaltiesSet;

  constructor(event: RoyaltiesSet) {
    this._event = event;
  }

  get tokenId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get royalties(): Array<RoyaltiesSetRoyaltiesStruct> {
    return this._event.parameters[1].value.toTupleArray<
      RoyaltiesSetRoyaltiesStruct
    >();
  }
}

export class RoyaltiesSetRoyaltiesStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class Transfer extends ethereum.Event {
  get params(): Transfer__Params {
    return new Transfer__Params(this);
  }
}

export class Transfer__Params {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class UpdateTicket extends ethereum.Event {
  get params(): UpdateTicket__Params {
    return new UpdateTicket__Params(this);
  }
}

export class UpdateTicket__Params {
  _event: UpdateTicket;

  constructor(event: UpdateTicket) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get ticketCategoryId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get id(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get forBid(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class UpdateTicketCategory extends ethereum.Event {
  get params(): UpdateTicketCategory__Params {
    return new UpdateTicketCategory__Params(this);
  }
}

export class UpdateTicketCategory__Params {
  _event: UpdateTicketCategory;

  constructor(event: UpdateTicketCategory) {
    this._event = event;
  }

  get eventId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get id(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get currentMintTickets(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get maxTickets(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get ticketPrice(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }

  get resellTicketValue(): BigInt {
    return this._event.parameters[5].value.toBigInt();
  }

  get metadataIpfsCid(): string {
    return this._event.parameters[6].value.toString();
  }
}

export class NFTicketize__eventsResult {
  value0: Address;
  value1: BigInt;
  value2: string;
  value3: boolean;

  constructor(
    value0: Address,
    value1: BigInt,
    value2: string,
    value3: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromString(this.value2));
    map.set("value3", ethereum.Value.fromBoolean(this.value3));
    return map;
  }
}

export class NFTicketize__getRoyaltiesResultValue0Struct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class NFTicketize__royaltiesResult {
  value0: Address;
  value1: BigInt;

  constructor(value0: Address, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromAddress(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    return map;
  }
}

export class NFTicketize__ticketCategoriesResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;
  value3: BigInt;
  value4: BigInt;
  value5: string;
  value6: boolean;

  constructor(
    value0: BigInt,
    value1: BigInt,
    value2: BigInt,
    value3: BigInt,
    value4: BigInt,
    value5: string,
    value6: boolean
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
    this.value5 = value5;
    this.value6 = value6;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    map.set("value3", ethereum.Value.fromUnsignedBigInt(this.value3));
    map.set("value4", ethereum.Value.fromUnsignedBigInt(this.value4));
    map.set("value5", ethereum.Value.fromString(this.value5));
    map.set("value6", ethereum.Value.fromBoolean(this.value6));
    return map;
  }
}

export class NFTicketize__ticketsResult {
  value0: BigInt;
  value1: BigInt;
  value2: BigInt;

  constructor(value0: BigInt, value1: BigInt, value2: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
  }

  toMap(): TypedMap<string, ethereum.Value> {
    let map = new TypedMap<string, ethereum.Value>();
    map.set("value0", ethereum.Value.fromUnsignedBigInt(this.value0));
    map.set("value1", ethereum.Value.fromUnsignedBigInt(this.value1));
    map.set("value2", ethereum.Value.fromUnsignedBigInt(this.value2));
    return map;
  }
}

export class NFTicketize extends ethereum.SmartContract {
  static bind(address: Address): NFTicketize {
    return new NFTicketize("NFTicketize", address);
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);

    return result[0].toBigInt();
  }

  try_balanceOf(owner: Address): ethereum.CallResult<BigInt> {
    let result = super.tryCall("balanceOf", "balanceOf(address):(uint256)", [
      ethereum.Value.fromAddress(owner)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  baseURI(): string {
    let result = super.call("baseURI", "baseURI():(string)", []);

    return result[0].toString();
  }

  try_baseURI(): ethereum.CallResult<string> {
    let result = super.tryCall("baseURI", "baseURI():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  events(param0: BigInt): NFTicketize__eventsResult {
    let result = super.call(
      "events",
      "events(uint256):(address,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new NFTicketize__eventsResult(
      result[0].toAddress(),
      result[1].toBigInt(),
      result[2].toString(),
      result[3].toBoolean()
    );
  }

  try_events(param0: BigInt): ethereum.CallResult<NFTicketize__eventsResult> {
    let result = super.tryCall(
      "events",
      "events(uint256):(address,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new NFTicketize__eventsResult(
        value[0].toAddress(),
        value[1].toBigInt(),
        value[2].toString(),
        value[3].toBoolean()
      )
    );
  }

  getApproved(tokenId: BigInt): Address {
    let result = super.call("getApproved", "getApproved(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_getApproved(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall(
      "getApproved",
      "getApproved(uint256):(address)",
      [ethereum.Value.fromUnsignedBigInt(tokenId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  getRoyalties(id: BigInt): Array<NFTicketize__getRoyaltiesResultValue0Struct> {
    let result = super.call(
      "getRoyalties",
      "getRoyalties(uint256):((address,uint96)[])",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );

    return result[0].toTupleArray<
      NFTicketize__getRoyaltiesResultValue0Struct
    >();
  }

  try_getRoyalties(
    id: BigInt
  ): ethereum.CallResult<Array<NFTicketize__getRoyaltiesResultValue0Struct>> {
    let result = super.tryCall(
      "getRoyalties",
      "getRoyalties(uint256):((address,uint96)[])",
      [ethereum.Value.fromUnsignedBigInt(id)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      value[0].toTupleArray<NFTicketize__getRoyaltiesResultValue0Struct>()
    );
  }

  isApprovedForAll(owner: Address, operator: Address): boolean {
    let result = super.call(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );

    return result[0].toBoolean();
  }

  try_isApprovedForAll(
    owner: Address,
    operator: Address
  ): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "isApprovedForAll",
      "isApprovedForAll(address,address):(bool)",
      [ethereum.Value.fromAddress(owner), ethereum.Value.fromAddress(operator)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  name(): string {
    let result = super.call("name", "name():(string)", []);

    return result[0].toString();
  }

  try_name(): ethereum.CallResult<string> {
    let result = super.tryCall("name", "name():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  ownerOf(tokenId: BigInt): Address {
    let result = super.call("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toAddress();
  }

  try_ownerOf(tokenId: BigInt): ethereum.CallResult<Address> {
    let result = super.tryCall("ownerOf", "ownerOf(uint256):(address)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toAddress());
  }

  royalties(param0: BigInt, param1: BigInt): NFTicketize__royaltiesResult {
    let result = super.call(
      "royalties",
      "royalties(uint256,uint256):(address,uint96)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );

    return new NFTicketize__royaltiesResult(
      result[0].toAddress(),
      result[1].toBigInt()
    );
  }

  try_royalties(
    param0: BigInt,
    param1: BigInt
  ): ethereum.CallResult<NFTicketize__royaltiesResult> {
    let result = super.tryCall(
      "royalties",
      "royalties(uint256,uint256):(address,uint96)",
      [
        ethereum.Value.fromUnsignedBigInt(param0),
        ethereum.Value.fromUnsignedBigInt(param1)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new NFTicketize__royaltiesResult(
        value[0].toAddress(),
        value[1].toBigInt()
      )
    );
  }

  supportsInterface(interfaceId: Bytes): boolean {
    let result = super.call(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );

    return result[0].toBoolean();
  }

  try_supportsInterface(interfaceId: Bytes): ethereum.CallResult<boolean> {
    let result = super.tryCall(
      "supportsInterface",
      "supportsInterface(bytes4):(bool)",
      [ethereum.Value.fromFixedBytes(interfaceId)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBoolean());
  }

  symbol(): string {
    let result = super.call("symbol", "symbol():(string)", []);

    return result[0].toString();
  }

  try_symbol(): ethereum.CallResult<string> {
    let result = super.tryCall("symbol", "symbol():(string)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  ticketCategories(param0: BigInt): NFTicketize__ticketCategoriesResult {
    let result = super.call(
      "ticketCategories",
      "ticketCategories(uint256):(uint256,uint32,uint32,uint256,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new NFTicketize__ticketCategoriesResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt(),
      result[3].toBigInt(),
      result[4].toBigInt(),
      result[5].toString(),
      result[6].toBoolean()
    );
  }

  try_ticketCategories(
    param0: BigInt
  ): ethereum.CallResult<NFTicketize__ticketCategoriesResult> {
    let result = super.tryCall(
      "ticketCategories",
      "ticketCategories(uint256):(uint256,uint32,uint32,uint256,uint256,string,bool)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new NFTicketize__ticketCategoriesResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt(),
        value[3].toBigInt(),
        value[4].toBigInt(),
        value[5].toString(),
        value[6].toBoolean()
      )
    );
  }

  tickets(param0: BigInt): NFTicketize__ticketsResult {
    let result = super.call(
      "tickets",
      "tickets(uint256):(uint256,uint256,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );

    return new NFTicketize__ticketsResult(
      result[0].toBigInt(),
      result[1].toBigInt(),
      result[2].toBigInt()
    );
  }

  try_tickets(param0: BigInt): ethereum.CallResult<NFTicketize__ticketsResult> {
    let result = super.tryCall(
      "tickets",
      "tickets(uint256):(uint256,uint256,uint32)",
      [ethereum.Value.fromUnsignedBigInt(param0)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(
      new NFTicketize__ticketsResult(
        value[0].toBigInt(),
        value[1].toBigInt(),
        value[2].toBigInt()
      )
    );
  }

  tokenByIndex(index: BigInt): BigInt {
    let result = super.call("tokenByIndex", "tokenByIndex(uint256):(uint256)", [
      ethereum.Value.fromUnsignedBigInt(index)
    ]);

    return result[0].toBigInt();
  }

  try_tokenByIndex(index: BigInt): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenByIndex",
      "tokenByIndex(uint256):(uint256)",
      [ethereum.Value.fromUnsignedBigInt(index)]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );

    return result[0].toBigInt();
  }

  try_tokenOfOwnerByIndex(
    owner: Address,
    index: BigInt
  ): ethereum.CallResult<BigInt> {
    let result = super.tryCall(
      "tokenOfOwnerByIndex",
      "tokenOfOwnerByIndex(address,uint256):(uint256)",
      [
        ethereum.Value.fromAddress(owner),
        ethereum.Value.fromUnsignedBigInt(index)
      ]
    );
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }

  tokenURI(tokenId: BigInt): string {
    let result = super.call("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);

    return result[0].toString();
  }

  try_tokenURI(tokenId: BigInt): ethereum.CallResult<string> {
    let result = super.tryCall("tokenURI", "tokenURI(uint256):(string)", [
      ethereum.Value.fromUnsignedBigInt(tokenId)
    ]);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toString());
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", "totalSupply():(uint256)", []);

    return result[0].toBigInt();
  }

  try_totalSupply(): ethereum.CallResult<BigInt> {
    let result = super.tryCall("totalSupply", "totalSupply():(uint256)", []);
    if (result.reverted) {
      return new ethereum.CallResult();
    }
    let value = result.value;
    return ethereum.CallResult.fromValue(value[0].toBigInt());
  }
}

export class ConstructorCall extends ethereum.Call {
  get inputs(): ConstructorCall__Inputs {
    return new ConstructorCall__Inputs(this);
  }

  get outputs(): ConstructorCall__Outputs {
    return new ConstructorCall__Outputs(this);
  }
}

export class ConstructorCall__Inputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ConstructorCall__Outputs {
  _call: ConstructorCall;

  constructor(call: ConstructorCall) {
    this._call = call;
  }
}

export class ApproveCall extends ethereum.Call {
  get inputs(): ApproveCall__Inputs {
    return new ApproveCall__Inputs(this);
  }

  get outputs(): ApproveCall__Outputs {
    return new ApproveCall__Outputs(this);
  }
}

export class ApproveCall__Inputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }

  get to(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class ApproveCall__Outputs {
  _call: ApproveCall;

  constructor(call: ApproveCall) {
    this._call = call;
  }
}

export class SafeTransferFromCall extends ethereum.Call {
  get inputs(): SafeTransferFromCall__Inputs {
    return new SafeTransferFromCall__Inputs(this);
  }

  get outputs(): SafeTransferFromCall__Outputs {
    return new SafeTransferFromCall__Outputs(this);
  }
}

export class SafeTransferFromCall__Inputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class SafeTransferFromCall__Outputs {
  _call: SafeTransferFromCall;

  constructor(call: SafeTransferFromCall) {
    this._call = call;
  }
}

export class SafeTransferFrom1Call extends ethereum.Call {
  get inputs(): SafeTransferFrom1Call__Inputs {
    return new SafeTransferFrom1Call__Inputs(this);
  }

  get outputs(): SafeTransferFrom1Call__Outputs {
    return new SafeTransferFrom1Call__Outputs(this);
  }
}

export class SafeTransferFrom1Call__Inputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _data(): Bytes {
    return this._call.inputValues[3].value.toBytes();
  }
}

export class SafeTransferFrom1Call__Outputs {
  _call: SafeTransferFrom1Call;

  constructor(call: SafeTransferFrom1Call) {
    this._call = call;
  }
}

export class SetApprovalForAllCall extends ethereum.Call {
  get inputs(): SetApprovalForAllCall__Inputs {
    return new SetApprovalForAllCall__Inputs(this);
  }

  get outputs(): SetApprovalForAllCall__Outputs {
    return new SetApprovalForAllCall__Outputs(this);
  }
}

export class SetApprovalForAllCall__Inputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }

  get operator(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get approved(): boolean {
    return this._call.inputValues[1].value.toBoolean();
  }
}

export class SetApprovalForAllCall__Outputs {
  _call: SetApprovalForAllCall;

  constructor(call: SetApprovalForAllCall) {
    this._call = call;
  }
}

export class TransferFromCall extends ethereum.Call {
  get inputs(): TransferFromCall__Inputs {
    return new TransferFromCall__Inputs(this);
  }

  get outputs(): TransferFromCall__Outputs {
    return new TransferFromCall__Outputs(this);
  }
}

export class TransferFromCall__Inputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }

  get from(): Address {
    return this._call.inputValues[0].value.toAddress();
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get tokenId(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }
}

export class TransferFromCall__Outputs {
  _call: TransferFromCall;

  constructor(call: TransferFromCall) {
    this._call = call;
  }
}

export class CreateEventCall extends ethereum.Call {
  get inputs(): CreateEventCall__Inputs {
    return new CreateEventCall__Inputs(this);
  }

  get outputs(): CreateEventCall__Outputs {
    return new CreateEventCall__Outputs(this);
  }
}

export class CreateEventCall__Inputs {
  _call: CreateEventCall;

  constructor(call: CreateEventCall) {
    this._call = call;
  }

  get _startDate(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _metadataIpfsCid(): string {
    return this._call.inputValues[1].value.toString();
  }
}

export class CreateEventCall__Outputs {
  _call: CreateEventCall;

  constructor(call: CreateEventCall) {
    this._call = call;
  }
}

export class CreateTicketCategoryCall extends ethereum.Call {
  get inputs(): CreateTicketCategoryCall__Inputs {
    return new CreateTicketCategoryCall__Inputs(this);
  }

  get outputs(): CreateTicketCategoryCall__Outputs {
    return new CreateTicketCategoryCall__Outputs(this);
  }
}

export class CreateTicketCategoryCall__Inputs {
  _call: CreateTicketCategoryCall;

  constructor(call: CreateTicketCategoryCall) {
    this._call = call;
  }

  get _eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _maxTickets(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _ticketPrice(): BigInt {
    return this._call.inputValues[2].value.toBigInt();
  }

  get _resellTicketValue(): BigInt {
    return this._call.inputValues[3].value.toBigInt();
  }

  get _metadataIpfsCid(): string {
    return this._call.inputValues[4].value.toString();
  }
}

export class CreateTicketCategoryCall__Outputs {
  _call: CreateTicketCategoryCall;

  constructor(call: CreateTicketCategoryCall) {
    this._call = call;
  }
}

export class FillInformationsAboutTicketCall extends ethereum.Call {
  get inputs(): FillInformationsAboutTicketCall__Inputs {
    return new FillInformationsAboutTicketCall__Inputs(this);
  }

  get outputs(): FillInformationsAboutTicketCall__Outputs {
    return new FillInformationsAboutTicketCall__Outputs(this);
  }
}

export class FillInformationsAboutTicketCall__Inputs {
  _call: FillInformationsAboutTicketCall;

  constructor(call: FillInformationsAboutTicketCall) {
    this._call = call;
  }

  get _eventId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _ticketCategoryId(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }

  get _tokenIdsForMint(): Array<BigInt> {
    return this._call.inputValues[2].value.toBigIntArray();
  }
}

export class FillInformationsAboutTicketCall__Outputs {
  _call: FillInformationsAboutTicketCall;

  constructor(call: FillInformationsAboutTicketCall) {
    this._call = call;
  }
}

export class MintAndTransferCall extends ethereum.Call {
  get inputs(): MintAndTransferCall__Inputs {
    return new MintAndTransferCall__Inputs(this);
  }

  get outputs(): MintAndTransferCall__Outputs {
    return new MintAndTransferCall__Outputs(this);
  }
}

export class MintAndTransferCall__Inputs {
  _call: MintAndTransferCall;

  constructor(call: MintAndTransferCall) {
    this._call = call;
  }

  get data(): MintAndTransferCallDataStruct {
    return this._call.inputValues[0].value.toTuple() as MintAndTransferCallDataStruct;
  }

  get to(): Address {
    return this._call.inputValues[1].value.toAddress();
  }
}

export class MintAndTransferCall__Outputs {
  _call: MintAndTransferCall;

  constructor(call: MintAndTransferCall) {
    this._call = call;
  }
}

export class MintAndTransferCallDataStruct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get uri(): string {
    return this[1].toString();
  }

  get creators(): Array<MintAndTransferCallDataCreatorsStruct> {
    return this[2].toTupleArray<MintAndTransferCallDataCreatorsStruct>();
  }

  get royalties(): Array<MintAndTransferCallDataRoyaltiesStruct> {
    return this[3].toTupleArray<MintAndTransferCallDataRoyaltiesStruct>();
  }

  get signatures(): Array<Bytes> {
    return this[4].toBytesArray();
  }
}

export class MintAndTransferCallDataCreatorsStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class MintAndTransferCallDataRoyaltiesStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class TransferFromOrMintCall extends ethereum.Call {
  get inputs(): TransferFromOrMintCall__Inputs {
    return new TransferFromOrMintCall__Inputs(this);
  }

  get outputs(): TransferFromOrMintCall__Outputs {
    return new TransferFromOrMintCall__Outputs(this);
  }
}

export class TransferFromOrMintCall__Inputs {
  _call: TransferFromOrMintCall;

  constructor(call: TransferFromOrMintCall) {
    this._call = call;
  }

  get _data(): TransferFromOrMintCall_dataStruct {
    return this._call.inputValues[0].value.toTuple() as TransferFromOrMintCall_dataStruct;
  }

  get _from(): Address {
    return this._call.inputValues[1].value.toAddress();
  }

  get _to(): Address {
    return this._call.inputValues[2].value.toAddress();
  }
}

export class TransferFromOrMintCall__Outputs {
  _call: TransferFromOrMintCall;

  constructor(call: TransferFromOrMintCall) {
    this._call = call;
  }
}

export class TransferFromOrMintCall_dataStruct extends ethereum.Tuple {
  get tokenId(): BigInt {
    return this[0].toBigInt();
  }

  get uri(): string {
    return this[1].toString();
  }

  get creators(): Array<TransferFromOrMintCall_dataCreatorsStruct> {
    return this[2].toTupleArray<TransferFromOrMintCall_dataCreatorsStruct>();
  }

  get royalties(): Array<TransferFromOrMintCall_dataRoyaltiesStruct> {
    return this[3].toTupleArray<TransferFromOrMintCall_dataRoyaltiesStruct>();
  }

  get signatures(): Array<Bytes> {
    return this[4].toBytesArray();
  }
}

export class TransferFromOrMintCall_dataCreatorsStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class TransferFromOrMintCall_dataRoyaltiesStruct extends ethereum.Tuple {
  get account(): Address {
    return this[0].toAddress();
  }

  get value(): BigInt {
    return this[1].toBigInt();
  }
}

export class SetTicketForBidCall extends ethereum.Call {
  get inputs(): SetTicketForBidCall__Inputs {
    return new SetTicketForBidCall__Inputs(this);
  }

  get outputs(): SetTicketForBidCall__Outputs {
    return new SetTicketForBidCall__Outputs(this);
  }
}

export class SetTicketForBidCall__Inputs {
  _call: SetTicketForBidCall;

  constructor(call: SetTicketForBidCall) {
    this._call = call;
  }

  get _tokenId(): BigInt {
    return this._call.inputValues[0].value.toBigInt();
  }

  get _value(): BigInt {
    return this._call.inputValues[1].value.toBigInt();
  }
}

export class SetTicketForBidCall__Outputs {
  _call: SetTicketForBidCall;

  constructor(call: SetTicketForBidCall) {
    this._call = call;
  }
}