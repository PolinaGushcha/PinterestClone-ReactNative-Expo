import React from "react";
import { ActivityIndicator, View } from "react-native";
import { colors, spacing } from "../../styles";

export const Loading: React.FC = () => {
  return (
    <View style={{ paddingVertical: spacing.xl, alignItems: "center" }}>
      <ActivityIndicator size="small" color={colors.red} />
    </View>
  );
};
