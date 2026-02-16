// library

import { StyleSheet, View } from "react-native";

// import

import FlatListComponent from "../component/FlatList.jsx";
import Colors from "../constants/theme";
const Home = () => {
  return (
    <View style={[styles.contain]}>
      <FlatListComponent />
      {/* <Text style={{color:theme.color,fontSize:theme.fontsize}}>HomePage</Text>
      <View>
        <Image source={image} style={styles.image}  blurRadius={20} accessibilityLabel='Logo'></Image>
        <Text>Expo Logo Branding </Text>
        <Link style={styles.link} href="./about">Click HomePage</Link>
      </View> */}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  contain: {
    display: "flex",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.backgroundColor,
  },
  image: {
    width: 150,
    height: 150,
  },

  link: {
    marginVertical: 20,
    borderBottomWidth: 5,
  },
});
