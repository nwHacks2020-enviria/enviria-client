import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import {storage, events} from '../../Util/litsy';

const apiURL = "https://d11ae255.ngrok.io"
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
    let token = await storage.get("enviria__authToken")

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
    backgroundColor: '#E5FFDB',
    flex: 1
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
