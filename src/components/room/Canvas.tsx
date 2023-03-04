import { useEffect } from "react";

import { Text, View } from "../../components/Themed";
import Stack from "./Stack";
import Board from "./Board";
import { useGame, useRound } from "../../hooks/store";

const Canvas = () => {
  const { setupGame, teams, rounds } = useGame();
  const { setupRound, players, board, status } = useRound();

  useEffect(() => {
    setupGame([
      { id: "moh", hand: [], name: "moh", team: 0 },
      { id: "zara", hand: [], name: "zara", team: 0 },
      { id: "bilel", hand: [], name: "bilel", team: 1 },
      { id: "slut", hand: [], name: "slut", team: 1 },
    ]);
  }, []);

  useEffect(() => {
    if (teams.length === 2) {
      setupRound(teams, rounds);
    }
  }, [teams]);

  return (
    <View
      style={{
        height: "100%",
        width: "100%",
        position: "relative",
        justifyContent: "center",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      {status === "PLAYING" ? (
        <>
          <Board board={board} />
          {players.map((player, i) => (
            <Stack
              key={i}
              side={
                i === 0
                  ? "bottom"
                  : i === 1
                  ? "right"
                  : i === 2
                  ? "top"
                  : "left"
              }
              player={player}
            />
          ))}
        </>
      ) : (
        <Text>starting game...</Text>
      )}
    </View>
  );
};

export default Canvas;
