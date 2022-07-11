import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet } from "react-native"
import { Screen, Text, SubButton } from "../../components"
import { color } from "../../theme"
import { NativeBaseProvider, Box, VStack, Image } from "native-base"

const ROOT: ViewStyle = {
  backgroundColor: color.background,
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  alignContent: "center",
}

const CONTAINER: ViewStyle = {
  flex: 1,
  backgroundColor: color.palette.white,
  marginTop: 10,
  width: "90vw",
  borderRadius: 20,
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
  subhead: {
    fontFamily: "Sen-Regular",
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
  textStyle: {
    marginHorizontal: 20,
    textAlign: "left",
    width: "100%",
  },
})

export const OfferScreen = observer(function OfferScreen(props: any) {
  const { desc, uuid, sponsor, value, imageLink } = props.route.params

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={styles.header} preset="header" text="Offers:" />
        <Box style={CONTAINER}>
          <VStack>
            <Text style={styles.subhead} text={sponsor} />
            {
              // eslint-disable-next-line react-native/no-inline-styles
              <Box style={{ width: "100%", alignContent: "center" }}>
                <Image
                  resizeMode={"contain"}
                  size={40}
                  height="200px"
                  margin="auto"
                  alt={sponsor}
                  source={{
                    uri: imageLink,
                  }}
                />
              </Box>
            }
            <Text style={styles.textStyle}>{desc}</Text>
            <SubButton text="Redeem" onPress={() => console.log("hello")} />
          </VStack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
