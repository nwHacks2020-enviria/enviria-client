import React from "react";
import { Button, FlatList, View, Text, StyleSheet } from "react-native";

export default class AddScreen extends React.Component {
    constructor(props) {
      super(props);
  
      // /api/greenscore
      // expects: auth token, action (just a string)
      this.state = {
          actions: [
              "Biking",
              "Driving",
              "Transit",
              "Recycling",
              "Compositing"
          ]
      };
    }
  
    static navigationOptions = ({navigation, screenProps}) => ({
      title: "Add action",
      headerLeft: <Button
            title="Back"
            onPress={() => {
              // this.props.navigation.navigate('AccountScreen')
              navigation.goBack()
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
            data={this.state.actions}
            renderItem={({ item }) => (
              <Item title={item} />
            )}
            keyExtractor={item => item}
          />
        </View>
      );
    }
  }
  
function Item({ title }) {
    return (
      <View style={styles.item} onClick={() => {alert("hi")}}>
        <Text style={styles.title}>{title}</Text>
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
    }
  });
  