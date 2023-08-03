import "firebase/auth"

import {
  Alert,
  Dimensions,
  Linking,
  Pressable,
  StyleSheet,
  TextInput,
  ViewStyle,
} from "react-native"
import { Box, NativeBaseProvider, Stack, View } from "native-base"
import { AutoImage as Image, MainButton, Screen, Text } from "../../components"
import React, { useState } from "react"

import { AuthContext } from "../../../context/AuthContext"
import { color } from "../../theme"
import firebase from "../../../firebaseSetup"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

const uadsLogo = require("../../resources/transparent_logo.png")
const arrow = require("../../resources/arrow.png")
const hiddenEye = require("../../resources/hiddenEye.png")
const visibleEye = require("../../resources/visibleEye.png")
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
  headerBoxStyle: {
    alignSelf: "center",
    flex: 1,
    paddingBottom: 20,
  },

  headerTextStyle: {
    fontFamily: "Bitter",
    fontStyle: "italic",
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 29,
    textAlign: "center",
    color: color.text,
  },

  logoStyle: {
    alignSelf: "center",
    width: sWidth * 0.55,
    resizeMode: "contain",
  },

  inputHeaderStyle: {
    fontFamily: "Poppins",
    fontWeight: "400",
    fontSize: 14,
    lineHeight: 21,
    color: color.text,
    whiteSpace: "normal",
  },

  inputBoxStyle: {
    alignSelf: "center",
    width: sWidth >= 600 ? sWidth * 0.4 : sWidth * 0.8,
    paddingLeft: 4,
    borderBottomWidth: 3,
    borderBottomColor: color.line,
  },

  inputTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "400",
    color: color.text,
    fontSize: 24,
    lineHeight: 36,
    borderWidth: 0,
    paddingLeft: 0,
    outlineStyle: "none",
    width: sWidth * 0.8, //Add width to match autofill input field on Mozilla Firefox browser
  },

  eyeStyle: {
    width: 30,
    height: 30,
    resizeMode: "contain",
  },

  forgotPasswordStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 14,
    lineHeight: 21,
    textAlign: "right",
    color: color.primary,
  },

  loginButtonStyle: {
    alignSelf: "center",
    flex: 1,
    marginTop: 30,
    padding: 10,
    width: sWidth >= 600 ? sWidth * 0.4 : sWidth * 0.8,
    height: sWidth * 0.13,
    backgroundColor: color.line,
    borderRadius: 10,
  },

  loginTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: 24,
    lineHeight: 36,
    textAlign: "center",
    color: color.background,
  },

  bottomBoxStyle: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    backgroundColor: color.primary,
    height: sHeight * 0.1,
    width: sWidth >= 600 ? sWidth * 0.4 : sWidth,
    bottom: 0,
    flexDirection: "row",
  },

  bottomTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: 20,
    lineHeight: 30,
    textAlign: "center",
    color: color.background,
  },

  arrowStyle: {
    marginLeft: 8,
  },
})

export const LoginScreen = observer(function LoginScreen() {
  // Pull in one of our MST stores
  const [upi, setUpi] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
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

  const eyeIcon = showPassword ? visibleEye : hiddenEye

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box
          alignItems="center"
          justifyContent="center"
          style={{ paddingTop: sWidth >= 600 ? sHeight * 0.22 : 100, paddingBottom: 50 }}
        >
          <Stack alignItems="center" justifyContent="center" style={styles.headerBoxStyle}>
            <Text style={styles.headerTextStyle}>Welcome To</Text>
            <Image source={uadsLogo} style={styles.logoStyle} />
          </Stack>
          <Stack space={0}>
            <Box style={styles.inputBoxStyle}>
              {/*Conditionally render UPI heading when user is typing*/}
              {upi !== "" && <Text style={styles.inputHeaderStyle}>UPI</Text>}{" "}
              <TextInput
                style={styles.inputTextStyle}
                placeholder="UPI"
                placeholderTextColor={color.text}
                onChangeText={(upi) => setUpi(upi)}
              />
            </Box>
            <Box mt={4} style={styles.inputBoxStyle}>
              {/*Conditionally render Password heading when user is typing*/}
              {password !== "" && <Text style={styles.inputHeaderStyle}>Password</Text>}{" "}
              <View
                style={{
                  justifyContent: "space-between",
                  width: sWidth * 0.8,
                  alignItems: "center",
                  flexDirection: "row",
                }}
              >
                <TextInput
                  style={styles.inputTextStyle}
                  placeholder="Password"
                  placeholderTextColor={color.text}
                  onChangeText={(password) => setPassword(password)}
                  secureTextEntry={!showPassword}
                />
                <View
                  style={{
                    position: "absolute",
                    right: 0,
                    backgroundColor: "white",
                  }}
                >
                  <Pressable onPress={togglePasswordVisibility}>
                    <Image source={eyeIcon} style={styles.eyeStyle} />
                  </Pressable>
                </View>
              </View>
            </Box>

            <Text
              text="Forgot Password?"
              style={styles.forgotPasswordStyle}
              onPress={() => navigation.navigate("forgotPassword")}
            ></Text>
            <MainButton
              style={styles.loginButtonStyle}
              text={<Text style={styles.loginTextStyle}>Log in</Text>}
              onPress={() => userLogin()}
            />
          </Stack>
        </Box>

        <Pressable
          onPress={() => {
            Linking.openURL(
              "https://docs.google.com/forms/d/1KJkc74k-FuXlqtMw4q2xrHqqaUnGdYi85FdIGu7a5NA/viewform?edit_requested=true",
            ).catch((err) => console.error("An error occurred", err))
          }}
          style={styles.bottomBoxStyle}
        >
          <Text style={[styles.bottomTextStyle, { fontWeight: "400" }]}>
            Don't have an account?{" "}
          </Text>
          <Text style={[styles.bottomTextStyle, { fontWeight: "700" }]}>Sign up!</Text>
          <Image source={arrow} style={styles.arrowStyle} />
        </Pressable>
      </NativeBaseProvider>
    </Screen>
  )
})
