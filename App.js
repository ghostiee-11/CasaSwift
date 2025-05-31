// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AppProvider } from './context/AppContext';

// Import screen components
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';

import ServiceBrowseScreen from './screens/ServiceBrowseScreen';
import ServiceDetailScreen from './screens/ServiceDetailScreen';
import CartScreen from './screens/CartScreen';
import BookingScreen from './screens/BookingScreen';
import ConfirmationScreen from './screens/ConfirmationScreen';

// --- New Screens for Order History and Cancellation ---
import OrderHistoryScreen from './screens/OrderHistoryScreen';
import CancelConfirmationScreen from './screens/CancelConfirmationScreen';
import CancelSuccessScreen from './screens/CancelSuccessScreen';

// Import the CartIcon component
import CartIcon from './components/CartIcon';

const Stack = createStackNavigator();

export default function App() {
  return (
    <AppProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">

          {/* Authentication Flow Screens */}
           <Stack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
           <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          {/* Main App Flow Screens */}
          {/* Service Browse Screen - Show Cart Icon */}
          <Stack.Screen
            name="ServiceBrowse"
            component={ServiceBrowseScreen}
            options={{
              title: 'Browse Services',
              headerRight: () => <CartIcon />
            }}
          />

          {/* Service Detail Screen - Show Cart Icon */}
          <Stack.Screen
            name="ServiceDetail"
            component={ServiceDetailScreen}
            options={{
              title: 'Service Details',
               headerRight: () => <CartIcon />
            }}
          />

          {/* Cart Screen */}
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{
              title: 'Your Cart',
            }}
          />

          {/* Booking Screen */}
          <Stack.Screen
            name="Booking"
            component={BookingScreen}
            options={{
              title: 'Checkout',
            }}
          />

           {/* Confirmation Screen */}
           <Stack.Screen
            name="Confirmation"
            component={ConfirmationScreen}
            options={{
              title: 'Order Placed!',
            }}
          />

           {/* --- Order History and Cancellation Screens --- */}
            <Stack.Screen
                name="OrderHistory"
                component={OrderHistoryScreen}
                options={{ title: 'My Bookings' }}
            />
             <Stack.Screen
                name="CancelConfirmation"
                component={CancelConfirmationScreen}
                options={{ title: 'Confirm Cancellation' }}
            />
             <Stack.Screen
                name="CancelSuccess"
                component={CancelSuccessScreen}
                options={{ title: 'Cancellation Confirmed' }}
            />


        </Stack.Navigator>
      </NavigationContainer>
    </AppProvider>
  );
}