import { StyleSheet, View, TextInput } from "react-native";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useDataStore } from "@/store/data.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import { Button } from "@react-navigation/elements";
import { useState } from "react";

export default function SettingsScreen() {
  const { goal, setGoal, setFood } = useDataStore((state) => state);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [goalInput, setGoalInput] = useState(goal.toString());

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Настройки</ThemedText>

      <View style={styles.section}>
        <ThemedText style={{ color: colors.text, marginBottom: 8 }}>
          Дневная норма калорий
        </ThemedText>
        <TextInput
          style={[
            styles.input,
            {
              borderColor: colors.text,
              color: colors.text,
            },
          ]}
          keyboardType="number-pad"
          value={goalInput}
          onChangeText={setGoalInput}
          onEndEditing={() => setGoal(Number(goalInput) || 2000)}
        />
      </View>

      <View style={styles.section}>
        <Button
          style={{
            backgroundColor: "#ff4444",
            paddingVertical: 12,
            paddingHorizontal: 24,
            borderRadius: 8,
          }}
          color="#fff"
          onPressOut={() => {
            setFood([]);
          }}
        >
          Удалить все продукты
        </Button>
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  section: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  input: {
    width: "80%",
    borderWidth: 2,
    borderRadius: 8,
    padding: 12,
    fontSize: 18,
    textAlign: "center",
  },
});
