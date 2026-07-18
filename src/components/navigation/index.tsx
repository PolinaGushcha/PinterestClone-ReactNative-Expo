import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Main, Profile } from "../../pages";
import { colors, shadow } from "../../styles";

const Tab = createBottomTabNavigator();

export const NavigationMenu: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName={"Main"}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          if (route.name === "Main") {
            return focused ? (
              <Ionicons name="home" size={26} color={colors.text} />
            ) : (
              <Ionicons name="home-outline" size={26} color={colors.textMuted} />
            );
          } else if (route.name === "Profile") {
            return focused ? (
              <FontAwesome name="user" size={24} color={colors.text} />
            ) : (
              <FontAwesome name="user-o" size={24} color={colors.textMuted} />
            );
          }
        },
        headerShown: false,
        tabBarActiveTintColor: colors.text,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 80,
          paddingBottom: 17,
          paddingTop: 15,
          backgroundColor: colors.background,
          borderTopWidth: 0,
          ...shadow.bar,
        },
      })}
    >
      <Tab.Screen name={"Main"}>{() => <Main />}</Tab.Screen>
      <Tab.Screen name={"Profile"}>{() => <Profile />}</Tab.Screen>
    </Tab.Navigator>
  );
};
