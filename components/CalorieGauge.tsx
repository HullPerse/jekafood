import { useEffect, useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Circle } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withSpring,
} from "react-native-reanimated";
import { useThemeColor } from "@/hooks/use-theme-color";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CalorieGaugeProps {
  current: number;
  goal: number;
  size?: number;
  strokeWidth?: number;
}

export function CalorieGauge({
  current,
  goal,
  size = 200,
  strokeWidth = 16,
}: CalorieGaugeProps) {
  const backgroundColor = useThemeColor({}, "background");
  const textColor = useThemeColor({}, "text");
  const iconColor = useThemeColor({}, "icon");

  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const center = size / 2;

  const progress = useSharedValue(0);

  useEffect(() => {
    const percentage = Math.min(current / goal, 1);
    progress.value = withSpring(percentage, {
      damping: 15,
      stiffness: 100,
    });
  }, [current, goal, progress]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const tintColor = useThemeColor({}, "tint");

  const remaining = Math.max(goal - current, 0);
  const isAtGoal = current === goal;
  const isOverGoal = current > goal;
  const percentage = Math.round((current / goal) * 100);

  const progressColor = useMemo(() => {
    if (isAtGoal) return "#22c55e";
    if (isOverGoal) return "#ef4444";
    return tintColor;
  }, [isAtGoal, isOverGoal, tintColor]);

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Svg width={size} height={size}>
        <Circle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={"2"}
          fill="none"
          opacity={0.2}
        />

        <AnimatedCircle
          cx={center}
          cy={center}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={circumference}
          animatedProps={animatedProps}
          fill="none"
          transform={`rotate(-90 ${center} ${center})`}
        />
      </Svg>

      <View style={styles.centerContent}>
        <Text
          style={[
            styles.currentValue,
            {
              color: textColor,
              borderBottomColor: textColor,
              borderBottomWidth: 1,
              width: 100,
              textAlign: "center",
            },
          ]}
        >
          {current.toLocaleString()}
        </Text>

        <Text style={[styles.label, { color: iconColor }]}>
          {goal.toLocaleString()} ккал
        </Text>
      </View>

      <View style={[styles.percentageBadge, { backgroundColor }]}>
        <Text style={[styles.percentageText, { color: textColor }]}>
          {percentage}%
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
  },
  centerContent: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  currentValue: {
    fontSize: 36,
    fontWeight: "700",
  },
  label: {
    fontSize: 14,
    marginTop: 2,
  },
  goalContainer: {
    marginTop: 8,
    alignItems: "center",
  },
  goalText: {
    fontSize: 18,
    fontWeight: "600",
  },
  goalLabel: {
    fontSize: 12,
    marginTop: 2,
  },
  percentageBadge: {
    position: "absolute",
    top: 8,
    right: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  percentageText: {
    fontSize: 12,
    fontWeight: "600",
  },
});
