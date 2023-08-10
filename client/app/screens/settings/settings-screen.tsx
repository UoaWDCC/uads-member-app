import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {ViewStyle, StyleSheet, View, Dimensions, Image} from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button, Stack, Input } from "native-base"
import firebase from "../../../firebaseSetup"
import "firebase/auth"
import { AuthContext } from "../../../context/AuthContext"
import usersApi from "../../api/backend"
import { flexDirection } from "styled-system"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({

  settingsBox: {
    backgroundColor: color.palette.brown
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
    marginBottom: 15,
    paddingVertical: 15,
    width: 283,
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
    backgroundColor: color.palette.fuschia,
    flexDirection: "row",
    flex: 1,
    justifyContent: "flex-end",
    heigh: 42,
  },

  nameBox: {
    flexDirection: "column"
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

  // header: { NOT USED
  //   color: color.palette.darkRed,
  //   fontFamily: "Poppins",
  //   fontSize: 72,
  //   marginBottom: 50,
  // },

  input: {
    borderColor: color.transparent,
    color: color.palette.palePeach,
    fontFamily: "Poppins",
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
    fontFamily: "Poppins-Medium",
    fontWeight: "bold",
  },

  signOutButton: {
    alignItems: "center",
    backgroundColor: color.palette.fuschia,
    borderRadius: 0,
    bottom: 0,
    paddingBottom: 24,
    paddingTop: 20,
    width: Dimensions.get('window').width,
  },

  signOutText: {
    color: color.palette.palePeach,
    fontFamily: "Poppins-Bold",
    fontSize: 24,
  },

  textField: {
    fontSize: 14,
    fontFamily: "Poppins-Regular",
    color: color.palette.palePeach,
  },

  textInput: {
    fontSize: 24,
    fontFamily: "Poppins-Regular",
    color: color.palette.palePeach,
    borderColor: color.transparent,
    paddingLeft: 0,
  },

  upiLabel: {
    color: color.palette.darkRed,
    fontFamily: "Poppins-SemiBold",
    fontSize: 20,
  },

  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center', 
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

  // async function changeName(newName: string) {
  //   const names: string[] = newName.split(" ")
  //   const firstName = names[0]
  //   const lastName = names[1]

  //   firebase
  //     .auth()
  //     .currentUser.getIdToken(true)
  //     .then(async function (idToken) {
  //       await usersApi
  //         .put(
  //           `/users/${upi}`,
  //           {},
  //           {
  //             params: {
  //               firstname: firstName,
  //               lastname: lastName,
  //             },
  //             headers: {
  //               "auth-token": idToken,
  //             },
  //           },
  //         )
  //         .then(() => {
  //           console.log("name changed!")
  //         })
  //         .catch((e) => {
  //           console.error(e)
  //         })
  //     })
  // }

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
  }

  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
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
                width: Dimensions.get('window').width * 0.2,
                height: Dimensions.get('window').width * 0.1,
                resizeMode: "contain",
              }}
          />
          <Image
              source={require("../../resources/uads-logo.png")}
              style={{
                width: Dimensions.get('window').width * 0.27,
                height: Dimensions.get('window').height * 0.035,
                resizeMode: "contain",
              }}
          />
        </Box>
        <Box style={{ justifyContent:"space-between", alignItems:"center"}}>
          <Image
              source={require("../../resources/settings-header.svg")}
              style={{
                width: Dimensions.get('window').width * 0.9,
                height: Dimensions.get('window').height * 0.12,
                resizeMode: "contain",
              }}
          />
        </Box>
        <Box style={{ alignSelf:"center", width:Dimensions.get('window').width * 0.9}}>
          <Text style={styles.upiLabel}>UPI: {name === "" || notifs === "" ? "" : upi}</Text>

          {/* <Text style={styles.upiLabel}>
            {name === "" || notifs === "" ? "" : upi}
          </Text> */}

        </Box>

        <Box style={styles.settingsBox} alignItems="center" justifyContent="center">
          

            {/*<View style={styles.displayBox}>*/}
            {/*  <View style={{ flex: 1 }}>*/}
            {/*    <Text style={styles.textLabel}>UPI: </Text>*/}
            {/*  </View>*/}
            {/*  <View style={{ flex: 2.5 }}>*/}
            {/*    <Text style={{ fontWeight: "normal", fontFamily: "Sen-Regular", fontSize: 16 }}>*/}
            {/*      {name === "" || notifs === "" ? "" : upi}*/}
            {/*    </Text>*/}
            {/*  </View>*/}
            {/*</View>*/}

          <Box style={styles.nameBox}>

            {isEdit ? (
              <View>
                  <Text style={styles.textField}>First name:</Text>
                  <Input
                   variant="underlined"
                   style={styles.textInput}
                   onChangeText={(text) => {
                     setFirstName(text)
                   }}
                   value={name === "" || notifs === "" ? "" : firstName}
                  />
                  <Text style={styles.textField}>Last name:</Text>
                    <Input
                    variant="underlined"
                    style={styles.textInput}
                    onChangeText={(text) => {
                      setLastName(text)
                    }}
                    value={name === "" || notifs === "" ? "" : lastName}
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
    

            {/*<View style={styles.firstNameBox}>
               <View style={{ flex: 1, alignContent: "flex-start" }}>
                 <Text style={styles.textLabel}>First name:</Text>
               </View>
               <View style={{ flex: 2, alignContent: "flex-start" }}>
                 <Input
                   style={styles.input}
                   onChangeText={(text) => {
                     setName(text)
                     changeName(text)
                   }}
                   value={name === "" || notifs === "" ? "" : name}
                 />
               </View>
             </View> */}

            {/* <View style={isEdit ? styles.displayBoxEdit : styles.displayBox}>
              <View style={{ flex: 2, justifyContent: "center" }}>
                <Text style={styles.textField}>Notifications:</Text>
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
            </View> */}

            <View>
              <Text style={styles.textField}>Notifications:</Text>
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

            
            {isEdit ? (
              <Button
              style={({pressed}) => [
                {
                  opacity: pressed ? 0.2 : 1
                },
                styles.editSettingsButton
              ]}
              onPress={() => {
                handleEdit; }}
            >
              <View style={styles.buttonContent}>
                <Text style={styles.editSettings}>Save</Text>
                <Image
                  source={require("../../resources/save-icon.svg")}
                  style={{
                    width: 25,
                    height: 25,
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
                styles.editSettingsButton
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
                    resizeMode: "contain",
                  }}
                />
              </View>

            </Button>
            )}
            

          </Box>

        <View style={{alignItems: "center", flexDirection: "row"}}>
        <Box>
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
          
          </Box>
        </View>
          
        

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
      </NativeBaseProvider>
    </Screen>
  )
})
