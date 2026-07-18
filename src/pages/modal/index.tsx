import React from "react";
import { Text, View, Image, ScrollView, Pressable } from "react-native";
import { globalStyles } from "../../styles";
import { useDataContext } from "../../contexts/DataContextProvider";
import { FontAwesome } from "@expo/vector-icons";
import { IModalImgInfo } from "../../types";

export const ModalImgInfo: React.FC<IModalImgInfo> = ({ item }) => {
  const { userSavedImg, setUserSavedImg } = useDataContext();
  
  const isImgLiked = () => {
    if (userSavedImg.find((obj) => obj.id === item.item.id)) {
      setUserSavedImg(userSavedImg.filter((obj) => obj.id !== item.item.id));
    } else
      setUserSavedImg((prev) => [
        ...prev,
        {
          id: item.item.id,
          alt_description: item.item.alt_description,
          url: item.item.urls.regular,
          authorsName: item.item.user.name,
          views: item.item.views,
          downloads: item.item.downloads,
          width: item.item.width,
          height: item.item.height,
        },
      ]);
  };

  const isLiked = !!userSavedImg.find((obj) => obj.id === item.item.id);

  return (
    <ScrollView key={item.item.id} style={globalStyles.modal_container}>
      <View style={globalStyles.modalImg_wrapper}>
        <Image
          style={globalStyles.modalImg}
          source={{ uri: item.item.urls.full }}
        />
        <Pressable onPress={isImgLiked} style={globalStyles.like}>
          <FontAwesome
            name={isLiked ? "heart" : "heart-o"}
            size={18}
            color={isLiked ? "#E60023" : "#211922"}
          />
        </Pressable>
      </View>
      <View style={globalStyles.title}>
        <Text style={globalStyles.title_text}>{item.item.alt_description}</Text>
        <View style={globalStyles.authorRow}>
          <View style={globalStyles.authorAvatar}>
            <Text style={globalStyles.authorAvatar_text}>
              {item.item.user.name?.charAt(0)?.toUpperCase()}
            </Text>
          </View>
          <Text style={globalStyles.authorName}>{item.item.user.name}</Text>
        </View>
        <View style={globalStyles.title_description}>
          <View style={globalStyles.statBadge}>
            <Text style={globalStyles.statBadge_text}>
              {item.item.views} views
            </Text>
          </View>
          <View style={globalStyles.statBadge}>
            <Text style={globalStyles.statBadge_text}>
              {item.item.downloads} downloads
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};
