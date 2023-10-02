/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import {
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  View,
  ImageBackground,
} from "react-native"
import { Screen, Text, AutoImage as Image } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, FlatList, Stack, HStack } from "native-base"
import firebase from "firebase"
import axios from "axios"
import { BASE_URL } from "@env"
import { SocialIcon } from "react-social-icons"
import { padding } from "styled-system"

const uadsLogo = require("../../resources/menu-icon.png")
const calendarIcon = require("../../resources/calendar-icon.png")

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const CONTAINER: ViewStyle = {
  backgroundColor: color.palette.brown,
  marginTop: 10,
  paddingHorizontal: 30,
  paddingVertical: 10,
}

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: color.palette.palePeach,
    borderRadius: 15,
    flex: 1,
    height: "180px",
    margin: 5,
    width: "100%",
  },
  cardTextStyle: {
    flex: 1,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: "auto",
    fontSize: 18,
    width: "100%",
    textAlign: "left",
  },
  imageGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
  },
  cardTextHeader: {
    fontFamily: "Bitter-Bold",
    fontWeight: "700",
    fontSize: 22,
    color: color.palette.palePeach,
  },
  cardTextLocation: {
    fontWeight: "500",
    fontSize: 13,
    color: color.palette.palePeach,
  },
  header: {
    fontFamily: "Bitter-Bold",
    fontSize: 40,
    lineHeight: 48,
    textAlign: "left",
    fontWeight: "700",
    fontStyle: "italic",
    color: color.palette.darkRed,
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
    fontSize: 24,
    lineHeight: 20,
    fontWeight: "600",
    color: color.palette.sand,
  },
  gradient: {
    flex: 1,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "transparent",
    backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0) 25%, rgba(0,0,0,1))",
  },
})

export const EventsScreen = observer(function OffersScreen() {
  const navigation = useNavigation()
  const isVisible = useIsFocused()

  const [sWidth, setSWidth] = useState(0)
  const [sHeight, setSHeight] = useState(0)

  // Calculate screen dimensions on mount
  useEffect(() => {
    setSWidth(Dimensions.get("window").width)
    setSHeight(Dimensions.get("window").height)
  }, [])
  const currentDateAndTime: Date = new Date()
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
        {/* Hamburger Menu Icon */}
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 20,
            paddingHorizontal: 10,
            paddingBottom: 5,
          }}
        >
          <Image
            source={require("../../resources/menu-icon.png")}
            style={{
              width: sWidth * 0.2,
              height: sHeight * 0.04,
              resizeMode: "contain",
            }}
          />
          <Image
            source={require("../../resources/logo.png")}
            style={{
              width: sWidth * 0.3,
              height: sHeight * 0.06,
              resizeMode: "contain",
            }}
          />
        </Box>

        <Box
          style={{
            marginHorizontal: 30,
          }}
        >
          <Text style={styles.header} preset="header" text={"Welcome back, " + firstName + " :)"} />

          <Image
            source={require("../../resources/fourPointStar.png")}
            style={{
              position: "absolute",
              right: 10,
              bottom: 0,
              width: sWidth * 0.25,
              height: sHeight * 0.05,
              resizeMode: "contain",
            }}
          />

          <Image
            source={require("../../resources/fourPointStar.png")}
            style={{
              position: "absolute",
              right: 0,
              bottom: 20,
              width: sWidth * 0.15,
              height: sHeight * 0.04,
              resizeMode: "contain",
            }}
          />
        </Box>

        <Box style={CONTAINER}>
          {/* Upcoming Events Box */}
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={styles.textStyle}
              preset="header"
              text={events.length === 0 ? "Stay tuned for upcoming events!" : "Upcoming Events:"}
            />

            <Image
              source={require("../../resources/calendar-icon.png")}
              style={{
                width: sWidth * 0.15,
                height: sHeight * 0.04,
                resizeMode: "contain",
              }}
            />
          </Box>

          <Stack>
            {events.length === 0 ? (
              <Image source={uadsLogo} style={styles.logoStyle} />
            ) : (
              <FlatList
                style={{ overflow: "visible" }}
                // sort out filter
                data={events.filter((item) => {
                  // Convert the datetime string to a Date object
                  const itemDatetime = new Date(item.dateTime)

                  // Compare the item's datetime with the current time
                  return itemDatetime >= currentDateAndTime
                })}
                numColumns={1}
                keyExtractor={(item) => item.uuid}
                renderItem={({ item, index }) => {
                  const { name, desc, imagePath, location, urlSignUp, dateTime } = item
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
                          }}
                        >
                          <View
                            style={{
                              position: "relative", // To position child elements
                              width: "100%",
                              // experiment with height values
                              height: "160px",
                            }}
                          >
                            <Image
                              source={imagePath}
                              style={{
                                flex: 1,
                                width: "100%",
                              }}
                            />
                            <View style={styles.gradient} />

                            <View
                              style={{
                                position: "absolute", // Position text absolutely over the image
                                left: 0,
                                bottom: 0,
                                padding: 10,
                                justifyContent: "center", // Center the text vertically
                              }}
                            >
                              <Text
                                style={[styles.cardTextStyle, styles.cardTextHeader]}
                                numberOfLines={1}
                                preset="bold"
                              >
                                {name}
                              </Text>
                              <Text style={[styles.cardTextStyle, styles.cardTextLocation]}>
                                {location}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              padding: 10,
                            }}
                          >
                            <Text style={[styles.cardTextStyle]} preset="bold">
                              {dateTime}
                            </Text>
                            <Text style={[styles.cardTextStyle]}>{desc}</Text>
                          </View>
                          <div
                            style={{
                              flex: "1 1 auto",
                              marginTop: "5px",
                              marginBottom: "5px",
                              width: "100%",
                            }}
                          ></div>
                        </div>
                      </TouchableOpacity>
                    </Box>
                  )
                }}
              />
            )}
          </Stack>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <Text
              style={styles.textStyle}
              preset="header"
              //TODO change logic for past events
              text={events.length === 0 ? "No Past Events:" : "Past Events:"}
            />

            <Image
              source={require("../../resources/calendar-past-icon.png")}
              style={{
                width: sWidth * 0.15,
                height: sHeight * 0.04,
                resizeMode: "contain",
              }}
            />
          </Box>

          <Stack>
            {events.length === 0 ? (
              <Image source={uadsLogo} style={styles.logoStyle} />
            ) : (
              <FlatList
                style={{ overflow: "visible" }}
                data={events.filter((item) => {
                  // Convert the datetime string to a Date object
                  const itemDatetime = new Date(item.dateTime)

                  // Compare the item's datetime with the current time
                  return itemDatetime < currentDateAndTime
                })}
                numColumns={1}
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
          </Stack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
