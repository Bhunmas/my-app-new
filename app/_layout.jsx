import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
import ModalComponent from "../component/Modal.jsx";
import Colors from "../constants/theme";
const Layout = () => {
  const [visible, setVisible] = useState(false);

  return (
    <>
      {/* Modal set avaliable display True equal show False disappear */}
      <ModalComponent visible={visible} onClose={() => setVisible(false)} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: Colors.primary },
        }}
      >
        <Stack.Screen
          name={"index"}
          options={{
            headerTintColor: Colors.backgroundColor,
            title: "index",
            animation: "fade_from_bottom",
            headerRight: () => (
              <Ionicons
                name="menu"
                color={Colors.backgroundColor}
                size={24}
                onPress={() => {
                  setVisible(!visible);
                }}
              />
            ),
          }}
        />
        <Stack.Screen
          name={"detail"}
          options={{ headerTintColor: Colors.backgroundColor, title: "Detail" }}
        />
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
