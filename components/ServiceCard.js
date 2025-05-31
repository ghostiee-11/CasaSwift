// components/ServiceCard.js
import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useAppContext } from '../context/AppContext'; // Import context hook

const ServiceCard = ({ service, onPress }) => {
    const { toggleFavorite, isFavorite } = useAppContext(); // Get favorite functions

    const imageUrl = service.images && service.images.length > 0 ? service.images[0] : 'https://via.placeholder.com/300x200?text=No+Image';

    // Check if this service is currently a favorite
    const favorited = isFavorite(service.id);

    return (
        <TouchableOpacity style={styles.card} onPress={() => onPress(service.id)}>
            {/* Image */}
            <Image source={{ uri: imageUrl }} style={styles.image} accessibilityLabel={service.name} />

            {/* Favorite Button Overlay */}
            <TouchableOpacity
                style={styles.favoriteButton}
                onPress={() => toggleFavorite(service.id)} // Toggle favorite status
            >
                 <Ionicons
                     name={favorited ? 'heart' : 'heart-outline'} // Filled heart if favorited
                     size={24}
                     color={favorited ? '#e74c3c' : '#fff'} // Red if favorited, white outline otherwise
                 />
            </TouchableOpacity>

            {/* Service Info */}
            <View style={styles.infoContainer}>
                <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{service.name}</Text>
                <Text style={styles.price}>${service.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        margin: 8,
        backgroundColor: '#fff',
        borderRadius: 12,
        overflow: 'hidden',
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.15,
        shadowRadius: 6,
        position: 'relative', // Needed for absolute positioning of favorite button
    },
    image: {
        width: '100%',
        height: 140,
        resizeMode: 'cover',
    },
    favoriteButton: {
        position: 'absolute', // Position over the image
        top: 8, // Distance from top edge
        right: 8, // Distance from right edge
        backgroundColor: 'rgba(0,0,0,0.4)', // Semi-transparent background
        borderRadius: 20, // Make it circular
        padding: 5,
        zIndex: 1, // Ensure it's above the image
    },
    infoContainer: {
        padding: 12,
    },
    name: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
        color: '#333',
    },
    price: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#4CAF50',
    },
});

export default ServiceCard;