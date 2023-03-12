import { IDomino } from "../types";
import Dominoes from "../constants/Dominoes";

export const generateToken = (length: number) => {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
};

export const shuffle = <T>(array: T[]): T[] => {
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
};

export const generateShuffledHands = () => {
  const dominoes = shuffle(Dominoes);
  let dIndex = dominoes.findIndex((d) => d.id === "66");
  const hands: string[][] = [
    dominoes.slice(0, Math.floor(dominoes.length / 4)).map((e) => e.id),
    dominoes
      .slice(Math.floor(dominoes.length / 4), Math.floor(dominoes.length / 2))
      .map((e) => e.id),
    dominoes
      .slice(
        Math.floor(dominoes.length / 2),
        Math.floor((dominoes.length * 3) / 4)
      )
      .map((e) => e.id),
    dominoes.slice(Math.floor((dominoes.length * 3) / 4)).map((e) => e.id),
  ];
  if (dIndex < Math.floor(dominoes.length / 4)) {
    dIndex = 0;
  } else if (
    dIndex >= Math.floor(dominoes.length / 4) &&
    dIndex < Math.floor(dominoes.length / 2)
  ) {
    dIndex = 1;
  } else if (
    dIndex >= Math.floor(dominoes.length / 2) &&
    dIndex < Math.floor((dominoes.length * 3) / 4)
  ) {
    dIndex = 2;
  } else {
    dIndex = 3;
  }
  return { hands, index: dIndex };
};

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

export const arrayRotate = <T>(arr: T[], count: number): T[] => {
  const len = arr.length;
  arr.push(...arr.splice(0, ((-count % len) + len) % len));
  return arr;
};
