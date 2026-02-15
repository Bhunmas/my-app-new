import { subDays } from "date-fns";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
// component
import Api from "../component/Api";
import FlatListItem from "../component/FlatList";

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
  // const timeSendApi = format(currentDate);
  // const lastWeek = date.toLocaleDateString("th-TH", {
  //   dayPeriod: "short",
  const lastDate = subDays(date, 7);
  const lastDateFormattoApi = formatDate(
    lastDate.toLocaleDateString("th-TH", {
      hour12: false,
    }),
  );

  // });

  console.log("lastDateFormattoApi ", lastDateFormattoApi);
  console.log("lastWeek");
  useEffect(() => {
    const result = async () =>
      await Api(
        `https://archive-api.open-meteo.com/v1/archive?latitude=52.52&longitude=13.41&start_date=${lastDateFormattoApi}&end_date=${currentDateFormattoApi}&daily=weather_code&hourly=temperature_2m&timezone=America%2FNew_York`,
      );
    result();
  }, []);
  return (
    <View style={styles.container}>
      <Text>
        {city} {country}
      </Text>

      <FlatList
        data={dataFromApi}
        renderItem={({ item }) => {
          console.log("items : ", item);
          return <FlatListItem onPress={() => {}} item={item} />;
        }}
        keyExtractor={(item) => item.id.toString()}
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
