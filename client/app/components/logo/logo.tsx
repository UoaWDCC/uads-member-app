import * as React from "react"
import { View, ImageStyle } from "react-native"
import { AutoImage as Image } from "../auto-image-example/auto-image"
import { LogoProps } from "./logo.props"
import { logos } from "./logos"

const ROOT: ImageStyle = {
  resizeMode: "contain",
}

export function Logo(props: LogoProps) {
  const { style: styleOverride, logo, containerStyle } = props

  return (
    <View style={containerStyle}>
      <Image style={[ROOT, styleOverride]} source={logos[logo]} />
    </View>
  )
}