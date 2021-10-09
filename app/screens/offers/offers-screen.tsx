import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { Screen } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color } from "../../theme"
import { NativeBaseProvider, Box, FlatList, VStack, HStack, Text, Image } from "native-base"

export const OffersScreen = observer(function OfferScreen() {
  const navigation = useNavigation()
  //TODO: set up hooks
  const sponsors = [
    {
      name: "Shop A",
      image: "yeet",
      details: "Yummy treats",
    },
    {
      name: "Shop B",
      image: "yeet",
      details: "Yummy treatss",
    },
    {
      name: "Shop C",
      image: "yeet",
      details: "Yummy treatsss",
    },
  ]
  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Box style={CONTAINER}>
          <FlatList
            data={sponsors}
            renderItem={({ item }) => {
              return (
                <Box style={{ height: 120 }}>
                  <HStack space={2} justifyContent="space-evenly" alignItems="center">
                    <Image
                      resizeMode={"contain"}
                      size={40}
                      alt="fallback text"
                      source={{
                        uri: "https://-page-icon.png",
                      }}
                      fallbackSource={{
                        uri: "https://www.w3schools.com/css/img_lights.jpg",
                      }}
                    />
                    <VStack>
                      <Text
                        _dark={{
                          color: "warmGray.50",
                        }}
                        color="coolGray.800"
                        bold
                      >
                        {item.name}
                      </Text>
                      <Text
                        color="coolGray.600"
                        _dark={{
                          color: "warmGray.200",
                        }}
                      >
                        {item.details}
                      </Text>
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

const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
  flex: 1,
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: "#fffffa",
  marginTop: 10,
  // borderTopRightRadius: 40,
  // borderTopLeftRadius: 40,
}
