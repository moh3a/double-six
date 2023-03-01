import { useState, useEffect } from "react";

import { setupNewGame } from "../../lib/methods";
import { Text, View } from "../../components/Themed";
import Stack from "./Stack";
import Board from "./Board";
import { IDomino } from "../../types";

const Canvas = () => {
  const [turn, setTurn] = useState<number>(1);
  const [board, setBoard] = useState<IDomino[]>([]);

  const [player1, setPlayer1] = useState<{
    id: number;
    hand: IDomino[];
  }>();
  const [player2, setPlayer2] = useState<{
    id: number;
    hand: IDomino[];
  }>();
  const [player3, setPlayer3] = useState<{
    id: number;
    hand: IDomino[];
  }>();
  const [player4, setPlayer4] = useState<{
    id: number;
    hand: IDomino[];
  }>();

  useEffect(() => {
    const { p1, p2, p3, p4, turn } = setupNewGame();
    setPlayer1(p1);
    setPlayer2(p2);
    setPlayer3(p3);
    setPlayer4(p4);
    setTurn(turn);
  }, []);

  // useEffect(() => {
  //   if (
  //     (player1 && player1.length === 0) ||
  //     (player2 && player2.length === 0) ||
  //     (player3 && player3.length === 0) ||
  //     (player4 && player4.length === 0)
  //   ) {
  //     // todo: game over! the winner is the first ! no passing turns
  //   }
  // }, []);

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
          <Board board={board} />
          <Stack
            side="bottom"
            player={player1}
            setAction={setPlayer1}
            turn={turn}
            setTurn={setTurn}
            board={board}
            setBoard={setBoard}
            first={board[0] ? board[0].x : 6}
            last={board[board.length - 1] ? board[board.length - 1].y : 6}
          />
          <Stack
            side="right"
            player={player2}
            setAction={setPlayer2}
            turn={turn}
            setTurn={setTurn}
            board={board}
            setBoard={setBoard}
            first={board[0] ? board[0].x : 6}
            last={board[board.length - 1] ? board[board.length - 1].y : 6}
          />
          <Stack
            side="top"
            player={player3}
            setAction={setPlayer3}
            turn={turn}
            setTurn={setTurn}
            board={board}
            setBoard={setBoard}
            first={board[0] ? board[0].x : 6}
            last={board[board.length - 1] ? board[board.length - 1].y : 6}
          />
          <Stack
            side="left"
            player={player4}
            setAction={setPlayer4}
            turn={turn}
            setTurn={setTurn}
            board={board}
            setBoard={setBoard}
            first={board[0] ? board[0].x : 6}
            last={board[board.length - 1] ? board[board.length - 1].y : 6}
          />
        </>
      ) : (
        <Text>starting game...</Text>
      )}
    </View>
  );
};

export default Canvas;
