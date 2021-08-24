/* eslint-disable react-native/no-inline-styles */
import React from "react"
import { observer } from "mobx-react-lite"
import { Button, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { Input, NativeBaseProvider, Stack } from "native-base"
import { GradLevel } from "../../components/input-fields/study-level-drop-down/grad-level-drop-down"
import { useNavigation } from "@react-navigation/native"
import { FirstNameInput } from "../../components/input-fields/first-name-input/first-name-input"
import firebase from '@react-native-firebase/app';
import { LastNameInput } from "../../components/input-fields/last-name-input/last-name-input"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center"
}

export const RegistrationScreen = observer(function RegistrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  function signUpPressed() {
    var email = "test@example.com";
    var password = "hunter2";
    // [START auth_signup_password]
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in 
      var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ..
    });
  // [END auth_signup_password]
  }

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Registration" />
      <NativeBaseProvider>
        <Stack space={4}>
            <FirstNameInput></FirstNameInput>
            <LastNameInput></LastNameInput>
            { /* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="First Name..."/>
              value={this.state.username} />
            <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="Last Name..." /> */}
            { /* <Input style={{ width: 208, height: 38, placeholderTextColor: color.text, backgroundColor: color.palette.goldenGlow,
              borderColor: color.palette.goldenGlow}} borderRadius="40px" placeholder="University..." />  */}
            { /* <GradLevel></GradLevel> */}
            <Button
              title="Sign Up"
              onPress={() =>
                signUpPressed()
              }/>
            <Button
              title="Back to login"
              onPress={() =>
                navigation.navigate('login')
              }/>
              
        </Stack>
      </NativeBaseProvider>
    </Screen>
  )
})
