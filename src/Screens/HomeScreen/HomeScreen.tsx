import React from 'react'
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import { GSHistoryLineGraph } from '../../Components'

export default class HomeScreen extends React.Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#E5FFDB" }}>
                <View style={{ backgroundColor: "#E5FFDB", flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'flex-start' }}>
                    <GSHistoryLineGraph status="good" data={[300, 1700, 1650, 1800, 1900, 2500, 2000]} useDataRange='past_7_months' />
                </View>
            </SafeAreaView>
        )
    }
}