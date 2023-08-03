import { Box, FlatList, NativeBaseProvider } from "native-base"
import {
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
import React, { useEffect, useMemo, useState } from "react"
import { Screen, SponsorIcon } from "../../components"
import { color, typography } from "../../theme"
import { flex, left } from "styled-system"

import { BASE_URL } from "@env"
import Icon from "react-native-vector-icons/FontAwesome"
import { Text } from "../../components"
import axios from "axios"
import firebase from "firebase"
import { observer } from "mobx-react-lite"
import { useNavigation } from "@react-navigation/native"

export const SponsorsScreen = observer(function SponsorsScreen() {
  // const navigation = useNavigation()
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
          // Sponsor is opened

          <Box
            style={{
              height: "auto",
              width: sWidth * 0.85,
              marginBottom: "1rem",
              left: "50%",
              transform: [{ translateX: "-50%" }],
              backgroundColor: color.palette.brown,
              borderBottomLeftRadius: 10,
              borderBottomRightRadius: 10,
            }}
          >
            {/* Background Image Box */}
            <Box
              style={{
                zIndex: 0,
                width: sWidth * 0.85,
                height: sHeight * 0.2,
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  backgroundColor: "black",
                  width: sWidth * 0.85,
                  height: sHeight * 0.2,
                  opacity: 0.4,
                  zIndex: 1,
                }}
              />
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
                width: sWidth * 0.85,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: 9,
                paddingHorizontal: 10,
                zIndex: 1,
              }}
            >
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

              {/* Button Box */}
              <Box
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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

            <Box
              style={{
                position: "absolute",
                top: 60,
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

            {/* Sponsor Description Box */}
            <Box
              style={{
                padding: 10,
              }}
            >
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
            </Box>

            <Box
              style={{
                alignItems: "flex-end",
                paddingHorizontal: 10,
                paddingBottom: 10,
              }}
            >
              <TouchableOpacity
                style={{
                  backgroundColor: color.palette.dustyPink,
                  width: 100,
                  height: 30,
                  borderRadius: 5,
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
        ) : (
          // Sponsor is closed

          // Box for Individual Sponsor
          <Box
            style={{
              alignItems: "center",
              height: sHeight * 0.07,
              width: sWidth * 0.85,
              marginBottom: "1rem",
              left: "50%",
              transform: [{ translateX: "-50%" }],
            }}
          >
            {/* Background Image Box */}
            <Box
              style={{
                zIndex: 0,
                width: sWidth * 0.85,
                height: sHeight * 0.07,
                overflow: "hidden",
              }}
            >
              <Box
                style={{
                  backgroundColor: "black",
                  width: sWidth * 0.85,
                  height: sHeight * 0.07,
                  opacity: 0.4,
                  zIndex: 1,
                }}
              />
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
                width: sWidth * 0.85,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                position: "absolute",
                top: "50%",
                transform: [{ translateY: "-50%" }],
                paddingHorizontal: 10,
                zIndex: 1,
              }}
            >
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

              {/* Button Box */}
              <Box
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
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
        <Box
          style={{
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "row",
            paddingTop: 20,
            paddingHorizontal: 10,
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
        <Box style={{ justifyContent: "space-between", alignItems: "center", paddingBottom: 10 }}>
          <Image
            source={require("../../resources/sponsors-header.png")}
            style={{
              width: sWidth * 0.85,
              height: sHeight * 0.2,
              resizeMode: "contain",
            }}
          />
          <Box>
            <TextInput
              placeholder="Search"
              placeholderTextColor={color.palette.darkRed}
              onChangeText={(search) => setSearchText(search)}
              style={{
                justifyContent: "space-between",
                alignItems: "center",
                backgroundColor: color.palette.twentyFiveFuschia,
                width: sWidth * 0.85,
                height: sHeight * 0.05,
                borderTopLeftRadius: 10,
                borderTopRightRadius: 10,
                borderBottomWidth: 3,
                borderBottomColor: color.palette.darkRed,
                paddingLeft: 10,
              }}
            />

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

        <Box style={CONTAINER}>
          <FlatList
            data={filteredSponsors}
            numColumns={1}
            keyExtractor={(item, index) => item.uuid}
            renderItem={renderSponsor}
            ListEmptyComponent={renderNoSearchReults}
          />
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.palette.palePeach,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.palePeach,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
}
