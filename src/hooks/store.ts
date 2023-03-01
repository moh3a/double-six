/**
 * UNDER HEAVY DEVELOPMENT
 */

import { create } from "zustand";
import { generateShuffledHands } from "../lib/methods";
import { IDomino } from "../types";

interface IGame {
  rounds: IRound[];
  teams: {
    id: string;
    players: IPlayer[];
    score: number;
  }[];
}

interface GameStore extends IGame {
  setupGame: (players: IPlayer[]) => void;
  updateGame: (data: IRound) => void;
}

export const useGame = create<GameStore>((set, get) => ({
  rounds: [],
  teams: [],
  setupGame(players) {}, // todo: setup the teams
  updateGame(data) {}, // todo: update the score after a round finishes
}));

interface IPlayer {
  id: string;
  name: string;
  hand: IDomino[];
  team: 0 | 1;
}

interface IRound {
  status: "IDLE" | "PLAYING" | "FINISHED";
  turn: IPlayer["id"];
  board: IDomino[];
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

interface RoundStore extends IRound {
  setupRound: () => void;
  updateBoardFront: (data: IDomino) => void;
  updateBoardBack: (data: IDomino) => void;
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
  setupRound() {
    const hands = generateShuffledHands();
    const { teams } = useGame();
    let turn = "";
    const players = teams
      .map((team, i) => {
        if (hands[i * 2 + 0].findIndex((e) => e.x === 6 && e.y === 6) !== -1) {
          turn = team.players[0].id;
        } else if (
          hands[i * 2 + 1].findIndex((e) => e.x === 6 && e.y === 6) !== -1
        ) {
          turn = team.players[1].id;
        }
        return [
          {
            ...team.players[0],
            hand: hands[i * 2 + 0],
          },
          {
            ...team.players[1],
            hand: hands[i * 2 + 1],
          },
        ];
      })
      .flat();
    if (turn) {
      set({
        turn,
        players,
        frontValue: 6,
        backValue: 6,
        status: "PLAYING",
      });
    }
  },
  playHand(player, domino) {},
  updateBoardBack(data) {},
  updateBoardFront(data) {},
  changeTurns(turn, hasPassed) {
    if (hasPassed) {
      set({ passCount: get().passCount + 1 });
    } else {
      set({ passCount: 0 });
    }
  },
  gameBlocked() {}, // todo: who has the least in his hand wins round
  gameEnded(player) {}, // todo: count the hands to add score
}));

// interface BoardStore {
//   board: IDomino[];
//   updateBoardFront: (data: IDomino) => void;
//   updateBoardBack: (data: IDomino) => void;
// }

// export const useBoard = create<BoardStore>((set, get) => ({
//   board: [],
//   updateBoardBack: (data) => get().board.push(data),
//   updateBoardFront: (data) => get().board.unshift(data),
// }));
