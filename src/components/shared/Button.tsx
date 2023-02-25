import React from "react";
import { TouchableOpacity } from "react-native";
import Colors from "../../constants/Colors";
import { ReactNode } from "react";

import { Text } from "../../components/Themed";

type ThemedProps = {
  children: ReactNode;
};
export type ButtonProps = ThemedProps & TouchableOpacity["props"];

const Button = (props: ButtonProps) => {
  return (
    <TouchableOpacity
      style={{
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 2,
        backgroundColor: Colors.primary,
      }}
      {...props}
    >
      <Text style={{ fontSize: 30, fontWeight: "700", color: Colors.white }}>
        {props.children}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
