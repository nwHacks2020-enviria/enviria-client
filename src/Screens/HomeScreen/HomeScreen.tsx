import React from 'react'
import { View, Text, Dimensions, SafeAreaView } from 'react-native';
import { GSHistoryLineGraph } from '../../Components'
import {storage, events} from '../../Util/litsy';

const apiURL = "https://d11ae255.ngrok.io"

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    
        // /api/greenscore
        // expects: auth token, action (just a string)
        this.state = {
            data: [1]
        };
    }

    async componentDidMount() {
        await this.getPast7days()
    }


    static navigationOptions = ({navigation, screenProps}) => ({
        title: "Home",
        tabBarLabel: "Home"
      })

    getPast7days = async () => {
        let token = await storage.get("enviria__authToken")
        
        for (let i = 5; i >= 0; i--) {
            fetch(apiURL + '/api/greenscoreAggregation' + '?token=' + token, {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    fromTime: (new Date()).getTime() - 60 * 60 * 24 * 1000 * (i + 1),
                    toTime: (new Date()).getTime() - 60 * 60 * 24 * 1000 * i
                })
              })
                .then((response) => {
                    return response.json();
                })
                .then((res) => {
                    console.log(res)
                    this.setState({data : [...this.state.data, res.data.result]})
                    console.log(this.state.data)
                });
        }
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "#E5FFDB" }}>
                <Text>Hi! Here's you activity for the past 7 days</Text>
                {this.state.data.length < 7 
                ? <Text>Loading...</Text> :
                <View style={{ backgroundColor: "#E5FFDB", flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'flex-start' }}>
                    <GSHistoryLineGraph status="good" data={[1,0,20,0,0,0,300]} useDataRange='past_7_months' />
                </View>
                }
            </SafeAreaView>
        )
    }
}