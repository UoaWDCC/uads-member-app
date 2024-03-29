// import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
// import { ViewStyle, TextStyle, TouchableOpacity, StyleSheet } from "react-native"
import { Button, Screen, SponsorIcon, AutoImage as Image } from "../../components"
import { Text } from "../../components"
import { Box, FlatList, NativeBaseProvider } from "native-base"
import {
  Animated,
  Dimensions,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import React, { useEffect, useMemo, useRef, useState } from "react"
// import { Screen, SponsorIcon } from "../../components"
import { color, typography } from "../../theme"

import { BASE_URL } from "@env"
import { TabNavigatorParamList } from "../../navigators"
import { DrawerNavigationProp } from "@react-navigation/drawer"

import Icon from "react-native-vector-icons/FontAwesome"
// import { Text } from "../../components"
import axios from "axios"
import firebase from "firebase"
// import { observer } from "mobx-react-lite"
import { ScrollView } from "react-native-gesture-handler"

const menuIcon = require("../../resources/menu-icon.svg")

interface SponsorsScreenProps {
  navigation: DrawerNavigationProp<TabNavigatorParamList, "events">
}


const ROOT: ViewStyle = {
  backgroundColor: color.palette.palePeach,
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 40,
  color: color.text,
  marginTop: 60,
  marginLeft: 30,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.palePeach,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
}

const SPONSORICON: ViewStyle = {
  flexDirection: "column",
  margin: 1,
}

const styles = StyleSheet.create({
  iconStyle: {
    height: 30,
    width: 30,
  },
  menuBtnStyle: {
    padding: 20, // Increase padding to make the button bigger
    positionW: "fixed", // Position it at the top left corner
    top: 10,
    left: 10,
    zIndex: 10,
  },
})

export const SponsorsScreen = observer(function SponsorsScreen({
  navigation,
}: SponsorsScreenProps) {
  const [sponsors, setSponsors] = useState([])
  const [openedSponsors, setOpenedSponsors] = useState([])

  const handleToggleSponsor = (sponsorId: string) => {
    // Check if the sponsorId is already in the openedSponsors array
    const isOpened = openedSponsors.includes(sponsorId)

    // If the sponsorId is not in the openedSponsors array, add it
    if (!isOpened) {
      setOpenedSponsors([...openedSponsors, sponsorId])
    } else {
      // If the sponsorId is in the openedSponsors array, remove it
      setOpenedSponsors(openedSponsors.filter((id) => id !== sponsorId))
    }
  }

  const [sWidth, setSWidth] = useState(0)
  const [sHeight, setSHeight] = useState(0)

  // Calculate screen dimensions on mount
  useEffect(() => {
    setSWidth(Dimensions.get("window").width)
    setSHeight(Dimensions.get("window").height)
  }, [])

  // Fetch sponsors on mount
  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        axios
          .get(BASE_URL + `/sponsor`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then(({ data }) => {
            data.sort((a, b) => (a.tier > b.tier ? 1 : b.tier > a.tier ? -1 : 0))
            console.log(data)
            setSponsors(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [])

  const renderSponsor = ({ item }) => {
    return (
      <Box style={{ flexDirection: "column", justifyContent: "center" }}>
        {openedSponsors.includes(item._id) ? (
          // Sponsor is open

          // Main Sponsor Box
          <Box
            style={{
              height: "auto",
              width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
              marginBottom: "1rem",
              left: "50%",
              transform: [{ translateX: "-50%" }],
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            {/* Top Half (Image, Name, Address and Expand Button) */}
            <Box
              style={{
                width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                height: sWidth >= 600 ? sHeight * 0.15 : sHeight * 0.2,
                overflow: "hidden",
                backgroundColor: "black",
                zIndex: 0,
              }}
            >
              {/* Image Box */}
              <Box
                style={{
                  width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                  height: sHeight * 0.07,
                  opacity: 0.7,
                  zIndex: 1,
                }}
              >
                <Image
                  source={{ uri: item.imageLink }}
                  style={{
                    position: "absolute",
                    top: "-5rem",
                    width: "100%",
                    height: "22rem",
                    resizeMode: "stretch",
                  }}
                />
              </Box>

              {/* Box that has the same size as the previous unopened sponsor.
                      Used to center the Sponsor Name and Button after it is opened */}
              <Box
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  height: sHeight * 0.07,
                  width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                  position: "absolute",
                  zIndex: 1,
                }}
              >
                {/* Horizontal Box for Sponsor Name and Button */}
                <Box
                  style={{
                    width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    zIndex: 2,
                  }}
                >
                  {/* Sponsor Name */}
                  <Text
                    style={{
                      fontSize: 20,
                      fontFamily: "Poppins",
                      fontWeight: "500",
                      color: color.palette.palePeach,
                    }}
                  >
                    {item.sponsorName}
                  </Text>

                  {/* Box for Expand Button to center it */}
                  <Box
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      zIndex: 2,
                    }}
                  >
                    {/* Expand Button */}
                    <TouchableOpacity
                      style={{
                        backgroundColor: color.palette.palePeach,
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                      onPress={() => {
                        handleToggleSponsor(item._id)
                      }}
                    >
                      {/* Expand Button Icon */}
                      <Icon
                        name="minus"
                        size={10}
                        color={color.palette.darkRed}
                        width="fit-content"
                        style={{
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
                        }}
                      />
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>

              {/* Sponsor Address Box */}
              <Box
                style={{
                  position: "absolute",
                  bottom: 0,
                  paddingHorizontal: 10,
                  zIndex: 1,
                }}
              >
                <Text
                  style={{
                    fontSize: 16,
                    fontFamily: "Poppins",
                    fontWeight: "900",
                    fontStyle: "italic",
                    color: color.palette.sand,
                  }}
                >
                  {item.address.city}
                  {"\n"}
                  {item.address.streetName}
                  {"\n"}
                  {item.address.streetNo}
                </Text>
              </Box>
            </Box>

            {/* Bottom Half (Description and Redeem Button) */}
            <Box
              style={{
                width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                height: "auto",
                padding: 10,
                backgroundColor: color.palette.brown,
                borderBottomLeftRadius: 10,
                borderBottomRightRadius: 10,
              }}
            >
              {/* Sponsor Description */}
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  lineHeight: 20,
                  color: color.palette.palePeach,
                }}
              >
                {item.sponsorDesc}
              </Text>

              {/* Box for Redeem Button */}
              <Box
                style={{
                  marginTop: 5,
                  alignItems: "flex-end",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.dustyPink,
                    borderRadius: 5,
                    padding: 10,
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
                    Redeem
                  </Text>
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        ) : (
          // Sponsor is closed

          // Main Sponsor Box
          <Box
            style={{
              height: sHeight * 0.07,
              width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
              marginBottom: "1rem",
              left: "50%",
              transform: [{ translateX: "-50%" }],
              zIndex: 0,
              backgroundColor: "black",
            }}
          >
            {/* Background Image Box */}
            <Box
              style={{
                height: sHeight * 0.07,
                opacity: 0.7,
                overflow: "hidden",
                zIndex: 1,
              }}
            >
              <Image
                source={{ uri: item.imageLink }}
                style={{
                  position: "absolute",
                  top: "-5rem",
                  width: "100%",
                  height: "22rem",
                  resizeMode: "stretch",
                }}
              />
            </Box>

            {/* Horizontal Box for Name and Button */}
            <Box
              style={{
                width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: "50%",
                transform: [{ translateY: "-50%" }],
                paddingHorizontal: 10,
                zIndex: 2,
              }}
            >
              {/* Sponsor Name */}
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: "Poppins",
                  fontWeight: "500",
                  color: color.palette.palePeach,
                }}
              >
                {item.sponsorName}
              </Text>

              {/* Box for Expand Button to center it */}
              <Box
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {/* Expand Button */}
                <TouchableOpacity
                  style={{
                    backgroundColor: color.palette.palePeach,
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    handleToggleSponsor(item._id)
                  }}
                >
                  {/* Expand Button Icon */}
                  <Icon
                    name="plus"
                    size={10}
                    color={color.palette.darkRed}
                    width="fit-content"
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
                    }}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    )
  }

  const renderNoSearchReults = () => {
    return (
      sponsors.length > 0 && (
        <>
          <Text
            style={{
              paddingLeft: 30,
              color: color.palette.darkRed,
              fontFamily: "Poppins",
              fontSize: 16,
              fontWeight: 500,
            }}
          >
            Search results for “{searchText}”
          </Text>
          <Box
            style={{
              height: sHeight * 0.5,
              width: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={require("../../resources/noSearchResults.png")}
              style={{
                width: sWidth * 0.9,
                height: sHeight * 0.37,
                resizeMode: "contain",
              }}
            />
          </Box>
        </>
      )
    )
  }

  // Search box
  const [searchText, setSearchText] = useState("")

  const filteredSponsors = useMemo(
    () =>
      sponsors.filter((sponsor) =>
        sponsor.sponsorName.toLowerCase().includes(searchText.toLowerCase()),
      ),
    [sponsors, searchText],
  )

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box style={CONTAINER}>
          <FlatList
            data={sponsors}
            numColumns={3}
            keyExtractor={(item, index) => item.uuid}
            renderItem={({ item }) => {
              const { sponsorName, uuid, imageLink } = item
              const prop = {
                name: `${sponsorName}`,
                imgUrl: imageLink,
              }
              return (
                <Box style={SPONSORICON}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("sponsor", item)
                    }}
                  >
                    <SponsorIcon key={uuid} props={prop} />
                  </TouchableOpacity>
                </Box>
              )
            }}
          />
        </Box>

        {/* Box for Icons */}
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
          <Button
            onPress={() => {
              // Handle press
              navigation.openDrawer()
            }}
            style={styles.menuBtnStyle}
          >
            <Image source={menuIcon} style={styles.iconStyle} />
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

        <ScrollView>
          {/* Box for Sponsor Header */}
          <Box
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              paddingBottom: 10,
              paddingTop: -20,
            }}
          >
            <Image
              source={require("../../resources/sponsors-header.png")}
              style={{
                width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                height: sHeight * 0.2,
                resizeMode: "contain",
              }}
            />
          </Box>

          {/* Box for Search Bar */}
          <Box
            style={{
              height: 50,
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {/* Box for Icon to line up with Search Bar */}
            <Box>
              {/* Seach Bar */}
              <TextInput
                placeholder="Search"
                placeholderTextColor={color.palette.darkRed}
                onChangeText={(search) => setSearchText(search)}
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: color.palette.twentyFiveFuschia,
                  width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
                  height: sHeight * 0.05,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                  borderBottomWidth: 3,
                  borderBottomColor: color.palette.darkRed,
                  paddingLeft: 10,
                }}
              />
              {/* Search Bar Icon */}
              <Icon
                name="search"
                size={20}
                color={color.palette.darkRed}
                width="fit-content"
                style={{
                  position: "absolute",
                  zIndex: 1,
                  top: "50%",
                  right: 5,
                  transform: [{ translateY: "-50%" }],
                }}
              />
            </Box>
          </Box>

          {/* Box for Sponsors being rendered */}
          <Box style={CONTAINER}>
            <FlatList
              data={filteredSponsors}
              numColumns={1}
              keyExtractor={(item, index) => item.uuid}
              renderItem={renderSponsor}
              ListEmptyComponent={renderNoSearchReults}
            />
          </Box>
        </ScrollView>
      </NativeBaseProvider>
    </Screen>
  )
})

