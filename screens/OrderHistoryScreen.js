// screens/OrderHistoryScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs'; // For date formatting (requires dependency)

// Note: Add dayjs dependency: `npm install dayjs` or add 'dayjs' in Snack dependencies

const OrderHistoryScreen = () => {
    const navigation = useNavigation();
    const { placedOrders } = useAppContext(); // Get placed orders from context

    // Sort orders by placedAt timestamp, most recent first
    const sortedOrders = [...placedOrders].sort((a, b) => dayjs(b.placedAt).valueOf() - dayjs(a.placedAt).valueOf());

    const renderOrderItem = ({ item: order }) => {
        // Get a summary of service names for display
        const serviceSummary = order.items.map(item => `${item.name} x${item.quantity}`).join(', ');

        return (
            <View style={styles.orderCard}>
                <Text style={styles.orderId}>Order #{order.orderId}</Text>
                <Text style={styles.orderDate}>Placed On: {dayjs(order.placedAt).format('YYYY-MM-DD HH:mm')}</Text>
                <Text style={styles.orderStatus}>Status: <Text style={[styles.statusText, styles[`status_${order.status}`]]}>{order.status.toUpperCase()}</Text></Text>
                <Text style={styles.orderSlot}>Slot: {order.slot?.date} at {order.slot?.time}</Text>
                <Text style={styles.orderSummary} numberOfLines={1}>{serviceSummary || 'No services listed'}</Text>
                <Text style={styles.orderTotal}>Total: ${order.total.toFixed(2)}</Text>

                {/* Cancel Button (Conditional) */}
                {order.status === 'pending' && (
                    <TouchableOpacity
                        style={styles.cancelButton}
                        onPress={() => navigation.navigate('CancelConfirmation', { orderId: order.orderId })} // Navigate to confirmation
                    >
                        <Text style={styles.cancelButtonText}>Cancel Order</Text>
                    </TouchableOpacity>
                )}

                {/* Could add more actions based on status, e.g., "View Details", "Reschedule" */}
            </View>
        );
    };

    return (
        <View style={styles.container}>
            {sortedOrders.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>You haven't placed any orders yet.</Text>
                     <TouchableOpacity
                        style={styles.browseButton}
                        onPress={() => navigation.navigate('ServiceBrowse')}
                    >
                        <Text style={styles.browseButtonText}>Browse Services</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={sortedOrders}
                    renderItem={renderOrderItem}
                    keyExtractor={(item) => item.orderId}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f8f8',
        paddingHorizontal: 16,
    },
    listContent: {
        paddingVertical: 16, // Padding at top and bottom of the list
    },
    orderCard: {
        backgroundColor: '#fff',
        padding: 15,
        marginBottom: 15,
        borderRadius: 8,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    orderId: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#555',
    },
     orderDate: {
        fontSize: 14,
        color: '#888',
        marginBottom: 5,
     },
    orderStatus: {
        fontSize: 15,
        marginBottom: 8,
        color: '#555',
    },
     statusText: {
         fontWeight: 'bold',
     },
     status_pending: { // Style for pending status
         color: '#ff9800', // Orange
     },
     status_cancelled: { // Style for cancelled status
         color: '#e74c3c', // Red
     },
     status_completed: { // Style for completed status (if you add this later)
         color: '#4CAF50', // Green
     },
    orderSlot: {
        fontSize: 15,
        color: '#555',
        marginBottom: 8,
    },
    orderSummary: {
        fontSize: 15,
        color: '#666',
        marginBottom: 8,
    },
    orderTotal: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2ecc71',
        marginTop: 5,
    },
    cancelButton: {
        marginTop: 10,
        backgroundColor: '#e74c3c', // Red button
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        alignSelf: 'flex-start', // Align button to the left
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50, // Push down from top
    },
    emptyText: {
        fontSize: 18,
        color: '#555',
        marginBottom: 20,
    },
    browseButton: {
         backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    browseButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    }
});

export default OrderHistoryScreen;