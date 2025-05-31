// screens/CancelConfirmationScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Import useRoute
import { useAppContext } from '../context/AppContext';

const CancelConfirmationScreen = () => {
    const navigation = useNavigation();
    const route = useRoute(); // Hook to get route object
    const { orderId } = route.params || {}; // Get orderId from navigation params

    const { updateOrderStatus } = useAppContext(); // Get the update status function

    const handleConfirmCancel = () => {
        if (orderId) {
            updateOrderStatus(orderId, 'cancelled'); // Update status in context
            navigation.navigate('CancelSuccess'); // Navigate to success screen
        } else {
            // Handle error if orderId is missing
            Alert.alert("Error", "Could not find order ID for cancellation.");
            navigation.goBack(); // Go back if no ID
        }
    };

    const handleGoBack = () => {
        navigation.goBack(); // Go back to the previous screen (Order History)
    };

    return (
        <View style={styles.container}>
            <Text style={styles.message}>Are you sure you want to cancel this booking?</Text>
            {orderId && <Text style={styles.orderIdText}>Order ID: #{orderId}</Text>}

            <View style={styles.buttonContainer}>
                {/* Yes, Cancel Button */}
                <TouchableOpacity
                    style={[styles.button, styles.confirmButton]}
                    onPress={handleConfirmCancel}
                >
                    <Text style={styles.buttonText}>Yes, Cancel</Text>
                </TouchableOpacity>

                {/* No, Keep Order Button */}
                 <TouchableOpacity
                    style={[styles.button, styles.goBackButton]}
                    onPress={handleGoBack}
                >
                    <Text style={styles.buttonText}>No, Keep Order</Text>
                </TouchableOpacity>
            </View>
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
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    orderIdText: {
        fontSize: 16,
        color: '#555',
        marginBottom: 30,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%', // Take full width
        paddingHorizontal: 20, // Add some padding
    },
    button: {
        flex: 1, // Each button takes equal space
        marginHorizontal: 10, // Space between buttons
        paddingVertical: 12,
        borderRadius: 8,
        alignItems: 'center',
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    confirmButton: {
        backgroundColor: '#e74c3c', // Red for cancellation
    },
    goBackButton: {
        backgroundColor: '#bdc3c7', // Grey to go back
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default CancelConfirmationScreen;