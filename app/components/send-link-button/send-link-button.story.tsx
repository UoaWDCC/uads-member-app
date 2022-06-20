import * as React from "react"
import { ViewStyle, TextStyle, Alert } from "react-native"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { SendLinkButton } from "./send-link-button"
import { color } from "styled-system"

declare let module

const buttonStyleArray: ViewStyle[] = [{ paddingVertical: 100 }, { borderRadius: 0 }]

const buttonTextStyleArray: TextStyle[] = [{ fontSize: 20 }, { color: color.text }]

storiesOf("SendLinkButton", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary button.">
        <SendLinkButton text="Click It" preset="primary" onPress={() => Alert.alert("pressed")} />
      </UseCase>
      <UseCase text="Disabled" usage="The disabled behaviour of the primary button.">
        <SendLinkButton
          text="Click It"
          preset="primary"
          onPress={() => Alert.alert("pressed")}
          disabled
        />
      </UseCase>
      <UseCase text="Array Style" usage="Button with array style">
        <SendLinkButton
          text="Click It"
          preset="primary"
          onPress={() => Alert.alert("pressed")}
          style={buttonStyleArray}
          textStyle={buttonTextStyleArray}
        />
      </UseCase>
    </Story>
  ))
