/* import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from "moment"
export default class TesteRelogio extends Component {
    state = {
        eventDate: moment.duration().add({ hours: 2, minutes: 0, seconds: 0 }), // add 9 full days
        hours: 0,
        mins: 0,
        secs: 0,
    }
    componentDidMount() {
        this.updateTimer()
    }
    updateTimer = () => {
        
        const x = setInterval(() => {
            let { eventDate } = this.state
            
            if (eventDate <= 0) {
                clearInterval(this.setState(moment.duration().add({ hours: 0, minutes: 0, seconds: 0 })))
            } else {
                eventDate = eventDate.subtract(1, "s")
                const hours = eventDate.hours()
                const mins = eventDate.minutes()
                const secs = eventDate.seconds()
                
                this.setState({
                    hours,
                    mins,
                    secs,
                    eventDate
                })
            }
        }, 1000)
    }
    
    atualizarTempo = async () => {
        let { eventDate } = this.state
        //this.setState({ eventDate: moment.duration().add({ hours: 1, minutes: 0, seconds: 0 }) })
        eventDate = eventDate.add({ hours: 1, minutes: 0, seconds: 0 })
        const hours = eventDate.hours() + 1
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()
        
        this.setState({
          hours,
          mins,
          secs,
          eventDate
        })
      }
    
    render() {
        return (
            <View style={styles.container}>
                <Text style={{ fontWeight: "bold", fontSize: 20, color: "#50010C" }}>Em breve</Text>
                <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 50 }}>{`${this.state.hours} : ${this.state.mins} : ${this.state.secs}`}</Text>

                <TouchableOpacity style={styles.mainContentFormButton} onPress={() => this.atualizarTempo()}>
                    <Text style={styles.mainContentFormButtonText}>Adicionar mais tempo</Text>
                </TouchableOpacity>
            </View>
        );
    }
    
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContentFormButton: {
        width: 157,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%'
    },
    mainContentFormButtonText: {
        fontSize: 18,
        fontFamily: 'ABeeZee_400Regular',
        color: '#000000'
    },
}); */
import React, { useState, useEffect, Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import moment from "moment"
export default function TesteRelogio() {
    const [state, setState] = useState({
        eventDate: moment.duration().add({ hours: 2, minutes: 0, seconds: 0 }), // add 9 full days
        hours: 0,
        mins: 0,
        secs: 0,
    })

    useEffect(() => {
        //updateTimer();
        console.warn(state)
    }, []);

    /* const updateTimer = () => {
        const x = setInterval(() => {
            let { eventDate } = state

            if (eventDate <= 0) {
                clearInterval(this.setState(moment.duration().add({ hours: 0, minutes: 0, seconds: 0 })))
            } else {
                eventDate = eventDate.subtract(1, "s")
                const hours = eventDate.hours()
                const mins = eventDate.minutes()
                const secs = eventDate.seconds()

                setState({
                    hours,
                    mins,
                    secs,
                    eventDate
                })
            }
        }, 1000)
    } */
/*
    atualizarTempo = async () => {
        let { eventDate } = this.state
        //this.setState({ eventDate: moment.duration().add({ hours: 1, minutes: 0, seconds: 0 }) })
        eventDate = eventDate.add({ hours: 1, minutes: 0, seconds: 0 })
        const hours = eventDate.hours() + 1
        const mins = eventDate.minutes()
        const secs = eventDate.seconds()

        this.setState({
            hours,
            mins,
            secs,
            eventDate
        })
    }
 */
    return (
        <View style={styles.container}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "#50010C" }}>Em breve</Text>
            <Text style={{ fontWeight: "bold", fontSize: 50, marginBottom: 50 }}>{`${state.hours} : ${state.mins} : ${state.secs}`}</Text>

            {/*<TouchableOpacity style={styles.mainContentFormButton} onPress={() => atualizarTempo()}>
                <Text style={styles.mainContentFormButtonText}>Adicionar mais tempo</Text>
            </TouchableOpacity> */}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    mainContentFormButton: {
        width: 157,
        height: 60,
        borderRadius: 5,
        backgroundColor: '#F3BC2C',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20%'
    },
    mainContentFormButtonText: {
        fontSize: 18,
        fontFamily: 'ABeeZee_400Regular',
        color: '#000000'
    },
});