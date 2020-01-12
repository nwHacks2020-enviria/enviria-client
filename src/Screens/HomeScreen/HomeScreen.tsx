import React from 'react'
import { View, Text, Dimensions } from 'react-native';
import { LineChart, LineChartData, LineChartProps } from 'react-native-chart-kit';

export default class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, flexDirection: 'column', alignItems: "center", justifyContent: 'center' }}>
                <LineChart
                    data={{
                        labels: ["January", "February", "March", "April", "May", "June"],
                        datasets: [
                            {
                                data: [
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100,
                                    Math.random() * 100
                                ]
                            }
                        ]
                    }}
                    width={Dimensions.get("window").width} // from react-native
                    height={220}
                    yAxisLabel={"$"}
                    yAxisSuffix={"k"}
                    chartConfig={{
                        backgroundColor: "#e26a00",
                        backgroundGradientFrom: "#fb8c00",
                        backgroundGradientTo: "#ffa726",
                        decimalPlaces: 2, // optional, defaults to 2dp
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            borderRadius: 16
                        },
                        // propsForDots: {
                        //     r: "6",
                        //     strokeWidth: "2",
                        //     stroke: "#ffa726"
                        // }
                    }}
                    bezier
                    style={{
                        marginVertical: 8,
                        borderRadius: 16
                    }}
                />
            </View>
        )
    }
}