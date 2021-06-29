import React, { Component, Fragment, useState } from 'react';
import styles from './scanStyle'
import {
    TouchableOpacity,
    Text,
    textInput,
    StatusBar,
    Image,
    View,
    ActivityIndicator
} from 'react-native';


const Scan = ({ sendSMS, getSMS, deleteSMS }) => {
    const desccription = 'Read message from MobileMoney (MTN)'
    const imageUri = 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/sms.png';

    const [passcode, setPasscode] = useState();

    return (
        <View style={styles.scrollViewStyle}>
            {/* View When app starts, here we will dive for camera and vision things */}
            <Fragment>
                <StatusBar barStyle="dark-content" />
                <Image source={{ uri: imageUri }} style={{ width: 70, height: 70, alignSelf: 'center' }} />

                <Text style={styles.textTitle}>Welcome To CedisPay Momo-Message Forwarder!</Text>
                {/* {!camera && !cameraResult && */}
                <View style={styles.cardView} >
                    <Text numberOfLines={8} style={styles.descText}>{desccription}</Text>

                    {passcode ? (
                        <Fragment>
                            <TouchableOpacity onPress={getSMS(passcode)} style={styles.buttonTouchableRead}>
                                <Text style={styles.buttonTextStyle}> Read Momo SMS !</Text>
                            </TouchableOpacity>

                            {/* <TouchableOpacity onPress={sendSMs} style={styles.buttonTouchable}>
                                <Text style={styles.buttonTextStyle}> Send Momo Message !</Text>
                            </TouchableOpacity> */}

                            {/* <TouchableOpacity onPress={deleteSMS} style={styles.buttonTouchableDelete}>
                                <Text style={styles.buttonTextStyle}> Delete Momo SMS !</Text>
                            </TouchableOpacity> */}
                        </Fragment>
                    ) : (
                        <Fragment>
                            <TouchableOpacity>
                                <TextInput style={
                                    styles.input} 
                                    onChangeText={setPasscode} 
                                    value={passcode}
                                    placeholder="enter passcode" 
                                />
                            </TouchableOpacity>
                        </Fragment>
                    )}

                </View>
                
            </Fragment>
        </View>

    );

}

const styles = StyleSheet.create({
    input : {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 8,
    }
})

export default Scan;