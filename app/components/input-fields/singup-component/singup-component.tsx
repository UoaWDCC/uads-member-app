import { Input, Center, NativeBaseProvider, Stack } from "native-base"
import { color } from "../../../theme"
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert, ActivityIndicator } from 'react-native';
import firebase from '../database/firebase';


export default class Signup extends Component {

    

    render() {
        const [show] = React.useState(false)
        return (

            <Stack>
                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="First Name..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    // onChangeText={(text) => this.setState({text})}
                />

                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="Last Name..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    // onChangeText={(text) => this.setState({text})}
                />

                <Input
                    // getRef={input => {
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="UPI..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    // onChangeText={(text) => this.setState({text})}
                />

                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    ref={emailRef}
                    style={{ width: 208, height: 38}}
                    borderRadius="40px"
                    placeholder="Email..."
                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.text,
                    }}
                    // onChangeText={(text) => this.setState({text})}
                />

                <Input
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{ 
                        width: 208, 
                        height: 38,
                        top: '40%'
                        }}
                    borderRadius="40px"
                    type={show ? "text" : "password"}
                    placeholder="Password..."

                    _light={{
                        placeholderTextColor: color.text,
                        backgroundColor: color.palette.goldenGlow,
                        borderColor: color.palette.goldenGlow
                    }}
                    _dark={{
                        placeholderTextColor: color.palette.goldenGlow,
                    }}
                />


            </Stack>
        )
    }