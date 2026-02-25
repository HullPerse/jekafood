import { ScrollView, StyleSheet, View } from "react-native";

import { ThemedView } from "@/components/themed-view";
import { CalorieGauge } from "@/components/CalorieGauge";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";

export default function HomeScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.gaugeContainer}>
        <CalorieGauge current={30} goal={2000} />
      </View>
      <ThemedView style={styles.titleContainer}>1111</ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    alignItems: "center",
    paddingVertical: 50,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
