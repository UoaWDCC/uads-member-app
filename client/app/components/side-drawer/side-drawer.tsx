import React from "react"
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"

export function DrawerContent(props) {
  const drawerItemData = [
    { label: "Events", screen: "events" },
    { label: "Sponsors\n&Offers", screen: "offers" },
    { label: "About Us", screen: "about" },
    { label: "Settings", screen: "settings" },
  ]

  const windowHeight = Dimensions.get("window").height
  const containerHeight = Math.round(windowHeight / drawerItemData.length)

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        {drawerItemData.map((item, index) => (
          <DrawerItem
            key={index}
            label={() => (
              <Text style={[styles.drawerItem, styles.drawerItemText]}>
                {item.label}
              </Text>
            )}
            onPress={() => {
              props.navigation.navigate(item.screen)
            }}
            style={[
              styles.drawerItemContainer,
              {
                height: containerHeight,
              },
              {
                top: (windowHeight - containerHeight * drawerItemData.length) / 2 + index * containerHeight,
              },
            ]}
          />
        ))}
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerItem: {
    fontFamily: "Bitter",
    fontSize: 48,
    fontStyle: "italic",
    fontWeight: "700",
    lineHeight: 58,
    letterSpacing: 0,
    textAlign: "center",
  },
  drawerItemContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
  },
  drawerItemText: {
    color: "#801E15", // Text color
  },
})
