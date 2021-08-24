/* eslint-disable react-native/no-inline-styles */
import React, { useContext, useRef, useState } from "react";
import { observer } from "mobx-react-lite"
import { Alert, Button, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { FormControl, Input, NativeBaseProvider, Stack } from "native-base"
// import { GradLevel } from "../../components/input-fields/study-level-drop-down/grad-level-drop-down"
import { useNavigation } from "@react-navigation/native"
// import { FirstNameInput } from "../../components/input-fields/first-name-input/first-name-input"
// import firebase from '@react-native-firebase';
// import { LastNameInput } from "../../components/input-fields/last-name-input/last-name-input"
// import { AuthContext } from "./context/AuthContext";

import firebase from "../../../firebaseSetup"
import "firebase/auth"

// import { auth } from "../../../firebaseSetup";
// import { UpiInputField } from "../../components/input-fields/upi-input-field/upi-input-field";
// import { PasswordInputField } from "../../components/input-fields/password-input-field/password-input-field";
// import { EmailInputField } from "../../components/input-fields/email-input-field/email-input-field";

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

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [upi, setUpi] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [show] = React.useState(false)
  const navigation = useNavigation();

  function registerUser() {
    if(email === '' && password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      firebase.auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        res.user.updateProfile({
          upi: upi
        })
        console.log('User registered successfully!') 
        navigation.navigate('Login') // Change to home screen once implemented.
      })
      .catch(error => console.error(error))      
    }
  }

  // const { firstName = '', lastName = '', upi = '', email = '', password };

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Registration" />
      <NativeBaseProvider>
        <Stack space={4}>
                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="First Name..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    onChangeText={firstName => setFirstName(firstName)}
                />

                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="Last Name..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    onChangeText={lastName => setLastName(lastName)}
                />

                <Input
                    // getRef={input => {
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="UPI..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    onChangeText={upi => setUpi(upi)}
                />

                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="Email..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    onChangeText={email => setEmail(email)}
                    // onChangeText={(text) => this.setState({text})}
                />
                
                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ 
                        width: 208, 
                        height: 38,
                        top: '40%'
                        }}
                    borderRadius="40px"
                    type={show ? "text" : "password"}
                    placeholder="Password..."

                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.palette.goldenGlow,
                    }}
                    onChangeText={password => setPassword(password)}
                />


        { /* <FormControl>
          <EmailInputField ref={emailRef}></EmailInputField>
        </FormControl> */}
        
            {/* <FirstNameInput></FirstNameInput>
            <LastNameInput></LastNameInput>
            <UpiInputField></UpiInputField>
            <FormControl>
            <PasswordInputField></PasswordInputField>
            </FormControl> */}
            
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
                registerUser()
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
