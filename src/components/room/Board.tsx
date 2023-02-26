import { useState } from "react";
import { IDomino } from "../../types";
import { Text, View } from "../Themed";

const Board = ({ board }: { board: Omit<IDomino, "coordinates">[] }) => {
  const [dimensions, setDimentsions] = useState<{
    width?: number;
    height?: number;
  }>();

  // todo: draw dominoes

  return (
    <View
      style={{
        position: "relative",
        top: -10,
        borderColor: "#000",
        borderWidth: 1,
        width: "75%",
        height: "75%",
        // backgroundColor: "#333333",
      }}
      onLayout={(event) =>
        setDimentsions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      <Text>{JSON.stringify(board)}</Text>
    </View>
  );
};

export default Board;
