import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Spinner, NativeBaseProvider, Box } from "native-base"
import { Screen } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.goldenGlow,
  flex: 1,
}

const spinner: ViewStyle = { 
  flex: 1,
  flexDirection: 'column', 
  justifyContent: 'center', 
  alignItems: 'center'
}

export const LoadingScreen = observer(function LoadingScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <NativeBaseProvider>
      <Screen style={ROOT} preset="scroll">
        <Box style={spinner}>
          <Spinner color={color.text} size="large" />
        </Box>
      </Screen>
    </NativeBaseProvider>
  )
})
