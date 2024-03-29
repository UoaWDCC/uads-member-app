import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { screenWidth } from "../../utils/screenDimensions"
import { NativeBaseProvider, Image, Box } from "native-base"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  padding: 20,
  width: screenWidth / 3,
}

const TEXT: TextStyle = {
  textAlign: "center",
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.text,
  marginTop: 10,
}

export interface SponsorIconProps {
  name?: String
  imgUrl?: String
}

/**
 * Describe your component here
 */
export const SponsorIcon = observer(function SponsorIcon(props: any) {
  const { imgUrl, name } = props.props

  return (
    <NativeBaseProvider>
      <Box style={CONTAINER}>
        <Img imgUrl={imgUrl} name={name} />
        <Text style={TEXT} text={name} />
      </Box>
    </NativeBaseProvider>
  )
})

const Img = ({ imgUrl, name }) => {
  return (
    <Image
      source={{
        uri: imgUrl,
      }}
      alt={name}
      size="lg"
      borderRadius={100}
    />
  )
}
