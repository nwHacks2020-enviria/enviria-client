import React from 'react'
import { View, Text, SafeAreaView } from 'react-native'

export default class LoadingScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#E5FFDB" }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: "#E5FFDB" }}>
                    <Text style={{
                        fontSize: 20,
                        color: "#9BC53D"
                    }}>Please hold on while we load some data!</Text>
                </View>
            </SafeAreaView>
        )
    }
}