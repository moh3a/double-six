import { useState } from "react";

import Text from "../shared/Text";
import View from "../shared/View";
import { useBoard } from "../../hooks/store";

const Board = () => {
  const { board } = useBoard();
  const [dimensions, setDimentsions] = useState<{
    width?: number;
    height?: number;
  }>();

  return (
    <View
      style={{
        position: "relative",
        top: -10,
        borderColor: "#000",
        borderWidth: 1,
        width: "75%",
        height: "75%",
      }}
      onLayout={(event) =>
        setDimentsions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      {board.map((domino, index) => (
        <Text key={index} style={{ marginHorizontal: 3 }}>
          {domino}
        </Text>
      ))}
    </View>
  );
};

export default Board;
