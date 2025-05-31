import React, { useState, useEffect, useMemo } from 'react'; // Import useState, useEffect, useMemo
import { View, FlatList, StyleSheet, Text, TouchableOpacity, TextInput } from 'react-native'; // Import TextInput
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useAppContext } from '../context/AppContext';
import ServiceCard from '../components/ServiceCard';

const ServiceBrowseScreen = ({ navigation }) => {
   const { services } = useAppContext(); // Get all services from context

   // --- Local State for Search and Filter ---
   const [searchText, setSearchText] = useState('');
   const [selectedCategory, setSelectedCategory] = useState('all'); // 'all' as default filter value

   // --- State for Filtered Services ---
   const [filteredServices, setFilteredServices] = useState([]);

   // --- Effect to perform filtering whenever services, search text, or category changes ---
   useEffect(() => {
       let servicesToFilter = services;

       // 1. Apply Category Filter
       if (selectedCategory !== 'all') {
           servicesToFilter = servicesToFilter.filter(service =>
               service.category === selectedCategory
           );
       }

       // 2. Apply Search Filter
       if (searchText) {
           const lowerSearchText = searchText.toLowerCase();
           servicesToFilter = servicesToFilter.filter(service =>
               service.name.toLowerCase().includes(lowerSearchText) ||
               service.description.toLowerCase().includes(lowerSearchText)
           );
       }

       // Update the state with the filtered results
       setFilteredServices(servicesToFilter);

   }, [services, searchText, selectedCategory]); // Dependencies: Re-run when these values change


   // --- Get Unique Categories for the Picker ---
   const categories = useMemo(() => {
       const uniqueCategories = new Set(services.map(service => service.category));
       return ['all', ...Array.from(uniqueCategories)]; // Add 'all' option
   }, [services]); // Recalculate only when the 'services' array changes


   const renderItem = ({ item }) => (
     <ServiceCard
       service={item}
       onPress={(serviceId) => navigation.navigate('ServiceDetail', { serviceId })}
     />
   );

  return (
    <View style={styles.container}>

        {/* --- Search and Filter Controls --- */}
        <View style={styles.controlsContainer}>
             {/* Search Input */}
             <TextInput
                style={styles.searchInput}
                placeholder="Search services..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor="#888"
             />

             {/* Category Filter Picker */}
             <View style={styles.pickerContainer}>
                 <Text style={styles.pickerLabel}>Category:</Text>
                 <Picker
                     selectedValue={selectedCategory}
                     onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                     style={styles.picker}
                     itemStyle={styles.pickerItem} // iOS only
                 >
                      <Picker.Item label="All Categories" value="all" />
                      {categories.filter(cat => cat !== 'all').map(category => (
                           <Picker.Item key={category} label={category} value={category} />
                      ))}
                 </Picker>
             </View>
        </View>


       {/* --- Service List --- */}
       {services.length === 0 ? (
           <Text style={styles.loadingText}>Loading services...</Text> // Display while services are loading (or if empty)
       ) : filteredServices.length === 0 ? (
            <Text style={styles.noResultsText}>No services found matching your criteria.</Text> // Display if filters yield no results
       ) : (
            <FlatList
              data={filteredServices} // Render the filtered list
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              numColumns={2} // Display in a 2-column grid
              columnWrapperStyle={styles.row}
              contentContainerStyle={styles.listContent}
              showsVerticalScrollIndicator={false}
            />
       )}

        {/* --- Button to navigate to Order History (for testing) --- */}
         <TouchableOpacity
            style={styles.orderHistoryButton}
            onPress={() => navigation.navigate('OrderHistory')}
         >
             <Text style={styles.orderHistoryButtonText}>View My Bookings</Text>
         </TouchableOpacity>


    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  controlsContainer: {
      padding: 16, // Padding around the controls
      backgroundColor: '#fff', // White background for the controls area
      borderBottomWidth: 1,
      borderBottomColor: '#eee',
      marginBottom: 8, // Space between controls and list
  },
  searchInput: {
      backgroundColor: '#eee', // Light grey background for input
      padding: 10,
      borderRadius: 8,
      fontSize: 16,
      marginBottom: 10, // Space below search input
      color: '#333',
  },
  pickerContainer: {
       flexDirection: 'row', // Label and picker in a row
       alignItems: 'center',
       backgroundColor: '#fff',
       borderRadius: 8,
       borderWidth: 1,
       borderColor: '#ddd',
       overflow: 'hidden',
       paddingVertical: 0, // Adjust padding
   },
   pickerLabel: {
       fontSize: 16,
       color: '#555',
       paddingLeft: 12,
       // Remove margin bottom if row alignment is used
   },
   picker: {
       flex: 1, // Picker takes remaining space
       height: 40, // Adjust height if needed
   },
   pickerItem: { // iOS only
        fontSize: 16,
        color: '#333'
    },
   loadingText: {
       flex: 1,
       textAlign: 'center',
       marginTop: 50,
       fontSize: 18,
       color: '#666',
   },
    noResultsText: {
       flex: 1,
       textAlign: 'center',
       marginTop: 50,
       fontSize: 18,
       color: '#666',
   },
  listContent: {
    paddingVertical: 8,
  },
   row: {
       flex: 1,
       justifyContent: 'space-around',
       paddingHorizontal: 4,
   },
    // --- Styles for the Order History Button ---
    orderHistoryButton: {
        backgroundColor: '#5a9b6a',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        marginHorizontal: 16,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
     orderHistoryButtonText: {
         color: '#fff',
         fontSize: 16,
         fontWeight: 'bold',
     }
});

export default ServiceBrowseScreen;