import React, { useState } from 'react';
import { Pressable, Text, Modal, View } from 'react-native';
import { Image } from 'expo-image';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { globalStyles } from '../../styles';
import { spacing } from '../../styles/theme';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ModalImgInfo } from '../../pages/modal';
import { useDataContext } from '../../contexts/DataContextProvider';
import { IRenderItem } from '../../types';

const RenderItemComponent: React.FC<IRenderItem> = ({ item, renderHeight }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userSavedImg, setUserSavedImg } = useDataContext();
  const insets = useSafeAreaInsets();

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

  return (
    <View>
      <Modal visible={isModalOpen}>
        <AntDesign
          name="close-circle"
          size={25}
          color="white"
          onPress={() => setIsModalOpen(false)}
          style={[globalStyles.closecircleo, { top: spacing.xl + insets.top }]}
        />
        <ModalImgInfo item={item} />
      </Modal>

      <Pressable
        onPress={() => setIsModalOpen(true)}
        style={globalStyles.pin_container}
      >
        <Pressable onPress={isImgLiked} style={globalStyles.like}>
          {userSavedImg.find((obj) => obj.id === item.item.id) ? (
            <FontAwesome name="heart" size={18} color="#E60023" />
          ) : (
            <FontAwesome name="heart-o" size={18} color="#211922" />
          )}
        </Pressable>
        <Image
          style={[
            globalStyles.pin,
            renderHeight ? { height: renderHeight } : null,
          ]}
          source={{ uri: item.item.urls.small ?? item.item.urls.regular }}
          contentFit="cover"
          cachePolicy="memory-disk"
          transition={150}
        />
        {!!item.item.alt_description && (
          <Text style={globalStyles.alt_description} numberOfLines={2}>
            {item.item.alt_description}
          </Text>
        )}
      </Pressable>
    </View>
  );
};

export const RenderItem = React.memo(RenderItemComponent);
