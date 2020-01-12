import React from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import {withNavigation} from 'react-navigation'

export default class TodayScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      dataSource: [
        {
          id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
          title: "First Item",
          description: "stnareisn",
          score: -50
        },
        {
          id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
          title: "Second Item",
          description: "stnareisn",
          score: 50
        },
        {
          id: "58694a0f-3da1-471f-bd96-145571e29d72",
          title: "Third Item",
          description: "stnareisn",
          score: 200
        }
      ]
    };
  }

  static navigationOptions = ({navigation, screenProps}) => ({
    title: "Today",
    tabBarLabel: "Today",
    headerRight: <Button
          title="Add"
          onPress={() => {
            console.log("hello", navigation)
            // this.props.navigation.navigate('AccountScreen')
            navigation.navigate("Account")
          }}
        />
  })

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
        <FlatList
          style={styles.list}
          data={this.state.dataSource}
          renderItem={({ item }) => (
            <Item title={item.title} score={item.score} />
          )}
          keyExtractor={item => item.id}
        />
      </View>
    );
  }
}

function Item({ title, score }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
    backgroundColor: "#f9c2ff",
    padding: 8,
    flex: 1,
    flexDirection: "row",
    width: "100%"
  },
  title: {
    fontSize: 16
  },
  score: {
    fontSize: 16,
    position: "absolute",
    right: 8,
    top: 8,
    bottom: 8
  },
  badScore: {
    color: 'red'
  },
  goodScore: {
    color: 'green'
  }
});
