// screens/WelcomeScreen.js (Modified from AuthScreen)
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const WelcomeScreen = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to ChoresApp!</Text>
            <Text style={styles.subtitle}>Your household needs, covered.</Text>

            {/* Login Button - Navigates to Login Screen */}
            <TouchableOpacity
                style={[styles.button, styles.loginButton]}
                onPress={() => navigation.navigate('Login')} // Navigate to Login screen
            >
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Register Button - Navigates to Register Screen */}
             <TouchableOpacity
                style={[styles.button, styles.registerButton]}
                onPress={() => navigation.navigate('Register')} // Navigate to Register screen
            >
                <Text style={styles.buttonText}>Create Account</Text>
            </TouchableOpacity>

            {/* Optional: Could add "Continue as Guest" or other options */}
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 40, // More space below subtitle
        textAlign: 'center',
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15, // Space between buttons
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    loginButton: {
        backgroundColor: '#3498db', // Blue color
    },
    registerButton: {
        backgroundColor: '#2ecc71', // Green color
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default WelcomeScreen;