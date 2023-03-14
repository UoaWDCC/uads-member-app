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
    height: sWidth,
    width: sWidth,
  },

  textStyle: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
})

export const ComingSoonScreen = observer(function ComingSoonScreen() {
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center">
          <Image source={uadsLogo} style={styles.logoStyle} />
          <Text preset="header" text="Coming Soon!" style={styles.textStyle}></Text>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
