import React, { useState } from "react";
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Alert } from "react-native"
import { Screen, Text, SendLinkButton } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack } from "native-base"
import { useNavigation } from "@react-navigation/native";

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center"
}

const styles = StyleSheet.create({
  
  enterEmailStyle: {
    flex: 1,
    paddingLeft: '10px',
    paddingRight: '10px',
    position: 'absolute',
    textAlign: "center",
    top: '40%'

  },

  forgotPasswordStyle: {
    flex: 1,
    position: 'absolute',
    textAlign: "center",
    top: '30%'
  },

  inputStyle: {
    alignSelf: 'center',
    flex: 1,
    position: 'absolute',
    top: '55%'
  },
  
  sendLinkButtonStyle: {
    alignSelf: 'center',
    flex: 1,
    height: 45,
    position: 'absolute',
    top: '65%',
    width: 215
  },

  textStyle: {
      flex: 1,
      position: 'absolute',
      top: '75%',

    }
    
})

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [upi, setUpi] = useState('')
  const [show] = React.useState(false)
  
  function sendLink() {
    if(upi === '') {
      Alert.alert('Enter upi to reset password!')
    } else {
      return firebase.auth().sendPasswordResetEmail(upi + "@aucklanduni.ac.nz")
      .catch(error => console.error(error))  
    }
  }
  

  // Pull in navigation via hook
  const navigation = useNavigation();

  return (
    <Screen style={ROOT} preset="scroll">
      { /* <Image source={require("../../../assets/images/logo.png")} /> */ }
      <Text style={styles.forgotPasswordStyle} preset="header" text="Forgot Password?"/>
      <Text style={styles.enterEmailStyle} text="Enter your UPI and we will send instructions to your university email to reset your password."/>
      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center" style={styles.inputStyle}>
        <Stack space={4} >
                <Input
                    // getRef={input => {
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 215, height: 45}}
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
                
          </Stack>
        </Box>
      </NativeBaseProvider>
      <Text text="Return to Log In" style={styles.textStyle} onPress={() => navigation.navigate('login')}></Text>
      <SendLinkButton style={styles.sendLinkButtonStyle} text='Send link' onPress={() => sendLink()}/>
    </Screen>
  )
})