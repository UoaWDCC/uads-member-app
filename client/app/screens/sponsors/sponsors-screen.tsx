import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity, StyleSheet } from "react-native"
import { Button, Screen, SponsorIcon, AutoImage as Image } from "../../components"
import { Text } from "../../components"
import { color, typography } from "../../theme"
import { NativeBaseProvider, Box, FlatList } from "native-base"
import firebase from "firebase"
import axios from "axios"
import { BASE_URL } from "@env"
import { TabNavigatorParamList } from "../../navigators"
import { DrawerNavigationProp } from "@react-navigation/drawer"

const menuIcon = require("../../resources/menu-icon.svg")

interface SponsorsScreenProps {
  navigation: DrawerNavigationProp<TabNavigatorParamList, "events">
}

export const SponsorsScreen = observer(function SponsorsScreen({
  navigation,
}: SponsorsScreenProps) {
  const [sponsors, setSponsors] = useState([])

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
            setSponsors(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Button
          onPress={() => {
            // Handle press
            navigation.openDrawer()
          }}
          style={styles.menuBtnStyle}
        >
          <Image source={menuIcon} style={styles.iconStyle} />
        </Button>
        <Text style={TEXT} text={"Sponsors:"} />
        <Box style={CONTAINER}>
          <FlatList
            data={sponsors}
            numColumns={3}
            keyExtractor={(item, index) => item.uuid}
            renderItem={({ item }) => {
              const { sponsorName, uuid, imageLink } = item
              const prop = {
                name: `${sponsorName}`,
                imgUrl: imageLink,
              }
              return (
                <Box style={SPONSORICON}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("sponsor", item)
                    }}
                  >
                    <SponsorIcon key={uuid} props={prop} />
                  </TouchableOpacity>
                </Box>
              )
            }}
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

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 40,
  color: color.text,
  marginTop: 30,
  marginLeft: 30,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: "#fffffa",
  marginTop: 10,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
}

const SPONSORICON: ViewStyle = {
  flexDirection: "column",
  margin: 1,
}

const styles = StyleSheet.create({
  iconStyle: {
    height: 30,
    width: 30,
  },
  menuBtnStyle: {
    padding: 20, // Increase padding to make the button bigger
    position: "fixed", // Position it at the top left corner
    top: 10,
    left: 10,
    zIndex: 10,
  },
})
