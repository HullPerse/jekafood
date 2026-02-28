import { StyleSheet, View, FlatList } from "react-native";
import { useState, useMemo } from "react";
import { Calendar, DateData } from "react-native-calendars";

import { ThemedText } from "@/components/themed-text";
import { useDataStore, Food } from "@/store/data.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
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

function FoodItem({ item }: { item: Food }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderBottomColor: colors.text,
        borderBottomWidth: 1,
        padding: 12,
        gap: 12,
      }}
    >
      <MaterialIcons
        name={getIconForType(item.type)}
        size={24}
        color={colors.text}
      />
      <View style={{ flex: 1 }}>
        <ThemedText
          style={{
            color: colors.text,
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          {item.type}
        </ThemedText>
      </View>
      <ThemedText
        style={{
          color: colors.text,
          fontSize: 16,
          fontWeight: "bold",
        }}
      >
        {item.calories} ккал
      </ThemedText>
    </View>
  );
}

export default function HistoryScreen() {
  const { food } = useDataStore((state) => state);
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];
  const [selectedDay, setSelectedDay] = useState(
    new Date().toISOString().split("T")[0],
  );
  const [currentMonth, setCurrentMonth] = useState(
    new Date().toISOString().slice(0, 7),
  );

  const markedDates = useMemo(() => {
    const dates: {
      [key: string]: {
        marked?: boolean;
        dotColor?: string;
        disabled?: boolean;
        selected?: boolean;
        selectedColor?: string;
      };
    } = {};
    const datesWithFood = new Set<string>();

    food.forEach((item) => {
      const day = item.date.split("T")[0];
      datesWithFood.add(day);
    });

    const [year, month] = currentMonth.split("-");
    const daysInMonth = new Date(Number(year), Number(month), 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${year}-${month}-${day.toString().padStart(2, "0")}`;
      if (!datesWithFood.has(dateStr)) {
        dates[dateStr] = { disabled: true };
      } else {
        dates[dateStr] = {
          marked: true,
          dotColor: colors.text,
        };
      }
    }

    return dates;
  }, [food, currentMonth, colors.text]);

  const selectedDayFood = useMemo(() => {
    return food.filter((item) => item.date.split("T")[0] === selectedDay);
  }, [food, selectedDay]);

  const totalCalories = selectedDayFood.reduce(
    (acc, item) => acc + item.calories,
    0,
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Calendar
        current={selectedDay}
        onDayPress={(day: DateData) => setSelectedDay(day.dateString)}
        onMonthChange={(month: DateData) =>
          setCurrentMonth(month.dateString.slice(0, 7))
        }
        markedDates={{
          ...markedDates,
          [selectedDay]: {
            ...markedDates[selectedDay],
            selected: true,
            selectedColor: colors.tint,
            disabled: false,
          },
        }}
        disableAllTouchEventsForDisabledDays={true}
        theme={{
          backgroundColor: colors.background,
          calendarBackground: colors.background,
          textSectionTitleColor: colors.text,
          selectedDayBackgroundColor: colors.tint,
          selectedDayTextColor: colors.background,
          todayTextColor: colors.tint,
          dayTextColor: colors.text,
          textDisabledColor: "#444",
          dotColor: colors.text,
          arrowColor: colors.text,
          monthTextColor: colors.text,
          textDayFontWeight: "bold",
          textMonthFontWeight: "bold",
          textDayHeaderFontWeight: "bold",
        }}
        style={styles.calendar}
      />

      <View style={styles.listContainer}>
        <ThemedText style={[styles.dayTitle, { color: colors.text }]}>
          {new Date(selectedDay).toLocaleDateString("ru-RU", {
            timeZone: "Europe/Moscow",
            weekday: "short",
            month: "short",
            day: "numeric",
          })}
        </ThemedText>

        <ThemedText style={[styles.totalCalories, { color: colors.text }]}>
          {totalCalories} ккал
        </ThemedText>

        {selectedDayFood.length === 0 ? (
          <ThemedText
            style={{
              color: colors.text,
              textAlign: "center",
              marginTop: 20,
              opacity: 0.6,
            }}
          >
            Нет данных за этот день
          </ThemedText>
        ) : (
          <FlatList
            data={selectedDayFood}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({ item }) => <FoodItem item={item} />}
            contentContainerStyle={{ paddingBottom: 80 }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calendar: {
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  listContainer: {
    flex: 1,
    padding: 16,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },
  totalCalories: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
});
