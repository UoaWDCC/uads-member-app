/* eslint-disable react-native/no-inline-styles */
import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, TouchableOpacity } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation, useIsFocused } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, FlatList } from "native-base"
import firebase from "firebase"
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
    backgroundColor: color.palette.goldenGlow,
    borderRadius: 15,
    flex: 1,
    height: "180px",
    margin: 10,
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
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
  textStyle: {
    fontSize: 18,
    textAlign: "center",
  },
})

export const EventsScreen = observer(function OffersScreen() {
  const navigation = useNavigation()
  const isVisible = useIsFocused()

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
      eventName: "event1 this is a really long event name",
      eventDesc: "The first event",
      imageLink:
        "https://previews.agefotostock.com/previewimage/medibigoff/f26397611c09f4de9dd7797b6fcb5965/bep-bew196841a.jpg",
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
              const { eventName, imageLink } = item
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
                        {eventName}
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
                          alt={eventName}
                          src={imageLink}
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
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
