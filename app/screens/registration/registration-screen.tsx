
/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react";
import { observer } from "mobx-react-lite"
import { Alert, Button, ViewStyle } from "react-native"
import { MainButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet } from "react-native"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { paddingBottom } from "styled-system";

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
  paddingTop: "100px"
}

// const ROOT: ViewStyle = {
//   backgroundColor: color.background,
//   
// }

const styles = StyleSheet.create({
    
  textStyle: {
      flex: 1,
      position: 'absolute',
      top: '68%',

    }
    
})

export const RegistrationScreen = observer(function RegistrationScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [upi, setUpi] = useState('')
  const [password, setPassword] = useState('')
  const [show] = React.useState(false)
  const navigation = useNavigation();

  function registerUser() {
    if(upi === '' && password === '') {
      Alert.alert('Enter details to signup!')
    } else {
      firebase.auth()
      .createUserWithEmailAndPassword(upi + "@aucklanduni.ac.nz", password)
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
      <Text preset="header" text="Registration" style={{ paddingBottom: "50px" }}/>
      <NativeBaseProvider>
      <Box alignItems="center" justifyContent="center">
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
            
            
              
            </Stack>
        </Box>
        
      </NativeBaseProvider>
      <Text text="Already have an account? Sign in!" style={styles.textStyle} onPress={() => navigation.navigate('login')}></Text>
      <MainButton
              text="SIGN UP"
              onPress={() =>
                registerUser()
              }/>
    </Screen>
  )
})
