import React from "react";
import { Button, FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";

const apiURL = "https://0f8a9c98.ngrok.io"
const token = "5e6439ba7b3a09c6d9ebc8f8222d9f01b43287a211e22c6cd7a6c5ed2fac76ff3b54a72031e178eb32e54e513bbccf074ff9adb7560bd9de02d42982c990d0b8"

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
              "Composting"
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

    addAction = (selectedAction) => {
        fetch(apiURL + '/api/greenscore' + '?token=' + token, {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                action: selectedAction.toLowerCase()
            })
          })
            .then((response) => {
                return response.json();
            })
            .then((res) => {
                // go back to list, add action to list
                console.log(res)
                this.props.navigation.goBack()
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
          <FlatList
            style={styles.list}
            data={this.state.actions}
            renderItem={({ item }) => (
              <Item title={item} addAction={this.addAction} />
            )}
            keyExtractor={item => item}
          />
        </View>
      );
    }
  }
  
function Item({ title, addAction }) {
    return (
      <TouchableOpacity style={styles.item} onPress={() => {addAction(title)}}>
        <Text style={styles.title}>{title}</Text>
      </TouchableOpacity>
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
    title: {
      fontSize: 16
    }
  });
  