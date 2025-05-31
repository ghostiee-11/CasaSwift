// screens/CartScreen.js
import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button } from 'react-native'; // Added Button
import { useAppContext } from '../context/AppContext'; // Import context hook

const CartScreen = ({ navigation }) => {
     // Get cart data and functions from context
     const { getCartDetails, getCartTotal, updateCartQuantity, removeFromCart } = useAppContext();

     // Get the list of items with full details
     const cartItems = getCartDetails();
     // Calculate the total value
     const total = getCartTotal();

     // Render function for each item in the FlatList
     const renderItem = ({ item }) => (
       <View style={styles.cartItem}>
         <Text style={styles.itemName} numberOfLines={1} ellipsizeMode='tail'>{item.name}</Text>

         <View style={styles.itemControls}>
            {/* Quantity Controls */}
           <TouchableOpacity
             style={styles.quantityButton}
             onPress={() => updateCartQuantity(item.id, item.quantity - 1)}
             disabled={item.quantity <= 1} // Disable decrease if quantity is 1
            >
             <Text style={styles.quantityButtonText}>-</Text>
           </TouchableOpacity>

           <Text style={styles.itemQuantity}>{item.quantity}</Text>

            <TouchableOpacity
             style={styles.quantityButton}
             onPress={() => updateCartQuantity(item.id, item.quantity + 1)}
           >
             <Text style={styles.quantityButtonText}>+</Text>
           </TouchableOpacity>

            {/* Remove Button */}
            <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromCart(item.id)}>
                <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
         </View>

         {/* Item Subtotal */}
         <Text style={styles.itemSubtotal}>${(item.price * item.quantity).toFixed(2)}</Text>
       </View>
     );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        // Display message if cart is empty
        <View style={styles.emptyCartContainer}>
            <Text style={styles.emptyCartText}>Your cart is empty!</Text>
             <Button
                title="Browse Services"
                onPress={() => navigation.navigate('ServiceBrowse')}
            />
        </View>
      ) : (
        // Display cart items and total if cart is not empty
        <>
          <FlatList
            data={cartItems}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent}
          />

          {/* Total Value */}
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text> {/* Format total to 2 decimal places */}
          </View>

          {/* Proceed to Checkout Button */}
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={() => navigation.navigate('Booking')}
            disabled={cartItems.length === 0} // Disable if cart is empty
          >
            <Text style={styles.checkoutButtonText}>Proceed to Checkout ({cartItems.length} items)</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8', // Light background
    paddingHorizontal: 16, // Horizontal padding
    paddingTop: 16, // Top padding
  },
  emptyCartContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
  },
   emptyCartText: {
       fontSize: 18,
       marginBottom: 20,
       color: '#555',
   },
  listContent: {
    paddingBottom: 20, // Add some space at the bottom of the list
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10, // Space between items
    borderRadius: 8, // Rounded corners
    elevation: 2, // Slight shadow for card effect (Android)
    shadowColor: '#000', // iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1, // Allow name to take available space
    marginRight: 10, // Space between name and controls
  },
  itemControls: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 10, // Space between controls and subtotal
  },
  quantityButton: {
      paddingHorizontal: 10, // Make area tappable
      paddingVertical: 5,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 4,
      marginHorizontal: 2, // Space between +/- buttons
      backgroundColor: '#eee',
  },
   quantityButtonText: {
       fontSize: 18,
       fontWeight: 'bold',
       color: '#333',
   },
  itemQuantity: {
    fontSize: 16,
    marginHorizontal: 8, // Space around quantity number
    fontWeight: 'bold',
     minWidth: 20, // Ensure space for numbers like 10+
     textAlign: 'center',
  },
   removeButton: {
       marginLeft: 10, // Space between quantity controls and remove
       paddingHorizontal: 8,
       paddingVertical: 5,
       backgroundColor: '#e74c3c', // Red color for remove
       borderRadius: 4,
   },
   removeButtonText: {
       color: '#fff', // White text
       fontSize: 14,
   },
  itemSubtotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2ecc71', // Green color for subtotal
  },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71', // Green color for total
  },
   checkoutButton: {
        backgroundColor: '#3498db', // A pleasant blue color
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20, // Space above button
        marginBottom: 20, // Space below button
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
   },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutButtonDisabled: {
        backgroundColor: '#bdc3c7', // Grey color when disabled
    }
});

// Add a style for disabled button if needed (optional)
styles.checkoutButton = {
    ...styles.checkoutButton,
    ...(styles.checkoutButtonDisabled ? { disabled: styles.checkoutButtonDisabled } : {})
};


export default CartScreen;