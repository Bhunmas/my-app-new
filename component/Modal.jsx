import { Ionicons } from "@expo/vector-icons";
import {
  BackHandler,
  Button,
  Modal,
  StyleSheet,
  Text,
  View,
} from "react-native";

const ModalComponent = ({ visible, onClose }) => {
  return (
    <Modal
      style={styles.modelcontent}
      visible={visible}
      animationType="fade"
      transparent={true}
    >
      <View style={styles.overlay}>
        <View style={styles.itemCard}>
          <View style={styles.topicBox}>
            <Text style={styles.header}>Menu Bar</Text>
            <Ionicons
              style={[styles.header, { color: "red" }]}
              name="close-outline"
              size={24}
              onPress={onClose}
            />
          </View>
          <View style={styles.modalBox}>
            <Button
              title="exist"
              onPress={() => {
                BackHandler.exitApp();
              }}
            >
              Exist Program
            </Button>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalComponent;

const styles = StyleSheet.create({
  modelcontent: {
    width: "10%",
    height: "10%",
    borderRadius: 12,
    backgroundColor: "rgba(255, 246, 246, 0.5)",
  },
  overlay: {
    backgroundColor: "rgba(0,0,0,0.5)",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: 250,
    padding: 20,
  },
  topicBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "rgba(5, 102, 102, 0.5)",
    // textDecorationLine: "underline",
    // textDecorationColor: "black",
    // textDecorationStyle: "double",
    fontSize: 60,
    width: 250,
    padding: 20,
  },
  itemCard: {
    backgroundColor: "white",
    padding: 12,
    borderRadius: 12,
  },

  header: {
    fontSize: 24,
    fontWeight: "550",
    color: "rgba(4, 104, 104, 0.8)",
  },
});
