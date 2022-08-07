import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Alert, View } from "react-native"
import { Screen, Text, SendLinkButton } from "../../components"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { color } from "../../theme"
import { Box, Input, NativeBaseProvider, Stack, Modal } from "native-base"
import { useNavigation } from "@react-navigation/native"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: "5%",
  },

  enterEmailStyle: {
    flex: 1,
    paddingLeft: "10px",
    paddingRight: "10px",
    position: "absolute",
    textAlign: "center",
    top: "40%",
  },

  forgotPasswordStyle: {
    flex: 1,
    position: "absolute",
    textAlign: "center",
    top: "30%",
  },

  inputStyle: {
    alignSelf: "center",
    flex: 1,
    position: "absolute",
    top: "55%",
    width: "99%",
  },

  linkText: {
    color: color.palette.white,
    textAlign: "center",
    textDecorationColor: color.palette.white,
    textDecorationLine: "underline",
  },

  modalStyle: {
    backgroundColor: color.palette.brown,
    margin: 0,
    padding: 0,
  },

  modalText: {
    color: color.palette.white,
    textAlign: "center",
  },

  modalView: {
    alignItems: "center",
    backgroundColor: color.palette.brown,
    borderRadius: 20,
    margin: 5,
    padding: 5,
    width: "80vw",
  },

  sendLinkButtonStyle: {
    alignSelf: "center",
    flex: 1,
    height: 45,
    position: "absolute",
    top: "65%",
    width: 215,
  },

  textStyle: {
    flex: 1,
    position: "absolute",
    top: "75%",
  },

  top: {
    marginBottom: "auto",
    marginTop: 0,
  },
})

export const ForgotPasswordScreen = observer(function ForgotPasswordScreen() {
  const [upi, setUpi] = useState("")
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState("Check your email to reset your password!")
  const [showButton, setShowButton] = useState(true)

  function sendLink() {
    if (upi === "") {
      Alert.alert("Enter upi to reset password!")
    } else {
      firebase
        .auth()
        .sendPasswordResetEmail(upi + "@aucklanduni.ac.nz")
        .then((res) => {
          console.log(res)
          console.log("Password reset email sent successfully!")
          setText("Check your email to reset your password!")
          setShowButton(true)
          setShowModal(true)
        })
        .catch((error) => {
          console.error(error)
          setText("There isn't an account registered with this UPI. Please input correct UPI.")
          setShowButton(false)
          setShowModal(true)
        })
    }
  }

  // Pull in navigation via hook
  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <Text style={styles.forgotPasswordStyle} preset="header" text="Forgot Password?" />
      <Text
        style={styles.enterEmailStyle}
        text="Enter your UPI and we will send instructions to your university email to reset your password."
      />
      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center" style={styles.inputStyle}>
          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Modal.Content style={styles.modalStyle}>
                  <Modal.CloseButton />
                  <Modal.Body>
                    <Text style={styles.modalText}>{text}</Text>
                    {showButton ? (
                      <Text style={styles.linkText} onPress={() => navigation.navigate("login")}>
                        Return to log in
                      </Text>
                    ) : null}
                  </Modal.Body>
                </Modal.Content>
              </View>
            </View>
          </Modal>
          <Stack space={4}>
            <Input
              // eslint-disable-next-line react-native/no-inline-styles
              style={{ width: 215, height: 45 }}
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
          </Stack>
        </Box>
      </NativeBaseProvider>
      <Text
        text="Return to Log In"
        style={styles.textStyle}
        onPress={() => navigation.navigate("login")}
      ></Text>
      <SendLinkButton
        style={styles.sendLinkButtonStyle}
        text="Send link"
        onPress={() => sendLink()}
      />
    </Screen>
  )
})
