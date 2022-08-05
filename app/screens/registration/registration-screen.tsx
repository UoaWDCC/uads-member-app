/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Dimensions, ViewStyle, StyleSheet } from "react-native"
import { MainButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Radio, Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import Signup from "../../components/input-fields/singup-component/singup-component"
import axios from "axios"
import { BASE_URL } from "@env"

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  paddingTop: 100,
}

// const ROOT: ViewStyle = {
//   backgroundColor: color.background,
//
// }

const styles = StyleSheet.create({
  inputStyle: {
    width: sWidth * 0.8,
  },

  textStyle: {
    bottom: -1 * sHeight * 0.2,
    flex: 1,
    position: "absolute",
  },
})

export const RegistrationScreen = observer(function RegistrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [upi, setUpi] = useState("")
  const [password, setPassword] = useState("")
  const [show] = React.useState(false)
  const navigation = useNavigation()
  const [gradLevel, setGradLevel] = React.useState("undergraduate")

  const { signUp } = React.useContext(AuthContext)

  function registerUser() {
    if (upi === "" && password === "") {
      Alert.alert("Enter details to signup!")
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(upi + "@aucklanduni.ac.nz", password)
        .then((res) => {
          res.user.getIdToken(true).then(function (idToken) {
            // Send token to your backend via HTTPS
            // ...
            axios.post(
              BASE_URL + "/users",
              {
                upi: upi,
                uuid: upi,
                "first-name": firstName,
                "last-name": lastName,
                university: "University of Auckland",
                "club-membership": [
                  {
                    club: "WDCC",
                  },
                ],
                "grad-level": gradLevel,
              },
              {
                headers: {
                  "auth-token": idToken,
                },
              },
            )
            console.log("User registered successfully!")
            signUp(res)
          })
        })
        .catch((error) => console.error(error)) // 405 error in backend terminal when posted
    }
  }

  // const { firstName = '', lastName = '', upi = '', email = '', password };

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Registration" style={{ paddingBottom: 50 }} />
      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center">
          <Stack space={4}>
            <Input
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.inputStyle}
              borderRadius="40px"
              placeholder="First Name..."
              _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow,
              }}
              _dark={{
                placeholderTextColor: color.text,
              }}
              onChangeText={(firstName) => setFirstName(firstName)}
            />

            <Input
              // eslint-disable-next-line react-native/no-inline-styles
              style={styles.inputStyle}
              borderRadius="40px"
              placeholder="Last Name..."
              _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow,
              }}
              _dark={{
                placeholderTextColor: color.text,
              }}
              onChangeText={(lastName) => setLastName(lastName)}
            />

            <Input
              // getRef={input => {
              // eslint-disable-next-line react-native/no-inline-styles
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

            <Radio.Group
              name="myRadioGroup"
              accessibilityLabel="gradLevel"
              value={gradLevel}
              onChange={(nextValue) => {
                setGradLevel(nextValue)
              }}
            >
              <Radio value="undergraduate">Undergraduate</Radio>
              <Radio value="postgraduate">Postgraduate</Radio>
            </Radio.Group>
          </Stack>
          <MainButton
            style={{ marginTop: sHeight * 0.15 }}
            text="SIGN UP"
            onPress={() => registerUser()}
          />

          <Text
            text="Already have an account? Sign in!"
            style={styles.textStyle}
            onPress={() => navigation.navigate("login")}
          ></Text>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
