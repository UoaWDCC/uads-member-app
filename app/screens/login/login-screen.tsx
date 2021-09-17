import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Alert } from "react-native"
import { Screen, Text, AutoImage as Image, MainButton } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native"

const uadsLogo = require("../../components/logo/logos/logo.png")

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
    
  forgotPasswordStyle: {
    flex: 1,
    position: 'absolute',
    top: '72%',
  },

  logoStyle: {
    alignSelf: "center",
    height: 350,
    width: 350,
  },

  signUpStyle: {
      flex: 1,
      position: 'absolute',
      top: '69%',
  },
  
  textStyle: {
    flex: 1,
    position: "absolute",
    top: "68%",
  }
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
      {/* <Image source={require("../../../assets/images/logo.png")} /> */}

      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center">
        <Image source={uadsLogo} style={ styles.logoStyle } />
        <Stack space={2}>
          {/* <UpiInputField/>
          <PasswordInputField/> */}
                <Input
                    // getRef={input => {
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38, top: '20%'}}
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
                        top: '30%'
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
                
          </Stack>
        </Box>
      </NativeBaseProvider>
      <Text text="Don't have an account? Sign up!" style={styles.signUpStyle} onPress={() => navigation.navigate('register')}></Text>
      <Text text="Forgot password?" style={styles.forgotPasswordStyle} onPress={() => navigation.navigate('forgot-password')}></Text>
      <MainButton text='SIGN IN' onPress={() => userLogin()}/>
    </Screen>
  )
})
