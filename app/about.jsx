import { subDays } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
// component
import Api from "../component/Api";

const Items = ({ item }) => {
  return (
    <View>
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
    </View>
  );
};

const formatDate = (currentDate) => {
  let [day, month, year] = currentDate.split("/");
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const About = () => {
  const { city, country } = useLocalSearchParams();
  const router = useRouter();
  const [dataFromApi, setDataFromApi] = useState([]);
  const date = new Date();
  const currentDate = date.toLocaleDateString("th-TH");
  const currentDateFormattoApi = formatDate(currentDate);
  const [loading, setLoading] = useState(true);
  const lastDate = subDays(date, 7);
  const lastDateFormattoApi = formatDate(
    lastDate.toLocaleDateString("th-TH", {
      hour12: false,
    }),
  );

  // });

  useEffect(() => {
    const result = async () => {
      try {
        const res = await Api(
          `https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=${lastDateFormattoApi}&end_date=${currentDateFormattoApi}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America%2FNew_York`,
        );
        const responeTime = res.daily.time;
        const responeTemperature_2m_max = res.daily.temperature_2m_max;
        const apiMapping = responeTime.map((value, index) => {
          const obj = {
            responeTime: value,
            responeTemperature_2m_max: responeTemperature_2m_max[index],
            unit: res.daily_units.temperature_2m_max,
          };
          return obj;
        });
        console.log("res", apiMapping);
        setDataFromApi(apiMapping);
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };
    result();
  }, []);
  useEffect(() => {
    console.log("ress", dataFromApi);
  }, [dataFromApi]);
  return loading ? (
    <Text>Loading ......</Text>
  ) : (
    <View style={styles.container}>
      <Text>
        {city} {country}
      </Text>

      <FlatList
        data={dataFromApi}
        renderItem={({ item }) => {
          return <Items onPress={() => {}} item={item} />;
        }}
        keyExtractor={(item) => item.id}
      ></FlatList>

      {/* <Button
        title="Click Home "
        onPress={() => {
          router.back();
        }}
      ></Button> */}
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topic: {
    fontSize: 24,
    marginBottom: 10,
  },
});
