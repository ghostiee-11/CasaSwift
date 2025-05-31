// screens/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { useNavigation } from '@react-navigation/native';
import { useAppContext } from '../context/AppContext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const { simulateLogin } = useAppContext(); // Get simulation function

    // Local state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    // Handler for Login button press
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Input Required", "Please enter both email/username and password.");
            return;
        }
        setIsLoading(true);

        // Simulate the login process
        // Pass credentials (not used in simulation logic in context, but good practice)
        await simulateLogin({ email, password });

        setIsLoading(false);
        // Alert.alert("Success", "Logged in successfully!"); // Optional success alert
        // Navigate to the main app screen after simulated login
        navigation.navigate('ServiceBrowse');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome Back!</Text>
            <Text style={styles.subtitle}>Login to your account</Text>

            {/* Email/Username Input */}
            <TextInput
                style={styles.input}
                placeholder="Email or Username"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                editable={!isLoading} // Disable input while loading
            />

            {/* Password Input */}
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry // Hide password input
                placeholderTextColor="#999"
                editable={!isLoading} // Disable input while loading
            />

            {/* Login Button */}
            <TouchableOpacity
                style={[styles.button, styles.loginButton, isLoading && styles.buttonDisabled]}
                onPress={handleLogin}
                disabled={isLoading} // Disable button while loading
            >
                {isLoading ? (
                    <ActivityIndicator color="#fff" /> // Show loader
                ) : (
                    <Text style={styles.buttonText}>Login</Text>
                )}
            </TouchableOpacity>

            {/* Link to Register */}
             <TouchableOpacity onPress={() => navigation.navigate('Register')} disabled={isLoading}>
                 <Text style={styles.switchAuthText}>Don't have an account? <Text style={styles.switchAuthLink}>Register here</Text></Text>
            </TouchableOpacity>

            {/* Add Forgot Password / Other links here if desired */}

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
    loginButton: {
        backgroundColor: '#3498db',
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
         color: '#3498db', // Link color matching login button
         fontWeight: 'bold',
     }
});

export default LoginScreen;