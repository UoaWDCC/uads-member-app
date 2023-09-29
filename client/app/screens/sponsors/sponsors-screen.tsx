import {
  Animated,
  Button,
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from "react-native"
import { Box, FlatList, NativeBaseProvider } from "native-base"
import React, { useEffect, useMemo, useRef, useState } from "react"
import { Screen, SponsorIcon } from "../../components"
import { color, typography } from "../../theme"

import { BASE_URL } from "@env"
import Icon from "react-native-vector-icons/FontAwesome"
import { ScrollView } from "react-native-gesture-handler"
import { Text } from "../../components"
import axios from "axios"
import firebase from "firebase"
import { observer } from "mobx-react-lite"

export const SponsorsScreen = observer(function SponsorsScreen() {
  // const navigation = useNavigation()
  const [sponsors, setSponsors] = useState([])
  const [openedSponsors, setOpenedSponsors] = useState([])

  const [sWidth, setSWidth] = useState(0)
  const [sHeight, setSHeight] = useState(0)

  // Calculate screen dimensions on mount
  useEffect(() => {
    setSWidth(Dimensions.get("window").width)
    setSHeight(Dimensions.get("window").height)
  }, [])

  const styles = StyleSheet.create({
    root: {
      backgroundColor: color.palette.palePeach,
      flex: 1,
    },

    // Top Icons (menu and uads logo)
    iconContainer: {
      justifyContent: "space-between",
      alignItems: "center",
      flexDirection: "row",
      paddingTop: 20,
      paddingHorizontal: 10,
      paddingBottom: 5,
    },

    menuIcon: {
      width: sWidth * 0.2,
      height: sHeight * 0.04,
      resizeMode: "contain",
    },

    uadsIcon: {
      width: sWidth * 0.3,
      height: sHeight * 0.06,
      resizeMode: "contain",
    },

    // Sponsors Header Graphic
    sponsorsHeaderBox: {
      justifyContent: "space-between",
      alignItems: "center",
      paddingBottom: 10,
      paddingTop: -20,
    },

    sponsorsHeader: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      height: sHeight * 0.2,
      resizeMode: "contain",
    },

    // Search Bar
    searchBar: {
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
    },

    searchBarIcon: {
      position: "absolute",
      zIndex: 1,
      top: "50%",
      right: 5,
      transform: [{ translateY: "-50%" }],
    },

    searchBarBackground: {
      height: 50,
      justifyContent: "flex-start",
      alignItems: "center",
    },

    sponsorsList: {
      flex: 1,
      backgroundColor: color.palette.palePeach,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    },

    // Sponsor Accordion
    sponsorsAccordionContainer: {
      flexDirection: "column",
      justifyContent: "center",
    },

    sponsorOpenedBox: {
      height: "auto",
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      marginBottom: "1rem",
      left: "50%",
      transform: [{ translateX: "-50%" }],
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    sponsorClosedBox: {
      height: sHeight * 0.07,
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      marginBottom: "1rem",
      left: "50%",
      transform: [{ translateX: "-50%" }],
      zIndex: 0,
      backgroundColor: "black",
    },

    sponsorOpenedImageContainer: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      height: sHeight * 0.07,
      opacity: 0.7,
      zIndex: 1,
    },

    sponsorClosedImageContainer: {
      height: sHeight * 0.07,
      opacity: 0.7,
      overflow: "hidden",
      zIndex: 1,
    },

    sponsorImage: {
      position: "absolute",
      top: "-5rem",
      width: "100%",
      height: "22rem",
      resizeMode: "stretch",
    },

    sponsorDetailsContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: sHeight * 0.07,
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      position: "absolute",
      zIndex: 1,
    },

    sponsorNameContainer: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 10,
      zIndex: 2,
    },

    sponsorName: {
      fontSize: 20,
      fontFamily: "Poppins",
      fontWeight: "500",
      color: color.palette.palePeach,
    },

    sponsorAddressContainer: {
      position: "absolute",
      bottom: 0,
      paddingHorizontal: 10,
      zIndex: 1,
    },

    sponsorAddress: {
      fontSize: 16,
      fontFamily: "Poppins",
      fontWeight: "900",
      fontStyle: "italic",
      color: color.palette.sand,
    },

    sponsorDescriptionContainer: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      height: "auto",
      padding: 10,
      backgroundColor: color.palette.brown,
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
    },

    sponsorDescription: {
      fontSize: 16,
      fontFamily: "Poppins",
      fontWeight: "500",
      lineHeight: 20,
      color: color.palette.palePeach,
    },

    sponsorOpenedDetails: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      height: sWidth >= 600 ? sHeight * 0.15 : sHeight * 0.2,
      overflow: "hidden",
      backgroundColor: "black",
      zIndex: 0,
    },

    sponsorClosedDetails: {
      width: sWidth >= 600 ? sWidth * 0.3 : sWidth * 0.85,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      position: "absolute",
      top: "50%",
      transform: [{ translateY: "-50%" }],
      paddingHorizontal: 10,
      zIndex: 2,
    },

    expandButtonContainer: {
      justifyContent: "center",
      alignItems: "center",
      zIndex: 2,
    },

    expandButton: {
      backgroundColor: color.palette.palePeach,
      width: 20,
      height: 20,
      borderRadius: 50,
      justifyContent: "center",
      alignItems: "center",
    },

    expandButtonIcon: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: [{ translateY: "-50%" }, { translateX: "-50%" }],
    },

    // No Search Results
    emptySearchText: {
      paddingLeft: 30,
      color: color.palette.darkRed,
      fontFamily: "Poppins",
      fontSize: 16,
      fontWeight: "500",
    },

    emptySearchGraphicContainer: {
      height: sHeight * 0.5,
      width: "100%",
      justifyContent: "center",
      alignItems: "center",
    },

    emptySearchGraphic: {
      width: sWidth * 0.9,
      height: sHeight * 0.37,
      resizeMode: "contain",
    },
  })

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

  const renderSponsor = ({ item }) => {
    return (
      <Box style={styles.sponsorsAccordionContainer}>
        {openedSponsors.includes(item._id) ? (
          // Sponsor is open

          // Main Sponsor Box
          <Box style={styles.sponsorOpenedBox}>
            {/* Top Half (Image, Name, Address and Expand Button) */}
            <Box style={styles.sponsorOpenedDetails}>
              {/* Image Box */}
              <Box style={styles.sponsorOpenedImageContainer}>
                <Image source={{ uri: item.imageLink }} style={styles.sponsorImage} />
              </Box>

              {/* Box that has the same size as the previous unopened sponsor.
                      Used to center the Sponsor Name and Button after it is opened */}
              <Box style={styles.sponsorDetailsContainer}>
                {/* Horizontal Box for Sponsor Name and Button */}
                <Box style={styles.sponsorNameContainer}>
                  {/* Sponsor Name */}
                  <Text style={styles.sponsorName}>{item.sponsorName}</Text>

                  {/* Box for Expand Button to center it */}
                  <Box style={styles.expandButtonContainer}>
                    {/* Expand Button */}
                    <TouchableOpacity
                      style={styles.expandButton}
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
                        style={styles.expandButtonIcon}
                      />
                    </TouchableOpacity>
                  </Box>
                </Box>
              </Box>

              {/* Sponsor Address Box */}
              <Box style={styles.sponsorAddressContainer}>
                <Text style={styles.sponsorAddress}>
                  {item.address.city}
                  {"\n"}
                  {item.address.streetName}
                  {"\n"}
                  {item.address.streetNo}
                </Text>
              </Box>
            </Box>

            {/* Bottom Half (Description and Redeem Button) */}
            <Box style={styles.sponsorDescriptionContainer}>
              {/* Sponsor Description */}
              <Text style={styles.sponsorDescription}>{item.sponsorDesc}</Text>

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
          <Box style={styles.sponsorClosedBox}>
            {/* Background Image Box */}
            <Box style={styles.sponsorClosedImageContainer}>
              <Image source={{ uri: item.imageLink }} style={styles.sponsorImage} />
            </Box>

            {/* Horizontal Box for Name and Button */}
            <Box style={styles.sponsorClosedDetails}>
              {/* Sponsor Name */}
              <Text style={styles.sponsorName}>{item.sponsorName}</Text>

              {/* Box for Expand Button to center it */}
              <Box style={styles.expandButtonContainer}>
                {/* Expand Button */}
                <TouchableOpacity
                  style={styles.expandButton}
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
                    style={styles.expandButtonIcon}
                  />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        )}
      </Box>
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

  const renderNoSearchReults = () => {
    return (
      sponsors.length > 0 && (
        <>
          <Text style={styles.emptySearchText}>Search results for “{searchText}”</Text>
          <Box style={styles.emptySearchGraphicContainer}>
            <Image
              source={require("../../resources/noSearchResults.png")}
              style={styles.emptySearchGraphic}
            />
          </Box>
        </>
      )
    )
  }

  return (
    <Screen style={styles.root} preset="scroll">
      <NativeBaseProvider>
        {/* Box for Icons */}
        <Box style={styles.iconContainer}>
          <Image source={require("../../resources/menu-icon.png")} style={styles.menuIcon} />
          <Image source={require("../../resources/logo.png")} style={styles.uadsIcon} />
        </Box>

        <ScrollView>
          {/* Box for Sponsor Header */}
          <Box style={styles.sponsorsHeaderBox}>
            <Image
              source={require("../../resources/sponsors-header.png")}
              style={styles.sponsorsHeader}
            />
          </Box>

          {/* Box for Search Bar */}
          <Box style={styles.searchBarBackground}>
            {/* Box for Icon to line up with Search Bar */}
            <Box>
              {/* Seach Bar */}
              <TextInput
                placeholder="Search"
                placeholderTextColor={color.palette.darkRed}
                onChangeText={(search) => setSearchText(search)}
                style={styles.searchBar}
              />
              {/* Search Bar Icon */}
              <Icon
                name="search"
                size={20}
                color={color.palette.darkRed}
                width="fit-content"
                style={styles.searchBarIcon}
              />
            </Box>
          </Box>

          {/* Box for Sponsors being rendered */}
          <Box style={styles.sponsorsList}>
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
