/* eslint-disable react/display-name */
/* eslint-disable react-native/no-inline-styles */
/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { StyleSheet, Image } from "react-native"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import firebase from "../../firebaseSetup"
import { AuthContext } from "../../context/AuthContext"
import {
  LoginScreen,
  RegistrationScreen,
  ForgotPasswordScreen,
  AboutScreen,
  HomeScreen,
  OffersScreen,
  OfferScreen,
  SettingsScreen,
  SponsorsScreen,
  SponsorScreen,
  LoadingScreen,
  ComingSoonScreen,
} from "../screens"
const uadsLogo = require("../resources/logo.png")
const handshakeIcon = require("../resources/handshake-simple-solid.svg")
const infoIcon = require("../resources/circle-info-solid.svg")
const offersIcon = require("../resources/tags-solid.svg")
const settingsIcon = require("../resources/gear-solid.svg")

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */

const styles = StyleSheet.create({
  iconStyle: {
    width: 30,
    height: 30,
  },
})

export type StackNavigatorParamList = {
  login: undefined
  register: undefined
  forgotPassword: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<StackNavigatorParamList>()

const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="login"
    >
      <Stack.Screen name="login" component={LoginScreen} />
      <Stack.Screen name="register" component={RegistrationScreen} />
      <Stack.Screen name="forgotPassword" component={ForgotPasswordScreen} />
    </Stack.Navigator>
  )
}

export type SponsorNavigatorParamList = {
  sponsors: undefined
  sponsor: undefined
}

const Sponsor = createStackNavigator<SponsorNavigatorParamList>()

const AppSponsorScreen = () => {
  return (
    <Sponsor.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="sponsors"
    >
      <Sponsor.Screen name="sponsors" component={SponsorsScreen} />
      <Sponsor.Screen
        name="sponsor"
        component={SponsorScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Sponsor.Navigator>
  )
}

export type OfferNavigatorParamList = {
  offers: undefined
  offer: undefined
}

const Offer = createStackNavigator<OfferNavigatorParamList>()

const AppOfferScreen = () => {
  return (
    <Offer.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="offers"
    >
      <Offer.Screen name="offers" component={OffersScreen} />
      <Offer.Screen
        name="offer"
        component={OfferScreen}
        options={{
          headerShown: true,
          title: "",
        }}
      />
    </Offer.Navigator>
  )
}

export type TabNavigatorParamList = {
  home: undefined
  about: undefined
  offers: undefined
  settings: undefined
  sponsors: undefined
}

const Tab = createBottomTabNavigator<TabNavigatorParamList>()

const AppTab = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="about"
        component={AboutScreen}
        options={{
          tabBarIcon: () => <Image source={infoIcon} style={styles.iconStyle} />,
        }}
      />
      <Tab.Screen
        name="sponsors"
        component={AppSponsorScreen}
        options={{
          tabBarIcon: () => <Image source={handshakeIcon} style={styles.iconStyle} />,
        }}
      />
      <Tab.Screen
        name="home"
        component={HomeScreen}
        options={{
          tabBarIcon: () => <Image source={uadsLogo} style={styles.iconStyle} />,
        }}
      />
      <Tab.Screen
        name="offers"
        component={AppOfferScreen}
        options={{
          tabBarIcon: () => <Image source={offersIcon} style={styles.iconStyle} />,
        }}
      />
      <Tab.Screen
        name="settings"
        component={ComingSoonScreen}
        options={{
          tabBarIcon: () => <Image source={settingsIcon} style={styles.iconStyle} />,
        }}
      />
    </Tab.Navigator>
  )
}

export const AppNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) dispatch({ type: "LOG_IN", user: user })

      dispatch({ type: "FINISHED_LOADING" })
    })
    return () => unsubscribe()
  }, [])

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case "LOG_IN":
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
            user: action,
          }
        case "LOG_OUT":
          return {
            ...prevState,
            isSignout: true,
            isLoading: false,
            user: null,
          }
        case "FINISHED_LOADING":
          return {
            ...prevState,
            isSignout: false,
            isLoading: false,
          }
      }
    },
    {
      isLoading: true,
      isSignout: false,
      user: null,
    },
  )

  return (
    <AuthContext.Provider
      value={{
        logIn: async (data) => {
          dispatch({ type: "LOG_IN", user: data })
        },
        logOut: () => {
          dispatch({ type: "LOG_OUT" })
        },
        signUp: async (data) => {
          dispatch({ type: "LOG_IN", user: data })
        },
      }}
    >
      <NavigationContainer {...props} ref={ref}>
        {state.isLoading ? <LoadingScreen /> : state.user ? <AppTab /> : <AppStack />}
      </NavigationContainer>
    </AuthContext.Provider>
  )
})

AppNavigator.displayName = "AppNavigator"
/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["welcome"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
