import { StyleSheet, TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from "react";

import Layout from "../../constants/Layout";
import { IDomino } from "../../types";
import Domino from "../Domino";
import { View } from "../Themed";
import { addToBoard, isDominoPlayable } from "../../lib/methods";

interface StackProps {
  side: "top" | "right" | "left" | "bottom";
  turn: number;
  setTurn: Dispatch<SetStateAction<number>>;
  player: { id: number; hand: IDomino[] };
  setAction: Dispatch<SetStateAction<{ id: number; hand: IDomino[] }>>;
  board: IDomino[];
  setBoard: Dispatch<SetStateAction<IDomino[]>>;
  first: number;
  last: number;
}

const Stack = ({
  player,
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
  // useEffect(() => {
  //   if (
  //     typeof dominoes.find((e) => isDominoPlayable(e, first, last)) ===
  //     "undefined"
  //   ) {
  // setTurn(turn < 4 ? turn + 1 : 1);
  //   }
  // }, []);

  // style where to put the stack in view
  const getPosition = (side: "top" | "right" | "left" | "bottom") => {
    if (side === "top" || side === "bottom") {
      return 20;
    } else {
      return -(Layout.window.width / 2) + 20;
    }
  };

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
      {player.hand.map((d, i) => (
        <TouchableOpacity
          key={i}
          style={{
            marginHorizontal: 3,
            borderRadius: 5,
            transform: [
              {
                translateY:
                  turn === player.id &&
                  side === "bottom" &&
                  isDominoPlayable(d, first, last)
                    ? -20
                    : 0,
              },
            ],
          }}
          onPress={() => {
            if (turn === player.id && isDominoPlayable(d, first, last)) {
              setBoard(addToBoard(board, d, first, last));
              setAction({
                ...player,
                hand: player.hand.filter((e, e_i) => e_i !== i),
              });
              setTurn(turn < 4 ? turn + 1 : 1);
            }
          }}
        >
          <Domino
            blank={player.id !== turn} // todo: change to only see the POV player
            top={d.x}
            bottom={d.y}
            width={side === "bottom" ? 45 : 30}
            height={side === "bottom" ? 90 : 60}
            backgroundColor={isDominoPlayable(d, first, last) ? "" : "#111"}
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
