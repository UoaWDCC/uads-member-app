import React from "react"
import { View, StyleSheet } from "react-native"
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer"

export function DrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>
        <DrawerItem
          label="About Us"
          onPress={() => {
            props.navigation.navigate("about")
          }}
        />
        <DrawerItem
          label="Events"
          onPress={() => {
            props.navigation.navigate("events")
          }}
        />
        <DrawerItem
          label="Offers"
          onPress={() => {
            props.navigation.navigate("offers")
          }}
        />
        <DrawerItem
          label="settings"
          onPress={() => {
            props.navigation.navigate("settings")
          }}
        />
      </DrawerContentScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  userInfoSection: {
    paddingLeft: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    marginBottom: 15,
    borderTopColor: "#f4f4f4",
    borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
})
