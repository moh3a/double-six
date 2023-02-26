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
  domino: Omit<IDomino, "coordinates">,
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
  board: Omit<IDomino, "coordinates">[],
  domino: Omit<IDomino, "coordinates">,
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
  const p1 = dominoes.slice(0, Math.floor(dominoes.length / 4)).map((e) => {
    return { x: e.x, y: e.y };
  });
  const p2 = dominoes
    .slice(Math.floor(dominoes.length / 4), Math.floor(dominoes.length / 2))
    .map((e) => {
      return { x: e.x, y: e.y };
    });
  const p3 = dominoes
    .slice(
      Math.floor(dominoes.length / 2),
      Math.floor((dominoes.length * 3) / 4)
    )
    .map((e) => {
      return { x: e.x, y: e.y };
    });
  const p4 = dominoes.slice(Math.floor((dominoes.length * 3) / 4)).map((e) => {
    return { x: e.x, y: e.y };
  });
  let turn: "top" | "right" | "bottom" | "left" = "bottom";
  const index = dominoes.findIndex((e) => e.x === 6 && e.y === 6);
  if (index < Math.floor(dominoes.length / 4)) {
    turn = "bottom";
  } else if (
    index >= Math.floor(dominoes.length / 4) &&
    index < Math.floor(dominoes.length / 2)
  ) {
    turn = "right";
  } else if (
    index >= Math.floor(dominoes.length / 2) &&
    index < Math.floor((dominoes.length * 3) / 4)
  ) {
    turn = "top";
  } else if (
    index >= Math.floor((dominoes.length * 3) / 4) &&
    index < dominoes.length
  ) {
    turn = "left";
  }
  return {
    p1,
    p2,
    p3,
    p4,
    turn,
  };
};

export const goToNextTurn = (
  turn: "top" | "right" | "bottom" | "left"
): "top" | "right" | "bottom" | "left" => {
  if (turn === "top") {
    return "left";
  } else if (turn === "left") {
    return "bottom";
  } else if (turn === "bottom") {
    return "right";
  } else if (turn === "right") {
    return "top";
  }
};
