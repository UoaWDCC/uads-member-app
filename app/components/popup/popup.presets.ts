import { ViewStyle, TextStyle } from "react-native"
import { color } from "../../theme"

/**
 * All text will start off looking like this.
 */
const BASE_VIEW: ViewStyle = {
  borderRadius: 4,
  justifyContent: "center",
  alignItems: "center",
}

/**
 * All the variations of text styling within the app.
 *
 * You want to customize these to whatever you need in your app.
 */
export const viewPresets: Record<string, ViewStyle> = {
  /**
   * A smaller piece of secondard information.
   */
  primary: { ...BASE_VIEW, backgroundColor: color.palette.brown } as ViewStyle,
}

export const textPresets: Record<PopupPresets, TextStyle> = {
  primary: {fontSize: 15, color: color.palette.white} as TextStyle
}

/**
 * A list of preset names.
 */
export type PopupPresets = keyof typeof viewPresets
