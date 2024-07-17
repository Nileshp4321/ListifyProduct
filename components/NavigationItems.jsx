import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const NavigationItems = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  const navigation = useNavigation();

  //   Sorting Modal Toggle
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  //   Handle User Input Value for the Search Product
  const handleSearch = text => {
    setSearchInput(text);
    navigation.setParams({searchString: text});
  };

  //   Clearing the user input value for the product search
  const clearSearch = () => {
    setSearchInput('');
    navigation.setParams({searchString: ''});
  };

  // Label and Type for the Sort feature
  const sortOptions = [
    { label: 'Sort By Name', sortType: 'name',borderBottomWidth: 1 },
    { label: 'Low To High Price', sortType: 'lowToHigh',borderBottomWidth: 1 },
    { label: 'High To Low Price', sortType: 'highToLow', borderBottomWidth: 1 },
    { label: 'Sort By Rating', sortType: 'rating', borderBottomWidth: 0 },
  ];
  
  const handleSortOptionPress = (sortType) => {
    setIsModalOpen(false);
    navigation.setParams({ sortType });
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginLeft: 'auto',
      }}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products here"
          onChangeText={handleSearch}
          value={searchInput}
        />
        {searchInput.length > 0 && (
          <TouchableOpacity style={styles.clearButton} onPress={clearSearch}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        )}
      </View>
      <View>
        <TouchableOpacity onPress={toggleModal}>
          <Image
            source={require('./../Images/sort.png')}
            style={{width: 25, height: 25, margin: 10, marginTop: 20}}
          />
        </TouchableOpacity>
        <Modal
          visible={isModalOpen}
          animationType="slide"
          transparent={true}
          onRequestClose={toggleModal}>
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                {sortOptions.map((option, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleSortOptionPress(option.sortType)}>
                    <Text
                      style={[
                        styles.sortType,
                        {borderBottomWidth: option.borderBottomWidth},
                      ]}>
                      {option.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    width: '70%',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#fff',
    padding: 5,
    paddingLeft: 10,
    marginVertical: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  modalContent: {
    backgroundColor: 'white',
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  sortType: {
    fontSize: 20,
    width: 250,
    fontWeight: '500',
    borderColor: 'grey',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },

  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '70%',
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: '#fff',
    marginVertical: 5,
  },
  searchInput: {
    flex: 1,
    paddingLeft: 10,
  },
  clearButton: {
    padding: 5,
    borderRadius: 5,
  },
  clearButtonText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default NavigationItems;
