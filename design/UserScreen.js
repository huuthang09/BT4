import React, { useState } from "react";
import {
  Button,
  FlatList,
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getDataRequest } from "./UserActions";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Home() {
  const user = useSelector((state) => state.getUser);
  const dispatch = useDispatch();
  const [visible, setVisible] = useState({
    isView: false,
    image: "https://reactnative.dev/img/tiny_logo.png",
    email:""
  });
  const getData = () => dispatch(getDataRequest());
  const showDialog = (stringAvatar, stringEmail) => {
    setVisible({ 
      isView: !visible.isView,
      image: stringAvatar,
      email: stringEmail
     });
  };
  const styles = StyleSheet.create({
    avatar: {
      width: 65,
      height: 65,
      borderRadius: 65,
    },

    avatarInfo: {
      width: 100,
      height: 100,
      borderRadius: 65,
    },

    container: {
      flexDirection: "column",
    },

    itemContainer: { margin: 10 },

    view: { flexDirection: "row", marginTop: hp("2%") },

    infoContainer: {
      height: hp("25%"),
      backgroundColor: "#F00",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
    },

    txtname: {
      fontSize: 18,
      color: "#F00",
    },

    txtemail: {
      fontSize: 16,
      marginTop: hp("1%"),
    },

    txtinfo: {
      fontSize: 20,
      color:'#FFF'
    },
  });

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Image
          style={styles.avatarInfo}
          source={{ uri: visible.image }}
          resizeMode="contain"
        />

        <Text style={styles.txtinfo}>{visible.email}</Text>
      </View>

      <View style={styles.itemContainer}>
        <Button title="Lấy dữ liệu" onPress={getData} />

        <FlatList
          data={user.data}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => showDialog(item.avatar, item.email)} style={styles.view}>
              <Image
                style={styles.avatar}
                source={{ uri: item.avatar }}
                resizeMode="contain"
              />

              <View style={{ marginLeft: wp("2%") }}>
                <Text style={styles.txtname}>
                  {item.first_name} {item.last_name}
                </Text>
                <Text style={styles.txtemail}>{item.email}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.email}
        />
      </View>
    </View>
  );
}
