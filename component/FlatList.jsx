import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
// config
import configCountryApi from "../constants/configCountryApi";
import Colors from "../constants/theme";
// service
import Api from "./Api";

// component
import FlatListItem from "./FlatListItem.jsx";

const FlatListComponent = ({}) => {
  const [dataFromApi, setdataFromApi] = useState([]);
  const [pagination, setPagination] = useState(1);
  const endOfRange = 10;
  const [loading, setLoading] = useState(true);
  const date = new Date();
  const currentDate = date.toLocaleDateString("th-TH");
  const router = useRouter();
  const timeTh = date.toLocaleTimeString("th-TH", {
    timeZone: "Asia/Bangkok",
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
  });
  const GetApiFromBack = async (pagination) => {
    const contryPage = configCountryApi.slice(
      pagination,
      pagination + endOfRange,
    );
    console.log("cur", pagination);
    const result = await Promise.all(
      contryPage.map((item) => {
        return Api(
          // `https://archive-api.open-meteo.com/v1/archive?latitude=${item.lat}&longitude=${item.lon}&start_date=${timeSendApi}&end_date=${timeSendApi}&hourly=temperature_2m&current_weather=true&timezone=auto`,

          `https://api.open-meteo.com/v1/forecast?latitude=${item.lat}&longitude=${item.lon}&current_weather=true&timezone=auto`,
        );
      }),
    );
    const resMap = result.map((item, index) => {
      const zone = item.timezone.split("/");

      console.log("number + pagination,", index + pagination);
      const result = {
        id: index + pagination,
        continent: zone[0],
        city: zone[1],
        // daily: res.time[0],
        temperature_hour: item.current_weather.temperature,
        hour_unit: item.current_weather_units.temperature,
        latitude: item.latitude,
        longitude: item.longitude,
      };
      return result;
    });
    setdataFromApi(dataFromApi.concat(resMap));
  };
  useEffect(() => {
    try {
      GetApiFromBack(pagination);
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <Text>loading .....</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.topic}>
        Today : {currentDate} {timeTh}
      </Text>

      <FlatList
        data={dataFromApi}
        onEndReached={() => {
          const nextPage = pagination + 1;
          setPagination((prev) => prev + 1);
          console.log("pagination", nextPage);
          GetApiFromBack(nextPage * endOfRange);
        }}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => {
          return (
            <FlatListItem
              onLongPress={() => {
                router.push({
                  pathname: "/detail",
                  params: {
                    city: item.city,
                    continent: item.continent,
                    latitude: item.latitude,
                    longitude: item.longitude,
                    item: JSON.stringify(item),
                  },
                });
              }}
              item={item}
            />
          );
        }}
        keyExtractor={(item) => item.id.toString()}
      ></FlatList>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 500,
  },
  topic: {
    fontSize: 24,
    marginBottom: 10,
    color: Colors.secondary,
    fontWeight: "450",
  },
});

export default FlatListComponent;
