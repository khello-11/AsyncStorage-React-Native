import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
const App = () => {
  const [name, setName] = useState<string>("");

  const save = async () => {
    try {
      await AsyncStorage.setItem("myName", name);
    } catch (error) {
      alert(error);
      setName("")
    }
  };

  const load = async () => {
    try {
      let Name = await AsyncStorage.getItem("myName");
      if (Name !== null) {
        setName(Name);
      }
    } catch (error) {
      alert(error);
    }
  };

  const remove = async () => {
    try {
      await AsyncStorage.removeItem("myName");
    } catch (error) {
      alert(error);
    } finally {
      setName("");
    }
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <View>
      <Image
        source={require("./src/images/Download.jpg")}
        style={{ width: "100%", height: 200, marginTop: 64 }}
        resizeMode="contain"
      />
      <Text style={styles.name}> What's is your name?</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text: string) => setName(text)}
      />
      <Text style={{ height: 30 }}> {name}</Text>

      <TouchableOpacity style={styles.touch} onPress={() => save()}>
        <Text style={{ color: "white" }}> Save My Name! </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.touch} onPress={() => remove()}>
        <Text style={{ color: "white" }}> Remove My Name! </Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: "#fff ",
    alignItems: "center",
  },
  name: {
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#575DD9",
    alignSelf: "stretch",
    margin: 32,
    height: 64,
    borderRadius: 6,
    paddingHorizontal: 16,
    fontSize: 24,
    fontWeight: "300",
  },
  touch: {
    backgroundColor: "#575DD9",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "stretch",
    paddingVertical: 12,
    paddingHorizontal: 32,
    marginTop: 32,
    marginHorizontal: 32,
    borderRadius: 6,
  },
});
