import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { TouchableOpacity, ViewStyle } from "react-native"
import { Screen, SponsorIcon, SponsorIconProps } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, Button } from "native-base"

import sponsorsApi from "../../api/sponsors"

export const SponsorsScreen = observer(function SponsorsScreen() {
  const navigation = useNavigation()
  const [sponsors, setSponsors] = useState([])

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
        <Box flex={1} >
          {sponsors.map((curr) => {
            const { sponsorName } = curr
            const prop = {
              name: `${sponsorName}`,
              imgUrl: "https://wallpaperaccess.com/thumb/6336218.png",
            }
            return <SponsorIcon props={prop} />
          })}
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.primary,
  flex: 1,
}

// const Container: ViewStyle {

// }
