import React from 'react'
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { storage, events } from '../../Util/litsy';

export default class AccountScreen extends React.Component {

    static navigationOptions = ({navigation, screenProps}) => ({
        title: "Profile",
        tabBarLabel: "Profile"
      })

    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center', backgroundColor: '#E5FFDB' }}>
                <Button title="Log out" onPress={async () => {
                    await storage.remove("enviria__authToken")
                    events.get("rootRefresh")();
                }} />
            </View>
        )
    }
}