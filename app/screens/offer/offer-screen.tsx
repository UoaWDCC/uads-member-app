import React from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, StyleSheet, View, TouchableOpacity } from "react-native"
import { Screen, Text, SubButton, RedeemPopup, PopupButton } from "../../components"
import { color } from "../../theme"
import { NativeBaseProvider, Box, VStack, Image } from "native-base"
import CountDown from "react-native-countdown-component"

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
  centeredView: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
  },
  digitStyle: {
    backgroundColor: color.palette.white,
    width: "70%",
  },
  digitText: {
    color: color.palette.brown,
    fontSize: 40,
  },
  header: {
    fontFamily: "Sen-Regular",
    fontSize: 40,
    margin: 10,
    marginLeft: 20,
    textDecorationColor: color.palette.brown,
  },
  modalExit: {
    marginHorizontal: 20,
    marginTop: 10,
    textAlign: "right",
  },
  modalView: {
    alignItems: "center",
    backgroundColor: color.palette.popupGrey,
    borderRadius: 20,
    elevation: 5,
    marginHorizontal: 20,
    shadowColor: color.palette.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  popuphead: {
    fontFamily: "Sen-Regular",
    fontSize: 22,
    fontWeight: "bold",
    margin: 10,
    textAlign: "center",
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

  const [isModalVisible, setIsModalVisible] = React.useState(false)
  const [isRedeeming, setIsRedeeming] = React.useState(false)
  const [hasRedeemed, setHasRedeemed] = React.useState(false)

  const finalRedeem = () => {
    setIsModalVisible(false)
    setIsRedeeming(true)
  }

  return (
    <Screen style={ROOT} preset="scroll">
      <NativeBaseProvider>
        <Text style={styles.header} preset="header" text="Offers:" />
        <RedeemPopup isVisible={isModalVisible}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <VStack>
                <TouchableOpacity onPress={() => setIsModalVisible(false)}>
                  <Text style={styles.modalExit}>X</Text>
                </TouchableOpacity>
                <Text style={styles.popuphead} text="Are you sure?" />
                <Text
                  style={styles.textStyle}
                  text="You only have 10 minutes to claim this deal!"
                />
                <PopupButton text="Redeem" onPress={finalRedeem} />
              </VStack>
            </View>
          </View>
        </RedeemPopup>
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
            {hasRedeemed ? (
              <Text style={styles.textStyle} text="This offer has already been redeemed" />
            ) : isRedeeming ? (
              <CountDown
                until={600}
                onFinish={() => setHasRedeemed(true)}
                size={40}
                digitStyle={styles.digitStyle}
                digitTxtStyle={styles.digitText}
                separatorStyle={styles.digitText}
                timeToShow={["M", "S"]}
                timeLabels={{ m: null, s: null }}
                showSeparator
              />
            ) : (
              <SubButton text="Redeem" onPress={() => setIsModalVisible(true)} />
            )}
          </VStack>
        </Box>
      </NativeBaseProvider>
    </Screen>
  )
})
