import { useState, useEffect, useCallback } from "react";
import { useIsFocused } from "@react-navigation/native";

export function usePageLoader<T>(fetchData: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const isFocused = useIsFocused();

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const result = await fetchData();
      setData(result);
    } catch (error) {
      console.log("Load error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [fetchData]);

  useEffect(() => {
    if (isFocused) {
      load();
    }
  }, [isFocused, load]);

  const refresh = async () => {
    setRefreshing(true);
    await load();
  };

  return { data, loading, refreshing, refresh };
}