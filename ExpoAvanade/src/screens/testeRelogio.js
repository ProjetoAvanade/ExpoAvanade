import React from "react";
import { StyleSheet, View } from "react-native";
import TimerCountdown from "react-native-timer-countdown";

export default function TesteRelogio({ navigation, route }) {
    const milliseconds = 10000
    return (
        <View style={styles.container}>
            <TimerCountdown
                initialSecondsRemaining={1000 * 60}
                onTick={(secondsRemaining) => console.log("tick", secondsRemaining)}
                onComplete={() => console.log("complete")}
                formatSecondsRemaining={(milliseconds) => {
                    const remainingSec = Math.round(milliseconds / 1000);
                    const seconds = parseInt((remainingSec % 60).toString(), 10);
                    const minutes = parseInt(((remainingSec / 60) % 60).toString(), 10);
                    const hours = parseInt((remainingSec / 3600).toString(), 10);
                    const s = seconds < 10 ? '0' + seconds : seconds;
                    const m = minutes < 10 ? '0' + minutes : minutes;
                    let h = hours < 10 ? '0' + hours : hours;
                    h = h === '00' ? '' : h + ':';
                    return h + m + ':' + s;
                }}
                allowFontScaling={true}
                style={{ fontSize: 20 }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center"
    }
});


/* import React, { useState, useEffect } from 'react';



// import all the components we are going to use

import { SafeAreaView, StyleSheet, Text, View } from 'react-native';



// import CountDown to show the timer

import CountDown from 'react-native-countdown-component';



// import moment to help you play with date and time

import moment from 'moment';

export default function TesteRelogio({ navigation, route }) {
    const idVaga = route.params.idVaga;
    const horas = route.params.horas;
    const [totalDuration, setTotalDuration] = useState(horas * 60 * 60);

    useEffect(() => {

        // Coundown timer for a given expiry date-time

        let date =

            moment()

                .utcOffset('+05:30')

                .format('YYYY-MM-DD hh:mm:ss');



        // Getting the current date-time

        // You can set your own date-time

        let expirydate = '2022-05-17 08:15:45';


        let diffr =

            moment

                .duration(moment(expirydate)

                    .diff(moment(date)));

        // Difference of the expiry date-time

        var hours = parseInt(diffr.asHours());

        var minutes = parseInt(diffr.minutes());

        var seconds = parseInt(diffr.seconds());



        // Converting in seconds

        var d = hours * 60 * 60 + minutes * 60 + seconds;



        // Settign up the duration of countdown

        setTotalDuration(d);

    }, []);



    return (

        <SafeAreaView style={styles.container}>

            <View style={styles.container}>

                <CountDown

                    until={totalDuration}

                    //duration of countdown in seconds

                    timetoShow={('H', 'M', 'S')}

                    //formate to show

                    onFinish={() => alert('finished')}

                    //on Finish call

                    onPress={() => alert('hello')}

                    //on Press call

                    size={20}

                />

            </View>

        </SafeAreaView>

    );

};


const styles = StyleSheet.create({

    container: {

        flex: 1,

        padding: 10,

        justifyContent: 'center',

        alignItems: 'center',

    },

    title: {

        textAlign: 'center',

        fontSize: 20,

        fontWeight: 'bold',

        padding: 20,

    },

}); */



/* import React, { useState, useEffect, useRef } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';

export default function TesteRelogio({ navigation, route }) {
    const idVaga = route.params.idVaga;
    const horas = route.params.horas;
    const [isPlaying, setIsPlaying] = useState(true)


    const [time, setTime] = useState(100);
    const timerRef = useRef(time);

    useEffect(() => {
        const timerId = setInterval(() => {
            timerRef.current -= 1;
            if (timerRef.current < 0) {
                clearInterval(timerId);
            } else {
                setTime(timerRef.current);
            }
        }, 1000);
        return () => {
            clearInterval(timerId);
        };
    }, []);

    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text> {time} </Text>
        </View>
    )
}
 */


/* return (
    <View style={styles.container}>
        <CountdownCircleTimer
            isPlaying={isPlaying}
            duration={(horas * 60) * 60}
            colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
            colorsTime={[10, 6, 3, 0]}
            onComplete={() => ({ shouldRepeat: true, delay: 2 })}
        >
            {({ remainingTime, color }) => (
                <Text style={{ color, fontSize: 40 }}>
                    {remainingTime}
                </Text>
            )}
        </CountdownCircleTimer>
        <Button title="Toggle Playing" onPress={() => setIsPlaying(prev => !prev)} />
    </View>
)
} */

/* const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ecf0f1',
        padding: 8,
    }
}); */