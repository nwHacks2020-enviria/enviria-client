import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const apiURL = "https://0f8a9c98.ngrok.io"
const token = "5e6439ba7b3a09c6d9ebc8f8222d9f01b43287a211e22c6cd7a6c5ed2fac76ff3b54a72031e178eb32e54e513bbccf074ff9adb7560bd9de02d42982c990d0b8"

export default class LeaderboardScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      fetchState: 'loading'
    };
  }

  async componentDidMount() {
    await this.getLeaderboard()
  }

  // sort later

  static navigationOptions = ({navigation, screenProps}) => ({
    title: "Leaderboard",
    tabBarLabel: "Leaderboard"
  })

  getLeaderboard = async () => {
    this.setState({fetchState: 'loading'})

    fetch(apiURL + '/api/leaderboard' + '?token=' + token
    ).then((response) => {
        return response.json();
      })
      .then((res) => {
        console.log(res.data.top_users)
        this.setState({dataSource: res.data.top_users, fetchState: 'done'})
      });
  }

  render() {
    return (
      <View style={styles.pageLayout}>
        {this.state.fetchState == 'loading' ? <Text>Loading...</Text>
        : this.state.dataSource.length > 0 ?
          <FlatList
          style={styles.list}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Item key={item.email} title={item.username} score={item.total_greenscore} />
          )}
          keyExtractor={item => item.id}
        />
        : <Text>No users yet! Be the first by contributing to the world!</Text>}
      </View>
    );
  }
}

function Item({ title, score }) {
  return (
    <View style={styles.item}>
      <View style={styles.itemInner}>
        <Text style={styles.title}>{title}</Text>
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
