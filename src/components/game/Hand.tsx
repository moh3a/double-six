import { TouchableOpacity } from "react-native";

import { useBoard, useHand, usePlayer, useRound } from "../../hooks/store";
import Domino from "../Domino";
import View from "../shared/View";

const Hand = () => {
  const { id } = usePlayer();
  const { hand } = useHand();
  const { turn } = useRound();
  const { board } = useBoard();

  const checkIsPlayable = (domino: string) => {
    if (board && turn === id) {
      const frontValue = parseInt(board[0].substring(0, 1));
      const backValue = parseInt(board[board.length - 1].substring(1));
      let dA = parseInt(domino.substring(0, 1));
      let dB = parseInt(domino.substring(1));
      if (
        dA === frontValue ||
        dA === backValue ||
        dB === frontValue ||
        dB === backValue
      ) {
        return -20;
      } else return 0;
    } else return 0;
  };

  const playHandHandler = () => {
    // todo
    console.log("played");
  };

  return (
    <View
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {hand.map((domino, index) => (
        <TouchableOpacity
          key={index}
          onPress={playHandHandler}
          style={{
            marginHorizontal: 3,
            borderRadius: 5,
            transform: [
              {
                translateY: checkIsPlayable(domino),
              },
            ],
          }}
        >
          <Domino
            top={parseInt(domino.substring(0, 1))}
            bottom={parseInt(domino.substring(1))}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Hand;
