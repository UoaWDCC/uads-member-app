import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Input, Box, FlatList, VStack, HStack, Image } from "native-base"
import firebase from "firebase"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"
import { BASE_URL } from "@env"

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
    backgroundColor: color.palette.white,
    borderRadius: 30,
    flex: 1,
    height: "100px",
    margin: 10,
    maxWidth: "90vw",
    paddingHorizontal: "10px",
    paddingVertical: 0,
  },
  disabledCardStyle: {
    backgroundColor: color.palette.offWhite,
    borderRadius: 30,
    flex: 1,
    height: "100px",
    margin: 10,
    maxWidth: "90vw",
    paddingHorizontal: "10px",
    paddingVertical: 0,
  },
  header: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
  textStyle: {
    textAlign: "center",
    width: "calc(90vw - 180px)",
  },
})

export const EventsScreen = observer(function OffersScreen() {
  const navigation = useNavigation()
  const isVisible = useIsFocused()

  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")
  // const [discounts, setDiscounts] = useState<
  //   {
  //     desc: string
  //     uuid: number
  //     sponsor: string
  //     value: number
  //     imageLink: string
  //     cooldown: number
  //   }[]
  // >([])
  const [firstName, setFirstName] = useState<string>("")

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
      })
  }, [isVisible])

  function getUpi(): string {
    const userUpi = firebase.auth().currentUser?.email?.replace("@aucklanduni.ac.nz", "")
    return userUpi
  }

  const events = [
    {
      name: "event1",
      imageLink:
        "https://imgix.theurbanlist.com/content/article/East_dessert.jpg?auto=format,compress&w=1200&h=630&fit=crop",
    },
    {
      name: "event2",
      imageLink:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg",
    },
  ]

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={styles.header} preset="header" text={"Welcome " + firstName} />
        <Text style={styles.textStyle} preset="header" text="Upcoming Events:" />
        <Box style={CONTAINER}>
          {events.flatMap((event, index) => {
            return (
              <Box key={index}>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("event", event)
                  }}
                >
                  <HStack justifyContent="space-between" alignItems="center">
                    <Image
                      resizeMode={"contain"}
                      size={40}
                      height="100px"
                      alt={event.name}
                      source={{
                        uri: event.imageLink,
                      }}
                    />
                    <VStack alignItems="center">
                      <Text style={styles.textStyle}>{event.name}</Text>
                    </VStack>
                  </HStack>
                </TouchableOpacity>
              </Box>
            )
          })}
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
