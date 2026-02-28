import { lazy, Suspense, useCallback, useState } from "react";
import { StyleSheet, RefreshControl, ScrollView } from "react-native";

import { CalorieGauge } from "@/components/CalorieGauge";
import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useDataStore } from "@/store/data.store";
import { ThemedView } from "@/components/themed-view";

import useDelay from "@/hooks/use-delay";
import Loader from "@/components/loader";

const GeneralPage = lazy(() => useDelay(import("../pages/general.page"), 500));
const AddPage = lazy(() => useDelay(import("../pages/add.page"), 500));

export default function HomeScreen() {
  const { current, goal, food } = useDataStore((state) => state);

  const [page, setPage] = useState<number>(0);

  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? "light"];

  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const calculateCurrent = () => {
    //get array of all calories for current new Date
    const currentDay = food.filter(
      (item) => item.date === new Date().toISOString(),
    );

    //get the calories for the current day
    const current = currentDay.reduce((acc, item) => acc + item.calories, 0);

    //sum them up
    return current;
  };

  const getPage = useCallback(() => {
    const pageMap = {
      0: <GeneralPage setPage={setPage} />,
      1: <AddPage setPage={setPage} />,
    };

    return pageMap[page as keyof typeof pageMap];
  }, [page]);

  return (
    <ScrollView
      contentContainerStyle={{ flex: 1, backgroundColor: colors.background }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ThemedView style={styles.gaugeContainer}>
        <CalorieGauge current={calculateCurrent()} goal={goal} />
      </ThemedView>
      <ThemedView
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
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  gaugeContainer: {
    position: "relative",
    alignItems: "center",
    paddingTop: 50,
  },
});
