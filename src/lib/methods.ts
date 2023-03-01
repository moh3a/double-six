import Dominoes from "../constants/Dominoes";
import { IDomino } from "../types";

export function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,
    randomIndex: number;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

export const isDominoPlayable = (
  domino: IDomino,
  first: number,
  last: number
) => {
  if (
    domino.x === first ||
    domino.y === first ||
    domino.x === last ||
    domino.y === last
  ) {
    return true;
  } else {
    return false;
  }
};

export const addToBoard = (
  board: IDomino[],
  domino: IDomino,
  first: number,
  last: number
) => {
  let newb = board;
  if (domino.x === first) {
    newb.unshift({ x: domino.y, y: domino.x });
  } else if (domino.y === first) {
    newb.unshift(domino);
  } else if (domino.x === last) {
    newb.push(domino);
  } else if (domino.y === last) {
    newb.push({ x: domino.y, y: domino.x });
  }
  return newb;
};

export const setupNewGame = () => {
  const dominoes = shuffle(Dominoes);
  const p1 = {
    id: 1,
    hand: dominoes.slice(0, Math.floor(dominoes.length / 4)).map((e) => {
      return { x: e.x, y: e.y };
    }),
  };
  const p2 = {
    id: 2,
    hand: dominoes
      .slice(Math.floor(dominoes.length / 4), Math.floor(dominoes.length / 2))
      .map((e) => {
        return { x: e.x, y: e.y };
      }),
  };
  const p3 = {
    id: 3,
    hand: dominoes
      .slice(
        Math.floor(dominoes.length / 2),
        Math.floor((dominoes.length * 3) / 4)
      )
      .map((e) => {
        return { x: e.x, y: e.y };
      }),
  };
  const p4 = {
    id: 4,
    hand: dominoes.slice(Math.floor((dominoes.length * 3) / 4)).map((e) => {
      return { x: e.x, y: e.y };
    }),
  };

  let turn: number;
  const index = dominoes.findIndex((e) => e.x === 6 && e.y === 6);
  if (index < Math.floor(dominoes.length / 4)) {
    turn = 1;
  } else if (
    index >= Math.floor(dominoes.length / 4) &&
    index < Math.floor(dominoes.length / 2)
  ) {
    turn = 2;
  } else if (
    index >= Math.floor(dominoes.length / 2) &&
    index < Math.floor((dominoes.length * 3) / 4)
  ) {
    turn = 3;
  } else if (
    index >= Math.floor((dominoes.length * 3) / 4) &&
    index < dominoes.length
  ) {
    turn = 4;
  }
  return {
    p1,
    p2,
    p3,
    p4,
    turn,
  };
};

export const generateShuffledHands = () => {
  const dominoes = shuffle(Dominoes);
  const hands: IDomino[][] = [
    dominoes.slice(0, Math.floor(dominoes.length / 4)).map((e) => {
      return { x: e.x, y: e.y };
    }),
    dominoes
      .slice(Math.floor(dominoes.length / 4), Math.floor(dominoes.length / 2))
      .map((e) => {
        return { x: e.x, y: e.y };
      }),
    dominoes
      .slice(
        Math.floor(dominoes.length / 2),
        Math.floor((dominoes.length * 3) / 4)
      )
      .map((e) => {
        return { x: e.x, y: e.y };
      }),
    dominoes.slice(Math.floor((dominoes.length * 3) / 4)).map((e) => {
      return { x: e.x, y: e.y };
    }),
  ];
  return hands;
};
