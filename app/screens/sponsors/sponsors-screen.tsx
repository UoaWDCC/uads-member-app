import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button } from "native-base"

import sponsorsApi from "../../api/sponsors"

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

export const SponsorsScreen = observer(function SponsorsScreen() {
  const navigation = useNavigation()

  const [sponsors, setSponsors] = React.useState([])

  useEffect(() => {
    sponsorsApi
      .get(`/sponsor`)
      .then((res) => {
        setSponsors(res.data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box flex={1} alignItems="center" justifyContent="center">
          <Button
            onPress={() => {
              console.log(sponsors)
            }}
          >
            console log sponsors
          </Button>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
