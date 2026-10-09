import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { DarkTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { BookingProvider } from './src/context/BookingContext';
import { colors } from './src/theme';
import { RootStackParamList, TabParamList } from './src/navigation';

import HomeScreen from './src/screens/HomeScreen';
import AboutScreen from './src/screens/AboutScreen';
import PackagesScreen from './src/screens/PackagesScreen';
import PackageDetailScreen from './src/screens/PackageDetailScreen';
import FeesScreen from './src/screens/FeesScreen';
import ContactScreen from './src/screens/ContactScreen';

const Tabs = createBottomTabNavigator<TabParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const TAB_ICONS: Record<keyof TabParamList, keyof typeof Ionicons.glyphMap> = {
  Home: 'game-controller',
  About: 'people',
  Packages: 'grid',
  Fees: 'calculator',
  Contact: 'chatbubbles',
};

function TabNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.line },
        tabBarActiveTintColor: colors.accent,
        tabBarInactiveTintColor: colors.muted,
        tabBarIcon: ({ color, size }) => (
          <Ionicons name={TAB_ICONS[route.name as keyof TabParamList]} size={size} color={color} />
        ),
      })}
    >
      <Tabs.Screen name="Home" component={HomeScreen} />
      <Tabs.Screen name="About" component={AboutScreen} />
      <Tabs.Screen name="Packages" component={PackagesScreen} />
      <Tabs.Screen name="Fees" component={FeesScreen} options={{ title: 'Calculator' }} />
      <Tabs.Screen name="Contact" component={ContactScreen} />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer
        theme={{
          ...DarkTheme,
          colors: { ...DarkTheme.colors, background: colors.bg, card: colors.card, primary: colors.accent },
        }}
      >
        <StatusBar style="light" />
        <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: colors.bg } }}>
          <Stack.Screen name="Tabs" component={TabNavigator} />
          <Stack.Screen name="PackageDetail" component={PackageDetailScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
}

