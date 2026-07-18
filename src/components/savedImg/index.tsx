import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { useDataContext } from "../../contexts/DataContextProvider";
import { globalStyles, colors, spacing } from "../../styles";
import { FontAwesome } from "@expo/vector-icons";
import { useMemo } from "react";
import { distributeMasonry, MASONRY_COLUMN_WIDTH } from "../../utils/masonry";

export const SavedImg = () => {
  const { userSavedImg, setUserSavedImg } = useDataContext();

  const [leftColumn, rightColumn] = useMemo(
    () => distributeMasonry(userSavedImg ?? []),
    [userSavedImg]
  );

  if (!userSavedImg || userSavedImg.length === 0) {
    return (
      <View style={{ alignItems: "center", paddingTop: spacing.xl * 2, paddingHorizontal: spacing.xl }}>
        <FontAwesome name="heart-o" size={40} color={colors.textMuted} />
        <Text style={{ color: colors.textMuted, marginTop: spacing.md, textAlign: "center" }}>
          Pins you save will show up here
        </Text>
      </View>
    );
  }

  const renderColumn = (column: typeof leftColumn) => (
    <View style={[globalStyles.masonryColumn, { width: MASONRY_COLUMN_WIDTH }]}>
      {column.map(({ item: obj, height }) => (
        <View key={obj.id} style={globalStyles.pin_container}>
          <Pressable
            onPress={() =>
              setUserSavedImg(userSavedImg.filter((el) => el.id !== obj.id))
            }
            style={globalStyles.like}
          >
            <FontAwesome name="heart" size={18} color={colors.red} />
          </Pressable>
          <Image
            style={[globalStyles.pin, { height }]}
            source={{ uri: obj.url }}
          />
          {!!obj.alt_description && (
            <Text style={globalStyles.alt_description} numberOfLines={2}>
              {obj.alt_description}
            </Text>
          )}
        </View>
      ))}
    </View>
  );

  return (
    <ScrollView style={{ marginTop: spacing.md }}>
      <View style={globalStyles.masonryRow}>
        {renderColumn(leftColumn)}
        {renderColumn(rightColumn)}
      </View>
    </ScrollView>
  );
};
