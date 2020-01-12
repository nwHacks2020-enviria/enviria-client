import React from 'react'
import { Dimensions } from 'react-native'
import { LineChart } from 'react-native-chart-kit'
import moment from 'moment';

let dataColors = {
    'good': {
        backgroundGradientFrom: "#9BC53D",
        backgroundGradientTo: "#71902D"
    },
    'bad': {
        backgroundGradientFrom: "#FF595E",
        backgroundGradientTo: "#A3393C"
    },
    'neutral': {
        backgroundGradientFrom: "#A5C96A",
        backgroundGradientTo: "#5A6E3A"
    }
}

let dataRanges = {
    'past_7_days': last7Days(),
    'past_7_weeks': last7Weeks(),
    'past_7_months': last7Months(),
}

function last7Days(): Array<string> {
    let result = []
    for (let i = 0; i < 7; i++) {
        result.push(
            moment().add(-1 * i, "day").format("DD/MM")
        );
    }
    return result.reverse();
}
function last7Weeks(): Array<string> {
    let result = []
    for (let i = 0; i < 7; i++) {
        result.push(
            moment().add(-1 * i, "week").format("DD/MM")
        );
    }
    return result.reverse();
}
function last7Months(): Array<string> {
    let result = []
    for (let i = 0; i < 7; i++) {
        result.push(
            moment().add(-1 * i, "month").format("MMM")
        );
    }
    return result.reverse();
}

export default class GSHistoryLineGraph extends React.Component<{
    hideLabels?: boolean
    status: 'good' | 'bad' | 'neutral'
    useDataRange?: 'past_7_days' | 'past_7_weeks' | 'past_7_months'
    data: Array<number>
}, {}> {
    render() {
        return (
            <LineChart
                data={{
                    labels: this.props.hideLabels === true && this.props.useDataRange ? [] : dataRanges[this.props.useDataRange!],
                    datasets: [
                        {
                            data: this.props.data[0] != 0 ? this.props.data : [0]
                        }
                    ]
                }}
                width={Dimensions.get("window").width - 40}
                height={220}
                chartConfig={{
                    backgroundGradientFrom: dataColors[this.props.status].backgroundGradientFrom,
                    backgroundGradientTo: dataColors[this.props.status].backgroundGradientTo,
                    decimalPlaces: 0,
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                }}
                yLabelsOffset={0}
                withDots={false}
                withInnerLines={false}
                withOuterLines={false}
                bezier
                style={{
                    borderRadius: 5
                }}
            />
        );
    }
}
