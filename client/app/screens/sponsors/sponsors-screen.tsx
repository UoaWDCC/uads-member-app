import React, { useState, useEffect, useRef } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { Screen, SponsorIcon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../../components"
import { color, typography } from "../../theme"
import { NativeBaseProvider, Box, FlatList, Input, HStack } from "native-base"
import firebase from "firebase"
import axios from "axios"
import Icon from "react-native-vector-icons/FontAwesome"

import { BASE_URL } from "@env"

export const SponsorsScreen = observer(function SponsorsScreen() {
  const navigation = useNavigation()
  const [sponsors, setSponsors] = useState([])

  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")
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
            setSponsors(data)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={TEXT} text={"Sponsors:"} />
        <HStack space={2} alignItems="center">
          <Input
            ref={searchInputRef}
            onChangeText={(text) => setQuery(text)}
            // eslint-disable-next-line react-native/no-inline-styles
            // style={{ width: "calc(90vw - 30px)", height: 38 }}
            borderRadius="40px"
            marginLeft="10px"
            float="left"
            placeholder="Search"
            _light={{
              placeholderTextColor: color.text,
              backgroundColor: color.palette.white,
              borderColor: color.palette.goldenGlow,
            }}
            _dark={{
              placeholderTextColor: color.text,
            }}
          />
          <Icon name="search" size={20} color="#333" width="fit-content" />
        </HStack>

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
      </NativeBaseProvider>
    </Screen>
  )
})

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
}

const TEXT: TextStyle = {
  fontFamily: typography.primary,
  fontWeight: "bold",
  fontSize: 40,
  color: color.text,
  marginTop: 30,
  marginLeft: 30,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: "#fffffa",
  marginTop: 10,
  borderTopRightRadius: 40,
  borderTopLeftRadius: 40,
}

const SPONSORICON: ViewStyle = {
  flexDirection: "column",
  margin: 1,
}
