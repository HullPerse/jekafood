import { memo } from "react";
import { View } from "react-native";
import { Button } from "@react-navigation/elements";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { Colors } from "@/constants/theme";

function AddPage({ setPage }: { setPage: (page: number) => void }) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  return (
    <>
      <View
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}
      >
        <Button
          style={[
            {
              width: 60,
              height: 60,
              backgroundColor: "#292929",
              borderColor: colors.tint,
              borderWidth: 2,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          color={colors.text}
          onPressOut={() => setPage(0)}
        >
          X
        </Button>
      </View>
    </>
  );
}

export default memo(AddPage);
