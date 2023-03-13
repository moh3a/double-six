import { TouchableOpacity } from "react-native";
import { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";

import Colors from "../../constants/Colors";
import Text from "./Text";

type ThemedProps = {
  children: ReactNode;
  disabled?: boolean;
};
export type ButtonProps = ThemedProps & TouchableOpacity["props"];

const Button = (props: ButtonProps) => {
  return (
    <LinearGradient
      style={{
        borderRadius: 25,
        paddingHorizontal: 15,
        paddingVertical: 2,
      }}
      key={props.testID}
      start={{ x: 0.1, y: 0.9 }}
      colors={
        props.disabled
          ? [Colors.gray, Colors.gray]
          : [Colors.gray, Colors.primary]
      }
    >
      <TouchableOpacity
        disabled={props.disabled}
        style={{
          borderRadius: 25,
          paddingHorizontal: 15,
          paddingVertical: 2,
        }}
        {...props}
      >
        <Text style={{ fontSize: 30, fontWeight: "700", color: Colors.white }}>
          {props.children}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Button;
