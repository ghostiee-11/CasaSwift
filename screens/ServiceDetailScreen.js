// screens/ServiceDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons
import { useAppContext } from '../context/AppContext';

const { width } = Dimensions.get('window');

const ServiceDetailScreen = ({ route, navigation }) => {
    const { serviceId } = route.params || {};
    // Get services, addToCart, and favorite functions from context
    const { services, addToCart, toggleFavorite, isFavorite } = useAppContext();

    const service = services.find(s => s.id === serviceId);

    if (!service) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Service not found!</Text>
            </View>
        );
    }

    const imageUrl = service.images && service.images.length > 0
                     ? service.images[0]
                     : 'https://via.placeholder.com/400x300?text=No+Image+Available';

    // Check if this service is currently a favorite
    const favorited = isFavorite(service.id);

    const handleAddToCart = () => {
        addToCart(service.id);
        Alert.alert('Added to Cart', `${service.name} has been added to your cart.`);
    };

    const handleToggleFavorite = () => {
        toggleFavorite(service.id);
        // Optional: Show a small toast/message
        // Alert.alert('Favorite Updated', `${service.name} ${favorited ? 'removed from' : 'added to'} favorites.`);
    };


    return (
        <ScrollView style={styles.container}>
            {/* Service Image */}
            <Image source={{ uri: imageUrl }} style={styles.mainImage} accessibilityLabel={service.name} />

            <View style={styles.detailsContent}>
                 {/* Name and Favorite Icon Row */}
                 <View style={styles.nameRow}>
                    <Text style={styles.serviceName}>{service.name}</Text>
                    {/* Favorite Button */}
                     <TouchableOpacity style={styles.favoriteIconDetail} onPress={handleToggleFavorite}>
                         <Ionicons
                             name={favorited ? 'heart' : 'heart-outline'}
                             size={30}
                             color={favorited ? '#e74c3c' : '#888'} // Red if favorited, grey outline otherwise
                         />
                    </TouchableOpacity>
                 </View>


                {/* Service Description */}
                <Text style={styles.serviceDescription}>{service.description}</Text>

                {/* Service Price */}
                <Text style={styles.servicePrice}>Price: ${service.price}</Text>

                {/* Service Duration */}
                 <Text style={styles.serviceDuration}>Est. Duration: {service.duration}</Text>

                {/* Add to Cart Button */}
                <TouchableOpacity style={styles.addToCartButton} onPress={handleAddToCart}>
                     <Text style={styles.addToCartButtonText}>Add to Cart</Text>
                </TouchableOpacity>

                {/* Go to Cart Button */}
                <TouchableOpacity style={styles.goToCartButton} onPress={() => navigation.navigate('Cart')}>
                     <Text style={styles.goToCartButtonText}>View Cart</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
     errorText: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 50,
        color: 'red',
     },
    mainImage: {
        width: width,
        height: width * 0.6,
        resizeMode: 'cover',
    },
    detailsContent: {
        padding: 20,
    },
    nameRow: { // Style for the row containing name and favorite icon
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    serviceName: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#2c3e50',
        flexShrink: 1, // Allow name to shrink if long
        marginRight: 10, // Space between name and icon
    },
    favoriteIconDetail: { // Style for the favorite icon container
        padding: 5, // Make it easier to tap
    },
    serviceDescription: {
        fontSize: 16,
        color: '#555',
        marginBottom: 15,
        lineHeight: 24,
    },
    servicePrice: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#27ae60',
        marginBottom: 10,
    },
     serviceDuration: {
        fontSize: 16,
        color: '#7f8c8d',
        marginBottom: 20,
     },
    addToCartButton: {
        backgroundColor: '#e67e22',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 15,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
     addToCartButtonText: {
         color: '#fff',
         fontSize: 18,
         fontWeight: 'bold',
     },
     goToCartButton: {
        backgroundColor: '#bdc3c7',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
         elevation: 2,
         shadowColor: '#000',
         shadowOffset: { width: 0, height: 1 },
         shadowOpacity: 0.08,
         shadowRadius: 2,
     },
     goToCartButtonText: {
         color: '#34495e',
         fontSize: 18,
         fontWeight: '600',
     },
});

export default ServiceDetailScreen;