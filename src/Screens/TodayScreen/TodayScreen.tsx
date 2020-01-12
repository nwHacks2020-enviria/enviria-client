import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import moment from "moment";

const apiURL = "https://0f8a9c98.ngrok.io"
const token = "4cb8d8796e26cfc3eb3ce0c526c5e5c06437065b8df6867357bf92c490f205f9ca01787391af4cda53d76d716c53ef019bbf419d48cbb068eef39f4e0ea5b9c8"

export default class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [],
      fetchState: 'loading'
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
            console.log("hello", navigation)
            // this.props.navigation.navigate('AccountScreen')
            navigation.navigate("Add")
          }}
        />
  })

  getGreenScores = async () => {
    fetch(apiURL + '/api/greenscore' + '?token=' + token)
      .then((response) => {
        console.log(response)
        return response.json();
      })
      .then((res) => {
        this.setState({dataSource: res.data, fetchState: 'done'})
      });
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
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
  container: {
    flex: 1,
    marginTop: 20
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
