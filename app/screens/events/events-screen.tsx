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
import { autorun } from "mobx"

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
    margin: 10,
    paddingHorizontal: "10px",
    paddingVertical: "10px",
    width: "100px",
  },
  header: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
  imageStyle: {
    backgroundColor: color.palette.deepPurple,
    borderRadius: 15,
    margin: "10px",
    objectFit: "contain",
    // width: 20,
  },

  textStyle: {
    fontSize: 18,
    textAlign: "center",
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
      eventName: "event1",
      eventDesc: "The first event",
      imageLink:
        "https://imgix.theurbanlist.com/content/article/East_dessert.jpg?auto=format,compress&w=1200&h=630&fit=crop",
    },
    {
      eventName: "event2",
      eventDesc: "The second event",
      imageLink:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg",
    },
    {
      eventName: "event3",
      eventDesc: "The third event",
      imageLink:
        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/dessert-main-image-molten-cake-0fbd4f2.jpg",
    },
    {
      eventName: "event4",
      eventDesc: "The fourth event",
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
          <FlatList
            data={events}
            numColumns={2}
            keyExtractor={(item) => item.uuid}
            renderItem={({ item, index }) => {
              const { eventName, eventDesc, imageLink } = item
              const prop = {
                name: `${eventName}`,
                imgUrl: imageLink,
              }
              return (
                <Box key={index} style={styles.cardStyle}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate("event", item)
                    }}
                  >
                    <VStack justifyContent="space-between" alignItems="center">
                      <VStack alignItems="center">
                        <Text style={styles.textStyle} preset="bold">
                          {eventName}
                        </Text>
                      </VStack>
                      <Image
                        resizeMode={"contain"}
                        size={"lg"}
                        borderRadius={100}
                        alt={eventName}
                        source={{
                          uri: imageLink,
                        }}
                      />
                    </VStack>
                  </TouchableOpacity>
                </Box>
              )
            }}
          />
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
