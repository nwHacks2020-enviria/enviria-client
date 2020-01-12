import React from "react";
import { Button, FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import {storage, events} from '../../Util/litsy';

const apiURL = "https://d11ae255.ngrok.io"

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

    addAction = async (selectedAction) => {
        let token = await storage.get("enviria__authToken")

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
  