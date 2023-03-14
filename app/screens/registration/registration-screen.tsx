/* eslint-disable react-native/no-inline-styles */
import React, { useState } from "react"
import { observer } from "mobx-react-lite"
import { Dimensions, ViewStyle, StyleSheet, View, Linking } from "react-native"
import { MainButton, Screen, Text } from "../../components"
import { color } from "../../theme"
import { Radio, Box, Input, NativeBaseProvider, Stack, Modal } from "native-base"
import { useNavigation } from "@react-navigation/native"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import axios from "axios"
import { BASE_URL } from "@env"
import eligibility from "../../../eligibility.json"
import { position } from "styled-system"

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
  boxStyle: {
    alignSelf: "center",
    flex: 1,
    position: "absolute",
    width: "99%",
  },

  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    position: "absolute",
    top: "5%",
  },

  inputStyle: {
    alignSelf: "center",
    flex: 1,
    padding: "10px",
    width: "275px",
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

  signUpButtonStyle: {
    alignSelf: "center",
    flex: 1,
    padding: 15,
    width: 275,
  },

  smallTextStyle: {
    fontFamily: "Sen-Regular",
    fontSize: 20,
    margin: 10,
    marginBottom: 40,
    marginLeft: 20,
    textAlign: "center",
    textDecorationColor: color.palette.brown,
    textDecorationLine: "underline",
  },

  textStyle: {
    flex: 1,
    textAlign: "center",
    textDecorationLine: "underline",
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
  const [gradLevel, setGradLevel] = React.useState("Undergraduate")
  const [showModal, setShowModal] = useState(false)
  const [text, setText] = useState("Enter details to signup!")

  const { signUp } = React.useContext(AuthContext)

  async function registerUser() {
    if (upi === "" && password === "") {
      setText("Enter details to signup!")
      setShowModal(true)
    } else {
      let inDatabase = false
      for (let key in eligibility) {
        if (key.toLocaleLowerCase() === upi.toLocaleLowerCase()) {
          inDatabase = true
          if (eligibility[key].App_Eligible === "y") {
            await firebase
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
                      firstName: firstName,
                      lastName: lastName,
                      university: "University of Auckland",
                      gradLevel: gradLevel,
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
              .catch((error) => {
                setText(error.message)
                setShowModal(true)
              }) // 405 error in backend terminal when posted
          } else {
            // User in database but not paid
            setText("Please talk to an exec about membership payment")
            setShowModal(true)
          }
          break
        }
      }
      // User not in database
      if (!inDatabase) {
        setText("Invalid member. Please sign up to UADS.")
        setShowModal(true)
      }
    }
  }

  // const { firstName = '', lastName = '', upi = '', email = '', password };

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text="Registration" style={{ paddingBottom: 30 }} />
      <Text
        text="Click here to sign up to the club before registering to the app!"
        style={styles.smallTextStyle}
        onPress={() => Linking.openURL("https://forms.gle/GDxUn3SnTBvjoqqV7")}
      ></Text>

      <NativeBaseProvider>
        <Box alignItems="center" justifyContent="center" style={styles.boxStyle}>
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
              <Radio value="Undergraduate" style={{ margin: "7px", marginHorizontal: "auto" }}>
                Undergraduate
              </Radio>
              <Radio value="Postgraduate" style={{ margin: "7px", marginHorizontal: "auto" }}>
                Postgraduate
              </Radio>
            </Radio.Group>

            <Text
              text="Already have an account? Sign in!"
              style={styles.textStyle}
              onPress={() => navigation.navigate("login")}
            ></Text>

            <MainButton
              style={styles.signUpButtonStyle}
              text="SIGN UP"
              onPress={() => registerUser()}
            />
          </Stack>

          <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Modal.Content style={styles.modalStyle}>
                  <Modal.CloseButton />
                  <Modal.Body>
                    <Text style={styles.modalText}>{text}</Text>
                    {/* {showButton ? (
                        <Text style={styles.linkText} onPress={() => navigation.navigate("login")}>
                          Return to log in
                        </Text>
                      ) : null} */}
                  </Modal.Body>
                </Modal.Content>
              </View>
            </View>
          </Modal>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
