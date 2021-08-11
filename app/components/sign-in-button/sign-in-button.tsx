import * as React from "react"
import { TouchableOpacity } from "react-native"
import { Text } from "../text-example/text"
import { viewPresets, textPresets } from "./sign-in-button.presets"
import { SignInButtonProps } from "./sign-in-button.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function SignInButton(props: SignInButtonProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    style: styleOverride,
    textStyle: textStyleOverride,
    children,
    ...rest
  } = props

  const viewStyle = viewPresets[preset] || viewPresets.primary
  const viewStyles = [viewStyle, styleOverride]
  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  return (
    <TouchableOpacity style={viewStyles} {...rest}>
      {content}
    </TouchableOpacity>
  )
}
