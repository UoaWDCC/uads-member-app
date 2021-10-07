import React, { useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, TouchableOpacity } from "react-native"
import { Screen, SponsorIcon } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { Text } from "../../components"
import { color, typography } from "../../theme"
import { NativeBaseProvider, Box, FlatList } from "native-base"

import sponsorsApi from "../../api/backend"

export const SponsorsScreen = observer(function SponsorsScreen() {
  const navigation = useNavigation()
  const [sponsors, setSponsors] = useState([])

  useEffect(() => {
    sponsorsApi
      .get(`/sponsor`)
      .then((res) => {
        const data = res.data
        data.sort((a, b) => (a.tier > b.tier ? 1 : b.tier > a.tier ? -1 : 0))
        setSponsors(data)
      })
      .catch((e) => {
        console.error(e)
      })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={TEXT} text={"Sponsors:"} />
        <Box style={CONTAINER}>
          <FlatList
            data={sponsors}
            numColumns={3}
            keyExtractor={(item, index) => item.uuid}
            renderItem={({ item }) => {
              const { sponsorName, uuid } = item
              const prop = {
                name: `${sponsorName}`,
                imgUrl: "https://wallpaperaccess.com/thumb/6336218.png",
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
