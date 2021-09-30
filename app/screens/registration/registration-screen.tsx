/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Alert, Button, ViewStyle } from "react-native"
import { MainButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Radio, Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { paddingBottom } from "styled-system"
import { AuthContext } from "../../../context/AuthContext"
import Signup from "../../components/input-fields/singup-component/singup-component"
import axios from 'axios'

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
  textStyle: {
    flex: 1,
    position: "absolute",
    top: "68%",
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
          res.user.updateProfile({
            upi: upi,
          })
          console.log("User registered successfully!")
          signUp(res)
        })
        .catch((error) => console.error(error))  //405 error in backend terminal when posted
        axios.post('http://localhost:9003/user', {
          upi: upi,
          uuid: upi,
          firstName: firstName,
          lastName: lastName,
          university: "University of Auckland",
          "club-membership": [],
          "grad-level": gradLevel
        })
        .then((response) => {
          console.log(response);
        }, (error) => {
          console.log(error);
        });
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
              style={{ width: 208, height: 38 }}
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
              style={{ width: 208, height: 38 }}
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
              style={{ width: 208, height: 38 }}
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
              style={{
                width: 208,
                height: 38,
                top: "40%",
              }}
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
                  <Radio value="undergraduate">
                    Undergraduate
                  </Radio>
                  <Radio value="postgraduate">
                    Postgraduate
                  </Radio>
                </Radio.Group>

            
          </Stack>
        </Box>
      </NativeBaseProvider>
      <Text
        text="Already have an account? Sign in!"
        style={styles.textStyle}
        onPress={() => navigation.navigate("login")}
      ></Text>
      <MainButton text="SIGN UP" onPress={() => registerUser()} />
    </Screen>
  )
})
