import { useEffect } from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Layout from "../../constants/Layout";
import Domino from "../Domino";
import { Text, View } from "../Themed";
import { isDominoPlayable } from "../../lib/methods";
import { IPlayer, useRound } from "../../hooks/store";

interface StackProps {
  side: "top" | "right" | "left" | "bottom";
  player: IPlayer;
}

const Stack = ({ player, side }: StackProps) => {
  const { backValue, frontValue, turn, playHand, changeTurns } = useRound();

  // check if there are no play in the player's hand
  // if not, then immediatly pass
  useEffect(() => {
    const play = player.hand.findIndex((e) =>
      isDominoPlayable(e, frontValue, backValue)
    );
    if (play === -1) {
      changeTurns(turn, true);
    }
  }, []); // todo: fix change turns if no play available

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
      <Text style={{ color: player.id === turn ? "#f00" : "" }}>
        {player.name}
      </Text>
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
                  isDominoPlayable(d, frontValue, backValue)
                    ? -20
                    : 0,
              },
            ],
          }}
          onPress={() => playHand(player.id, d)}
        >
          <Domino
            // blank={player.id !== turn} // todo: change to only see the POV player
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
