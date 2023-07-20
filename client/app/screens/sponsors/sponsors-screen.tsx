import { Box, FlatList, NativeBaseProvider } from "native-base"
import {
  Dimensions,
  Image,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import React, { useEffect, useState } from "react"
import { Screen, SponsorIcon } from "../../components"
import { color, typography } from "../../theme"

import { BASE_URL } from "@env"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text } from "../../components"
import axios from "axios"
import firebase from "firebase"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

export const SponsorsScreen = observer(function SponsorsScreen() {
  const navigation = useNavigation()
  const [sponsors, setSponsors] = useState([])

  const sWidth = Dimensions.get("window").width
  const sHeight = Dimensions.get("window").height

  // Fetch sponsors on mount
  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        axios
          .get(BASE_URL + `/sponsor`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then(({ data }) => {
            data.sort((a, b) => (a.tier > b.tier ? 1 : b.tier > a.tier ? -1 : 0))
            console.log(data)
            setSponsors(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [])

  const renderSponsor = ({ item }) => {
    return (
      <Box style={SPONSORICON}>
        <Box
          style={{
            width: "100%",
            padding: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={{ uri: item.imageLink }}
            style={{
              width: sWidth * 0.85,
              height: sHeight * 0.04871794871,
              resizeMode: "stretch",
            }}
          />
          <Box
            style={{
              position: "absolute",
              top: "50%",
            }}
          >
            <Text
              style={{
                paddingLeft: 10,
              }}
            >
              {item.sponsorName}
            </Text>
          </Box>
          <Box
            style={{
              backgroundColor: color.palette.palePeach,
              position: "absolute",
              zIndex: 1,
              top: "50%",
              right: 40,
              height: 20,
              width: 20,
              borderRadius: "50%",
              justifyContent: "center",
              alignItems: "center",
              transform: [{ translateY: "-50%" }],
            }}
          >
            <Text style={{ fontWeight: "bold", paddingBottom: 1 }}>+</Text>
          </Box>
        </Box>
      </Box>
    )
  }

  // Search box
  const [searchText, setSearchText] = useState("")

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 20,
            paddingHorizontal: 10,
          }}
        >
          <Image
            source={require("../../resources/menu-icon.png")}
            style={{
              width: sWidth * 0.2,
              height: sHeight * 0.04,
              resizeMode: "contain",
            }}
          />
          <Image
            source={require("../../resources/logo.png")}
            style={{
              width: sWidth * 0.3,
              height: sHeight * 0.06,
              resizeMode: "contain",
            }}
          />
        </Box>
        <Box style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Image
            source={require("../../resources/sponsors-header.png")}
            style={{
              width: sWidth * 0.85,
              height: sHeight * 0.2,
              resizeMode: "contain",
            }}
          />
          <Box>
            <TextInput
              placeholder="Search"
              placeholderTextColor={color.palette.darkRed}
              onChangeText={(search) => setSearchText(search)}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: color.palette.twentyFiveFuschia,
                width: sWidth * 0.85,
                height: sHeight * 0.05,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomWidth: 3,
                borderBottomColor: color.palette.darkRed,
                paddingLeft: 10,
              }}
            />

            <Icon
              name="search"
              size={20}
              color={color.palette.darkRed}
              width="fit-content"
              style={{
                position: "absolute",
                zIndex: 1,
                top: "50%",
                right: 5,
                transform: [{ translateY: "-50%" }],
              }}
            />
          </Box>
        </Box>

        <Box style={CONTAINER}>
          <FlatList
            data={sponsors}
            numColumns={1}
            keyExtractor={(item, index) => item.uuid}
            renderItem={renderSponsor}
          />
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  marginTop: 10,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
}

const SPONSORICON: ViewStyle = {
  flexDirection: "column",
  margin: 1,
  justifyContent: "center",
}
