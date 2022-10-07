import React from "react"
import { observer } from "mobx-react-lite"
import { TextStyle, ViewStyle, Linking } from "react-native"
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

const LINK_TEXT: TextStyle = {
  fontFamily: typography.primary,
  textAlign: "left",
  fontSize: 20,
  marginTop: "20px",
  marginRight: "20px",
  textDecorationLine: "underline",
}

export const EventScreen = observer(function SponsorScreen(props: any) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()

  const { uuid, name, desc, dateTime, location, imagePath, sponsor, urlSignUp } = props.route.params

  const goToUrl = () => {
    if (urlSignUp) {
      Linking.openURL(urlSignUp)
    }
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Img imgUrl={imagePath} />
        <Text preset="header" text={name} style={PRIMARY_TEXT} />
        <Text preset="secondary" text={desc} style={SECONDARY_TEXT} />
        <Text preset="secondary" text={"Time: " + dateTime} style={SECONDARY_TEXT} />
        <Text preset="secondary" text={"Location: " + location} style={SECONDARY_TEXT} />
        <br />
        {urlSignUp ? (
          <div>
            <Text preset="secondary" text="Sign up link: " style={SECONDARY_TEXT} />
            <Text preset="secondary" text={urlSignUp} style={LINK_TEXT} onPress={goToUrl} />
          </div>
        ) : null}
        <br />
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
