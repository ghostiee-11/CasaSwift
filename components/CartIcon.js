// components/CartIcon.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Ionicons from Expo vector icons
import { useNavigation } from '@react-navigation/native'; // Hook to get navigation
import { useAppContext } from '../context/AppContext'; // Hook to get context state

const CartIcon = () => {
    const navigation = useNavigation(); // Get navigation object
    const { getCartItemCount } = useAppContext(); // Get the function to get item count

    const itemCount = getCartItemCount(); // Get the current total item count

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => navigation.navigate('Cart')} // Navigate to Cart screen on press
        >
            {/* Cart Icon */}
            <Ionicons name="cart" size={25} color="#333" />

            {/* Item Count Badge (Conditionally displayed) */}
            {itemCount > 0 && (
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{itemCount}</Text>
                </View>
            )}
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        marginRight: 20, // Space from the right edge of the header
        position: 'relative', // Needed for badge absolute positioning
    },
    badge: {
        position: 'absolute', // Position badge over the icon
        top: -5, // Adjust vertical position
        right: -10, // Adjust horizontal position
        backgroundColor: '#ff6f00', // Vibrant color for the badge
        borderRadius: 10, // Make it round
        minWidth: 20, // Ensure it's wide enough for 1-2 digits
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 4, // Give text some breathing room
    },
    badgeText: {
        color: 'white', // White text for readability
        fontSize: 12, // Small font size
        fontWeight: 'bold',
    },
});

export default CartIcon;