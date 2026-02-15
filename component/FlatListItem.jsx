import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
const FlatListItem = ({ item, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={{ width: 250, height: 150 }}>
      {console.log("onPress", onPress)}
      <View style={styles.container}>
        <View style={styles.rowBetween}>
          <Text style={styles.item}>{item.city}</Text>
          <Text style={styles.temperature_hour}>
            {item.temperature_hour}
            {item.hour_unit}
          </Text>
        </View>

        <Text style={styles.item}>Country {item.country}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default FlatListItem;

const styles = StyleSheet.create({
  container: {
    // display: "flex",
    // flex: 1,
    // padding: 20,
    // borderWidth: 1,
    // marginBottom: 10,
    // borderRadius: 8,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "center",
    // alignContent: "center",
    backgroundColor: "#ffffff",
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 16,
  },
  item: {
    fontSize: 18,
    color: "blue",
  },
  rowBetween: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
  temperature_hour: {
    fontSize: 30,
  },
});
