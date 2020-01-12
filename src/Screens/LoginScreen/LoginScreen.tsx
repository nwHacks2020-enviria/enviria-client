import React from 'react'
import { SafeAreaView, ScrollView, Dimensions } from 'react-native'
import { Input, Button } from 'react-native-elements'
import LinearGradient from 'react-native-linear-gradient';
import Axios from 'axios';
import {storage, events} from '../../Util/litsy';

type LoginScreenState = {
    mode: 'register' | 'login'
    email: string,
    password: string,
    username: string
}

export default class LoginScreen extends React.Component<{}, LoginScreenState> {
    public readonly state: LoginScreenState = {
        mode: 'login',
        password: "",
        username: "",
        email: ""
    }
    render() {
        return (
            <SafeAreaView style={{ backgroundColor: "#E5FFDB", flex: 1 }}>
                {this.state.mode === "login" ? this.renderLogin() : this.renderRegister()}
            </SafeAreaView>
        );
    }

    renderRegister() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                keyboardShouldPersistTaps='handled'
            >
                <Input
                    defaultValue={this.state.email}
                    onChangeText={(e) => { this.setState({ email: e }) }}
                    containerStyle={{ marginBottom: 20 }}
                    inputStyle={{ color: "#71902D" }}
                    textContentType="emailAddress"
                    placeholder="email address"
                />
                <Input
                    defaultValue={this.state.username}
                    onChangeText={(e) => { this.setState({ username: e }) }}
                    containerStyle={{ marginBottom: 20 }}
                    inputStyle={{ color: "#71902D" }}
                    textContentType="username"
                    placeholder="username"
                />
                <Input
                    defaultValue={this.state.password}
                    onChangeText={(e) => { this.setState({ password: e }) }}
                    containerStyle={{ marginBottom: 50 }}
                    inputStyle={{ color: "#71902D" }}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="password"
                />

                <Button
                    raised
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ["#9BC53D", "#71902D"],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 1 }
                    }}
                    containerStyle={{
                        width: Dimensions.get('window').width - 40,
                        marginBottom: 30
                    }}
                    title="Sign Up"
                    onPress={async () => {
                        await Axios.post("https://d11ae255.ngrok.io/register", {
                            username: this.state.username,
                            email: this.state.email,
                            password: this.state.password
                        })
                        let authToken = await Axios.post("https://d11ae255.ngrok.io/authenticate", {
                            username: this.state.username,
                            password: this.state.password
                        })
                        await storage.set("enviria__authToken", `${authToken.data.data.token}`)
                        events.get("rootRefresh")();
                    }}
                />

                <Button
                    onPress={() => {
                        this.setState({ mode: 'login' })
                    }}
                    type="clear"
                    containerStyle={{
                        width: Dimensions.get('window').width - 40
                    }}
                    titleStyle={{
                        color: "#9BC53D"
                    }}
                    title="No account? Sign up now!"
                />

            </ScrollView>
        );
    }

    renderLogin() {
        return (
            <ScrollView
                contentContainerStyle={{
                    flexGrow: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
                keyboardShouldPersistTaps='handled'
            >
                <Input
                    defaultValue={this.state.username}
                    onChangeText={(e) => { this.setState({ username: e }) }}
                    containerStyle={{ marginBottom: 20 }}
                    inputStyle={{ color: "#71902D" }}
                    textContentType="username"
                    placeholder="username"
                />
                <Input
                    defaultValue={this.state.password}
                    onChangeText={(e) => { this.setState({ password: e }) }}
                    containerStyle={{ marginBottom: 50 }}
                    inputStyle={{ color: "#71902D" }}
                    secureTextEntry={true}
                    textContentType="password"
                    placeholder="password"
                />

                <Button
                    raised
                    ViewComponent={LinearGradient}
                    linearGradientProps={{
                        colors: ["#9BC53D", "#71902D"],
                        start: { x: 0, y: 0 },
                        end: { x: 1, y: 1 }
                    }}
                    containerStyle={{
                        width: Dimensions.get('window').width - 40,
                        marginBottom: 30
                    }}
                    title="Sign In"
                    onPress={async () => {
                        let authToken = await Axios.post("https://d11ae255.ngrok.io/authenticate", {
                            username: this.state.username,
                            password: this.state.password
                        });
                        console.log(authToken);
                        console.log(authToken.data.token);
                        await storage.set("enviria__authToken", `${authToken.data.token}`)
                        console.log(await storage.get("enviria__authToken"));
                        events.get("rootRefresh")();
                    }}
                />

                <Button
                    onPress={() => {
                        this.setState({ mode: 'register' })
                    }}
                    type="clear"
                    containerStyle={{
                        width: Dimensions.get('window').width - 40
                    }}
                    titleStyle={{
                        color: "#9BC53D"
                    }}
                    title="No account? Sign up now!"
                />

            </ScrollView>
        );
    }
}