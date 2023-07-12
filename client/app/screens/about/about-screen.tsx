import "firebase/auth"
import { observer } from "mobx-react-lite"
import { Box, NativeBaseProvider, } from "native-base"
import React from "react"
import { Dimensions, Linking, StyleSheet, TouchableOpacity, ViewStyle } from "react-native"
import { Screen, Text, AutoImage as Image } from "../../components"
import { color } from "../../theme"

const cupcakeImage = require("../../resources/cupcake.png")

const facebookLogo = require("../../resources/facebookLogo.png")
const instaLogo = require("../../resources/instagramLogo.png")
const discordLogo = require("../../resources/discordLogo.png")
const tiktokLogo = require("../../resources/tiktokLogo.png")
const mailLogo = require("../../resources/mailLogo.png")

const sWidth = Dimensions.get("window").width
const sHeight = Dimensions.get("window").height

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const styles = StyleSheet.create({
  subHeaderStyle: {
    fontFamily: "Bitter-Bold",
    fontStyle: "italic",
    fontSize: sHeight * 0.04,
    color: color.palette.sand,
  },

  headerStyle: {
    fontFamily: "Bitter-Bold",
    fontStyle: "italic",
    fontSize: sHeight * 0.1,
    color: color.palette.sand,
  },

  headerTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: sHeight * 0.05,
    fontWeight: "600",
    color: color.palette.darkRed,
  },

  bodyTextStyle: {
    fontFamily: "Poppins",
    fontStyle: "normal",
    fontSize: sHeight * 0.025,
    fontWeight: "400",
    color: color.palette.darkRed,
  },

  topbox: {
    width: sWidth,
    height: sHeight * 0.6,
    paddingTop: "10rem",
    paddingLeft: "1.5rem",
    textAlign: "left",
    backgroundColor: color.palette.brown,
  },

  textBox: {
    zIndex: 1,
  },

  imageBox: {
    position: "absolute",
    top: -70,
    opacity: 0.5,
    zIndex: 0,
  },

  imageStyle: {
    width: "32rem",
    height: "27rem",
  },

  middlebox:{
    width: sWidth,
    height: sHeight * 0.6,
    padding: "1.5rem",
    textAlign: "left",
    backgroundColor: color.palette.sand,
  },

  socialMediaBox: {
    width: sWidth,
    height: sHeight * 0.15,
    display:"flex",
    flexDirection:"row",
    justifyContent:"center",    
    alignItems:"center",
    columnGap: "0.5rem",
    backgroundColor: color.palette.dustyPink,
  },
})

export const AboutScreen = observer(function AboutScreen() {

  const handleFacebookPress = () => {
    const externalLink = 'https://www.facebook.com/uoadessertsociety?mibextid=LQQJ4d';
    Linking.openURL(externalLink);
  };

  const handleInstaPress = () => {
    const externalLink = 'https://instagram.com/uoadessertsociety?igshid=NTc4MTIwNjQ2YQ==';
    Linking.openURL(externalLink);
  };

  const handleDiscordPress = () => {
    const externalLink = 'https://discord.gg/SrcgRFEH';
    Linking.openURL(externalLink);
  };

  const handleTikTokPress = () => {
    const externalLink = 'https://www.tiktok.com/@uoadessertsociety?_t=8cPhTjyUPyb&_r=1';
    Linking.openURL(externalLink);
  };

  const handleMailPress = () => {
    const externalLink = 'mailto:uoadessertsociety@gmail.com';
    Linking.openURL(externalLink);
  };

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box style={styles.topbox}>
          <Box style={styles.textBox}>
            <Text style={styles.subHeaderStyle}>
              University of Auckland
            </Text>
            <Text style={styles.headerStyle}>
              Dessert{'\n'}Society
            </Text>
          </Box>

          <Box style={styles.imageBox}>
            <Image source={cupcakeImage} style={styles.imageStyle}></Image>
          </Box>
        </Box>

        <Box style={styles.middlebox}>
          <Text style={styles.headerTextStyle}>
            What We Do 
          </Text>
          <Text style={styles.bodyTextStyle}>
          The Dessert Society aims to bring people together through the joy of dessert.
          {'\n'}{'\n'}
          With many different types of events, from bake-offs to cultural food events, we create an environment that anyone can join and have their sweet tooth fulfilled.
          {'\n'}{'\n'}
          As a member, you gain access to discounts and deals at our sponsored dessert hotspots.
          </Text>
        </Box>

        <Box style={styles.socialMediaBox}>
          <TouchableOpacity onPress={handleFacebookPress}>
            <Image source={facebookLogo}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleInstaPress}>
            <Image source={instaLogo}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleDiscordPress}>
            <Image source={discordLogo}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleTikTokPress}>
            <Image source={tiktokLogo}/>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={handleMailPress}>
            <Image source={mailLogo}/>
          </TouchableOpacity>
        </Box>
      
      </NativeBaseProvider>
    </Screen>
  )
})
