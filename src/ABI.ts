export interface ABIIO {
  name: string;
  type: string;
}

export type ABIStateMutability = "pure" | "view" | "nonpayable" | "payable";

export interface ABIFunction {
  type: "function" | "constructor" | "fallback";
  name: string;
  constant: boolean;
  payable: boolean;
  stateMutability: ABIStateMutability;
  inputs: ABIIO[];
  outputs: ABIIO[];
}

export interface ABIEventInput {
  name: string;
  type: string;
  indexed: boolean;
}

export interface ABIEvent {
  type: "event";
  name: string;
  inputs: ABIEventInput[];
  anonymous: boolean;
}

export type ABI = Array<ABIFunction | ABIEvent>;