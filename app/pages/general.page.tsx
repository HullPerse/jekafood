import { Button } from "@react-navigation/elements";
import { ThemedText } from "@/components/themed-text";
import { View, StyleSheet } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { memo, useEffect, useState } from "react";
import { useDataStore } from "@/store/data.store";

function GeneralPage({ setPage }: { setPage: (page: number) => void }) {
  const { setFood } = useDataStore((state) => state);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
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

      <Button onPressOut={() => setFood([])}>REMOVE</Button>

      <View></View>

      <View style={[styles.buttonContainer, { backgroundColor: colors.tint }]}>
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
          onPressOut={() => setPage(1)}
        >
          +
        </Button>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
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

export default memo(GeneralPage);
