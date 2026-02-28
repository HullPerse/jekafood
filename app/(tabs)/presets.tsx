import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Modal,
} from "react-native";
import { useState } from "react";

import { ThemedText } from "@/components/themed-text";
import { useDataStore, Preset, Food } from "@/store/data.store";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/constants/theme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Select, SelectItem } from "@/components/select";
import { Button } from "@react-navigation/elements";

const iconOptions = [
  "free-breakfast",
  "restaurant",
  "dinner-dining",
  "cookie",
  "cake",
  "eco",
  "nutrition",
  "set-meal",
  "local-drink",
  "local-cafe",
  "bakery-dining",
  "icecream",
  "fastfood",
  "local-pizza",
  "ramen-dining",
  "brunch-dining",
  "food-bank",
  "kitchen",
  "restaurant-menu",
  "breakfast-dining",
  "lunch-dining",
  "icecream-dining",
  "local-bar",
  "sports-bar",
  "smoking-rooms",
  "no-smoking",
  "smoke-free",
  "pool",
  "fitness-center",
  "sports-football",
  "sports-basketball",
  "sports-soccer",
  "sports-tennis",
  "sports-martial-arts",
  "sports-mma",
  "sports-handball",
  "sports-volleyball",
  "sports-baseball",
  "sports-cricket",
  "sports-rugby",
  "sports-hockey",
  "sports-golf",
  "sports-esports",
  "casino",
  "karaoke",
  "nightlife",
  "museum",
  "theater-comedy",
  "theater-movies",
  "concerts",
  "parks",
  "beach-access",
  "self-improvement",
  "spa",
  "salon",
  "beauty-shop",
  "pharmacy",
  "local-hospital",
  "medical-services",
  "health-and-safety",
  "home",
  "house",
  "apartment",
  "cottage",
  "yard",
  "garden",
  "pets",
  "pest",
  "cleaning-services",
  "local-laundry",
  "local-car-wash",
  "local-gas-station",
  "ev-station",
  "charging-station",
  "local-parking",
  "directions-car",
  "directions-bus",
  "directions-train",
  "directions-bike",
  "flight",
  "hotel",
  "hostel",
  "bed",
  "airline-seat-flat",
  "airline-seat-recline-extra",
  "room-service",
  "airport-shuttle",
  "car-rental",
  "tour",
  "map",
  "flag",
  "place",
  "location-on",
  "my-location",
  "near-me",
  "gps-fixed",
  "compass-calibration",
  "explore",
  "travel",
  "luggage",
  "backpack",
  "briefcase",
  "work",
  "work-outline",
  "business-center",
  "school",
  "library",
  "science",
  "biotech",
  "computer",
  "devices",
  "laptop",
  "phone-android",
  "phone-iphone",
  "tablet",
  "tv",
  "headphones",
  "speaker",
  "music-note",
  "audiotrack",
  "album",
  "queue-music",
  "radio",
  "video-library",
  "movie",
  "live-tv",
  "games",
  "toys",
  "child-care",
  "child-friend",
  "family-restroom",
  "accessible",
  "accessible-forward",
  "group",
  "groups",
  "person",
  "person-outline",
  "face",
  "face-2",
  "face-3",
  "face-4",
  "face-5",
  "face-6",
  "sentiment-satisfied",
  "sentiment-neutral",
  "sentiment-dissatisfied",
  "sentiment-very-satisfied",
  "mood",
  "emoji-emotions",
  "emoji-events",
  "stars",
  "star",
  "star-half",
  "star-outline",
  "grade",
  "workspace-premium",
  "verified",
  "check-circle",
  "check-circle-outline",
  "error",
  "error-outline",
  "warning",
  "info",
  "help",
  "help-outline",
  "policy",
  "security",
  "shield",
  "verified-user",
  "lock",
  "lock-open",
  "vpn-key",
  "key",
  "key-visual",
  "password",
  "visibility",
  "visibility-off",
  "brightness-high",
  "brightness-medium",
  "brightness-low",
  "dark-mode",
  "light-mode",
  "contrast",
  "invert-colors",
  "palette",
  "brush",
  "format-paint",
  "image",
  "photo",
  "photo-library",
  "collections",
  "camera-alt",
  "videocam",
  "movie-creation",
  "music-video",
  "art-track",
  "graphic-eq",
  "equalizer",
  "tune",
  "texture",
  "style",
  "format-shapes",
  "pentagon",
  "hexagon",
  "square",
  "circle",
  "diamond",
  "crop",
  "crop-rotate",
  "transform",
  "zoom-in",
  "zoom-out",
  "focus",
  "center-focus-strong",
  "center-focus-weak",
  "filter-vintage",
  "filter-hdr",
  "filter",
  "blur-on",
  "blur-circular",
  "layers",
  "terrain",
  "landscape",
  "straighten",
  "rotate-right",
  "rotate-left",
  "flip",
  "auto-fix",
  "auto-awesome",
  "auto-graph",
  "analytics",
  "insights",
  "trending-up",
  "trending-down",
  "trending-flat",
  "timeline",
  "leaderboard",
  "notification",
  "notifications",
  "notifications-none",
  "notifications-active",
  "notifications-off",
  "volume-up",
  "volume-off",
  "vibration",
  "wifi",
  "wifi-off",
  "signal-cellular-alt",
  "signal-wifi-off",
  "bluetooth",
  "bluetooth-connected",
  "bluetooth-disabled",
  "cast",
  "cast-connected",
  "dock",
  "device-hub",
  "device-unknown",
  "devices-other",
  "memory",
  "storage",
  "sd-card",
  "usb",
  "battery-full",
  "battery-charging-full",
  "power",
  "power-input",
  "outlet",
  "flash-on",
  "flash-off",
  "flash-auto",
  "bolt",
  "water-drop",
  "opacity",
  "thermostat",
  "favorite",
  "favorite-border",
  "bookmark",
  "bookmark-border",
  "bookmarks",
  "label",
  "label-outline",
  "local-offer",
  "sell",
  "shopping-cart",
  "shopping-cart-outlined",
  "add-shopping-cart",
  "remove-shopping-cart",
  "payment",
  "credit-card",
  "account-balance",
  "account-balance-wallet",
  "money",
  "monetization-on",
  "attach-money",
  "price-change",
  "account-box",
  "person-pin",
  "contact-mail",
  "contact-phone",
  "contacts",
  "contact-emergency",
  "group-add",
  "person-add",
  "person-remove",
  "sms",
  "sms-failed",
  "chat",
  "chat-bubble",
  "chat-bubble-outline",
  "forum",
  "question-answer",
  "guest",
  "share",
  "share-social",
  "mail",
  "mail-outline",
  "inbox",
  "drafts",
  "send",
  "markunread",
  "markunread-mailbox",
  "unarchive",
  "archive",
  "delete",
  "delete-outline",
  "delete-sweep",
  "note-add",
  "create",
  "edit",
  "edit-outline",
  "draw",
  "format-quote",
  "format-list-bulleted",
  "format-list-numbered",
  "format-indent-increase",
  "format-indent-decrease",
  "format-align-left",
  "format-align-center",
  "format-align-right",
  "format-align-justify",
  "format-bold",
  "format-italic",
  "format-underlined",
  "format-strikethrough",
  "format-clear",
  "insert-comment",
  "insert-drive-file",
  "folder",
  "folder-open",
  "folder-special",
  "cloud",
  "cloud-upload",
  "cloud-download",
  "cloud-sync",
  "public",
  "public-off",
];

function PresetCard({
  preset,
  onPress,
  onLongPress,
}: {
  preset: Preset | null;
  onPress: () => void;
  onLongPress?: () => void;
}) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  if (!preset) {
    return (
      <TouchableOpacity style={[styles.card, styles.addCard]} onPress={onPress}>
        <MaterialIcons name="add" size={38} color={colors.text} />
        <ThemedText style={[styles.cardLabel, { color: colors.text }]}>
          Добавить
        </ThemedText>
      </TouchableOpacity>
    );
  }

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      onLongPress={onLongPress}
    >
      <MaterialIcons name={preset.icon as any} size={38} color={colors.text} />
      <ThemedText style={[styles.cardLabel, { color: colors.text }]}>
        {preset.label}
      </ThemedText>
      <ThemedText style={[styles.cardCalories, { color: colors.text }]}>
        {preset.calories} ккал {preset.valueType === "100g" ? "/100г" : "/шт"}
      </ThemedText>
    </TouchableOpacity>
  );
}

export default function PresetsScreen() {
  const { presets, addPreset, removePreset, setFood, food } = useDataStore(
    (state) => state,
  );
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<Preset | null>(null);
  const [amountInput, setAmountInput] = useState("");
  const [labelInput, setLabelInput] = useState("");
  const [caloriesInput, setCaloriesInput] = useState("");
  const [value, setValue] = useState("100g");
  const [selectedIcon, setSelectedIcon] = useState("free-breakfast");

  const handleAddPreset = () => {
    if (!labelInput || !caloriesInput) return;

    const newPreset: Preset = {
      id: Date.now().toString(),
      label: labelInput,
      icon: selectedIcon,
      calories: Number(caloriesInput),
      valueType: value,
    };

    addPreset(newPreset);
    setShowModal(false);
    setLabelInput("");
    setCaloriesInput("");
    setSelectedIcon("free-breakfast");
    setValue("100g");
  };

  const handleAddFromPreset = () => {
    if (!selectedPreset || !amountInput) return;

    const multiplier =
      selectedPreset.valueType === "100g"
        ? Number(amountInput) / 100
        : Number(amountInput);
    const totalCalories = Math.round(selectedPreset.calories * multiplier);

    const newFood: Food = {
      date: new Date().toISOString(),
      calories: totalCalories,
      type: selectedPreset.label,
    };

    setFood([...food, newFood]);
    setShowAddModal(false);
    setSelectedPreset(null);
    setAmountInput("");
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={[null, ...presets]}
        keyExtractor={(item) => item?.id ?? "add"}
        numColumns={3}
        renderItem={({ item }) => (
          <PresetCard
            preset={item}
            onPress={() => {
              if (item === null) {
                setShowModal(true);
              } else {
                setSelectedPreset(item);
                setShowAddModal(true);
              }
            }}
            onLongPress={() => {
              if (item) {
                removePreset(item.id);
              }
            }}
          />
        )}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={showModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <ThemedText type="title" style={styles.modalTitle}>
              Новый пресет
            </ThemedText>

            <ThemedText style={{ color: colors.text, marginBottom: 8 }}>
              Выберите иконку
            </ThemedText>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.iconPicker}
            >
              {iconOptions.map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[
                    styles.iconOption,
                    selectedIcon === icon && { backgroundColor: colors.tint },
                  ]}
                  onPress={() => setSelectedIcon(icon)}
                >
                  <MaterialIcons
                    name={icon as any}
                    size={28}
                    color={
                      selectedIcon === icon ? colors.background : colors.text
                    }
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>

            <ThemedText
              style={{ color: colors.text, marginBottom: 8, marginTop: 16 }}
            >
              Название
            </ThemedText>
            <TextInput
              placeholder="Введите название"
              placeholderTextColor="#666"
              value={labelInput}
              onChangeText={setLabelInput}
              style={[
                styles.input,
                { borderColor: colors.text, color: colors.text },
              ]}
            />

            <ThemedText
              style={{ color: colors.text, marginBottom: 8, marginTop: 16 }}
            >
              Калории
            </ThemedText>
            <View style={styles.inputRow}>
              <TextInput
                placeholder={`Введите ккал за ${value === "100g" ? "100 грамм" : "1 штуку"}`}
                placeholderTextColor="#666"
                keyboardType="number-pad"
                style={[
                  styles.input,
                  styles.caloriesInput,
                  { borderColor: colors.text, color: colors.text },
                ]}
                value={caloriesInput}
                onChangeText={setCaloriesInput}
              />
              <Select value={value} onValueChange={setValue}>
                <SelectItem label="за 100 грамм" value="100g" />
                <SelectItem label="за 1 штуку" value="1pc" />
              </Select>
            </View>

            <View style={styles.modalButtons}>
              <Button
                style={[styles.modalButton, { backgroundColor: "#444" }]}
                color="#fff"
                onPressOut={() => setShowModal(false)}
              >
                Отмена
              </Button>
              <Button
                style={[styles.modalButton, { backgroundColor: colors.tint }]}
                color={colors.background}
                onPressOut={handleAddPreset}
                disabled={!labelInput || !caloriesInput}
              >
                Добавить
              </Button>
            </View>
          </View>
        </View>
      </Modal>

      <Modal
        visible={showAddModal}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowAddModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              { backgroundColor: colors.background },
            ]}
          >
            <View style={styles.modalHeader}>
              <ThemedText type="title" style={styles.modalTitle}>
                {selectedPreset?.label}
              </ThemedText>
              <TouchableOpacity
                onPress={() => {
                  if (selectedPreset) {
                    removePreset(selectedPreset.id);
                    setShowAddModal(false);
                    setSelectedPreset(null);
                    setAmountInput("");
                  }
                }}
                style={styles.deleteButton}
              >
                <MaterialIcons name="delete" size={28} color="#ff4444" />
              </TouchableOpacity>
            </View>

            {selectedPreset && (
              <ThemedText
                style={{
                  color: colors.text,
                  textAlign: "center",
                  marginBottom: 16,
                }}
              >
                {selectedPreset.calories} ккал{" "}
                {selectedPreset.valueType === "100g" ? "за 100г" : "за 1 шт"}
              </ThemedText>
            )}

            <ThemedText style={{ color: colors.text, marginBottom: 8 }}>
              Количество (
              {selectedPreset?.valueType === "100g" ? "грамм" : "штук"})
            </ThemedText>
            <TextInput
              placeholder={
                selectedPreset?.valueType === "100g"
                  ? "Введите граммы"
                  : "Введите количество"
              }
              placeholderTextColor="#666"
              keyboardType="number-pad"
              style={[
                styles.input,
                { borderColor: colors.text, color: colors.text },
              ]}
              value={amountInput}
              onChangeText={setAmountInput}
              autoFocus
            />

            {amountInput && selectedPreset && (
              <ThemedText
                style={[styles.calculatedCalories, { color: colors.tint }]}
              >
                ={" "}
                {Math.round(
                  selectedPreset.calories *
                    (selectedPreset.valueType === "100g"
                      ? Number(amountInput) / 100
                      : Number(amountInput)),
                )}{" "}
                ккал
              </ThemedText>
            )}

            <View style={styles.modalButtons}>
              <Button
                style={[styles.modalButton, { backgroundColor: "#444" }]}
                color="#fff"
                onPressOut={() => {
                  setShowAddModal(false);
                  setSelectedPreset(null);
                  setAmountInput("");
                }}
              >
                Отмена
              </Button>
              <Button
                style={[styles.modalButton, { backgroundColor: colors.tint }]}
                color={colors.background}
                onPressOut={handleAddFromPreset}
                disabled={!amountInput}
              >
                Добавить
              </Button>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  card: {
    flex: 1,
    margin: 8,
    aspectRatio: 1,
    backgroundColor: "#222",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    padding: 8,
    maxWidth: "30%",
  },
  addCard: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#444",
    backgroundColor: "transparent",
  },
  cardLabel: {
    fontSize: 12,
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  cardCalories: {
    fontSize: 10,
    marginTop: 2,
    textAlign: "center",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: 20,
    padding: 20,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 20,
  },
  iconPicker: {
    flexGrow: 0,
    maxHeight: 60,
  },
  iconOption: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 8,
    backgroundColor: "#333",
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  caloriesInput: {
    flex: 1,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 24,
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
  },
  calculatedCalories: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  deleteButton: {
    padding: 4,
  },
});
