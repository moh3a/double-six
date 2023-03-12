import { StyleSheet } from "react-native";
import Layout from "../../constants/Layout";
import Domino from "../Domino";
import View from "../shared/View";

type DisplaySide = "top" | "right" | "left";

interface OpponentProps {
  side: DisplaySide;
  count: number;
  playerId?: string;
}

const Opponent = ({ count, side }: OpponentProps) => {
  const getPosition = (side: DisplaySide) => {
    if (side === "top") {
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
      {new Array(count).fill(0).map((_, index) => (
        <View key={index}>
          <Domino top={0} bottom={0} blank={true} width={30} height={60} />
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

export default Opponent;
