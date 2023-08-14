import React from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"
import { color } from "../../theme/color"

export function DrawerContent(props) {
  const drawerItemData = [
    { label: "Events", screen: "events" },
    { label: "Sponsors\n&Offers", screen: "sponsors" },
    { label: "About Us", screen: "about" },
    { label: "Settings", screen: "settings" },
  ]

  const windowHeight = Dimensions.get("window").height
  const textFontSize = windowHeight * 0.04 // Adjust multiplier as needed

  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      <View style={styles.drawerView}>
        {drawerItemData.map((item, index) => (
          <DrawerItem
            key={index}
            label={() => (
              <Text style={[styles.drawerItemText, { fontSize: textFontSize }]}>{item.label}</Text>
            )}
            onPress={() => {
              props.navigation.navigate(item.screen)
            }}
            style={styles.drawerItem}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  )
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: color.palette.palePeach,
  },
  drawerView: {
    marginTop: 40, // Adjust as needed
  },
  drawerItem: {
    justifyContent: "center",
    alignItems: "center", // Align the text to the center horizontally
    paddingVertical: 10,
  },
  drawerItemText: {
    fontFamily: "Bitter",
    fontStyle: "italic",
    fontWeight: "700",
    letterSpacing: 0,
    textAlign: "center", // Align the text to the center vertically
    color: color.palette.darkRed,
  },
})

export default DrawerContent
