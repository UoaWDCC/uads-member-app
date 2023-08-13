import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {ViewStyle, StyleSheet, View, Dimensions, Image, TextInput} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button} from "native-base"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import usersApi from "../../api/backend"
import {palette} from "../../theme/palette";

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({

  buttonContent: {
    alignItems: 'center',
    flexDirection: 'row',
  },

  changePassword: {
    alignItems: "center",
    color: color.palette.palePeach,
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    justifyContent: "center"
  },

  changePasswordButton: {
    alignItems: "center",
    backgroundColor: color.palette.darkRed,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    height: 53,
    justifyContent: "center",
    marginVertical: 15,
    paddingVertical: 15,
    width: 283,
  },

  displayBox: {
    alignItems: "center",
    backgroundColor: color.palette.brown,
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginBottom: 15,
    minHeight: 60,
    width: 208,
  },

  displayBoxEdit: {
    alignItems: "center",
    backgroundColor: color.palette.dustyPink,
    flexDirection: "row",
    flex: 1,
    fontFamily: "Poppins",
    justifyContent: "center",
    marginBottom: 15,
    height: 60,
    width: 208,
  },

  editSettings: {
    alignItems: "center",
    color: color.palette.palePeach,
    fontFamily: "Poppins-Medium",
    fontSize: 24,
    justifyContent: "center"
  },

  editSettingsButton: {
    alignItems: "flex-end",
    alignSelf: "flex-end",
    backgroundColor: color.palette.fuschia,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },

  input: {
    borderColor: color.transparent,
    color: color.palette.palePeach,
    fontFamily: "Poppins",
    fontSize: 16,
    fontWeight: "normal",
    paddingLeft: 0,
  },

  nameBox: {
    flexDirection: "column",
    width: "100%",
  },

  notifsButton: {
    backgroundColor: palette.palePeach,
    borderColor: palette.palePeach,
    borderRadius: 10,
    borderWidth: 3,
    justifyContent: "center",
    marginRight: 15,
    marginTop: 5,
    maxHeight: 45,
    maxWidth: 65,
    minWidth: 65,
    opacity: 1,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },

  notifsButtonDeselect: {
    backgroundColor: color.transparent,
  },

  notifsText: {
    color: color.palette.brown,
    fontFamily: "Poppins-Medium",
    fontSize: 24,
  },

  notifsTextDeselect: {
    color: palette.palePeach,
  },

  settingsBox: {
    alignItems:"flex-start",
    backgroundColor: palette.brown,
    display: "flex",
    justifyContent: "flex-start",
    paddingHorizontal: 20,
    paddingVertical: 20,
  },

  signOutButton: {
    alignItems: "center",
    backgroundColor: palette.fuschia,
    borderRadius: 0,
    bottom: 0,
    left: 0,
    paddingBottom: 20,
    paddingTop: 15,
    position: "absolute",
    width: sWidth,
  },

  signOutText: {
    color: palette.palePeach,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },

  textField: {
    color: palette.palePeach,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },

  textInput: {
    borderBottomColor: color.transparent,
    borderBottomWidth: 3,
    color: palette.palePeach,
    fontFamily: "Poppins-Regular",
    fontSize: 24,
    marginBottom: 6,
    paddingBottom: 2,
    paddingLeft: 0,
    paddingTop: 0,
  },

  textInputEdit: {
    borderBottomColor: palette.palePeach,
    outlineStyle: "none",
  },

  upiLabel: {
    color: color.palette.darkRed,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
    paddingVertical: 10,
  },
})

export const SettingsScreen = observer(function SettingsScreen() {
  const [name, setName] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [notifs, setNotifs] = useState("")
  const [upi, setUpi] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const { logOut } = React.useContext(AuthContext)

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async idToken => {
        setUpi(getUpi());
        await usersApi
          .get(`/users/${upi}`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then((res) => {
            const { firstName, lastName, notificationsON } = res.data
            const name = firstName === undefined || lastName === undefined? "" : `${firstName} ${lastName}`
            setFirstName(firstName || "");
            setLastName(lastName || "");
            setName(name)
            setNotifs(notificationsON ? "ON" : "OFF")
          })
          .catch((e) => {
            console.error(e)
          })
        })
      }, [upi])

  function getUpi(): string{
    const userUpi = firebase.auth().currentUser?.email?.replace("@aucklanduni.ac.nz", "");
    return userUpi;
  }

  async function changeName() {
    const fName = firstName
    const lName = lastName

    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        await usersApi
          .put(
            `/users/${upi}`,
            {},
            {
              params: {
                firstname: fName,
                lastname: lName,
              },
              headers: {
                "auth-token": idToken,
              },
            },
          )
          .then(() => {
            console.log("name changed!")
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }

  function changeNotifs() {
    const newNotifs: boolean = notifs !== "ON"
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        await usersApi
          .put(
            `/users/${upi}`,
            {},
            {
              params: {
                notificationson: newNotifs,
              },
              headers: {
                "auth-token": idToken,
              },
            },
          )
          .then(() => {
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }

  const handleEdit = () => {
    setIsEdit(!isEdit)
    if (!isEdit) {
      changeName();
    }
  }

  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>

        <View style={{
          width: sWidth,
          height: sHeight,
          position: "absolute",
          top: 0,
          left: 0,
        }}>
          <Button
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.2 : 1
                },
                styles.signOutButton
              ]}
              onPress={() => {
                firebase.auth().signOut()
                logOut()
              }}
          >
            <Text style={styles.signOutText}>Sign Out</Text>
          </Button>
        </View>
        <Box
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              flexDirection: "row",
              paddingTop: 35,
              paddingHorizontal: 10,
            }}
        >
          <Image
              source={require("../../resources/menu-icon.svg")}
              style={{
                width: sWidth * 0.2,
                height: sHeight * 0.05,
                resizeMode: "contain",
              }}
          />
          <Image
              source={require("../../resources/uads-logo.png")}
              style={{
                width: sWidth * 0.27,
                height: sHeight * 0.035,
                resizeMode: "contain",
              }}
          />
        </Box>
        <Box style={{ justifyContent:"space-between", alignItems:"center"}}>
          <Image
              source={require("../../resources/settings-header.svg")}
              style={{
                width: sWidth * 0.9,
                height: sHeight * 0.12,
                paddingVertical: 50,
                resizeMode: "contain",
              }}
          />
        </Box>

        <Box style={{ alignSelf:"center", width:sWidth * 0.9}}>
          <Text style={styles.upiLabel}>UPI: {name === "" || notifs === "" ? "" : upi}</Text>
        </Box>

        <Box style={styles.settingsBox}>
          <Box style={styles.nameBox}>
            {isEdit ? (
              <View>
                  <Text style={styles.textField}>First name:</Text>
                  <TextInput
                    style={[styles.textInput, styles.textInputEdit]}
                    defaultValue={firstName}
                    onChangeText={(firstNameInput) => setFirstName(firstNameInput)}
                  />
                  <Text style={styles.textField}>Last name:</Text>
                  <TextInput
                    style={[styles.textInput, styles.textInputEdit]}
                    defaultValue={lastName}
                    onChangeText={(lastNameInput) => setLastName(lastNameInput)}
                  />
              </View>
                 ) : (
                  <View>
                    <Text style={styles.textField}>First name:</Text>
                    <Text style={styles.textInput}>{firstName}</Text>
                    <Text style={styles.textField}>Last name:</Text>
                    <Text style={styles.textInput}>{lastName}</Text>
                  </View>
                 )}
          </Box>

            <View>
              <Text style={styles.textField}>Notifications:</Text>
              {isEdit ? (
                  <View style={{
                    flexDirection: "row",
                  }}>
                    <Button
                        style={notifs === "OFF" ? [styles.notifsButton, styles.notifsButtonDeselect] : styles.notifsButton}
                        onPress={() => {
                          setNotifs("ON")
                          changeNotifs()
                        }}
                    >
                      <Text style={notifs === "OFF" ? [styles.notifsText, styles.notifsTextDeselect] : styles.notifsText}>ON</Text>
                    </Button>
                    <Button
                        style={notifs === "ON" ? [styles.notifsButton, styles.notifsButtonDeselect] : styles.notifsButton}
                        onPress={() => {
                          setNotifs("OFF")
                          changeNotifs()
                        }}
                    >
                      <Text style={notifs === "ON" ? [styles.notifsText, styles.notifsTextDeselect] : styles.notifsText}>OFF</Text>
                    </Button>
                  </View>

              ) : (
                  <View>
                    <Button
                        style={styles.notifsButton}
                        disabled={!isEdit}
                        onPress={() => {
                          setNotifs(notifs === "ON" ? "OFF" : "ON")
                          changeNotifs()
                        }}
                    >
                      <Text style={styles.notifsText}>{name === "" || notifs === "" ? "" : notifs}</Text>
                    </Button>
                  </View>
              )}

            </View>

            
            {isEdit ? (
              <Button
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.2 : 1
                  },
                  styles.editSettingsButton
                ]}
                onPress={handleEdit}
              >
              <View style={styles.buttonContent}>
                <Text style={styles.editSettings}>Save</Text>
                <Image
                  source={require("../../resources/save-icon.svg")}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    resizeMode: "contain",
                  }}
                />
              </View>

            </Button>
            ) : (
              <Button
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.2 : 1
                },
                styles.editSettingsButton,
              ]}
              onPress={handleEdit}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.editSettings}>Edit</Text>
                <Image
                  source={require("../../resources/edit-icon.svg")}
                  style={{
                    width: 25,
                    height: 25,
                    marginLeft: 10,
                    resizeMode: "contain",
                  }}
                />
              </View>

            </Button>
            )}
          </Box>

        <View style={{alignItems: "center", justifyContent: "center", width: sWidth}}>
          <Box>
            {!isEdit && (
              <Button
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.2 : 1
                },
                styles.changePasswordButton
              ]}
              onPress={() => navigation.navigate("change-password")}
          >
            <Text style={styles.changePassword}>Change Password</Text>
          </Button>
            )}
            
          
          </Box>

        </View>

      </NativeBaseProvider>


    </Screen>
  )
})
