// screens/BookingScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, ScrollView, TouchableOpacity, TextInput, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAppContext } from '../context/AppContext';

const BookingScreen = ({ navigation }) => {
     // Get necessary state and functions from context
     const {
         getCartDetails,
         getCartTotal,
         getCartItemCount, // Get item count for order object
         availableSlots,
         selectedSlot,
         setSelectedSlot,
         userDetails,
         saveUserDetails,
         clearCart, // Note: This is clearCartAndSlot internally now
         addOrder, // <-- Get addOrder function
     } = useAppContext();

     // Get cart details and total for summary
     const cartItems = getCartDetails();
     const total = getCartTotal();

    // --- Local state for Slot Selection UI ---
    const [selectedDate, setSelectedDate] = useState(selectedSlot?.date || null);
    const timesForSelectedDate = availableSlots.find(slot => slot.date === selectedDate)?.times || [];

    // --- Local state for User Details Form ---
    const [localUserDetails, setLocalUserDetails] = useState({
        name: '',
        address: '',
        phone: ''
    });

    // --- Effects ---
    useEffect(() => {
        setSelectedDate(selectedSlot?.date || null);
    }, [selectedSlot]);

     useEffect(() => {
         if (userDetails) {
              setTimeout(() => {
                 setLocalUserDetails(userDetails);
             }, 0);
         } else {
               setLocalUserDetails({ name: '', address: '', phone: '' });
         }
     }, [userDetails]);


    // --- Handlers ---
     const handleInputChange = (field, value) => {
         setLocalUserDetails({ ...localUserDetails, [field]: value });
     };

    const handleDateSelect = (date) => {
        setSelectedDate(date);
        if (selectedSlot && selectedSlot.date !== date) {
             setSelectedSlot({ date: date, time: null });
        } else if (!selectedSlot) {
             setSelectedSlot({ date: date, time: null });
        }
         if (!date) {
             setSelectedSlot(null);
         }
    };

    const handleTimeSelect = (time) => {
        if (selectedDate) {
             setSelectedSlot({ date: selectedDate, time: time });
        }
    };

    // --- Place Order Logic ---
     const handlePlaceOrder = () => {
        // Basic validation checks
         if (cartItems.length === 0 || !selectedSlot || !selectedSlot.date || !selectedSlot.time) {
             Alert.alert("Error", "Please ensure your cart is not empty and a time slot is selected.");
             return;
         }

        let currentUserDetails = userDetails;

        // If user details are NOT already saved (first order)
        if (!userDetails) {
            if (!localUserDetails.name || !localUserDetails.address || !localUserDetails.phone) {
                 Alert.alert("Details Required", "Please fill in all your personal details.");
                 return;
            }
            saveUserDetails(localUserDetails); // Save the new details to context
            currentUserDetails = localUserDetails; // Use these for the order object
        }

        // --- Construct the Order Object ---
        const newOrder = {
            // Context will add orderId, status, and placedAt timestamp
            items: cartItems, // Detailed items from the cart
            slot: selectedSlot,
            user: currentUserDetails, // Saved or newly captured details
            total: total,
            numberOfItems: getCartItemCount(),
        };

        // --- Add the order to the context state ---
        addOrder(newOrder);


        // --- Simulate Order Placement Success ---
        console.log("--- Simulating Order Placement ---");
        console.log("Order Data:", newOrder);
        console.log("---------------------------------");


        Alert.alert("Order Success!", "Your order has been placed successfully.", [
            {
                text: "OK",
                onPress: () => {
                    clearCart(); // Clear cart and slot AFTER adding the order
                    navigation.navigate('Confirmation'); // Navigate to confirmation screen
                }
            }
        ]);
     };


    const isUserDetailsFormInvalid = !userDetails && (!localUserDetails.name || !localUserDetails.address || !localUserDetails.phone);

    const isPlaceOrderDisabled = cartItems.length === 0 ||
                               !selectedSlot || !selectedSlot.date || !selectedSlot.time ||
                               isUserDetailsFormInvalid;


  return (
    <ScrollView style={styles.container}>
        {/* --- Order Summary Section --- */}
        <Text style={styles.sectionTitle}>Your Order</Text>
        {cartItems.map(item => (
            <View key={item.id} style={styles.summaryItem}>
                <Text style={styles.summaryItemName} numberOfLines={1}>{item.name} x{item.quantity}</Text>
                <Text style={styles.summaryItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
            </View>
        ))}
        <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total:</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>


        {/* --- Slot Selection Section --- */}
        <Text style={styles.sectionTitle}>Select Your Slot</Text>

        <View style={styles.pickerContainer}>
            <Text style={styles.pickerLabel}>Choose Date:</Text>
            <Picker
                selectedValue={selectedDate}
                onValueChange={(itemValue) => handleDateSelect(itemValue)}
                style={styles.picker}
                 itemStyle={styles.pickerItem}
            >
                <Picker.Item label="-- Select a Date --" value={null} />
                {availableSlots.map(slot => (
                    <Picker.Item key={slot.date} label={slot.date} value={slot.date} />
                ))}
            </Picker>
        </View>

        {selectedDate && timesForSelectedDate.length > 0 && (
             <View style={styles.pickerContainer}>
                 <Text style={styles.pickerLabel}>Choose Time:</Text>
                 <Picker
                    selectedValue={selectedSlot?.time}
                    onValueChange={(itemValue) => handleTimeSelect(itemValue)}
                    style={styles.picker}
                     itemStyle={styles.pickerItem}
                 >
                      <Picker.Item label="-- Select a Time --" value={null} />
                      {timesForSelectedDate.map(time => (
                           <Picker.Item key={time} label={time} value={time} />
                      ))}
                 </Picker>
             </View>
        )}

        {selectedSlot && selectedSlot.date && selectedSlot.time && (
             <View style={styles.selectedSlotContainer}>
                 <Text style={styles.selectedSlotText}>
                     Selected Slot: <Text style={styles.selectedSlotValue}>{selectedSlot.date} at {selectedSlot.time}</Text>
                 </Text>
             </View>
        )}

        {/* --- User Details Section --- */}
        <Text style={styles.sectionTitle}>{userDetails ? 'Your Saved Details' : 'Your Details'}</Text>
         {userDetails ? (
             <View style={styles.savedDetailsContainer}>
                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Name:</Text> {userDetails.name}</Text>
                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Address:</Text> {userDetails.address}</Text>
                 <Text style={styles.detailText}><Text style={styles.detailLabel}>Phone:</Text> {userDetails.phone}</Text>
             </View>
         ) : (
             <View style={styles.detailsFormContainer}>
                 <TextInput
                     style={styles.input}
                     placeholder="Full Name"
                     value={localUserDetails.name}
                     onChangeText={(text) => handleInputChange('name', text)}
                     placeholderTextColor="#999"
                 />
                 <TextInput
                      style={styles.input}
                     placeholder="Address"
                     value={localUserDetails.address}
                     onChangeText={(text) => handleInputChange('address', text)}
                     placeholderTextColor="#999"
                 />
                 <TextInput
                      style={styles.input}
                     placeholder="Phone Number"
                     keyboardType="phone-pad"
                     value={localUserDetails.phone}
                     onChangeText={(text) => handleInputChange('phone', text)}
                     placeholderTextColor="#999"
                 />
             </View>
         )}


        {/* --- Place Order Button --- */}
        <TouchableOpacity
           style={[styles.placeOrderButton, isPlaceOrderDisabled && styles.placeOrderButtonDisabled]}
           onPress={handlePlaceOrder}
           disabled={isPlaceOrderDisabled}
         >
           <Text style={styles.placeOrderButtonText}>Place Order</Text>
         </TouchableOpacity>


    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#333',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingBottom: 5,
  },
  // --- Order Summary Styles ---
   summaryItem: {
       flexDirection: 'row',
       justifyContent: 'space-between',
       marginBottom: 8,
       paddingBottom: 5,
       borderBottomWidth: 1,
       borderBottomColor: '#f1f1f1',
   },
   summaryItemName: {
       fontSize: 15,
       color: '#555',
       flex: 1,
       marginRight: 10,
   },
    summaryItemPrice: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#28a745',
    },
  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    alignItems: 'center',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
   // --- Slot Selection Styles ---
    pickerContainer: {
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ddd',
        overflow: 'hidden',
    },
    pickerLabel: {
        fontSize: 16,
        color: '#555',
        paddingHorizontal: 12,
        paddingTop: 10,
        marginBottom: -5,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    pickerItem: { // iOS only
        fontSize: 16,
        color: '#333'
    },
    selectedSlotContainer: {
        marginTop: 10,
        padding: 12,
        backgroundColor: '#e9f7ef',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#d4edda',
        alignItems: 'center',
    },
    selectedSlotText: {
        fontSize: 16,
        color: '#28a745',
        fontWeight: '600',
    },
    selectedSlotValue: {
        fontWeight: 'bold',
    },

   // --- User Details Styles ---
   savedDetailsContainer: {
       backgroundColor: '#eef',
       padding: 15,
       borderRadius: 8,
       borderWidth: 1,
       borderColor: '#ddf',
   },
    detailText: {
        fontSize: 16,
        marginBottom: 5,
        color: '#444',
    },
    detailLabel: {
        fontWeight: 'bold',
        color: '#333',
    },
    detailsFormContainer: {
        // Container for the form inputs
    },
    input: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 12,
        marginBottom: 15,
        borderRadius: 8,
        fontSize: 16,
        color: '#333',
    },


   // --- Place Order Button Styles ---
  placeOrderButton: {
    backgroundColor: '#ff6f00',
    padding: 18,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  placeOrderButtonDisabled: {
      backgroundColor: '#cccccc',
      elevation: 0,
      shadowOpacity: 0,
  },
  placeOrderButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

});


export default BookingScreen;