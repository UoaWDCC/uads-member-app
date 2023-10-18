/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity, Dimensions, View } from "react-native"
import { Screen, Text, AutoImage as Image } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, FlatList, Stack, Button } from "native-base"
import firebase from "firebase"
import axios from "axios"
import { BASE_URL } from "@env"
import { SocialIcon } from "react-social-icons"
import { TabNavigatorParamList } from "../../navigators"
import { DrawerNavigationProp } from "@react-navigation/drawer"
import { paddingBottom } from "styled-system"

const uadsLogo = require("../../resources/icon.png")
const menuIcon = require("../../resources/menu-icon.svg")
const calendarIcon = require("../../resources/calendar-icon.png")
const pastCalendarIcon = require("../../resources/calendar-past-icon.png")

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
    marginVertical: 10,
    width: "100%",
  },
  topButtonBoxStyle: {
    position: "absolute",
    top: 10,
    right: 10,
    display: "flex",
    flexDirection: "row",
    zIndex: 10,
  },
  goingButtonStyle: {
    backgroundColor: color.palette.sand,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    padding: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  goingButtonTextStlye: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 12,
    color: color.palette.darkRed,
  },
  notGoingButtonStyle: {
    backgroundColor: color.palette.dustyPink,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
    padding: 10,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 20,
  },
  notGoingButtonTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 12,
    color: color.palette.sand,
  },
  eventImageStyle: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  cardBottomBoxStyle: {
    height: "auto",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  cardBottomButtonBoxStyle: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  moreInfoButtonStyle: {
    backgroundColor: color.palette.dustyPink,
    borderRadius: 5,
    padding: 10,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  infoTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 12,
    color: color.palette.sand,
  },
  signUpButtonStyle: {
    backgroundColor: color.palette.darkRed,
    borderRadius: 5,
    padding: 10,
    width: 110,
    justifyContent: "center",
    alignItems: "center",
  },
  signUpTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    lineHeight: 12,
    color: color.palette.sand,
  },
  cardTextStyleBold: {
    fontSize: 16,
    width: "100%",
    textAlign: "left",
    color: color.palette.darkRed,
    fontWeight: "600",
  },
  cardTextStyle: {
    fontSize: 16,
    width: "100%",
    textAlign: "left",
    color: color.palette.darkRed,
    paddingVertical: 5,
  },
  eventInfoBoxStyle: {
    position: "absolute",
    bottom: 0,
    height: "auto",
    width: "100%",
    paddingHorizontal: 10,
    zIndex: 10,
  },
  eventNameStyle: {
    fontSize: 24,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: color.palette.palePeach,
    fontStyle: "italic",
  },
  eventLocationStyle: {
    fontSize: 16,
    fontFamily: "Poppins",
    fontWeight: "500",
    color: color.palette.palePeach,
  },
  cardTextHeader: {
    fontFamily: "Bitter-Bold",
    fontWeight: "700",
    fontSize: 22,
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
  headerStyle: {
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
  menuIconStyle: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    paddingTop: 20,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  eventTitleBoxStyle: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 5,
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

  const [sWidth, setSWidth] = useState(0)
  const [sHeight, setSHeight] = useState(0)

  // Calculate screen dimensions on mount
  useEffect(() => {
    setSWidth(Dimensions.get("window").width)
    setSHeight(Dimensions.get("window").height)
  }, [])
  const [openedEvents, setOpenedEvents] = useState([])

  // Handles the Opening/Closing of the Event Boxes
  const handleToggleEvent = (eventId: string) => {
    // Check if the Event ID is already in the openedEvents array
    const isOpened = openedEvents.includes(eventId)

    // If the eventId is not in the Opened Array then Add it
    if (!isOpened) {
      setOpenedEvents([...openedEvents, eventId])
    } else {
      setOpenedEvents(openedEvents.filter((id) => id !== eventId))
    }
  }
  // Creates a new Date Object Every time the Page is Loaded
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
      dateTimeString: string
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
            data.forEach((event) => {
              const itemDatetime = new Date(event.dateTime)
              const formattedDate = itemDatetime.toLocaleDateString("en-US", options)
              event["dateTimeString"] = formattedDate
            })
            setEvents(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [isVisible])

  // Used to Format the Date Objects
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }

  const renderEvent = ({ item }) => {
    return (
      <Box style={{ flexDirection: "column", alignItems: "center" }}>
        {/* Conditional Rendering based on whether the More Info is active or not */}
        {!openedEvents.includes(item._id) ? (
          // Event is Closed

          // Event Box
          <Box style={styles.cardStyle}>
            {/* Top Half of the Events (Image, Name, Location, Going/Not Going Buttons) */}
            <Box style={{ height: 175 }}>
              {/* Box for Going and Not Going Buttons */}
              <Box style={styles.topButtonBoxStyle}>
                {/* Going Button */}
                <TouchableOpacity style={styles.goingButtonStyle}>
                  <Text style={styles.goingButtonTextStlye}>Going</Text>
                </TouchableOpacity>

                {/* Not Going Button */}
                <TouchableOpacity style={styles.notGoingButtonStyle}>
                  <Text style={styles.notGoingButtonTextStyle}>Not Going</Text>
                </TouchableOpacity>
              </Box>

              {/* Background Image */}
              <Image source={item.imagePath} style={styles.eventImageStyle} />

              {/* Background Image Black Gradient */}
              <View style={styles.gradient} />

              {/* Event Name and Address */}
              <Box style={styles.eventInfoBoxStyle}>
                <Text style={styles.eventNameStyle}>{item.name}</Text>

                <Text style={styles.eventLocationStyle}>{item.location}</Text>
              </Box>
            </Box>

            {/* Bottom Half of the Events (Date, Time, More Info, SignUp) */}
            <Box style={styles.cardBottomBoxStyle}>
              {/* Event Date */}
              <Text style={styles.cardTextStyleBold}>{item.dateTimeString}</Text>

              {/* Button Box */}
              <Box style={styles.cardBottomButtonBoxStyle}>
                {/* More Info Button */}
                <TouchableOpacity
                  style={styles.moreInfoButtonStyle}
                  onPress={() => {
                    handleToggleEvent(item._id)
                  }}
                >
                  <Text style={styles.infoTextStyle}>More Info +</Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButtonStyle}>
                  <Text style={styles.signUpTextStyle}>Sign Up</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        ) : (
          // Event is Opened

          // Event Box
          <Box style={styles.cardStyle}>
            {/* Top Half of the Events (Image, Name, Location) */}
            <Box style={{ height: 175 }}>
              {/* Box for Going and Not Going Buttons */}
              <Box style={styles.topButtonBoxStyle}>
                {/* Going Button */}
                <TouchableOpacity style={styles.goingButtonStyle}>
                  <Text style={styles.goingButtonTextStlye}>Going</Text>
                </TouchableOpacity>

                {/* Not Going Button */}
                <TouchableOpacity style={styles.notGoingButtonStyle}>
                  <Text style={styles.notGoingButtonTextStyle}>Not Going</Text>
                </TouchableOpacity>
              </Box>

              {/* Background Image */}
              <Image source={item.imagePath} style={styles.eventImageStyle} />

              {/* Background Image Black Gradient */}
              <View style={styles.gradient} />

              {/* Event Name and Address */}
              <Box style={styles.eventInfoBoxStyle}>
                <Text style={styles.eventNameStyle}>{item.name}</Text>

                <Text style={styles.eventLocationStyle}>{item.location}</Text>
              </Box>
            </Box>

            {/* Bottom Half of the Events (Date, Time, More Info, SignUp) */}
            <Box style={styles.cardBottomBoxStyle}>
              {/* Event Date */}
              <Text style={styles.cardTextStyleBold}>{item.dateTimeString}</Text>

              {/* Event Description */}
              <Text style={styles.cardTextStyle}>{item.desc}</Text>

              {/* Button Box */}
              <Box style={styles.cardBottomButtonBoxStyle}>
                {/* More Info Button */}
                <TouchableOpacity
                  style={styles.moreInfoButtonStyle}
                  onPress={() => {
                    handleToggleEvent(item._id)
                  }}
                >
                  <Text style={styles.infoTextStyle}>Less Info -</Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity style={styles.signUpButtonStyle}>
                  <Text style={styles.signUpTextStyle}>Sign Up</Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  function getUpi(): string {
    const userUpi = firebase.auth().currentUser?.email?.replace("@aucklanduni.ac.nz", "")
    return userUpi
  }
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        {/* Hamburger Menu Icon */}
        <Box style={styles.menuIconStyle}>
          <Button 
            style={{backgroundColor: "transparent", zIndex: 10}}
            onPress={() => navigation.openDrawer()}
          >
          <Image
            source={require("../../resources/menu-icon.png")}
            style={{
              width: sWidth * 0.2,
              height: sHeight * 0.04,
              resizeMode: "contain",
            }}
          />
          </Button>
          <Image
            source={require("../../resources/logo.png")}
            style={{
              width: sWidth * 0.3,
              height: sHeight * 0.06,
              resizeMode: "contain",
            }}
          />
        </Box>

        <Box style={{ marginHorizontal: 30 }}>
          {/* Welcome Message */}
          <Text style={styles.header} preset="header" text={"Welcome back, " + firstName + " :)"} />

          {/* Star Icons */}
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
          {/* Upcoming Events Title Box */}
          <Box style={styles.eventTitleBoxStyle}>
            <Text
              style={styles.headerStyle}
              preset="header"
              text={events.length === 0 ? "Stay tuned for upcoming events!" : "Upcoming Events:"}
            />

            <Image
              source={calendarIcon}
              style={{
                width: sWidth * 0.15,
                height: sHeight * 0.04,
                resizeMode: "contain",
              }}
            />
          </Box>

          {/* Upcoming Events List */}
          <Stack>
            {events.length === 0 ? (
              <Image source={uadsLogo} style={styles.logoStyle} />
            ) : (
              <FlatList
                style={{ overflow: "hidden" }}
                // Filters Events by Current Date
                data={events.filter((item) => {
                  // Convert the Datetime String to a Date Object
                  const itemDatetime = new Date(item.dateTime)

                  // Compare the Item's Datetime with the Current Time
                  return itemDatetime >= currentDateAndTime
                })}
                numColumns={1}
                keyExtractor={(item) => item.uuid}
                renderItem={renderEvent}
              />
            )}
          </Stack>

          {/* Past Events Title Box */}
          <Box style={styles.eventTitleBoxStyle}>
            <Text
              style={styles.headerStyle}
              preset="header"
              text={events.length === 0 ? "No Past Events:" : "Past Events:"}
            />

            <Image
              source={pastCalendarIcon}
              style={{
                width: sWidth * 0.15,
                height: sHeight * 0.04,
                resizeMode: "contain",
              }}
            />
          </Box>

          {/* Past Events List */}
          <Stack>
            {events.length === 0 ? (
              <Image source={uadsLogo} style={styles.logoStyle} />
            ) : (
              <FlatList
                style={{ overflow: "hidden" }}
                // Filters Events by Current Date
                data={events.filter((item) => {
                  // Convert the Datetime String to a Date Object
                  const itemDatetime = new Date(item.dateTime)

                  // Compare the Item's Datetime with the Current Time
                  return itemDatetime < currentDateAndTime
                })}
                numColumns={1}
                keyExtractor={(item) => item.uuid}
                renderItem={renderEvent}
              />
            )}
          </Stack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
