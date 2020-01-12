import React from 'react';
import { AppRegistry } from 'react-native';
import axios from 'axios';
import Router from './src/Router';
import { LoginScreen, LoadingScreen } from './src/Screens'
import { name as appName } from './app.json';
import { events, storage } from './src/Util/litsy';

AppRegistry.registerComponent(appName, () => AppIn);

type State = {
    isLoading: boolean
    isAuthenticated: boolean
}


export class AppIn extends React.Component<{}, State> {
    public readonly state: State = {
        isLoading: true,
        isAuthenticated: false
    }
    constructor(props) {
        super(props);
    }

    enviria__authToken = "";
    async checkToken() {
        this.enviria__authToken = await storage.get("enviria__authToken")
        console.log(`HMMMMM: ${this.enviria__authToken}`);
        if (this.enviria__authToken !== undefined && this.enviria__authToken !== null) {
            let result = await axios.post(`https://0f8a9c98.ngrok.io/authenticateUsingToken?token=${this.enviria__authToken}`)
            console.log(result)
            result.data && result.data.code === 200 ?
                this.setState({ isAuthenticated: true, isLoading: false }) :
                this.setState({ isAuthenticated: false, isLoading: false })
        } else {
            this.setState({ isAuthenticated: false, isLoading: false })
        }
        // 
    }

    async componentDidMount() {
        events.set("rootRefresh", async () => { await this.checkToken() })
        await this.checkToken()
    }
    render() {
        // load up loading page
        // check if authenticated
        // if authenticated, display app Router
        // if not authenticated, display app Login
        return (
            <>
                {this.state.isLoading ? <LoadingScreen /> : this.state.isAuthenticated ? <Router /> : <LoginScreen />}
            </>
        );
    }
}