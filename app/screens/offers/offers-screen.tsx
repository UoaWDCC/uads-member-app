import React, { useRef, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, Dimensions } from "react-native"
import { Screen, Text } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Input, Box, FlatList, VStack, HStack, Image } from "native-base"
import { useEffect } from "react-test-renderer/node_modules/@types/react"
import firebase from "firebase"
import { assertExpressionStatement } from "@babel/types"
import Icon from "react-native-vector-icons/FontAwesome"

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

  /* useEffect(() => {
    firebase.auth().currentUser.getIdToken(true).then(function(idToken) {

      axios.get()

      if (thisUuid == "") {
        getUUID(idToken)
        console.log(thisUuid)
      } else {
        usersApi
          .get(`/users/${thisUuid}`, {
            headers: {
              'auth-token': idToken
            }
          })
          .then((res) => {
            const {firstName, lastName, upi, notificationsON} = res.data
            let name = `${firstName} ${lastName}`
            setName(name)
            setUpi(upi)
            setNotifs(
              (notificationsON) ? "ON" : "OFF"
            )
            
          })
          .catch((e) => {
            console.error(e)
          })
      }
    })
    
  }, [thisUuid]); */

  // TODO: set up hooks
  const sponsors = [
    {
      id: 1,
      name: "Giapo",
      image: "https://www.giapo.com/wp-content/uploads/2020/04/GiapoLogo.jpeg",
      details: "Yummy treats",
    },
    {
      id: 2,
      name: "Shop 2",
      image:
        "https://w7.pngwing.com/pngs/560/389/png-transparent-le-salon-des-desserts-ricolleau-deguisements-pharmacie-atlantique-mr-boutholeau-mme-visset-logo-brand-dessert-logo-purple-food-text.png",
      details: "Yummy treats 2",
    },
    {
      id: 3,
      name: "Bakery",
      image: "https://logodix.com/logo/955703.jpg",
      details: "Baked stuffed and more yummy treats",
    },
  ]
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
            data={sponsors.filter((sponsor) => {
              if (query === "") {
                return true
              } else if (sponsor.name.toLowerCase().includes(query.toLowerCase())) {
                return true
              } else {
                return false
              }
            })}
            renderItem={({ item }) => {
              return (
                <Box style={styles.cardStyle}>
                  <HStack justifyContent="space-between" alignItems="center">
                    <Image
                      resizeMode={"contain"}
                      size={40}
                      height="100px"
                      alt={item.name}
                      source={{
                        uri: item.image,
                      }}
                    />
                    <VStack alignItems="center">
                      <Text style={styles.textStyle}>{item.name}</Text>
                      <Text style={styles.textStyle}>{item.details}</Text>
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
