import { Tabs } from "expo-router";
import HomeIcon from "../../assets/icons/home-icon";
import ProfileIcon from "../../assets/icons/profile-icon";
import SettingsIcon from "../../assets/icons/settings-icon";
import AddPost from "@/assets/icons/add-post-icon";
import SearchIcon from "@/assets/icons/search-icon";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingTop: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={focused ? "bg-sky-200 p-2 rounded-full" : ""}>
              <HomeIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={focused ? "bg-sky-200 p-2 rounded-full" : ""}>
              <SearchIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="create-post"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={focused ? "bg-sky-200 p-2 rounded-full" : ""}>
              <AddPost />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={focused ? "bg-sky-200 p-2 rounded-full" : ""}>
              <ProfileIcon />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ focused }) => (
            <View className={focused ? "bg-sky-200 p-2 rounded-full" : ""}>
              <SettingsIcon />
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
