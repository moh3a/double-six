import { IDomino } from "../types";

const Dominoes: IDomino[] = [
  { x: 0, y: 0, coordinates: [] },
  { x: 0, y: 1, coordinates: [{ cx: "250", cy: "792" }] },
  {
    x: 0,
    y: 2,
    coordinates: [
      { cx: "110", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 0,
    y: 3,
    coordinates: [
      { cx: "110", cy: "936" },
      { cx: "250", cy: "792" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 0,
    y: 4,
    coordinates: [
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 0,
    y: 5,
    coordinates: [
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 0,
    y: 6,
    coordinates: [
      { cx: "110", cy: "936" },
      { cx: "110", cy: "792" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "792" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 1,
    y: 1,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 1,
    y: 2,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 1,
    y: 3,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "110", cy: "936" },
      { cx: "250", cy: "792" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 1,
    y: 4,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 1,
    y: 5,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 1,
    y: 6,
    coordinates: [
      { cx: "250", cy: "312" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
    ],
  },
  {
    x: 2,
    y: 2,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 2,
    y: 3,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "648" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 2,
    y: 4,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 2,
    y: 5,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 2,
    y: 6,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "390", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
    ],
  },
  {
    x: 3,
    y: 3,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "250", cy: "792" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 3,
    y: 4,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 3,
    y: 5,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
      { cx: "250", cy: "792" },
    ],
  },
  {
    x: 3,
    y: 6,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 4,
    y: 4,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 4,
    y: 5,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "250", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 4,
    y: 6,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 5,
    y: 5,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "250", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 5,
    y: 6,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "250", cy: "312" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
  {
    x: 6,
    y: 6,
    coordinates: [
      { cx: "110", cy: "456" },
      { cx: "390", cy: "456" },
      { cx: "110", cy: "312" },
      { cx: "390", cy: "312" },
      { cx: "110", cy: "168" },
      { cx: "390", cy: "168" },
      { cx: "110", cy: "936" },
      { cx: "110", cy: "648" },
      { cx: "110", cy: "792" },
      { cx: "390", cy: "792" },
      { cx: "390", cy: "936" },
      { cx: "390", cy: "648" },
    ],
  },
];

export default Dominoes;