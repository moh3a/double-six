import { StyleSheet, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction, useEffect } from "react";

import Layout from "../../constants/Layout";
import { IDomino } from "../../types";
import Domino from "../Domino";
import { View } from "../Themed";
import { addToBoard, goToNextTurn, isDominoPlayable } from "../../lib/methods";

interface StackProps {
  side: "top" | "right" | "left" | "bottom";
  turn: "top" | "right" | "bottom" | "left";
  setTurn: Dispatch<SetStateAction<"top" | "right" | "bottom" | "left">>;
  dominoes: Omit<IDomino, "coordinates">[];
  setAction: Dispatch<SetStateAction<Omit<IDomino, "coordinates">[]>>;
  board: Omit<IDomino, "coordinates">[];
  setBoard: Dispatch<SetStateAction<Omit<IDomino, "coordinates">[]>>;
  first: number;
  last: number;
}

const Stack = ({
  dominoes,
  side,
  setAction,
  setBoard,
  board,
  first,
  last,
  setTurn,
  turn,
}: StackProps) => {
  // check if there are no play in the player's hand
  // if not, then immediatly pass
  useEffect(() => {
    if (
      typeof dominoes.find((e) => isDominoPlayable(e, first, last)) ===
      "undefined"
    ) {
      setTurn(goToNextTurn(turn));
    }
  }, []);

  // style where to put the stack in view
  const getPosition = (side: "top" | "right" | "left" | "bottom") => {
    if (side === "top" || side === "bottom") {
      return 20;
    } else {
      return -(Layout.window.width / 2) + 20;
    }
  };

  // todo: take turns

  return (
    <View
      style={{
        [side]: getPosition(side),
        transform: [
          {
            rotate:
              side === "right" ? "90deg" : side === "left" ? "270deg" : "0deg",
          },
        ],
        ...styles.container,
      }}
    >
      {dominoes.map((d, i) => (
        <TouchableOpacity
          key={i}
          style={{
            marginHorizontal: 3,
            borderRadius: 5,
            borderWidth: isDominoPlayable(d, first, last) ? 1 : 0,
            backgroundColor: isDominoPlayable(d, first, last) ? "" : "#111",
          }}
          onPress={() => {
            setBoard(addToBoard(board, d, first, last));
            setAction(dominoes.filter((e, e_i) => e_i !== i));
            // todo: pass to next player
          }}
        >
          <Domino
            blank={side !== turn} // todo: change to only see the POV player
            top={d.x}
            bottom={d.y}
            width={side === "bottom" ? 45 : 30}
            height={side === "bottom" ? 90 : 60}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    margin: 0,
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});

export default Stack;
