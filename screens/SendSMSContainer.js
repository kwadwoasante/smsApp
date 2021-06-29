import React, { Component } from 'react';
import * as ReadSms from 'react-native-read-sms/ReadSms';
import Scan from './scan';
// import SendSMS from 'react-native-sms'
// import SmsAndroid from 'react-native-get-sms-android';
import axios from 'axios';

class SendSMSContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    // componentWillMount = () => {
    //     this.startReadSMS();
    // }

    // componentWillUnmount = () => {
    //     ReadSms.stopReadSMS();
    // }

    // startReadSMS = async () => {
    //     const hasPermission = await ReadSms.requestReadSMSPermission();

    //     if(hasPermission){
    //         ReadSms.startReadSMS((status, sms, error) => {
    //             if(status == "success"){
    //                 if(sms._id === "MobileMoney"){
    //                     sendSMS(sms)
    //                 }
    //             }
    //         })
    //     }
    // }

    // Function to send message
    sendSMS = async (sms,passcode) => {
        // console.log(sms);

        let baseURL = 'http://cedispay.com.gh';

        try {
            const response = await axios({
                method: "POST",
                url : baseURL + '/api/momo/repay',
                headers : {
                    'Content-Type' : 'application/json'
                },
                data : {
                    msg : sms.body,
                    key : passcode
                }
            })
            console.log(response)
        } catch(error){
            console.error(error);
        }
    }


    // Function to read particular message from inbox with id
    getSMS = (passcode) => {

        const hasPermission = await ReadSms.requestReadSMSPermission();

        if(hasPermission){
            ReadSms.startReadSMS((status, sms, error) => {
                if(status == "success"){
                    if(sms._id === "MobileMoney"){
                        sendSMS(sms, passcode)
                    }
                }

                if(error){
                    console.error(error)
                }
            })
        }

        // let filter = {
        //     box: 'inbox', 
        //     read: 0, // 0 for unread SMS, 1 for SMS already read
        //     _id: MobileMoney, // specify the msg id
        //     address: '+917691008701', // sender's phone number
        //     body: 'How are you shadman', // content to match
        //     // the next 2 filters can be used for pagination
        //     indexFrom: 0, // start from index 0
        //     maxCount: 1, // count of SMS to return each time
        // };
        // SmsAndroid.list(
        //     JSON.stringify(filter),
        //     (fail) => {
        //         console.log('Failed with this error: ' + fail);
        //     },
        //     (count, smsList) => {
        //         console.log('Count: ', count);
        //         console.log('List: ', smsList);
        //         var arr = JSON.parse(smsList);

        //         arr.forEach(function (object) {
        //             console.log('Object: ' + object);
        //             console.log('-->' + object.date);
        //             console.log('-->' + object.body);
        //             alert('your message with selected id is --->' + object.body)
        //         });
        //     },
        // );
    }

    render() {
        return (
            <Scan
                getSMS={this.getSMS}
                sendSMS={this.sendSMS}
            />
        );
    }
}

export default SendSMSContainer;