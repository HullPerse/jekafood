import React, { useMemo } from "react";
import { View, Animated, Easing } from "react-native";
import Svg, { Path } from "react-native-svg";

const Loader = ({
  size = 24,
  style,
  color,
}: {
  size?: number;
  style?: any;
  color?: string;
}) => {
  const rotateValue = useMemo(() => new Animated.Value(0), []);

  React.useEffect(() => {
    const animation = Animated.loop(
      Animated.timing(rotateValue, {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
        useNativeDriver: true,
      }),
    );
    animation.start();
    return () => animation.stop();
  }, [rotateValue]);

  const rotate = rotateValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View
      style={{
        width: size,
        height: size,
        justifyContent: "center",
        alignItems: "center",
        ...style,
      }}
    >
      <Animated.View style={{ transform: [{ rotate }] }}>
        <Svg
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <Path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
          <Path d="m3.3 7 8.7 5 8.7-5" />
          <Path d="M12 22V12" />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default Loader;
