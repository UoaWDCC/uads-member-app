import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button, Stack, Input} from "native-base"
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
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: 'bold',
    fontFamily: 'Sen-Regular',
    fontSize: 18
  },
  
  displayBox: {
    width: 208, 
    minHeight: 60, 
    marginBottom: 15,
    backgroundColor: color.palette.goldenGlow,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
    fontFamily: 'Sen-Regular',
  },

  header: {
    fontSize: 40,
    fontFamily: 'Sen-Regular',
    marginBottom: 50,
    textDecorationColor: color.palette.brown,
  },

  input: {
    borderColor: color.transparent,
    paddingLeft: 0,
    fontWeight: 'normal',
    fontFamily: 'Sen-Regular',
    fontSize: 16
  },

  notifsButton: {
    backgroundColor: color.palette.tangelo,
    maxHeight: 37,
    minWidth: 50,
    justifyContent: 'center',
    marginRight: 15,
    borderRadius: 15,
    borderColor: color.palette.white,
    borderWidth: 3,
    shadowOffset: {width: 4, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 4
  },

  notifsSwitch: {
    color: color.palette.orange,
    fontWeight: 'bold',
    minHeight: 40,
    minWidth: 50,
    justifyContent: 'center'
  },

  notifsText: {
    color: color.palette.brown,
    fontWeight: 'bold',
    fontFamily: 'Sen-Regular',
    
  },

  signOutButton: {
    backgroundColor: color.palette.goldenGlow,
    width: 160,
    marginTop: 20,
    alignItems: 'center',
  },

  signOutText: {
    color: color.palette.black,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    fontFamily: 'Sen-Regular',
  },

  textLabel: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontFamily: 'Sen-Regular',
    fontSize: 16
  }
})

export const SettingsScreen = observer(function SettingsScreen() {

  const [name, setName] = useState("");
  const [notifs, setNotifs] = useState("");
  const [upi, setUpi] = useState("");
  const { logOut } = React.useContext(AuthContext);

  useEffect(() => {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log(idToken)

    usersApi
      .get(`/users/321`, {
        headers: {
          'auth-token': idToken
        }
      })
      .then((res) => {
        const {firstName, lastName, upi, notificationsON} = res.data
        let name = `${firstName} ${lastName}`
        setName(name)
        setUpi(upi)
        setNotifs(
          (notificationsON) ? "ON" : "OFF"
        )
        
      })
      .catch((e) => {
        console.error(e)
      })
    })
    
  }, []);

   async function changeName(newName: string) {
    const names: string[] = newName.split(" ")
    const firstName = names[0]
    const lastName = names[1]

    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log(idToken)

    usersApi
      .put(`/users/321`, {}, {
        params: {
          firstname: firstName,
          lastname: lastName
        },
        headers: {
          'auth-token': idToken
        }
      })
      .then(() => {console.log('name changed!')})
      .catch((e) => {
        console.error(e)
      })
    })
    
   }

  function changeNotifs() {
    let newNotifs: boolean = (notifs == "ON") ? false : true
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log(idToken)

    usersApi
      .put(`/users/321`, {}, {
        params: {
          'notificationson': newNotifs,
        },
        headers: {
          'auth-token': idToken
        }
      })
      .then(() => {console.log('notifs changed!')})
      .catch((e) => {
        console.error(e)
      })
    })
  }

  const navigation = useNavigation()

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box  flex ={1} alignItems="center" justifyContent="center">
        <Stack space={5}>
        <Text style={styles.header} preset="header" text="Settings:"/>

        <View style={styles.displayBox} >
          
          <View style={{flex: 1, justifyContent: 'center'}} >
            <Text style={styles.textLabel} >Name:</Text>
          </View>
          <View style = {{flex:2, justifyContent: 'center'}} >
            <Input style={styles.input}
              onChangeText={text => {setName(text); changeName(text)}}     
              value = {name}
            />
          </View>

        </View>

        <View style={styles.displayBox} >
          
          <View style={{flex: 2, justifyContent: 'center'}} >
            <Text style={styles.textLabel} >Notifications:</Text>
          </View>
          <View style = {{flex: 1, justifyContent: 'center'}} >
            <Button style={styles.notifsButton}
              onPress={() => {setNotifs( (notifs=="ON" ? "OFF" : "ON")); changeNotifs()}}
            >
            <Text style={styles.notifsText}>{notifs}</Text>
            </Button>
          </View>

        </View>

        <View style={styles.displayBox} >
            <View style={{flex: 1}} >
              <Text style={styles.textLabel} >UPI: </Text>
            </View>
            <View style = {{flex: 2.5}} >
              <Text style={{fontWeight: 'normal', fontFamily: 'Sen-Regular', fontSize: 16}}>{upi}</Text>
            </View>
        </View>

        <Button style={styles.displayBox} 
           onPress={() => navigation.navigate('change-password')}
        >
          <Text style={styles.changePassword} >
            Change Password
          </Text>
        </Button>

        </Stack>
        
          <Button style={styles.signOutButton}
            onPress={() => { 
              firebase.auth().signOut()
              logOut()
            }}
          >
          <Text style={styles.signOutText} >
            Sign Out
          </Text>
          </Button>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})