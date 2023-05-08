import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Dimensions } from "react-native"
import { Screen, Text, AutoImage as Image } from "../../components"
import "firebase/auth"
import { color } from "../../theme"
import { Box, NativeBaseProvider } from "native-base"
import { palette } from "../../theme/palette"

const uadsLogo = require("../../resources/icon.png")

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

  subHeaderStyle: {
    fontFamily: "Bitter",
    fontStyle: "italic",
    fontSize: 24,
    margin: 10,
    marginLeft: 20,
    textAlign: "center",
    textDecorationColor: "rgba(231, 201, 191, 0)",
  },

  headerStyle: {
    fontFamily: "Bitter",
    fontStyle: "italic",
    fontSize: 72,
    margin: 10,
    marginLeft: 20,
    textAlign: "left",
    textDecorationColor: color.palette.brown,
  },

  textBoxHeading1Style: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 32,
    margin: 10,
    marginLeft: 20,
    textAlign: "left",
    textDecorationColor: color.palette.brown,
  },

  bodyTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 16,
    margin: 10,
    marginLeft: 20,
    textAlign: "left",
    textDecorationColor: color.palette.brown,
  },
})

export const AboutScreen = observer(function AboutScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box alignItems="left" justifyContent="center">
          <Text
            preset="header"
            text="University of Auckland"
            style={styles.subHeaderStyle}
          ></Text>
          <Text
            preset="header"
            text="Desert"
            style={styles.headerStyle}
          ></Text>
          <Text
            preset="header"
            text="Society"
            style={styles.headerStyle}
          ></Text>
         </Box>

         <Box alignItems="left" justifyContent="center">

          <Text
            preset="header"
            text="What We Do"
            style={styles.textBoxHeading1Style}
          ></Text>
          <Text
            text="The Dessert Society aims to bring people together through the joy of dessert.

            With many different types of events, from bake-offs to cultural food events, we create an environment that anyone can join and have their sweet tooth fulfilled.
            
            As a member, you gain access to discounts and deals at our sponsored dessert hotspots."
            style={styles.bodyTextStyle}
          ></Text>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
