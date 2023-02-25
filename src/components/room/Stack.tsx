import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import { IDomino } from "../../types";
import Domino from "../Domino";
import { View } from "../Themed";

const Stack = ({
  dominoes,
  side,
}: {
  side: "top" | "right" | "left" | "bottom";
  dominoes: Omit<IDomino, "coordinates">[];
}) => {
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
      {dominoes.map((d, i) => (
        <View key={i} style={{ marginHorizontal: 3 }}>
          <Domino
            blank={side !== "bottom"}
            top={d.x}
            bottom={d.y}
            width={side === "bottom" ? 45 : 30}
            height={side === "bottom" ? 90 : 60}
          />
        </View>
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
