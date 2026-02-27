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
  const overflow = useSharedValue(0);

  useEffect(() => {
    const percentage =
      current <= 0 ? Math.min(1 / 1000, 1) : Math.min(current / goal, 1);
    progress.value = withSpring(percentage, {
      stiffness: 100,
    });

    if (current > goal) {
      const overflowPercent = Math.min((current - goal) / goal, 1);
      overflow.value = withSpring(overflowPercent, {
        stiffness: 100,
      });
    } else {
      overflow.value = withSpring(0);
    }
  }, [current, goal, progress, overflow]);

  const animatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - progress.value);
    return {
      strokeDashoffset,
    };
  });

  const overflowAnimatedProps = useAnimatedProps(() => {
    const strokeDashoffset = circumference * (1 - overflow.value);
    return {
      strokeDashoffset,
    };
  });

  const tintColor = useThemeColor({}, "tint");

  const isOverGoal = current > goal;
  const percentage = Math.round((current / goal) * 100);

  const progressColor = useMemo(() => {
    if (current >= goal) return "#77DD77";

    return tintColor;
  }, [tintColor, current, goal]);

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

        {isOverGoal && (
          <AnimatedCircle
            cx={center}
            cy={center}
            r={radius}
            stroke="#ef4444"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animatedProps={overflowAnimatedProps}
            fill="none"
            transform={`rotate(-90 ${center} ${center})`}
          />
        )}
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

      <View
        style={[
          styles.percentageBadge,
          { backgroundColor, borderColor: textColor, borderWidth: 1 },
        ]}
      >
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
