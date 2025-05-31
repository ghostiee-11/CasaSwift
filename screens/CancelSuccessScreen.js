// screens/CancelSuccessScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons

const CancelSuccessScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Ionicons name="checkmark-circle-outline" size={80} color="#e74c3c" /> {/* Red checkmark */}
            <Text style={styles.message}>Your booking has been cancelled successfully!</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('OrderHistory')} // Navigate back to Order History
            >
                <Text style={styles.buttonText}>View My Bookings</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[styles.button, styles.secondaryButton]}
                onPress={() => navigation.navigate('ServiceBrowse')} // Navigate back to Browse
            >
                <Text style={styles.secondaryButtonText}>Browse More Services</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f8f8f8',
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20, // Space below icon
        marginBottom: 30, // Space below message
        color: '#e74c3c', // Red color
    },
    button: {
        width: '80%', // Button takes 80% width
        backgroundColor: '#3498db', // Blue color
        paddingVertical: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
     secondaryButton: {
         backgroundColor: '#bdc3c7', // Grey secondary button
     },
    secondaryButtonText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default CancelSuccessScreen;