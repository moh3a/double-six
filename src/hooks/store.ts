/**
 * UNDER HEAVY DEVELOPMENT
 */

import { create } from "zustand";
import { generateShuffledHands, isDominoPlayable } from "../lib/methods";
import { IDomino } from "../types";

interface ITeam {
  id: 0 | 1;
  players: IPlayer[];
  score: number;
}

export interface IPlayer {
  id: string;
  name: string;
  hand: IDomino[];
  team: 0 | 1;
}

export interface IRound {
  status: "IDLE" | "PLAYING" | "FINISHED";
  turn: IPlayer["id"];
  board: IBoard[];
  players: IPlayer[];
  frontValue: number;
  backValue: number;
  passCount: number;
  score?: number;
  winner?: {
    team: 0 | 1;
    player: IPlayer["id"];
  };
}

export interface IGame {
  rounds: IRound[];
  teams: ITeam[];
}

interface IBoard extends IDomino {
  coordinates: ICoordinates;
}

interface ICoordinates {
  x: number;
  y: number;
}

interface GameStore extends IGame {
  setupGame: (players: IPlayer[]) => void;
  updateGame: (data: IRound) => void;
}

export const useGame = create<GameStore>((set, get) => ({
  rounds: [],
  teams: [],
  setupGame(players) {
    set({
      teams: [
        { id: 0, players: players.filter((p) => p.team === 0), score: 0 },
        { id: 1, players: players.filter((p) => p.team === 1), score: 0 },
      ],
      rounds: [],
    });
  },
  updateGame(data) {
    set({ rounds: [...get().rounds, data] });
  },
}));

interface RoundStore extends IRound {
  setupRound: (teams: ITeam[], rounds: IRound[]) => void;
  updateBoardFront: (data: IBoard) => void;
  updateBoardBack: (data: IBoard) => void;
  changeTurns: (turn: IPlayer["id"], hasPassed: boolean) => void;
  playHand: (player: IPlayer["id"], domino: IDomino) => void;
  gameBlocked: () => void;
  gameEnded: (player: IPlayer) => void;
}

export const useRound = create<RoundStore>((set, get) => ({
  board: [],
  backValue: 0,
  frontValue: 0,
  passCount: 0,
  players: [],
  status: "IDLE",
  turn: "",
  setupRound(teams, rounds) {
    const hands = generateShuffledHands();
    let turn = "";
    if (rounds.length !== 0 && rounds[rounds.length - 1].winner.player) {
      turn = rounds[rounds.length - 1].winner.player;
    }
    teams.forEach((team, i) => {
      if (rounds.length === 0) {
        if (hands[i * 2 + 0].findIndex((e) => e.x === 6 && e.y === 6) !== -1) {
          turn = team.players[0].id;
        } else if (
          hands[i * 2 + 1].findIndex((e) => e.x === 6 && e.y === 6) !== -1
        ) {
          turn = team.players[1].id;
        }
      }
    });
    const players = [
      { ...teams[0].players[0], hand: hands[0] },
      { ...teams[1].players[0], hand: hands[1] },
      { ...teams[0].players[1], hand: hands[2] },
      { ...teams[1].players[1], hand: hands[3] },
    ];
    if (turn) {
      set({
        board: [],
        turn,
        players,
        frontValue: 6,
        backValue: 6,
        status: "PLAYING",
      });
    }
  },
  playHand(player, domino) {
    if (
      get().turn === player &&
      isDominoPlayable(domino, get().frontValue, get().backValue)
    ) {
      if (domino.x === get().frontValue) {
        get().updateBoardFront({
          x: domino.y,
          y: domino.x,
          coordinates: {
            x: 0,
            y: 0,
          },
        });
        set({ frontValue: domino.y });
      } else if (domino.y === get().frontValue) {
        get().updateBoardFront({
          ...domino,
          coordinates: {
            x: 0,
            y: 0,
          },
        });
        set({ frontValue: domino.x });
      } else if (domino.x === get().backValue) {
        get().updateBoardBack({
          ...domino,
          coordinates: {
            x: 0,
            y: 0,
          },
        });
        set({ backValue: domino.y });
      } else if (domino.y === get().backValue) {
        get().updateBoardBack({
          x: domino.y,
          y: domino.x,
          coordinates: {
            x: 0,
            y: 0,
          },
        });
        set({ backValue: domino.x });
      }

      set({
        players: get().players.map((p) => {
          if (p.id === player) {
            p.hand = p.hand.filter(
              (d) => !(d.x === domino.x && d.y === domino.y)
            );
          }
          return p;
        }),
      });

      get().changeTurns(player, false);
    }
  },
  updateBoardBack(data) {
    set({ board: [...get().board, data] });
  },
  updateBoardFront(data) {
    set({ board: [data, ...get().board] });
  },
  changeTurns(turn, hasPassed) {
    if (hasPassed) {
      set({ passCount: get().passCount + 1 });
    } else {
      set({ passCount: 0 });
    }
    if (get().passCount >= 4) {
      get().gameBlocked();
    } else {
      const index = get().players.findIndex((e) => e.id === turn);
      if (index < 3) {
        set({ turn: get().players[index + 1].id });
      } else {
        set({ turn: get().players[0].id });
      }
    }
  },
  gameBlocked() {
    console.log("game blocked");
  }, // todo: who has the least in his hand wins round
  gameEnded(player) {
    console.log(player + " won");
  }, // todo: count the hands to add score
}));

interface BoardStore {
  board: IBoard[];
  frontCoordinates: ICoordinates;
  backCoordinates: ICoordinates;
  direction: "horizontal" | "vertical";
  frontValue: number;
  backValue: number;
  updateBoard: (data: IBoard) => void;
}

export const useBoard = create<BoardStore>((set, get) => ({
  board: [],
  frontValue: 0,
  backValue: 0,
  frontCoordinates: {
    x: 0,
    y: 0,
  },
  backCoordinates: {
    x: 0,
    y: 0,
  },
  direction: "horizontal",
  updateBoard(data) {
    if (isDominoPlayable(data, get().frontValue, get().backValue)) {
      if (data.x === get().frontValue) {
        set({
          board: [
            {
              x: data.y,
              y: data.x,
              coordinates: {
                x: 0,
                y: 0,
              },
            },
            ...get().board,
          ],
          frontValue: data.y,
        });
      } else if (data.y === get().frontValue) {
        set({
          frontValue: data.x,
          board: [
            {
              ...data,
              coordinates: {
                x: 0,
                y: 0,
              },
            },
            ...get().board,
          ],
        });
      } else if (data.x === get().backValue) {
        set({
          backValue: data.y,
          board: [
            ...get().board,
            {
              ...data,
              coordinates: {
                x: 0,
                y: 0,
              },
            },
          ],
        });
      } else if (data.y === get().backValue) {
        set({
          backValue: data.x,
          board: [
            ...get().board,
            {
              x: data.y,
              y: data.x,
              coordinates: {
                x: 0,
                y: 0,
              },
            },
          ],
        });
      }
    }
  },
}));
