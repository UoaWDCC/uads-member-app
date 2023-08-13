import React from "react";
import { View, StyleSheet, Text, Dimensions } from "react-native";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";

export function DrawerContent(props) {
  const drawerItemData = [
    { label: "Events", screen: "events" },
    { label: "Sponsors\n&Offers", screen: "offers" },
    { label: "About Us", screen: "about" },
    { label: "Settings", screen: "settings" },
  ];

  const windowHeight = Dimensions.get("window").height;
  const textFontSize = windowHeight * 0.04; // Adjust multiplier as needed

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.drawerContainer}>
        {drawerItemData.map((item, index) => (
          <DrawerItem
            key={index}
            label={() => (
              <Text style={[styles.drawerItemText, { fontSize: textFontSize }]}>
                {item.label}
              </Text>
            )}
            onPress={() => {
              props.navigation.navigate(item.screen);
            }}
            style={styles.drawerItem}
          />
        ))}
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
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
    color: "#801E15",
  },
});

export default DrawerContent;
