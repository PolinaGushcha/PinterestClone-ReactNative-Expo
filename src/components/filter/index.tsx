import React, { useState } from "react";
import { TextInput, View } from "react-native";
import { globalStyles } from "../../styles";
import { FontAwesome } from "@expo/vector-icons";
import { useSearchContext } from "../../contexts/SearchContextProvider";

export function FilterItem() {
  const { setUserSearchQuery } = useSearchContext();
  const [loop, setLoop] = useState(false);
  const [text, setText] = useState("");

  return (
    <View style={globalStyles.filter_container}>
      <FontAwesome
        style={!loop ? globalStyles.search : { display: "none" }}
        name="search"
        size={18}
        color="#8E8E93"
      />
      <TextInput
        style={globalStyles.filter}
        placeholder="Search"
        placeholderTextColor="#8E8E93"
        onChangeText={setText}
        onFocus={() => setLoop(true)}
        onBlur={() => {
          setLoop(false);
          setUserSearchQuery(text);
        }}
        onSubmitEditing={(el) => setUserSearchQuery(el.nativeEvent.text)}
      />
    </View>
  );
}
