import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button, Stack, Input } from "native-base"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import usersApi from "../../api/backend"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  changePassword: {
    alignItems: "center",
    color: color.palette.palePeach,
    fontFamily: "Sen-Regular",
    fontSize: 18,
    fontWeight: "bold",
    justifyContent: "center"
  },

  changePasswordButton: {
    alignItems: "center",
    backgroundColor: color.palette.darkRed,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    fontFamily: "Sen-Regular",
    justifyContent: "center",
    marginBottom: 15,
    minHeight: 60,
    width: 208,
  },

  displayBox: {
    alignItems: "center",
    backgroundColor: color.palette.brown,
    borderRadius: 10,
    flexDirection: "row",
    flex: 1,
    fontFamily: "Sen-Regular",
    justifyContent: "center",
    marginBottom: 15,
    minHeight: 60,
    width: 208,
  },

  header: {
    fontSize: 40,
    fontFamily: "Sen-Regular",
    marginBottom: 50,
    textDecorationColor: color.palette.brown,
  },

  input: {
    borderColor: color.transparent,
    fontFamily: "Sen-Regular",
    fontSize: 16,
    fontWeight: "normal",
    paddingLeft: 0,
  },

  notifsButton: {
    backgroundColor: color.palette.brown,
    borderColor: color.palette.palePeach,
    borderRadius: 15,
    borderWidth: 3,
    justifyContent: "center",
    marginRight: 15,
    maxHeight: 37,
    minHeight: 37,
    minWidth: 50,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  notifsText: {
    color: color.palette.palePeach,
    fontFamily: "Sen-Regular",
    fontWeight: "bold",
  },

  signOutButton: {
    alignItems: "center",
    backgroundColor: color.palette.fuschia,
    marginTop: 20,
    width: 160,
  },

  signOutText: {
    color: color.palette.palePeach,
    fontFamily: "Sen-Regular",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },

  textLabel: {
    color: color.palette.palePeach,
    fontFamily: "Sen-Regular",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
})

export const SettingsScreen = observer(function SettingsScreen() {
  const [name, setName] = useState("")
  const [notifs, setNotifs] = useState("")
  const [upi, setUpi] = useState("")
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

  async function changeName(newName: string) {
    const names: string[] = newName.split(" ")
    const firstName = names[0]
    const lastName = names[1]

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
                firstname: firstName,
                lastname: lastName,
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

  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Stack space={5}>
            <Text style={styles.header} preset="header" text="Settings:" />

            <View style={styles.displayBox}>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Text style={styles.textLabel}>Name:</Text>
              </View>
              <View style={{ flex: 2, justifyContent: "center" }}>
                <Input
                  style={styles.input}
                  onChangeText={(text) => {
                    setName(text)
                    changeName(text)
                  }}
                  value={name === "" || notifs === "" ? "" : name}
                />
              </View>
            </View>

            <View style={styles.displayBox}>
              <View style={{ flex: 2, justifyContent: "center" }}>
                <Text style={styles.textLabel}>Notifications:</Text>
              </View>
              <View style={{ flex: 1, justifyContent: "center" }}>
                <Button
                  style={styles.notifsButton}
                  onPress={() => {
                    setNotifs(notifs === "ON" ? "OFF" : "ON")
                    changeNotifs()
                  }}
                >
                  <Text style={styles.notifsText}>{name === "" || notifs === "" ? "" : notifs}</Text>
                </Button>
              </View>
            </View>

            <View style={styles.displayBox}>
              <View style={{ flex: 1 }}>
                <Text style={styles.textLabel}>UPI: </Text>
              </View>
              <View style={{ flex: 2.5 }}>
                <Text style={{ fontWeight: "normal", fontFamily: "Sen-Regular", fontSize: 16 }}>
                  {name === "" || notifs === "" ? "" : upi}
                </Text>
              </View>
            </View>

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
          </Stack>

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
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
