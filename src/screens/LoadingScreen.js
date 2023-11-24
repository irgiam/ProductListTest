import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <FontAwesome name={'mobile-phone'} size={128} style={styles.phoneIcon} />
        <Text style={{marginTop: 5, color: '#3a4144', fontSize: 18, fontWeight: 'bold'}}>Loading Product Data</Text>
        <Text style={{marginTop: 5, color: '#3a4144'}}>Please wait...</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '80%'
    },
    phoneIcon: {
        color: '#3a4144'
    },
});

export default LoadingScreen