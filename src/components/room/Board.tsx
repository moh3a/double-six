import React from "react";
import { Text, View } from "../Themed";

const Board = () => {
  return (
    <View
      style={{
        position: "relative",
        top: -10,
        borderColor: "#000",
        borderWidth: 1,
        width: "75%",
        height: "75%",
        backgroundColor: "#333333",
      }}
    >
      <Text style={{ color: "#fff" }}>board</Text>
    </View>
  );
};

export default Board;
