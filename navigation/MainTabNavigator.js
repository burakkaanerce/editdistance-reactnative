import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import HomeScreen from "../screens/HomeScreen";
import DFinderScreen from "../screens/DFinderScreen";
import SCheckerScreen from "../screens/SCheckerScreen";

const HomeStack = createStackNavigator({
  Home: HomeScreen
});

HomeStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-information-circle${focused ? "" : "-outline"}`
          : "md-information-circle"
      }
    />
  )
};

const DFinderStack = createStackNavigator({
  DFinder: DFinderScreen
});

DFinderStack.navigationOptions = {
  tabBarLabel: "Distance Finder",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-calculator" : "md-calculator"}
    />
  )
};

const SCheckerStack = createStackNavigator({
  SChecker: SCheckerScreen
});

SCheckerStack.navigationOptions = {
  tabBarLabel: "Spell Checker",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-search" : "md-search"}
    />
  )
};

export default createBottomTabNavigator({
  HomeStack,
  DFinderStack,
  SCheckerStack
});
