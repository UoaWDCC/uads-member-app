import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button} from "native-base"
import firebase from "../../../firebaseSetup"
import { AuthContext } from "../../../context/AuthContext"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const HomeScreen = observer(function HomeScreen() {
  const { logOut } = React.useContext(AuthContext)

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box  flex ={1} alignItems="center" justifyContent="center">
          <Button
            onPress={ () => {
              firebase.auth().signOut()
              logOut()
            }}
          >
            logout
          </Button>
        </Box>
        
      </NativeBaseProvider>
    </Screen>
  )
})