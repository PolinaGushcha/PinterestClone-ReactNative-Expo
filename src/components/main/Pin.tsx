import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, Modal, View } from 'react-native';
import { globalStyles } from '../../styles';
import { FontAwesome, AntDesign } from '@expo/vector-icons';
import { ModalImgInfo } from '../../pages/modal';
import { useDataContext } from '../../contexts/DataContextProvider';
import { IRenderItem } from '../../types';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const RenderItem: React.FC<IRenderItem> = ({ item, renderHeight }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { userSavedImg, setUserSavedImg } = useDataContext();

  async function setAsyncStorageData() {
    try {
      await AsyncStorage.setItem('userImgData', JSON.stringify(userSavedImg));
    } catch (error) {
      console.log(error);
    }
  }
  async function getAsyncStorageData() {
    try {
      const userGetData = await AsyncStorage.getItem('userImgData');
      if (userGetData !== null) {
        setUserSavedImg(JSON.parse(userGetData));
      } else {
        console.log('you have no data');
      }
    } catch (error) {
      console.log(error);
    }
  }

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

  useEffect(() => {
    getAsyncStorageData();
  }, []);
  useEffect(() => {
    setAsyncStorageData();
  }, [userSavedImg]);

  return (
    <View>
      <Modal visible={isModalOpen}>
        <AntDesign
          name="closecircleo"
          size={25}
          color="white"
          onPress={() => setIsModalOpen(false)}
          style={globalStyles.closecircleo}
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
          source={{ uri: item.item.urls.regular }}
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
