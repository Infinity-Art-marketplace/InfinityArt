import { ModelInit, MutableModel } from "@aws-amplify/datastore";
// @ts-ignore
import { LazyLoading, LazyLoadingDisabled } from "@aws-amplify/datastore";



type EagerUser = {
  readonly account: string;
  readonly username?: string | null;
  readonly image?: string | null;
}

type LazyUser = {
  readonly account: string;
  readonly username?: string | null;
  readonly image?: string | null;
}

export declare type User = LazyLoading extends LazyLoadingDisabled ? EagerUser : LazyUser

export declare const User: (new (init: ModelInit<User>) => User)

type EagerNFT = {
  readonly contract: string;
  readonly image?: string | null;
  readonly name?: string | null;
  readonly collection?: string | null;
  readonly value?: number | null;
}

type LazyNFT = {
  readonly contract: string;
  readonly image?: string | null;
  readonly name?: string | null;
  readonly collection?: string | null;
  readonly value?: number | null;
}

export declare type NFT = LazyLoading extends LazyLoadingDisabled ? EagerNFT : LazyNFT

export declare const NFT: (new (init: ModelInit<NFT>) => NFT)

