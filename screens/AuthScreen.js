// screens/AuthScreen.js
import React, { useState } from 'react'; // Import useState
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native'; // Import Alert
import { useNavigation } from '@react-navigation/native'; // Hook to get navigation
import { useAppContext } from '../context/AppContext'; // Hook to get context

const AuthScreen = () => {
    const navigation = useNavigation(); // Get navigation object
    // Get simulation functions from context
    const { simulateLogin, simulateRegister } = useAppContext();

    // Local state for form inputs
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // To prevent multiple taps

    // Handler for Login button press
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Input Required", "Please enter both email and password.");
            return;
        }
        setIsLoading(true);
        Alert.alert("Logging In", `Attempting to log in with ${email}...`); // Simulate feedback

        // Simulate the login process
        await simulateLogin({ email, password }); // Pass credentials (not used in simulation)

        setIsLoading(false);
         Alert.alert("Success", "Logged in successfully!"); // Show success
        // Navigate to the main app screen after simulated login
        navigation.navigate('ServiceBrowse');
    };

    // Handler for Register button press
    const handleRegister = async () => {
         if (!email || !password) {
            Alert.alert("Input Required", "Please enter both email and password.");
            return;
        }
         setIsLoading(true);
         Alert.alert("Registering", `Attempting to register with ${email}...`); // Simulate feedback

        // Simulate the registration process
        await simulateRegister({ email, password }); // Pass credentials (not used in simulation)

        setIsLoading(false);
        Alert.alert("Success", "Registered successfully!"); // Show success
        // Navigate to the main app screen after simulated registration
        navigation.navigate('ServiceBrowse');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome!</Text>
            <Text style={styles.subtitle}>Sign in or create an account</Text>

            {/* Email Input */}
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
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            {/* Register Button */}
             <TouchableOpacity
                style={[styles.button, styles.registerButton, isLoading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={isLoading} // Disable button while loading
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {/* Add Forgot Password / Other links here if desired */}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', // Center content vertically
        alignItems: 'center',   // Center content horizontally
        padding: 20,
        backgroundColor: '#f8f8f8', // Consistent background
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
        marginBottom: 30, // More space below subtitle
    },
    input: {
        width: '100%', // Full width
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15, // Generous padding
        marginBottom: 15, // Space between inputs
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },
    button: {
        width: '100%', // Full width
        padding: 15,
        borderRadius: 8,
        alignItems: 'center', // Center text horizontally
        marginBottom: 10, // Space between buttons
        elevation: 3, // Add shadow
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    loginButton: {
        backgroundColor: '#3498db', // Blue color for login
    },
    registerButton: {
        backgroundColor: '#2ecc71', // Green color for register
    },
    buttonText: {
        color: '#fff', // White text
        fontSize: 18,
        fontWeight: 'bold',
    },
     buttonDisabled: {
        backgroundColor: '#cccccc', // Grey color when disabled
        elevation: 0,
        shadowOpacity: 0,
     },
});

export default AuthScreen;