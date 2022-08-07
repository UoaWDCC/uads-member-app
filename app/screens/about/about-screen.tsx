import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Dimensions } from "react-native"
import { Screen, Text, AutoImage as Image } from "../../components"
import "firebase/auth"
import { color } from "../../theme"
import { Box, NativeBaseProvider } from "native-base"

const uadsLogo = require("../../resources/logo.png")

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

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
})

export const AboutScreen = observer(function AboutScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
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
