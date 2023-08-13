import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Dimensions, View } from "react-native"

import { Screen, Text, AutoImage as Image, Button, Icon } from "../../components"
import "firebase/auth"
import { color } from "../../theme"

import { DrawerNavigationProp } from "@react-navigation/drawer"
import { TabNavigatorParamList } from "./types" // Import your type definition

import { Box, NativeBaseProvider } from "native-base"
import { TouchableOpacity } from "react-native-gesture-handler"
import { backgroundColor } from "styled-system"
import { zIndex } from "styled-system"

const uadsLogo = require("../../resources/icon.png")
const menuIcon = require("../../resources/menu-icon.svg")

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

const offersIcon = require("../../resources/tags-solid.svg")

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  logoStyle: {
    alignSelf: "center",
    height: sWidth * 0.65,
    width: sWidth * 0.65,
  },

  smallTextStyle: {
    fontFamily: "Sen-Regular",
    fontSize: 20,
    margin: 10,
    marginHorizontal: 20,
    textAlign: "justify",
    textDecorationColor: color.palette.brown,
  },

  textStyle: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    marginLeft: 20,
    textAlign: "center",
    textDecorationColor: color.palette.brown,
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  menuBtnStyle: {
    padding: 20, // Increase padding to make the button bigger
    position: "absolute", // Position it at the top left corner
    top: 0,
    left: 0,
    zIndex: 10,
  },
})

interface AboutScreenProps {
  navigation: DrawerNavigationProp<TabNavigatorParamList, "about">
}

export const AboutScreen = observer(function AboutScreen({ navigation }: AboutScreenProps) {
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        {/* press me button -> need to put to every of the four screen after styling */}
        <Button
          onPress={() => {
            // Handle press
            navigation.openDrawer()
          }}
          style={styles.menuBtnStyle}
        >
          <Image source={menuIcon} style={styles.iconStyle} />
        </Button>
        <Box alignItems="center" justifyContent="center">
          <Image source={uadsLogo} style={styles.logoStyle} />
          <Text
            preset="header"
            text="University of Auckland Dessert Society"
            style={styles.textStyle}
          ></Text>
          <Text
            text="The Dessert Society aims to bring people together through the joy of dessert. 
          With many different types of events, from bake-offs to cultural food events, we create an 
          environment that anyone can join and have their sweet tooth fulfilled. As a member, you gain 
          access to discounts and deals at our sponsored dessert hotspots. "
            style={styles.smallTextStyle}
          ></Text>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
