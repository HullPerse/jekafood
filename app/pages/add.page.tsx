import { memo, useState } from "react";
import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { Button } from "@react-navigation/elements";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Colors } from "@/constants/theme";
import { Select, SelectItem } from "@/components/select";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Food, useDataStore } from "@/store/data.store";

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
  { label: "Крупы и макароны", icon: "rice-bowl" },
  { label: "Орехи и семена", icon: "grass" },
  { label: "Соусы и специи", icon: "soup-kitchen" },
  { label: "Фастфуд", icon: "fastfood" },
  { label: "Алкоголь", icon: "local-bar" },
];

function AddPage({ setPage }: { setPage: (page: number) => void }) {
  const { setFood, food } = useDataStore((state) => state);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [value, setValue] = useState("100g");
  const [valueInput, setValueInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [selectedType, setSelectedType] = useState(cards[0].label);

  return (
    <View style={styles.container}>
      <View style={styles.closeButtonContainer}>
        <Button
          style={styles.closeButton}
          color={colors.text}
          onPressOut={() => setPage(0)}
        >
          X
        </Button>
      </View>
      <View style={styles.inputRow}>
        <View style={styles.clickerContainer}>
          <TouchableOpacity
            style={styles.clickerButton}
            onPress={() =>
              setValueInput(Math.max(0, Number(valueInput) - 1).toString())
            }
          >
            <Text style={styles.clickerText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.clickerValue}>{valueInput || "0"}</Text>
          <TouchableOpacity
            style={styles.clickerButton}
            onPress={() =>
              setValueInput(((Number(valueInput) || 0) + 1).toString())
            }
          >
            <Text style={styles.clickerText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.inputRow}>
        <TextInput
          placeholder={`Введите ккал за ${value}`}
          keyboardType="number-pad"
          style={styles.textInput}
          value={caloriesInput}
          onChangeText={setCaloriesInput}
        />
        <Select value={value} onValueChange={setValue}>
          <SelectItem label="за 100 грамм" value="100g" />
          <SelectItem label="за 1 штуку" value="1pc" />
        </Select>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.cardsContainer}>
          {cards.map((card) => (
            <TouchableOpacity
              key={card.label}
              style={[
                styles.card,
                selectedType === card.label && styles.cardSelected,
              ]}
              onPress={() => setSelectedType(card.label)}
            >
              <MaterialIcons
                name={card.icon as any}
                size={38}
                color={selectedType === card.label ? "#fff" : "#666"}
              />
              <Text
                style={[
                  styles.cardLabel,
                  selectedType === card.label && styles.cardLabelSelected,
                ]}
              >
                {card.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <View style={styles.addButtonContainer}>
        {(() => {
          const isDisabled = !Number(caloriesInput) || !Number(valueInput);
          return (
            <Button
              style={{
                width: "100%",
                backgroundColor: isDisabled ? "#ccc" : colors.background,
                borderColor: isDisabled ? "#999" : colors.text,
                borderWidth: 2,
                paddingVertical: 15,
                alignItems: "center",
                justifyContent: "center",
              }}
              color={isDisabled ? "#666" : colors.text}
              disabled={isDisabled}
              onPressOut={() => {
                const data: Food = {
                  date: new Date().toISOString(),
                  calories: Number(caloriesInput) * Number(valueInput),
                  type: selectedType,
                };

                setFood([...food, data]);
                setPage(0);
              }}
            >
              {`ДОБАВИТЬ ` + (Number(caloriesInput) * Number(valueInput) || 0)}
            </Button>
          );
        })()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    overflow: "hidden",
    position: "relative",
  },
  scrollView: {
    flex: 1,
    paddingTop: 50,
    borderTopWidth: 2,
    borderTopColor: "#333",
  },
  scrollContent: {
    paddingBottom: 120,
    gap: 20,
  },
  inputRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    width: 300,
    borderBottomColor: "#333",
    borderBottomWidth: 1,
    textAlign: "center",
  },
  clickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
  },
  clickerButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
  },
  clickerText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  clickerValue: {
    fontSize: 24,
    fontWeight: "bold",
    minWidth: 60,
    textAlign: "center",
  },
  cardsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 20,
    flexWrap: "wrap",
    justifyContent: "center",
  },
  closeButtonContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    zIndex: 1000,
  },
  closeButton: {
    width: 60,
    height: 60,
    backgroundColor: "#292929",
    borderColor: "#fff",
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  card: {
    backgroundColor: "#333",
    paddingTop: 10,
    borderRadius: 12,
    alignItems: "center",
    width: 120,
    height: 120,
    borderWidth: 2,
    borderColor: "transparent",
    justifyContent: "center",
  },
  cardSelected: {
    borderColor: "#4CAF50",
    backgroundColor: "#2d4a2d",
  },
  cardLabel: {
    color: "#aaa",
    fontWeight: "600",
    textAlign: "center",
  },
  cardLabelSelected: {
    color: "#4CAF50",
  },
});

export default memo(AddPage);
