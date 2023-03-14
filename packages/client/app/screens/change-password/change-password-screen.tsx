import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, TextInput, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color,typography } from "../../theme"
import { NativeBaseProvider, Box, Button, Stack, Input} from "native-base"
import firebase from "../../../firebaseSetup"
import "firebase/auth"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  
  buttonsContainer: {
    minWidth: 208,
    maxHeight: 60,
    justifyContent: 'center',
    flexDirection: 'row',
  },

  cancelButton: {
    backgroundColor: color.palette.offWhite,
    width: 80,
    minHeight: 60,
  },

  changeButton: {
    backgroundColor: color.palette.orangeDarker,
    minWidth: 140,
    maxHeight: 60,
    marginLeft: 15
  },

  changePassword: {
    alignItems: 'center',
    fontWeight: 'bold',
    maxWidth: 80,
    textAlign: 'center'
  },

  errorMessage: {
    fontSize: 15,
    marginLeft: 5,
    marginBottom: 1,
    textAlign: 'left',
    color: color.palette.angry,
  },

  header: {
    fontSize: 35,
    fontFamily: 'Sen-Regular',
    textAlign: 'center',
    marginBottom: 50,
    color: color.palette.brown,
  },

  input: {
    minWidth: 250,
    maxHeight: 45, 
    marginBottom: 10,
    borderColor: color.transparent,
    backgroundColor: color.palette.goldenGlow,
    borderRadius: 40,
    justifyContent: 'center',
  },

  stackSpace: {
    maxWidth: 250
  },


  textStyle: {
    flex: 1,
    position: 'absolute',
    top: '90%',
    textAlign: 'center',
    fontWeight: 'bold'

  },

  top: {
    marginBottom: "auto",
    marginTop: 0,
  }

})

export const ChangePasswordScreen = observer(function SettingsScreen() {
  const navigation = useNavigation()

  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [verify, setVerify] = useState("");
  const [error, setError] = useState("");
  const [show] = React.useState(false);
  const [showReturn, setShowReturn] = useState(false)

  let isButtonDisabled = currentPassword === "" || password === "" || verify === "";

  async function reauthenticate(currentPassword: string) {
    var user = firebase.auth().currentUser;
    var cred = firebase.auth.EmailAuthProvider.credential(
        user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
  }

  async function changePassword() {
    if (password == verify) {
      reauthenticate(currentPassword).then(() => {
        var user = firebase.auth().currentUser;
        user.updatePassword(password).then(() => {
          console.log("Password updated!");
          setError("")
          setShowReturn(true)
        }).catch((error) => { 
          if (error.code == 'auth/weak-password') {
            setError('Password should be at least 6 characters.')
          }
        });
      }).catch((error) => { 
        if (error.code == 'auth/wrong-password') {
          setError('Current password is incorrect.')
        }
      });
    } else {
      setError('The passwords do not match.')
    }
    
  }


  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box  flex ={1} alignItems="center" justifyContent="center">
        <Stack space={6} style={styles.stackSpace}>
        <Text style={styles.header} preset="header" text="Set New Password:"/>

        <Text style={styles.errorMessage} preset="header" text={error}/>

        <View style={styles.input} >
          <Input
            borderRadius="40px"
            type={show ? "text" : "password"}
            placeholder="Current Password"
            _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow
            }}
            _dark={{
                placeholderTextColor: color.text,
            }}
            value={showReturn ? "" : currentPassword}
            onChangeText={currentPassword => setCurrentPassword(currentPassword)}
          />
        </View>

        <View style={styles.input} >
          <Input
            borderRadius="40px"
            type={show ? "text" : "password"}
            placeholder="New Password"
            _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow
            }}
            _dark={{
                placeholderTextColor: color.text,
            }}
            value={showReturn ? "" : password}
            onChangeText={password => setPassword(password)}
          />
        </View>

        <View style={styles.input} >
          <Input
            borderRadius="40px"
            type={show ? "text" : "password"}
            placeholder="Repeat Password"
            _light={{
                placeholderTextColor: color.text,
                backgroundColor: color.palette.goldenGlow,
                borderColor: color.palette.goldenGlow
            }}
            _dark={{
                placeholderTextColor: color.text,
            }}
            value={showReturn ? "" : verify}
            onChangeText={verify => setVerify(verify)}
          />
        </View>

        <View style={styles.buttonsContainer}>
            <View style={{flex: 1, justifyContent: 'center'}} >
              <Button
                style={({pressed}) => [
                  {
                    opacity: pressed ? 0.2 : 1
                  },
                  styles.cancelButton
                ]}
                onPress={() => { 
                  navigation.navigate('settings')
                }}
                >
                <Text style={styles.changePassword} >
                  Cancel
                </Text>
              </Button>   
            </View>
              <View style={{flex: 2, justifyContent: 'center'}} >
                <Button style={({pressed}) => [
                  {
                    opacity: pressed ? 0.2 : isButtonDisabled ? 0.7 : 1
                  },
                  styles.changeButton
                ]}
                  disabled={isButtonDisabled}
                  onPress={() => { 
                    changePassword()
                  }}
                >
                  <Text style={styles.changePassword} >
                    Change Password
                  </Text>
                </Button>
              </View>
  
        </View>

        
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
        </Box>
      </NativeBaseProvider>
      {showReturn ? (
              <Text text={`Password succcessfully changed! \nReturn to Settings`} style={styles.textStyle} onPress={() => navigation.navigate('settings')}></Text>
            ) : null}
    </Screen>
  )
})