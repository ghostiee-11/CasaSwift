import React, { createContext, useState, useContext } from 'react';
import { services as mockServices, availableSlots as mockAvailableSlots } from '../data'; // Import mock data

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // State variables for the global app state
  const [cart, setCart] = useState([]); // [{ serviceId: 'id', quantity: N }, ...]
  const [userDetails, setUserDetails] = useState(null); // { name: '', address: '', phone: '' } or null
  const [selectedSlot, setSelectedSlot] = useState(null); // { date: '', time: '' } or null
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication status

  // --- New State for Orders and Favorites ---
  const [placedOrders, setPlacedOrders] = useState([]); // Array of placed order objects
  const [favoriteServiceIds, setFavoriteServiceIds] = useState([]); // Array of favorited service IDs

  // --- Core Cart Functions ---

  // Adds a service to the cart, increments quantity if already exists
  const addToCart = (serviceId) => {
    const existingItemIndex = cart.findIndex(item => item.serviceId === serviceId);
    if (existingItemIndex > -1) {
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += 1;
      setCart(updatedCart);
    } else {
      setCart([...cart, { serviceId, quantity: 1 }]);
    }
  };

   // Removes a service entirely from the cart
  const removeFromCart = (serviceId) => {
    const filteredCart = cart.filter(item => item.serviceId !== serviceId);
    setCart(filteredCart);
  };

  // Updates the quantity of a service in the cart
  const updateCartQuantity = (serviceId, newQuantity) => {
      if (newQuantity <= 0) {
          removeFromCart(serviceId);
          return;
      }
      const updatedCart = cart.map(item =>
          item.serviceId === serviceId ? { ...item, quantity: newQuantity } : item
      );
      setCart(updatedCart);
  };

  // Returns detailed cart items by combining cart state with service data
   const getCartDetails = () => {
      const detailedCart = cart.map(item => {
          const service = mockServices.find(s => s.id === item.serviceId);
          return service ? { ...service, quantity: item.quantity } : null;
      }).filter(Boolean);
      return detailedCart;
  };

   // Calculates and returns the total value of items in the cart
  const getCartTotal = () => {
      const detailedCart = getCartDetails();
      const total = detailedCart.reduce((sum, item) => {
          const price = typeof item.price === 'number' ? item.price : 0;
          return sum + (price * item.quantity);
      }, 0);
      return total;
  };

  // Gets the total quantity of items across all entries in the cart
  const getCartItemCount = () => {
      const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
      return totalCount;
  }

  // --- User Details & Slot Functions ---

  // Saves user details to the context state
  const saveUserDetails = (details) => {
    setUserDetails(details);
  };

  // Sets the selected booking slot in the context state
  const selectSlot = (slot) => {
     setSelectedSlot(slot);
  }

  // Clears the cart and selected slot after an order is placed (used internally and after order)
  const clearCartAndSlot = () => { // Renamed for clarity
      setCart([]);
      setSelectedSlot(null);
      console.log('[Context] Cart and Slot Cleared');
  }

  // --- Authentication Functions (Simulated) ---

  const simulateLogin = async (credentials) => {
       await new Promise(resolve => setTimeout(resolve, 500));
      setIsLoggedIn(true);
  };

   const simulateRegister = async (credentials) => {
        await new Promise(resolve => setTimeout(resolve, 500));
       setIsLoggedIn(true);
   };

   const simulateLogout = () => {
       setIsLoggedIn(false);
       setUserDetails(null); // Clear user details on logout
       setPlacedOrders([]); // Clear orders on logout (since not persistent)
       setFavoriteServiceIds([]); // Clear favorites on logout
       clearCartAndSlot(); // Clear cart and slot on logout
   };


  // --- New Order Management Functions ---

  // Adds a newly placed order to the state
  const addOrder = (order) => {
      // In a real app, the backend would generate a unique ID and handle persistence.
      // Here, we generate a simple unique ID based on timestamp.
      const orderWithId = {
          ...order,
          orderId: Date.now().toString(), // Simple unique ID generator
          status: 'pending', // Initial status
          placedAt: new Date().toISOString(), // Timestamp
      };
      setPlacedOrders([...placedOrders, orderWithId]);
      console.log("[Context] Added New Order:", orderWithId);
  };

   // Updates the status of a specific order by ID
   const updateOrderStatus = (orderId, newStatus) => {
       const updatedOrders = placedOrders.map(order =>
           order.orderId === orderId ? { ...order, status: newStatus } : order
       );
       setPlacedOrders(updatedOrders);
       console.log(`[Context] Updated status for Order ${orderId} to ${newStatus}`);
   };


  // --- New Favorite Services Functions ---

  // Adds a service ID to favorites
  const addFavorite = (serviceId) => {
      if (!favoriteServiceIds.includes(serviceId)) {
          setFavoriteServiceIds([...favoriteServiceIds, serviceId]);
          console.log(`[Context] Added ${serviceId} to favorites`);
      }
  };

   // Removes a service ID from favorites
  const removeFavorite = (serviceId) => {
      const filteredFavorites = favoriteServiceIds.filter(id => id !== serviceId);
      setFavoriteServiceIds(filteredFavorites);
       console.log(`[Context] Removed ${serviceId} from favorites`);
  };

   // Toggles the favorite status of a service ID
  const toggleFavorite = (serviceId) => {
      if (favoriteServiceIds.includes(serviceId)) {
          removeFavorite(serviceId);
      } else {
          addFavorite(serviceId);
      }
  };

   // Checks if a service ID is in favorites
  const isFavorite = (serviceId) => {
      return favoriteServiceIds.includes(serviceId);
  };


  // The value provided to consuming components
  const contextValue = {
    // State
    cart,
    userDetails,
    selectedSlot,
    isLoggedIn,
    placedOrders, // <-- Provided
    favoriteServiceIds, // <-- Provided
    // Data from data.js
    services: mockServices,
    availableSlots: mockAvailableSlots,
    // Functions
    addToCart,
    removeFromCart,
    updateCartQuantity,
    saveUserDetails,
    setSelectedSlot: selectSlot,
    clearCart: clearCartAndSlot, // <-- Use the renamed function
    getCartDetails,
    getCartTotal,
    getCartItemCount,
    // Authentication Functions
    simulateLogin,
    simulateRegister,
    simulateLogout,
    // Order Management Functions
    addOrder, // <-- Provided
    updateOrderStatus, // <-- Provided
    // Favorite Services Functions
    addFavorite, // <-- Provided
    removeFavorite, // <-- Provided
    toggleFavorite, // <-- Provided
    isFavorite, // <-- Provided
  };

  return (
    <AppContext.Provider value={contextValue}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to easily access the context
export const useAppContext = () => useContext(AppContext);