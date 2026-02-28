import { useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type SelectProps = {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
};

export function Select({ value, onValueChange, children }: SelectProps) {
  const [visible, setVisible] = useState(false);

  const items = (
    children as React.ReactElement<{ label: string; value: string }>[]
  )
    .filter((child) => child.props?.value)
    .map((child) => child.props);

  const selected = items.find((item) => item.value === value);

  return (
    <View>
      <TouchableOpacity style={styles.trigger} onPress={() => setVisible(true)}>
        <Text style={styles.triggerText}>{selected?.label || "Тип"}</Text>
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
          <View style={styles.content}>
            {items.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.item}
                onPress={() => {
                  onValueChange?.(item.value);
                  setVisible(false);
                }}
              >
                <Text style={styles.itemText}>{item.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

export function SelectItem({ label, value }: { label: string; value: string }) {
  return null;
}

const styles = StyleSheet.create({
  trigger: {
    backgroundColor: "#333",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
    minWidth: 120,
  },
  triggerText: { color: "#fff", fontSize: 16 },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    backgroundColor: "#222",
    borderRadius: 12,
    padding: 8,
    minWidth: 200,
  },
  item: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 8,
  },
  itemText: { color: "#fff", fontSize: 16 },
});
