import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, Switch } from "react-native"
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
    fontSize: 18
  },
  
  displayBox: {
    width: 208, 
    minHeight: 60, 
    marginBottom: 15,
    backgroundColor: color.palette.goldenGlow,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    flex: 1
  },

  header: {
    fontSize: 40,
    fontFamily: 'Sen-Regular',
    marginBottom: 50,
    textDecorationColor: color.palette.brown,
  },

  input: {
    borderColor: color.transparent,
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
    fontWeight: 'bold'
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
    fontWeight: 'bold'
  },

  textLabel: {
    marginLeft: 15,
    fontWeight: 'bold',
    fontSize: 16
  }
})

export const SettingsScreen = observer(function SettingsScreen() {

  const [name, setName] = useState(() => getName());
  const [notifs, setNotifs] = useState(true);
  const upi = getUPI();
  const { logOut } = React.useContext(AuthContext);

  useEffect(() => {
    //getName();
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log("Got token" + idToken)
    })

    usersApi
      .get(`/users`, {
        headers: {
          Authorization: 'auth-token' + 12
        }
      })
      .then((res) => {
        const data = res.data 
        console.log(data);
      })
      .catch((e) => {
        console.error(e)
      })
  }, []);

  async function getName() {
    var name: string;

    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {
      console.log(idToken);
      // axios.get(`http://localhost:9002/users/321`, {
      //   headers: {
      //     Authorization: 'auth-token' + idToken,
      //     'Access-Control-Allow-Origin' : '*', 
      //     'Access-Control-Allow-Credentials':true
      //   }
    //   })
    //   .then((res) => {
    //     console.log(res.data);
    //     name = res.data.university
    //   });
    // })
    // .catch(function(error) {
    //   console.log(error.response.data);
     })  
    
  }

  function getNotifs() {
   
  }

  function getUPI() {
   
  }

  function changeName() {

  }

  function changeNotifs() {

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
           //   onChangeText={setName}
            //  value = {name}
            />
          </View>

        </View>

        <View style={styles.displayBox} >
          
          <View style={{flex: 2, justifyContent: 'center'}} >
            <Text style={styles.textLabel} >Notifications:</Text>
          </View>
          <View style = {{flex: 1, justifyContent: 'center'}} >
            <Button style={styles.notifsButton}
              onPress={() => setNotifs(!notifs)}
            >
            {notifs ? (<Text style={styles.notifsText}>ON</Text>) : (<Text style={styles.notifsText}>OFF</Text>)}
            </Button>
            
            
            {/* {notifs ? (<Text>ON</Text>) : (<Text>OFF</Text>)}
            <Switch style={styles.notifsSwitch}
              onValueChange={() => setNotifs(!notifs)}
              value={notifs}
              thumbTintColor={color.palette.white}
              tintColor={color.palette.orange}
            >
            </Switch> */}
          </View>

        </View>

        <View style={styles.displayBox} >
            <View style={{flex: 1, justifyContent: 'center'}} >
              <Text style={styles.textLabel} >UPI: {upi} </Text>
            </View>
            <View style = {{flex:1, justifyContent: 'center'}} >
          </View>
        </View>

        <Button style={styles.displayBox} 
           onPress={() => navigation.navigate('change-password')}
        >
          <Text style={styles.changePassword} >
            Change Password
          </Text>
        </Button>

        
        {/* <Input
            style={{ width: 208, height: 60, top: '20%'}}
            borderRadius="20px"
            placeholder="UPI: "
            _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow
            }}
            _dark={{
                placeholderTextColor: color.text,
            }}
            
        /> */}

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