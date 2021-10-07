import React, { useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

export const SponsorScreen = observer(function SponsorScreen(props: any) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const { sponsorName, sponsorDesc } = props.route.params

  useEffect(() => {
    navigation.setOptions({title: sponsorName})

  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <Text preset="header" text={sponsorName} />
      <Text preset="secondary" text={sponsorDesc} />
    </Screen>
  )
})
