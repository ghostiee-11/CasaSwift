// screens/ConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native'; // Import TouchableOpacity
import { useNavigation } from '@react-navigation/native'; // Use hook for navigation access

const ConfirmationScreen = () => {
    const navigation = useNavigation(); // Use hook to get navigation object

    return (
        <View style={styles.container}>
            <Text style={styles.message}>🥳</Text> {/* Funky touch */}
            <Text style={styles.message}>Your order has been placed successfully!</Text>

             {/* Optional: Could display order number or summary here if available */}
             {/* <Text style={styles.orderInfo}>Order #XYZ123</Text> */}

            <TouchableOpacity
                style={styles.homeButton}
                onPress={() => navigation.navigate('ServiceBrowse')} // Navigate back to the main browsing screen
            >
                <Text style={styles.homeButtonText}>Browse More Services</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center vertically
        alignItems: 'center',   // Center horizontally
        padding: 20,
        backgroundColor: '#e8f5e9', // Light green background for success feel
    },
    message: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15, // Space below the message
        color: '#2e7d32', // Dark green color
    },
     orderInfo: { // Optional style if displaying order info
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
     },
    homeButton: {
        backgroundColor: '#4CAF50', // Green color
        paddingVertical: 12, // Vertical padding
        paddingHorizontal: 25, // Horizontal padding
        borderRadius: 25, // Pill shape button
        alignItems: 'center',
        marginTop: 20, // Space above button
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 3,
    },
    homeButtonText: {
        color: '#fff', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ConfirmationScreen;