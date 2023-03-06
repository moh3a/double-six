import { useEffect, useState } from "react";
import { useRound } from "../../hooks/store";
import { IDomino } from "../../types";
import Domino from "../Domino";
import { Text, View } from "../Themed";

const a = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, "01", "16", "66", "63", 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
];

const Board = () => {
  const { board } = useRound();
  const [drawing, setDrawing] = useState(board);
  useEffect(() => {
    board.map((d) => {
      if (
        direction === "horizontal" &&
        dimensions.width >= drawingDimentions.height + 61
      ) {
      } else if (
        direction === "vertical" &&
        dimensions.height >= drawingDimentions.height + 61
      ) {
      }
      return { ...d };
    });
  }, []);

  const [dimensions, setDimentsions] = useState<{
    width?: number;
    height?: number;
  }>();
  const [drawingDimentions, setDrawingDimentsions] = useState<{
    width?: number;
    height?: number;
  }>();
  const [direction, setDirection] = useState<"vertical" | "horizontal">(
    "horizontal"
  );

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
      }}
      onLayout={(event) =>
        setDimentsions({
          width: event.nativeEvent.layout.width,
          height: event.nativeEvent.layout.height,
        })
      }
    >
      <Text>
        {board.map((d, i) => (
          <View
            key={i}
            style={{
              transform: [
                {
                  rotate: "0deg",
                },
              ],
            }}
          >
            <Domino top={d.x} bottom={d.y} width={30} height={60} />
          </View>
        ))}
      </Text>
    </View>
  );
};

export default Board;
