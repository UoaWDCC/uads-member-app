/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity, Dimensions } from "react-native"
import { Screen, Text, AutoImage as Image, Button } from "../../components"
import { useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, FlatList, Stack, HStack } from "native-base"
import firebase from "firebase"
import axios from "axios"
import { BASE_URL } from "@env"
import { SocialIcon } from "react-social-icons"
import { TabNavigatorParamList } from "../../navigators"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { paddingBottom } from "styled-system"

const uadsLogo = require("../../resources/icon.png")
const menuIcon = require("../../resources/menu-icon.svg")

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.background,
  marginTop: 10,
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: color.palette.goldenGlow,
    borderRadius: 15,
    flex: 1,
    height: "180px",
    margin: 5,
    paddingHorizontal: "5px",
    paddingVertical: "5px",
    width: "100px",
  },
  cardTextStyle: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    fontSize: 18,
    textAlign: "center",
    width: "100%",
  },
  header: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    textAlign: "center",
    textDecorationColor: color.palette.brown,
  },
  logoStyle: {
    alignSelf: "center",
    height: 150,
    width: 200,
  },
  socialStyle: {
    marginBottom: 10,
    marginHorizontal: 10,
  },
  socialTextStyle: {
    fontSize: 14,
    marginLeft: 15,
    marginTop: 12,
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: "center",
  },
  iconStyle: {
    height: 30,
    width: 30,
  },
  menuBtnStyle: {
    padding: 20, // Increase padding to make the button bigger
    position: "fixed", // Position it at the top left corner
    top: 10,
    left: 10,
    zIndex: 10,
  },
})

interface EventsScreenProps {
  navigation: DrawerNavigationProp<TabNavigatorParamList, "events">
}

export const EventsScreen = observer(function OffersScreen({ navigation }: EventsScreenProps) {
  const isVisible = useIsFocused()

  const sWidth = Dimensions.get("window").width
  const sHeight = Dimensions.get("window").height

  const [firstName, setFirstName] = useState<string>("")
  const [events, setEvents] = useState<
    {
      uuid: string
      name: string
      desc: string
      dateTime: string
      location: string
      imagePath: string
      sponsor?: string[]
      urlSignUp?: string
    }[]
  >([])

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(async function (idToken) {
        const upi = await getUpi()
        axios
          .get(BASE_URL + `/users/${upi}`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then((res) => {
            const { firstName } = res.data
            setFirstName(firstName)
          })
          .catch((e) => {
            console.error(e)
          })
        axios
          .get(BASE_URL + `/event`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then(({ data }) => {
            console.log(data)
            setEvents(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [isVisible])

  function getUpi(): string {
    const userUpi = firebase.auth().currentUser?.email?.replace("@aucklanduni.ac.nz", "")
    return userUpi
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 35,
            paddingHorizontal: 10,
            paddingBottom: 20, // Add padding to the bottom of the header row
          }}
        >
          <Button
            onPress={() => {
              // Handle press
              navigation.openDrawer()
            }}
            style={styles.menuBtnStyle}
          >
            <Image
              source={require("../../resources/menu-icon.svg")}
              style={{
                width: sWidth * 0.2,
                height: sHeight * 0.05,
                resizeMode: "contain",
              }}
            />
          </Button>
          <Image
            source={require("../../resources/logo.png")}
            style={{
              width: sWidth * 0.54,
              height: sHeight * 0.07,
              resizeMode: "contain",
              position: "absolute",
              top: 10, 
              right: 0,
        
            }}
          />
        </Box>

        <Text style={styles.header} preset="header" text={"Welcome " + firstName} />
        <Text
          style={styles.textStyle}
          preset="header"
          text={events.length === 0 ? "Stay tuned for upcoming events!" : "Upcoming Events:"}
        />
        <Box style={CONTAINER}>
          <Stack>
            {events.length === 0 ? (
              <Image source={uadsLogo} style={styles.logoStyle} />
            ) : (
              <FlatList
                style={{ overflow: "visible" }}
                data={events}
                numColumns={2}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item, index }) => {
                  const { name, imagePath } = item
                  return (
                    <Box key={index} style={styles.cardStyle}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("event", item)
                        }}
                        style={{ height: "100%", width: "100%" }}
                      >
                        <div
                          style={{
                            display: "flex",
                            flexFlow: "column",
                            height: "100%",
                            width: "calc(100% - 10px)",
                            marginRight: "5px",
                            marginLeft: "5px",
                          }}
                        >
                          <Text style={styles.cardTextStyle} numberOfLines={1} preset="bold">
                            {name}
                          </Text>
                          <div
                            style={{
                              flex: "1 1 auto",
                              marginTop: "5px",
                              marginBottom: "5px",
                              width: "100%",
                            }}
                          >
                            <img
                              alt={name}
                              src={imagePath}
                              // eslint-disable-next-line react-native/no-inline-styles
                              style={{
                                borderRadius: "10px",
                                width: "100%",
                                height: "130px",
                                objectFit: "cover",
                              }}
                            />
                          </div>
                        </div>
                      </TouchableOpacity>
                    </Box>
                  )
                }}
              />
            )}
            <Stack style={{ marginVertical: 20 }}>
              <HStack style={styles.socialStyle}>
                <SocialIcon
                  url="https://www.instagram.com/uoadessertsociety/"
                  style={{ height: 40, width: 40 }}
                />
                <Text style={styles.socialTextStyle} preset="secondary" text="@uoadessertsociety" />
              </HStack>
              <HStack style={styles.socialStyle}>
                <SocialIcon
                  url="https://www.tiktok.com/@uoadessertsociety"
                  style={{ height: 40, width: 40 }}
                />
                <Text style={styles.socialTextStyle} preset="secondary" text="@uoadessertsociety" />
              </HStack>
              <HStack style={styles.socialStyle}>
                <SocialIcon
                  url="https://www.facebook.com/uoadessertsociety"
                  style={{ height: 40, width: 40 }}
                />
                <Text style={styles.socialTextStyle} preset="secondary" text="@uoadessertsociety" />
              </HStack>
              <HStack style={styles.socialStyle}>
                <SocialIcon
                  url="https://discord.com/invite/UaeCB7xA"
                  style={{ height: 40, width: 40 }}
                />
                <Text
                  style={styles.socialTextStyle}
                  preset="secondary"
                  text="University of Auckland Dessert Society"
                />
              </HStack>
            </Stack>
          </Stack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
