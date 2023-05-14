import "firebase/auth"
import { observer } from "mobx-react-lite"
import { Box, NativeBaseProvider } from "native-base"
import React from "react"
import { Dimensions, ImageBackgroundComponent, StyleSheet, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { color } from "../../theme"
import { backgroundColor, backgroundPosition, position } from "styled-system"

const uadsLogo = require("../../resources/logo.png")
const cupcake1 = require("../../resources/cupcake.png")

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
    fontFamily: "Bitter-Bold",
    fontStyle: "italic",
    fontSize: 24,
    margin: 10,
    marginLeft: 20,
    textAlign: "center",
    textDecorationColor: "rgba(231, 201, 191, 0)",
  },

  headerStyle: {
    fontFamily: "Bitter-Bold",
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

  topbox: {
    backgroundImage: `url(${cupcake1})`,
    width: 390,
    height: 356,
    backgroundRepeat:"no-repeat",
    backgroundSize: '508px 425px',
    backgroundPosition: '-10px -52px'
  }
})

export const AboutScreen = observer(function AboutScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box alignItems="left" justifyContent="center" style={styles.topbox}>
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
            style={styles.bodyTextStyle}
          >The Dessert Society aims to bring people together through the joy of dessert. {'\n'}{'\n'}

          With many different types of events, from bake-offs to cultural food events, we create an environment that anyone can join and have their sweet tooth fulfilled. {'\n'}{'\n'}
          
          As a member, you gain access to discounts and deals at our sponsored dessert hotspots.
          </Text>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
