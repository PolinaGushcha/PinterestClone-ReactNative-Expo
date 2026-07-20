import React from "react";
import { Keyboard } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { PinterestLayout } from "../../components/main/PinterestLayout";
import SearchContextProvider from "../../contexts/SearchContextProvider";

export const Main: React.FC = () => {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
      <SearchContextProvider>
          <PinterestLayout />
      </SearchContextProvider>
    </SafeAreaView>
  );
};
