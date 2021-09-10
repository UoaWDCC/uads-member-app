import React, { useState } from "react";
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Alert } from "react-native"
import { Screen, Text, SendLinkButton, Popup } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack, Modal } from "native-base"
import { useNavigation } from "@react-navigation/native";
import { style } from "styled-system";

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

    },

    top: {
      marginBottom: "auto",
      marginTop: 0,
    },
    
})

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const [upi, setUpi] = useState('')
  const [showModal, setShowModal] = useState(false)
  
  function sendLink() {
    if(upi === '') {
      Alert.alert('Enter upi to reset password!')
    } else {
      firebase.auth().sendPasswordResetEmail(upi + "@aucklanduni.ac.nz")
      .then((res) => {
        console.log(res)
        console.log('Password reset email sent successfully!')
        navigation.navigate('login') // Change this to correct screen
      })
      .catch(error => {
        console.error(error)
        setShowModal(true)
      }) 
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
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size={"md"}>
          <Popup>
        <Modal.Content style={styles.top}>
          <Modal.CloseButton />
          <Modal.Body>
            There isn't an account registered with this UPI. Please input correct UPI.
          </Modal.Body>
        </Modal.Content>
        </Popup>
        </Modal>
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