import React, { useRef, useState, useEffect } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Input, Box, FlatList, VStack, HStack, Image } from "native-base"
import firebase from "firebase"
import Icon from "react-native-vector-icons/FontAwesome"
import axios from "axios"

const BASE_URL = process.env.baseURL

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
  // borderTopRightRadius: 40,
  // borderTopLeftRadius: 40,
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
    // borderTopRightRadius: 40,
    // borderTopLeftRadius: 40,
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

export const OffersScreen = observer(function OfferScreen() {
  const navigation = useNavigation()

  const searchInputRef = useRef<HTMLInputElement | null>(null)
  const [query, setQuery] = useState("")
  const [discounts, setDiscounts] = useState<
    {
      desc: string
      uuid: number
      sponsor: string
      value: number
      imageLink: string
    }[]
  >([])

  useEffect(() => {
    firebase
      .auth()
      .currentUser.getIdToken(true)
      .then(function (idToken) {
        axios
          .get(`http://localhost:9002/discount`, {
            headers: {
              "auth-token": idToken,
            },
          })
          .then((res) => {
            const discounts = res.data
            setDiscounts(discounts)
          })
          .catch((e) => {
            console.error(e)
          })
      })
  }, [])

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={styles.header} preset="header" text="Offers:" />
        <HStack space={2} alignItems="center">
          <Input
            ref={searchInputRef}
            onChangeText={(text) => setQuery(text)}
            // eslint-disable-next-line react-native/no-inline-styles
            style={{ width: "calc(90vw - 30px)", height: 38 }}
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
            data={discounts.filter((discount) => {
              if (query === "") {
                return true
              } else if (discount.sponsor.toLowerCase().includes(query.toLowerCase())) {
                return true
              } else if (discount.desc.toLowerCase().includes(query.toLowerCase())) {
                return true
              } else {
                return false
              }
            })}
            renderItem={({ item, index }) => {
              return (
                <Box key={index} style={styles.cardStyle}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Image
                      resizeMode={"contain"}
                      size={40}
                      height="100px"
                      alt={item.sponsor}
                      source={{
                        uri: item.imageLink,
                      }}
                    />
                    <VStack alignItems="center">
                      <Text style={styles.textStyle}>{item.sponsor}</Text>
                      <Text style={styles.textStyle}>{item.desc}</Text>
                    </VStack>
                  </HStack>
                </Box>
              )
            }}
          />
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
