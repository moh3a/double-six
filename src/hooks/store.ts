import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { IGame, ITeam, IBoard, IHand, IRound, IUser } from "../types";
import { arrayRotate } from "../lib/helpers";

interface PlayerStore extends IUser {
  setupUser: (data: IUser) => void;
}

export const useUser = create<PlayerStore>()(
  persist(
    (set, get) => ({
      id: "",
      setupUser(data) {
        set({ ...data });
      },
    }),
    { name: "player", storage: createJSONStorage(() => AsyncStorage) }
  )
);

type MessageType = "error" | "warning" | "success";

export interface MessageStore {
  type?: MessageType;
  text?: string;
  setTimedMessage: (type: MessageType, text: string, duration: number) => void;
  setMessage: (type: MessageType, text: string) => void;
  resetMessage: () => void;
}

export const useMessage = create<MessageStore>()(
  persist(
    (set, get) => ({
      setMessage(type, text) {
        set({ type, text });
      },
      setTimedMessage(type, text, duration) {
        set({ type, text });
        setTimeout(() => {
          set({ type: undefined, text: undefined });
        }, duration);
      },
      resetMessage() {
        set({ type: undefined, text: undefined });
      },
    }),
    { name: "message", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface GameStore extends IGame {
  updateGame: (doc: IGame) => void;
}

export const useGame = create<GameStore>()(
  persist(
    (set, get) => ({
      status: "IDLE",
      admin: "",
      players: [],
      rounds: [],
      teams: [],
      token: "",
      updateGame(doc) {
        set({ ...doc });
      },
    }),
    { name: "game", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface RoundStore extends IRound {
  updateRound: (doc: IRound) => void;
}

export const useRound = create<RoundStore>()(
  persist(
    (set, get) => ({
      gameId: "",
      status: "IDLE",
      turn: "",
      updateRound(doc) {
        set(doc);
      },
    }),
    { name: "round", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface HandStore extends IHand {
  updateHand: (doc: IHand) => void;
}

export const useHand = create<HandStore>()(
  persist(
    (set, get) => ({
      gameId: "",
      hand: [],
      playerId: "",
      roundId: "",
      updateHand(doc) {
        set({ ...doc });
      },
    }),
    { name: "hand", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface BoardStore extends IBoard {
  updateBoard: (doc: IBoard) => void;
}

export const useBoard = create<BoardStore>()(
  persist(
    (set, get) => ({
      board: [],
      gameId: "",
      roundId: "",
      startingPlayer: "",
      updateBoard(doc) {
        set({ ...doc });
      },
    }),
    { name: "board", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface PlayersTurn {
  id: string;
  count: number;
}

export interface TurnsStore {
  players: PlayersTurn[];
  setTurns: (teams: ITeam[], playerId: string) => void;
  setCounts: (counts: PlayersTurn[]) => void;
}

export const useTurns = create<TurnsStore>()(
  persist(
    (set, get) => ({
      players: [],
      setTurns(teams, playerId) {
        let turns = [
          { id: teams[0].players[0], count: 0 },
          { id: teams[1].players[0], count: 0 },
          { id: teams[0].players[1], count: 0 },
          { id: teams[1].players[1], count: 0 },
        ];
        const index = turns.findIndex((p) => p.id === playerId);
        if (index !== -1) turns = arrayRotate(turns, index);
        set({ players: turns });
      },
      setCounts(counts) {
        const newplayers = get().players.map((p) => {
          const pl = counts.find((e) => e.id === p.id);
          if (pl) {
            p.count = pl.count;
            counts = counts.filter((e) => e.id !== pl.id);
          }
          return p;
        });
        set({ players: newplayers });
      },
    }),
    { name: "turns", storage: createJSONStorage(() => AsyncStorage) }
  )
);

export interface TeamStore {
  teams: ITeam[];
  updateTeams: (doc: ITeam[]) => void;
}

export const useTeam = create<TeamStore>()(
  persist(
    (set, get) => ({
      teams: [],
      updateTeams(doc) {
        set({ teams: doc });
      },
    }),
    { name: "team", storage: createJSONStorage(() => AsyncStorage) }
  )
);
