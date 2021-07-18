import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';
import * as ReadSms from 'react-native-read-sms/ReadSms';
import * as BackgroundFetch from 'expo-background-fetch';
import * as TaskManager from 'expo-task-manager';

const BACKGROUND_FETCH_TASK = 'background-fetch';

TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {

  // send sms 
  sendSMS(passcode, url);
  

  // Be sure to return the successful result type!
  return BackgroundFetch.Result.NewData;
});

async function registerBackgroundFetchAsync() {
  return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
    minimumInterval: 60 * 60 * 24, // 24 hrs
    stopOnTerminate: false,
    startOnBoot: true, 
  });
}

async function unregisterBackgroundFetchAsync() {
  return BackgroundFetch.unregisterTaskAsync(BACKGROUND_FETCH_TASK);
}

export default function App() {

  const [isRegistered, setIsRegistered] = React.useState(false);
  const [status, setStatus] = React.useState(null);
  const [passcode, setPasscode] = React.useState(null);
  const [ipUrl, setIpUrl] = React.useState(null);

  const checkStatusAsync = async () => {
    const status = await BackgroundFetch.getStatusAsync();
    const isRegistered = await TaskManager.isTaskRegisteredAsync(BACKGROUND_FETCH_TASK);
    setStatus(status);
    setIsRegistered(isRegistered);
  };

  // const toggleFetchTask = async () => {
  //   if (isRegistered) {
  //     await unregisterBackgroundFetchAsync();
  //   } else {
  //     await registerBackgroundFetchAsync();
  //   }
  //   checkStatusAsync();
  // };

  React.useEffect(() => {
    checkStatusAsync();
  }, []);

  const sendSMS = async (sms, passcode, url) => {
    let baseURL = 'https://cedispay.com.gh';
    let link = url;

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

  const checkPermissions = async(passcode, url) => {
    const hasPermission = await ReadSms.requestReadSMSPermission();

    if(hasPermission){
      ReadSms.startReadSMS((status, sms, error) => {
        if(status === "success"){
          if(sms._id === "MobileMoney"){
            sendSMS(sms, passcode, url)
          }
        }

        if(error){
          console.error(error)
        }
      })
    }
  }

  const onPress = async(passcode, url) => {

    // initiate background sequence
    if (isRegistered) {
      await unregisterBackgroundFetchAsync();
    } else {
      await registerBackgroundFetchAsync();
      checkPermissions(passcode,url);
    }
    checkStatusAsync();

    
  }

  return (
    // <SafeAreaView>
      <View style={styles.container}>
        <Text>Enter Passcode!</Text>
        <TextInput style={styles.input} onChangeText={setPasscode} value={passcode} />

        <Text>Enter URL (IP Address)!</Text>
        <TextInput style={styles.input} onChangeText={setIpUrl} value={ipUrl} />

        <TouchableOpacity style={styles.button} onPress={onPress(passcode, ipUrl)}>
          <Text>Read</Text>
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
