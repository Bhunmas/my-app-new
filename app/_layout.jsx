import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ModalComponent from "../component/Modal.jsx";

const Layout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Modal set avaliable display True equal show False disappear */}
      <ModalComponent visible={visible} onClose={() => setVisible(false)} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "white" },
          headerTintColor: "light",
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{
            title: "index",
            animation: "fade_from_bottom",
            headerRight: () => (
              <Ionicons
                name="menu"
                size={24}
                onPress={() => {
                  setVisible(!visible);
                }}
              />
            ),
          }}
        />
        <Stack.Screen name={"about"} options={{ title: "Detail" }} />
      </Stack>
    </>
  );
};

export default Layout;

const styles = StyleSheet.create({
  modelContent: {
    width: "10%",
    height: "10%",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // พื้นหลังมืด
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: 250,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 12,
  },
});
