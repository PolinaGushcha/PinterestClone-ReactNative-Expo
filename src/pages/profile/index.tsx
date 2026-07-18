import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { SavedImg } from '../../components/savedImg';
import { UsersDownloadedImg } from '../../components/usersDownloadedImg';
import { colors } from '../../styles';

const Tab = createMaterialTopTabNavigator();

export const Profile: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarStyle: {
          paddingTop: 60,
          backgroundColor: colors.background,
          shadowOpacity: 0,
          elevation: 0,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        },
        tabBarIndicatorStyle: {
          backgroundColor: colors.red,
          height: 3,
          borderRadius: 3,
        },
        tabBarActiveTintColor: colors.text,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: { fontWeight: '700', textTransform: 'none' },
        tabBarPressColor: colors.backgroundMuted,
      })}
    >
      <Tab.Screen name="Saved" component={SavedImg} />
      <Tab.Screen name="Created" component={UsersDownloadedImg} />
    </Tab.Navigator>
  );
};
