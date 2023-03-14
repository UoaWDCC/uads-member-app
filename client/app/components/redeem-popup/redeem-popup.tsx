import * as React from "react"
import { Modal } from "react-native"
import { Text } from "../text-example/text"
import { textPresets } from "./redeem-popup.presets"
import { RedeemPopupProps } from "./redeem-popup.props"

/**
 * For your text displaying needs.
 *
 * This component is a HOC over the built-in React Native one.
 */
export function RedeemPopup(props: RedeemPopupProps) {
  // grab the props
  const {
    preset = "primary",
    tx,
    text,
    textStyle: textStyleOverride,
    children,
    isVisible,
    ...rest
  } = props

  const textStyle = textPresets[preset] || textPresets.primary
  const textStyles = [textStyle, textStyleOverride]

  const content = children || <Text tx={tx} text={text} style={textStyles} />

  return (
    <Modal visible={isVisible} transparent={true} {...rest}>
      {content}
    </Modal>
  )
}
