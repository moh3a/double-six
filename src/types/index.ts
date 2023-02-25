/**
 * DOMINO RELATED TYPES
 */
export interface IDomino {
  x: number;
  y: number;
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
  Room: undefined;
  Account: undefined;
  Info: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> =
  CompositeScreenProps<
    BottomTabScreenProps<RootTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;
