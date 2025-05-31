// screens/RegisterScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const { simulateRegister } = useAppContext(); // Get simulation function

    // Local state for form inputs
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Handler for Register button press
    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert("Input Required", "Please fill in all fields.");
            return;
        }
        if (password !== confirmPassword) {
            Alert.alert("Password Mismatch", "Password and Confirm Password do not match.");
            return;
        }

        setIsLoading(true);

        // Simulate the registration process
        // Pass credentials (not used in simulation logic in context)
        await simulateRegister({ name, email, password });

        setIsLoading(false);
        // Alert.alert("Success", "Registered successfully!"); // Optional success alert
        // Navigate to the main app screen after simulated registration
        navigation.navigate('ServiceBrowse');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started</Text>

             {/* Name Input */}
            <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                placeholderTextColor="#999"
                editable={!isLoading}
            />

            {/* Email Input */}
            <TextInput
                style={styles.input}
                placeholder="Email Address"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                editable={!isLoading}
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                placeholderTextColor="#999"
                editable={!isLoading}
            />

            {/* Confirm Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
                placeholderTextColor="#999"
                editable={!isLoading}
            />


            {/* Register Button */}
             <TouchableOpacity
                style={[styles.button, styles.registerButton, isLoading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isLoading}
            >
                 {isLoading ? (
                    <ActivityIndicator color="#fff" /> // Show loader
                ) : (
                    <Text style={styles.buttonText}>Register</Text>
                )}
            </TouchableOpacity>

             {/* Link to Login */}
             <TouchableOpacity onPress={() => navigation.navigate('Login')} disabled={isLoading}>
                 <Text style={styles.switchAuthText}>Already have an account? <Text style={styles.switchAuthLink}>Login here</Text></Text>
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
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    input: {
        width: '100%',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 10,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    registerButton: {
        backgroundColor: '#2ecc71',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
     buttonDisabled: {
        backgroundColor: '#cccccc',
        elevation: 0,
        shadowOpacity: 0,
     },
      switchAuthText: {
         marginTop: 20,
         fontSize: 14,
         color: '#666',
     },
     switchAuthLink: {
         color: '#2ecc71', // Link color matching register button
         fontWeight: 'bold',
     }
});

export default RegisterScreen;