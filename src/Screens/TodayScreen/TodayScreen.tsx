import React from "react";
import { View, Text, FlatList, StyleSheet, Button, Platform } from "react-native";
import moment from "moment";
import DateTimePicker from '@react-native-community/datetimepicker';

const apiURL = "https://0f8a9c98.ngrok.io"
const token = "4cb8d8796e26cfc3eb3ce0c526c5e5c06437065b8df6867357bf92c490f205f9ca01787391af4cda53d76d716c53ef019bbf419d48cbb068eef39f4e0ea5b9c8"

export default class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      fetchState: 'loading',
      selectedDate: new Date(),
      showDatePicker: false
    };
  }

  async componentDidMount() {
    await this.getGreenScores()
  }

  // sort later

  static navigationOptions = ({navigation, screenProps}) => ({
    title: "Today",
    tabBarLabel: "Today",
    headerRight: <Button
          title="Add"
          onPress={() => {
            navigation.navigate("Add")
          }}
        />
  })

  getGreenScores = async () => {
    this.setState({fetchState: 'loading'})

    fetch(apiURL + '/api/greenscore' + '?token=' + token)
      .then((response) => {
        return response.json();
      })
      .then((res) => {
        this.setState({dataSource: res.data, fetchState: 'done'})
      });
  }

  setDate = (_, date) => {
    date = date !== undefined ? date : new Date()

    this.setState({
      showDatePicker: Platform.OS === 'ios' ? true : false,
      selectedDate: date
    });
  }

  toggleDatePicker = () => {
    this.setState({showDatePicker: true})
  }

  render() {
    return (
      <View style={styles.pageLayout}>
        <View style={styles.dateButtonContainer}>
          <Text 
            onPress={() => {
              this.toggleDatePicker()
            }}
            style={styles.dateButton}>
              {moment(this.selectedDate).isSame(new Date(), 'day') ? 'Today' : moment(this.selectedDate).format('dddd, MMMM Do')}
            </Text>
        </View>
        {this.state.fetchState == 'loading' ? <Text>Loading...</Text>
        : (
          <FlatList
          style={styles.list}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Item title={item.action} score={item.score} createdAt={item.createdAt} />
          )}
          keyExtractor={item => item.id}
        />
        )}
        { this.state.showDatePicker && <DateTimePicker value={this.state.selectedDate}
                    is24Hour={true}
                    display="default"
                    onChange={this.setDate} />
        }
      </View>
    );
  }
}

function Item({ title, score, createdAt }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemInner}>
        <Text style={styles.title}>{title}</Text>
        <Text>{moment(createdAt).format("hh:mm A")}</Text>
      </View>
      <Text style={[styles.score, score >= 0 ? styles.goodScore : styles.badScore]}>{score}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  toolbar: {
    backgroundColor: "#2196F3",
    height: 56,
    alignSelf: "stretch",
    textAlign: "center"
  },
  pageLayout: {
    paddingBottom: 56
  },
  container: {
    flex: 1,
    marginTop: 20
  },
  dateButtonContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: 'lightgrey'
  },
  dateButton: {
    width: '100%',
    textAlign: 'center',
    fontSize: 16,
    padding: 16,
  },
  list: {
    width: "100%"
  },
  item: {
    padding: 16,
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  itemInner: {
    flex: 1,
    flexDirection: "column"
  },
  title: {
    fontSize: 24
  },
  score: {
    fontSize: 24,
    position: "absolute",
    right: 16,
    top: 16
  },
  badScore: {
    color: 'red'
  },
  goodScore: {
    color: 'green'
  }
});
