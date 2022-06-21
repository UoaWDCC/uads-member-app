/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Dimensions, ViewStyle, StyleSheet } from "react-native"
import { MainButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"

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

  const { signUp } = React.useContext(AuthContext)

  function registerUser() {
    if (upi === "" && password === "") {
      Alert.alert("Enter details to signup!")
    } else {
      firebase
        .auth()
        .createUserWithEmailAndPassword(upi + "@aucklanduni.ac.nz", password)
        .then((res) => {
          res.user.updateProfile({
            // upi: upi,
          })
          console.log("User registered successfully!")
          signUp(res)
        })
        .catch((error) => console.error(error))
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

            {/* <FormControl>
          <EmailInputField ref={emailRef}></EmailInputField>
        </FormControl> */}

            {/* <FirstNameInput></FirstNameInput>
            <LastNameInput></LastNameInput>
            <UpiInputField></UpiInputField>
            <FormControl>
            <PasswordInputField></PasswordInputField>
            </FormControl> */}

            {/* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="First Name..."/>
              value={this.state.username} />
            <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="Last Name..." /> */}
            {/* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="University..." />  */}
            {/* <GradLevel></GradLevel> */}
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
