import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color, typography } from "../../theme"
import { NativeBaseProvider, Image } from "native-base"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const PRIMARY_TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontWeight: "bold",
  alignSelf: "center",
  fontSize: 40,
  marginTop: "20px",
  marginHorizontal: "20px",
  textAlign: "center",
}

const SECONDARY_TEXT: TextStyle = {
  fontFamily: typography.primary,
  textAlign: "justify",
  fontSize: 20,
  marginTop: "20px",
  marginHorizontal: "20px",
}

export const SponsorScreen = observer(function SponsorScreen(props: any) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const { sponsorName, sponsorDesc, imageLink } = props.route.params

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Img imgUrl={imageLink} />
        <Text preset="header" text={sponsorName} style={PRIMARY_TEXT} />
        <Text preset="secondary" text={sponsorDesc} style={SECONDARY_TEXT} />
      </NativeBaseProvider>
    </Screen>
  )
})

const Img = ({ imgUrl }) => {
  return (
    <Image
      source={{
        uri: imgUrl,
      }}
      alt="Alternate Text"
      size="lg"
      borderRadius={100}
      width={200}
      height={200}
      alignSelf="center"
      marginTop={10}
    />
  )
}
