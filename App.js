import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as ReadSms from 'react-native-read-sms/ReadSms';

export default function App() {

  const [passcode, setPasscode] = React.useState(null);

  const sendSMS = async (sms, passcode) => {
    let baseURL = 'https://cedispay.com.gh';

    try {
      const response = await axios({
        method : "POST",
        url : baseURL + '/api/momo/repay',
        headers : {
          'Content-Type' : "application/json",
        },
        data : {
          msg : sms.body,
          key : passcode
        }
      })
      console.log(response)
    } catch (error){
      console.error(error);
    }
  }

  const onPress = async(passcode) => {
    const hasPermission = await ReadSms.requestReadSMSPermission();

    if(hasPermission){
      ReadSms.startReadSMS((status, sms, error) => {
        if(status === "success"){
          if(sms._id === "MobileMoney"){
            sendSMS(sms, passcode)
          }
        }

        if(error){
          console.error(error)
        }
      })
    }
  }

  return (
    // <SafeAreaView>
      <View style={styles.container}>
        {/* <Text>Open up App.js to start working on your app!</Text> */}
        <TextInput style={styles.input} onChangeText={setPasscode} value={passcode} />
        <TouchableOpacity style={styles.button} onPress={onPress(passcode)}>
          <Text>Enter</Text>
        </TouchableOpacity>
        <StatusBar style="auto" />
      </View>
    // </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input : {
    height : 40,
    width : "70%",
    borderRadius : 8,
    margin : 12,
    borderWidth : 1,
    borderColor : "rgba(0,0,0,0.1)"
  },
  button : {
    alignItems : "center",
    backgroundColor : "#DDDDDD",
    borderRadius : 4,
    paddingTop : 15,
    paddingBottom : 15,
    paddingLeft : 35,
    paddingRight : 35,
    marginTop : 10
  }
});
