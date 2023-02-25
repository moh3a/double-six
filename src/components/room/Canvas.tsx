import { useState, useEffect } from "react";

import { shuffle } from "../../lib/methods";
import { Text, View } from "../../components/Themed";
import Dominoes from "../../constants/Dominoes";
import Stack from "./Stack";
import Board from "./Board";

const Canvas = () => {
  const [player1, setPlayer1] = useState<{ x: number; y: number }[]>();
  const [player2, setPlayer2] = useState<{ x: number; y: number }[]>();
  const [player3, setPlayer3] = useState<{ x: number; y: number }[]>();
  const [player4, setPlayer4] = useState<{ x: number; y: number }[]>();

  useEffect(() => {
    const dominoes = shuffle(Dominoes);
    setPlayer1(
      dominoes.slice(0, Math.floor(dominoes.length / 4)).map((e) => {
        return { x: e.x, y: e.y };
      })
    );
    setPlayer2(
      dominoes
        .slice(Math.floor(dominoes.length / 4), Math.floor(dominoes.length / 2))
        .map((e) => {
          return { x: e.x, y: e.y };
        })
    );
    setPlayer3(
      dominoes
        .slice(
          Math.floor(dominoes.length / 2),
          Math.floor((dominoes.length * 3) / 4)
        )
        .map((e) => {
          return { x: e.x, y: e.y };
        })
    );
    setPlayer4(
      dominoes.slice(Math.floor((dominoes.length * 3) / 4)).map((e) => {
        return { x: e.x, y: e.y };
      })
    );
  }, []);

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
      {player1 && player2 && player3 && player4 ? (
        <>
          <Board />
          <Stack side="bottom" dominoes={player1} />
          <Stack side="right" dominoes={player2} />
          <Stack side="top" dominoes={player3} />
          <Stack side="left" dominoes={player4} />
        </>
      ) : (
        <Text>starting game...</Text>
      )}
    </View>
  );
};

export default Canvas;
