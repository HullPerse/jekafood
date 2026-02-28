import { Button } from "@react-navigation/elements";
import { ThemedText } from "@/components/themed-text";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { memo, useEffect, useState } from "react";
import { useDataStore, Food } from "@/store/data.store";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const cards = [
  { label: "Завтрак", icon: "free-breakfast" },
  { label: "Обед", icon: "restaurant" },
  { label: "Ужин", icon: "dinner-dining" },
  { label: "Перекус", icon: "cookie" },
  { label: "Сладкое", icon: "cake" },
  { label: "Овощи", icon: "eco" },
  { label: "Фрукты", icon: "nutrition" },
  { label: "Мясо", icon: "lunch-dining" },
  { label: "Рыба и морепродукты", icon: "set-meal" },
  { label: "Молочные продукты", icon: "local-drink" },
  { label: "Напитки", icon: "local-cafe" },
  { label: "Хлебобулочные изделия", icon: "bakery-dining" },
];

function getIconForType(type: string) {
  const card = cards.find((c) => c.label === type);
  return (card?.icon as keyof typeof MaterialIcons.glyphMap) ?? "restaurant";
}

function FoodItem({ item, onDelete }: { item: Food; onDelete: () => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: colors.background,
        borderBottomWidth: 1,
        padding: 12,
        gap: 12,
      }}
    >
      <MaterialIcons
        name={getIconForType(item.type)}
        size={24}
        color={colors.background}
      />
      <View style={{ flex: 1 }}>
        <ThemedText
          style={{
            color: colors.background,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {item.type}
        </ThemedText>
      </View>
      <ThemedText
        style={{
          color: colors.background,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {item.calories} ккал
      </ThemedText>
      <TouchableOpacity onPress={onDelete} style={{ padding: 4 }}>
        <MaterialIcons name="delete" size={24} color={colors.background} />
      </TouchableOpacity>
    </View>
  );
}

function GeneralPage({ setPage }: { setPage: (page: number) => void }) {
  const { food, setFood } = useDataStore((state) => state);

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

      <FlatList
        data={food}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <FoodItem
            item={item}
            onDelete={() => {
              const newFood = [...food];
              newFood.splice(index, 1);
              setFood(newFood);
            }}
          />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />

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
          onPressOut={() => setPage(0)}
        >
          -
        </Button>
      </View>

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
