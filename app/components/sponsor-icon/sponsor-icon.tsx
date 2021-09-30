import * as React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { color, typography } from "../../theme"
import { Text } from "../"
import { NativeBaseProvider, Image, Box } from "native-base"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
  alignItems: "center",
  padding: 5
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontSize: 14,
  color: color.text,
  marginTop: 10
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

export const Img = ({ imgUrl }) => {
  return (
    <Image
      source={{
        uri: imgUrl,
      }}
      alt="Alternate Text"
      size="xl"
      borderRadius={100}
    />
  )
}
