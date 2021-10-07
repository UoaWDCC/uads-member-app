import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { screenWidth } from "../../utils/screenDimensions"
import { NativeBaseProvider, Image, Box } from "native-base"
import { backgroundColor } from "styled-system"

const CONTAINER: ViewStyle = {
  alignItems: "center",
  padding: 20,
  width: screenWidth / 3,
}

const TEXT: TextStyle = {
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
        <Img imgUrl={imgUrl} />
        <Text style={TEXT} text={name} />
      </Box>
    </NativeBaseProvider>
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
    />
  )
}
