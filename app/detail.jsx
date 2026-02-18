import { subDays } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import Colors from "../constants/theme";
// component
import Api from "../component/Api";

const Items = ({ item }) => {
  return (
    <View>
      <View style={styles.rowBetween}>
        <Text style={styles.item}>{item.id}</Text>
        <Text style={styles.item}>{item.responeTime}</Text>
        <Text style={styles.item}>
          <Text>
            {item.responeTemperature_2m_max}
            {item.unit}
          </Text>
        </Text>
      </View>
    </View>
  );
};
const formatDateShow = (currentDate) => {
  let [year, month, day] = currentDate.split("-");
  console.log("day", day);
  console.log("month", month);
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  return `${day}-${month}-${year}`;
};
const formatDate = (currentDate) => {
  console.log("currentDate", currentDate);
  let [day, month, year] = currentDate.split("/");
  month = month.padStart(2, "0");
  day = day.padStart(2, "0");
  return `${year}-${month}-${day}`;
};
const Detail = () => {
  const { city, continent, latitude, longitude, item } = useLocalSearchParams();
  const router = useRouter();
  const [dataFromApi, setDataFromApi] = useState([]);
  const date = new Date();
  const currentDate = date.toLocaleDateString("th-TH");
  const currentDateFormattoApi = formatDate(currentDate);
  const [loading, setLoading] = useState(true);
  const lastDate = subDays(date, 6);
  const lastDateFormattoApi = formatDate(
    lastDate.toLocaleDateString("th-TH", {
      hour12: false,
    }),
  );
  const beforeDate = subDays(date, 1);
  const beforeDateFormattoApi = formatDate(
    beforeDate.toLocaleDateString("th-TH", {
      hour12: false,
    }),
  );
  console.log("const lastDate = subDays(date, 6);", beforeDateFormattoApi);
  // });

  useEffect(() => {
    const result = async () => {
      console.log("location", latitude);
      try {
        const res = await Api(
          `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${lastDateFormattoApi}&end_date=${beforeDateFormattoApi}&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=America%2FNew_York`,
        );
        const responeTime = res.daily.time;
        const responeTemperature_2m_max = res.daily.temperature_2m_max;
        const apiMapping = responeTime.map((value, index) => {
          const obj = {
            id: responeTime.length + 1 - index,
            responeTime: formatDateShow(value),
            responeTemperature_2m_max: responeTemperature_2m_max[index],
            unit: res.daily_units.temperature_2m_max,
          };
          return obj;
        });

        const parseItem = JSON.parse(item);
        console.log("parse", parseItem);
        apiMapping.push({
          id: 1,
          responeTemperature_2m_max: parseItem.temperature_hour,
          responeTime: currentDate,
          unit: parseItem.hour_unit,
        });

        setDataFromApi(apiMapping.sort((a, b) => a.id - b.id));
      } catch (err) {
        console.error("error", err);
      } finally {
        setLoading(false);
      }
    };
    result();
  }, []);

  return loading ? (
    <Text>Loading ......</Text>
  ) : (
    <View style={styles.container}>
      <Text style={styles.topic}>
        {city} {continent} Last 7 Day Weather
      </Text>

      <FlatList
        data={dataFromApi}
        renderItem={({ item }) => {
          return <Items onPress={() => {}} item={item} />;
        }}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.rowBetween}>
            <Text style={styles.headerTable}>Number</Text>
            <Text style={styles.headerTable}>Date</Text>
            <Text style={styles.headerTable}>Temperature</Text>
          </View>
        }
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

export default Detail;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // width: 400,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColor,
  },
  topic: {
    fontSize: 20,
    margin: 20,
    color: Colors.primary,
  },
  rowBetween: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: Colors.card,
    borderRadius: 12,

    marginBottom: 8,
    paddingLeft: 40,
    paddingRight: 40,
  },
  item: {
    fontSize: 16,
    borderBlockColor: "red",
    borderBlockStartColor: "red",
    color: Colors.text,
    paddingLeft: 20,
    paddingRight: 20,
  },

  headerTable: {
    flexDirection: "row",
    color: Colors.secondary,
    fontSize: 18,
  },
});
