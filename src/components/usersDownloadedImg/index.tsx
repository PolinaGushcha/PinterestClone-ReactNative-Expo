import { Pressable, Text, View, Image, ScrollView } from "react-native";
import { globalStyles, colors, spacing, shadow } from "../../styles";
import * as ImagePicker from "expo-image-picker";
import { useState, useEffect } from "react";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Crypto from "expo-crypto";

export const UsersDownloadedImg = () => {
  const [image, setImage] = useState<string[]>([]);

  async function setAsyncStorageLocalData() {
    try {
      await AsyncStorage.setItem("userLocalImg", JSON.stringify(image));
    } catch (error) {
      console.log(error);
    }
  }
  async function getAsyncStorageLocalData() {
    try {
      const userGetData = await AsyncStorage.getItem("userLocalImg");
      if (userGetData !== null) {
        JSON.parse(userGetData).length > 0
          ? setImage(JSON.parse(userGetData))
          : JSON.parse(userGetData);
      } else {
        console.log("you have no data");
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAsyncStorageLocalData();
  }, []);
  useEffect(() => {
    setAsyncStorageLocalData();
  }, [image]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage([...image, result.assets[0].uri]);
    }
  };

  return (
    <View style={globalStyles.usersDownloadedImg_container}>
      <Pressable
        onPress={pickImage}
        style={globalStyles.usersDownloadedImg_btn}
      >
        <AntDesign name="plus" size={24} color="black" />
      </Pressable>
      {image && image.length === 0 && (
        <View style={{ alignItems: "center", paddingTop: spacing.xl }}>
          <Text style={{ color: colors.textMuted, textAlign: "center" }}>
            Tap + to add your own pins
          </Text>
        </View>
      )}
      <ScrollView>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        >
          {image &&
            image.map((str) => (
              <View
                key={Crypto.randomUUID()}
                style={{
                  borderRadius: 16,
                  marginBottom: spacing.md,
                  position: "relative",
                  ...shadow.card,
                }}
              >
                <Pressable
                  onPress={() => setImage(image.filter((el) => el !== str))}
                  style={globalStyles.like}
                >
                  <FontAwesome5 name="trash" size={16} color={colors.red} />
                </Pressable>
                <Image
                  source={{ uri: str }}
                  style={globalStyles.usersDownloadedImg}
                />
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};
