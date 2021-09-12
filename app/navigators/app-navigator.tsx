/**
 * This is the navigator you will modify to display the logged-in screens of your app.
 * You can use RootNavigator to also display an auth flow or other user flows.
 *
 * You'll likely spend most of your time in this file.
 */
import React from "react"
import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import firebase from "../../firebaseSetup"
import { AuthContext } from "./navigation-utilities"
import {
  LoginScreen,
  RegistrationScreen,
  AboutScreen,
  HomeScreen,
  OffersScreen,
  SettingsScreen,
  SponsorsScreen,
  LoadingScreen,
} from "../screens"

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
export type NavigatorParamList = {
  login: undefined
  home: undefined
  about: undefined
  offers: undefined
  settings: undefined
  sponsors: undefined
  register: undefined
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createStackNavigator<NavigatorParamList>()

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
    </Stack.Navigator>
  )
}

const Tab = createBottomTabNavigator<NavigatorParamList>()

const AppTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="home" component={HomeScreen} />
      <Tab.Screen name="about" component={AboutScreen} />
      <Tab.Screen name="offers" component={OffersScreen} />
      <Tab.Screen name="settings" component={SettingsScreen} />
      <Tab.Screen name="sponsors" component={SponsorsScreen} />
    </Tab.Navigator>
  )
}

export const AppNavigator = React.forwardRef<
  NavigationContainerRef,
  Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {
  React.useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
        setIsLoading(false)
      }
    })
    return () => unsubscribe()
  }, [])

  const [user, setUser] = React.useState(null)
  const [isLoading, setIsLoading] = React.useState(true)

  const authContext = React.useMemo(
    () => ({
      logIn: (data) => {
        setIsLoading(false)
        setUser(data)
      },
      logOut: () => {
        setIsLoading(false)
        setUser(null)
      },
      signUp: (data) => {
        setIsLoading(false)
        setUser(data)
      },
    }),
    [],
  )

  if (isLoading) { 
    return (
      <LoadingScreen/>
    )
  }

  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer {...props} ref={ref}>
        {user ? <AppTab /> : <AppStack />}
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
