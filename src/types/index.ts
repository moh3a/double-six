/**
 * DOMINO RELATED TYPES
 */
export interface IDomino {
  x: number;
  y: number;
}

export interface IDominoBlock extends IDomino {
  id: string;
  coordinates: { cx: string; cy: string }[];
}

export interface DominoProps {
  top: number;
  bottom: number;
  rotation?: number;
  height?: number;
  width?: number;
  backgroundColor?: string;
  color?: string;
  blank?: boolean;
}

/**
 * GAME RELATED TYPES
 */
export interface IUser {
  id: string;
  name?: string;
  email?: string;
  phoneNumber?: string;
  photoURL?: string;
}

export interface IGame {
  status: "IDLE" | "PLAYING" | "FINISHED";
  admin?: string;
  token?: string;
  players?: string[];
  teams?: string[];
  rounds?: any[];
}

export interface ITeam {
  gameId: string;
  players: string[];
}

export interface IRound {
  gameId: string;
  turn: string;
  status: "IDLE" | "PLAYING" | "FINISHED";
}

export interface IHand {
  gameId: string;
  roundId: string;
  playerId: string;
  hand: string[];
}

export interface IBoard {
  gameId: string;
  roundId: string;
  startingPlayer?: string;
  board: string[];
}

/**
 * GLOBAL REACT NATIVE NAVIGATION TYPES
 */
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  NotFound: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootTabParamList = {
  Home: undefined;
  Server: undefined;
  Join: undefined;
  Room: undefined;
  Account: undefined;
  Info: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
