import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Alert, Dimensions, TouchableWithoutFeedback } from "react-native"
import { Screen, Text, AutoImage as Image, MainButton } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"

const uadsLogo = require("../../resources/logo.png")

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  // backgroundColor: color.background,
  backgroundColor: "#eac3bc",
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  inputStyle: {
    width: sWidth * 0.8,
  },

  headerBoxStyle: {
    alignSelf: "center",
    flex: 1,
    paddingBottom: 50,
    paddingTop: 150,
    // backgroundColor: "black",
  },

  headerTextStyle: {
    fontFamily: "Bitter",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    color: "#804949",
  },

  logoStyle: {
    alignSelf: "center",
    width: sWidth * 0.65,
    resizeMode: "contain",
  },

  signUpStyle: {
    flex: 1,
    position: "absolute",
    top: "69%",
  },

  forgotPasswordStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "right",
    color: "#C44F6C",
  },

  signinButtonStyle: {
    alignSelf: "center",
    flex: 1,
    marginTop: 10,
    padding: 10,
    width: sWidth * 0.8,
    height: sWidth * 0.13,
    backgroundColor: "#804949",
    borderRadius: 10,
  },

  loginTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    color: "#EAC3BC",
  },

  bottomBoxStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: "#C44F6C",
    width: sWidth,
    height: sHeight * 0.1,
    bottom: 0,
  },

  bottomTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: "#EAC3BC",
  },
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [upi, setUpi] = useState("")
  const [password, setPassword] = useState("")
  const [show] = React.useState(false)

  const { logIn } = React.useContext(AuthContext)

  function userLogin() {
    if (upi === "" && password === "") {
      Alert.alert("Enter details to signin!")
    } else {
      firebase
        .auth()
        .signInWithEmailAndPassword(upi + "@aucklanduni.ac.nz", password) // Getting email from UPI
        .then((res) => {
          console.log(res)
          console.log("User logged-in successfully!")
          logIn(res)
        })
        .catch((error) => console.error(error))
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center">
          <Stack alignItems="center" justifyContent="center" style={styles.headerBoxStyle}>
            <Text style={styles.headerTextStyle}>Welcome To</Text>
            <Image source={uadsLogo} style={styles.logoStyle} />
          </Stack>
          <Stack space={2}>
            <Input
              style={styles.inputStyle}
              borderRadius="40px"
              placeholder="UPI..."
              _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow,
              }}
              _dark={{
                placeholderTextColor: color.text,
              }}
              onChangeText={(upi) => setUpi(upi)}
            />

            <Input
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.inputStyle}
              borderRadius="40px"
              type={show ? "text" : "password"}
              placeholder="Password..."
              _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow,
              }}
              _dark={{
                placeholderTextColor: color.palette.goldenGlow,
              }}
              onChangeText={(password) => setPassword(password)}
            />
            <Text
              text="Forgot Password?"
              style={styles.forgotPasswordStyle}
              onPress={() => navigation.navigate("forgotPassword")}
            ></Text>
            <MainButton
              style={styles.signinButtonStyle}
              text={<Text style={styles.loginTextStyle}>LOG IN</Text>}
              onPress={() => userLogin()}
            />
          </Stack>
        </Box>
        <TouchableWithoutFeedback onPress={() => navigation.navigate("register")}>
          <Box flexDirection="row" style={styles.bottomBoxStyle}>
            <Text style={[styles.bottomTextStyle, { fontWeight: "400" }]}>
              Don't have an account?{" "}
            </Text>
            <Text style={[styles.bottomTextStyle, { fontWeight: "700" }]}>Sign up!</Text>
          </Box>
        </TouchableWithoutFeedback>
      </NativeBaseProvider>
    </Screen>
  )
})
