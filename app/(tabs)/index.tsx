import { lazy, Suspense, useCallback, useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { CalorieGauge } from "@/components/CalorieGauge";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useDataStore } from "@/store/data.store";

import useDelay from "@/hooks/use-delay";
import Loader from "@/components/loader";

const GeneralPage = lazy(() => useDelay(import("../pages/general.page"), 500));
const AddPage = lazy(() => useDelay(import("../pages/add.page"), 500));

export default function HomeScreen() {
  const { goal, food } = useDataStore((state) => state);

  const [page, setPage] = useState<number>(0);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    const currentDay = food.filter((item) => item.date.split("T")[0] === today);

    if (currentDay.length > 0) {
      setCurrent(currentDay.reduce((acc, item) => acc + item.calories, 0));
    }
  }, [food]);

  useEffect(() => {
    const calculateCurrent = () => {
      const today = new Date().toISOString().split("T")[0];
      const currentDay = food.filter(
        (item) => item.date.split("T")[0] === today,
      );

      const current = currentDay.reduce((acc, item) => acc + item.calories, 0);

      return current;
    };

    setCurrent(calculateCurrent());
  }, [food]);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const getPage = useCallback(() => {
    const pageMap = {
      0: <GeneralPage setPage={setPage} />,
      1: <AddPage setPage={setPage} />,
    };

    return pageMap[page as keyof typeof pageMap];
  }, [page]);

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <View style={styles.gaugeContainer}>
        <CalorieGauge current={current} goal={goal} />
      </View>
      <View
        style={{
          backgroundColor: colors.tint,
          flex: 1,
          borderTopEndRadius: 40,
          borderTopStartRadius: 40,
          marginTop: 30,
        }}
      >
        <Suspense
          fallback={
            <Loader
              size={256}
              style={{
                width: "100%",
                height: "100%",
              }}
              color={colors.background}
            />
          }
        >
          {getPage()}
        </Suspense>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 50,
  },
});
