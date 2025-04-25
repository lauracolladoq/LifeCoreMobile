import { Tabs } from "expo-router";
import HomeIcon from "../../assets/icons/home-icon";
import ExplorerIcon from "../../assets/icons/explorer-icon";
import ProfileIcon from "../../assets/icons/profile-icon";
import SettingsIcon from "../../assets/icons/settings-icon";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home",
          title: "Home",
          tabBarIcon: () => <HomeIcon />,
        }}
      />
      <Tabs.Screen
        name="explorer"
        options={{
          headerTitle: "Explorer",
          title: "Explorer",
          tabBarIcon: () => <ExplorerIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
          tabBarIcon: () => <ProfileIcon />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          headerTitle: "Settings",
          title: "Settings",
          tabBarIcon: () => <SettingsIcon />,
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
