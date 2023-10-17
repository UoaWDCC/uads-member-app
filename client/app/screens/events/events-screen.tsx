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
  const [openedEvents, setOpenedEvents] = useState([])

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
              const formattedDate = itemDatetime.toLocaleDateString('en-US', options)
              event["dateTimeString"] = formattedDate
            })
            setEvents(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [isVisible])

  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  };

  const renderEvent = ( {item }) => {
    
    return (
      <Box style={{ flexDirection: "column", alignItems: "center"}}>
        {!openedEvents.includes(item._id) ? (
          // Event is Closed
          
          // Event Box
          <Box style={styles.cardStyle}>
            {/* Top Half of the Events (Image, Name, Location) */}
            <Box 
              style={{
                height: 175,
              }}  
            >
              {/* Box for Going and Not Going Buttons */}
              <Box
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  display: "flex",
                  flexDirection: "row",
                  zIndex: 10,
                }}
              >
                {/* Going Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.sand,
                    borderTopLeftRadius: 5,
                    borderBottomLeftRadius: 5,
                    padding: 10,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.darkRed,
                    }}
                  >
                    Going
                  </Text>
                </TouchableOpacity>
                  
                {/* Not Going Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.dustyPink,
                    borderTopRightRadius: 5,
                    borderBottomRightRadius: 5,
                    padding: 10,
                    width: 100,
                    justifyContent: "center",
                    alignItems: "center",
                    zIndex: 50,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.sand,
                    }}
                  >
                    Not Going
                  </Text>
                </TouchableOpacity>
              </Box>
                
              <Image
                source={item.imagePath}
                style={{
                  width: "100%",
                  height: "100%",
                  resizeMode: "stretch",  
                }}
              />

              <View style={styles.gradient} />

              {/* Event Name and Address */}
              <Box
                style={{
                  position: "absolute",
                  // backgroundColor: color.palette.darkRed,
                  bottom: 0,
                  height: "auto",
                  width: "100%",
                  paddingHorizontal: 10,
                  zIndex: 10,
                }}
              >
                <Text
                  style={{                 
                    fontSize: 24,
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: color.palette.palePeach,
                    fontStyle: "italic",
                  }}
                >
                  {item.name}
                </Text>

                <Text
                  style={{  
                    fontSize: 16,
                    fontFamily: "Poppins",
                    fontWeight: "500",
                    color: color.palette.palePeach,
                  }}
                >
                  {item.location}
                </Text>
              </Box>

            </Box>

            {/* Bottom Half of the Events (Date, Time, More Info, SignUp) */}
            <Box
                style={{
                  height: "auto",
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                }}  
            >
              {/* Event Date */}
              <Text style={styles.cardTextStyleBold}>
                {item.dateTimeString}
              </Text>

              {/* Button Box */}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                {/* More Info Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.dustyPink,
                    borderRadius: 5,
                    padding: 10,
                    width: 110,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleToggleEvent(item._id)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.sand,
                    }}
                  >
                    More Info +
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={{  
                    backgroundColor: color.palette.darkRed,
                    borderRadius: 5,
                    padding: 10,
                    width: 110,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.sand,
                    }}
                  >
                    Sign Up
                  </Text>
                </TouchableOpacity>

              </Box>

            </Box>

          </Box>
        ) : (
          // Event is Opened 

          // Event Box
          <Box style={styles.cardStyle}>
            {/* Top Half of the Events (Image, Name, Location) */}
            <Box 
                style={{
                  height: 175,
                }}  
              >
                {/* Box for Going and Not Going Buttons */}
                <Box
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 10,
                    display: "flex",
                    flexDirection: "row",
                    zIndex: 10,
                  }}
                >
                  {/* Going Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: color.palette.sand,
                      borderTopLeftRadius: 5,
                      borderBottomLeftRadius: 5,
                      padding: 10,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 50,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        lineHeight: 12,
                        color: color.palette.darkRed,
                      }}
                    >
                      Going
                    </Text>
                  </TouchableOpacity>
                  
                  {/* Not Going Button */}
                  <TouchableOpacity
                    style={{
                      backgroundColor: color.palette.dustyPink,
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5,
                      padding: 10,
                      width: 100,
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 50,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                        fontFamily: "Poppins",
                        fontWeight: "500",
                        lineHeight: 12,
                        color: color.palette.sand,
                      }}
                    >
                      Not Going
                    </Text>
                  </TouchableOpacity>
                </Box>
                
                <Image
                  source={item.imagePath}
                  style={{
                    width: "100%",
                    height: "100%",
                    resizeMode: "stretch",  
                  }}
                />

                <View style={styles.gradient} />

                {/* Event Name and Address */}
                <Box
                  style={{
                    position: "absolute",
                    // backgroundColor: color.palette.darkRed,
                    bottom: 0,
                    height: "auto",
                    width: "100%",
                    paddingHorizontal: 10,
                    zIndex: 10,
                  }}
                >
                  <Text
                    style={{                 
                      fontSize: 24,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: color.palette.palePeach,
                      fontStyle: "italic",
                    }}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{  
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: color.palette.palePeach,
                    }}
                  >
                    {item.location}
                  </Text>
                </Box>

            </Box>

            {/* Bottom Half of the Events (Date, Time, More Info, SignUp) */}
            <Box
              style={{
                height: "auto",
                paddingHorizontal: 10,
                paddingVertical: 5,
              }}  
            >
              {/* Event Date */}
              <Text style={styles.cardTextStyleBold}>
                {item.dateTimeString}
              </Text>

              {/* Event Description */}
              <Text style={styles.cardTextStyle}>
                {item.desc}
              </Text>

              {/* Button Box */}
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginVertical: 5,
                }}
              >
                {/* More Info Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.dustyPink,
                    borderRadius: 5,
                    padding: 10,
                    width: 110,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleToggleEvent(item._id)
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.sand,
                    }}
                  >
                    Less Info -
                  </Text>
                </TouchableOpacity>

                {/* Sign Up Button */}
                <TouchableOpacity
                  style={{  
                    backgroundColor: color.palette.darkRed,
                    borderRadius: 5,
                    padding: 10,
                    width: 110,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      lineHeight: 12,
                      color: color.palette.sand,
                    }}
                  >
                    Sign Up
                  </Text>
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
              marginBottom: 5,
            }}
          >
            <Text
              style={styles.headerStyle}
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
                renderItem={renderEvent}
              />
            )}
          </Stack>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
              marginVertical: 5,
            }}
          >
            <Text
              style={styles.headerStyle}
              preset="header"
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
                renderItem={renderEvent}
              />
            )}
          </Stack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
