import { StyleSheet, View } from "react-native";

import { CalorieGauge } from "@/components/CalorieGauge";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useDataStore } from "@/store/data.store";
import { ThemedView } from "@/components/themed-view";
import { Button } from "@react-navigation/elements";
import { ThemedText } from "@/components/themed-text";
import { useEffect, useState } from "react";

export default function HomeScreen() {
  const { current, goal } = useDataStore((state) => state);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ThemedView style={styles.gaugeContainer}>
        <CalorieGauge current={current} goal={goal} />
      </ThemedView>
      <ThemedView
        style={{
          backgroundColor: colors.tint,
          flex: 1,
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          marginTop: 30,
        }}
      >
        <View
          style={{
            borderBottomColor: colors.background,
            borderBottomWidth: 2,
            padding: 10,
            marginTop: 10,
            marginBottom: 10,
            flexDirection: "row",
            gap: 20,
            justifyContent: "center",
          }}
        >
          <ThemedText
            style={{
              color: colors.background,
              fontSize: 20,
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            {time.toLocaleDateString([], {
              timeZone: "Europe/Moscow",
              weekday: "short",
              month: "short",
              day: "numeric",
            })}
          </ThemedText>
        </View>

        <View></View>

        <View
          style={[styles.buttonContainer, { backgroundColor: colors.tint }]}
        >
          <Button
            style={[
              styles.buttonContainer,
              {
                backgroundColor: "#292929",
                borderColor: colors.tint,
                borderWidth: 2,
              },
            ]}
            color={colors.text}
          >
            +
          </Button>
        </View>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 50,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    fontSize: 100,
    fontWeight: "bold",
    zIndex: 100,
  },
});
