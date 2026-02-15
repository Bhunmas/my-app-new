import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { useEffect, useState } from "react";
import Api from "./Api";
// UI list of item
const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={{ width: 250, height: 100 }}>
    <Text style={{ fontSize: 20, color: "blue" }}>{item.id}</Text>
    <Text style={{ fontSize: 20, color: "blue" }}>{item.country}</Text>
    <Text style={{ fontSize: 20, color: "blue" }}>{item.province}</Text>
    <Text style={{ fontSize: 20, color: "blue" }}>
      {item.temperature_hour[0]} {item.hour_unit}
    </Text>
  </TouchableOpacity>
);

const FlatListComponent = ({}) => {
  const [dataFromApi, setdataFromApi] = useState([]);

  useEffect(() => {
    const result = async () => {
      // const res = await Api(
      //   "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=America%2FNew_York",
      // );
      // const zone = res.timezone.split("/");
      // const result = {
      //   id: dataFromApi.length + 1,
      //   country: zone[0],
      //   province: zone[1],
      //   // daily: res.time[0],
      //   temperature_hour: res.hourly.temperature_2m,
      //   hour_unit: res.hourly_units.temperature_2m,
      // };
      // setdataFromApi((prev) => [...prev, result]);

      const result = await Promise.all([
        Api(
          "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=America%2FNew_York",
        ),
        Api(
          "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Asia%2FSingapore",
        ),
        Api(
          "https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=2026-02-13&end_date=2026-02-13&daily=weather_code&hourly=temperature_2m&timezone=Asia%2FTokyo",
        ),
      ]);

      const resMap = result.map((item, index) => {
        const zone = item.timezone.split("/");
        const result = {
          id: index + 1,
          country: zone[0],
          province: zone[1],
          // daily: res.time[0],
          temperature_hour: item.hourly.temperature_2m,
          hour_unit: item.hourly_units.temperature_2m,
        };
        return result;
      });
      setdataFromApi(resMap);
    };
    result();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataFromApi}
        renderItem={({ item }) => {
          return <Item onPress={() => {}} item={item} />;
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
};

export default FlatListComponent;

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 500,
  },
});
