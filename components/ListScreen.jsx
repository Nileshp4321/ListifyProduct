import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
import {Alert, Modal, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {FaCartPlus} from 'react-icons/fa6';
import { useDispatch } from 'react-redux';
import { addToCart } from '../reducers/cartSlice';

const ListScreen = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const {searchString, sortType} = route.params;

  
  const dispatch = useDispatch()

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    if (searchString.length > 0) {
      searchProduct();
    } else {
      fetchData();
    }
  }, [searchString]);

  useEffect(() => {
    if (sortType) {
      const sortedData = sortProducts(data, sortType);
      setData(sortedData);
    }
  }, [sortType]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item)); 
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      console.log(response.data);
      setData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setIsLoading(false);
    }
  };

  const searchProduct = async () => {
    try {
      const searchData = await axios.get(
        `https://dummyjson.com/products/search?q=${searchString}`,
      );
      setData(searchData.data.products);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleListItemView = item => {
    navigation.navigate('DetailScreen', {item});
  };

  const getStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Text key={i} style={styles.star}>
          {i <= rating ? '⭐' : '☆'}
        </Text>,
      );
    }
    return stars;
  };

  const renderList = ({item}) => {
    return (
      <Pressable
        onPress={() => {
          handleAddToCart(item)
          setSelectedItem(item);
          setModalVisible(true);
        }}>
        <View style={styles.item}>
          <Image source={{uri: item.image}} style={styles.itemImage} />
          <View style={{marginLeft: 10,marginTop:0, width: '90%'}}>
            <Text style={styles.title}>{item.title}</Text>
            <View style={{flexDirection: 'row'}}>
              <View style={{flexDirection: 'row ', marginLeft: 10}}>
                <View style={{marginTop: 13, flexDirection: 'row'}}>
                  <Text style={styles.rating}>
                    {getStars(item.rating.rate)}
                  </Text>
                  <Text style={{color: '#7B8788'}}>{item.rating.count}</Text>
                </View>
                <Text style={styles.price}>{'Rs. ' + item.price}</Text>
              </View>
            </View>
            <View style={{flexDirection:"row"}}>
            <Text
              style={styles.discription}
              numberOfLines={2}
              ellipsizeMode="tail">
              {'Category: ' + item.category}
              </Text>
            <Text style={{color:"black",borderRadius:13,padding:3,margin:5,fontSize:25,}}>+</Text>
            <Text style={{color:"black"  ,borderRadius:13,padding:3,margin:5,fontSize:25,alignSelf:"flex-end"}}>-</Text>
            
            </View>
           
          </View>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color="#00CCCD" />
        </View>
      ) : data.length === 0 ? (
        <View style={styles.noData}>
          <Image
            source={require('./../Images/no-data.jpg')}
            style={styles.recordsNotFound}
          />
          <Text style={styles.noDataText}>No data available</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={item => item.id.toString()}
          renderItem={renderList}
        />
      )}

      {selectedItem && (
        <View style={styles.centeredView}>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.itemInModel}>
                <Image source={{uri: selectedItem.image}} style={styles.itemImage} />
                <Text style={styles.price}>{'Rs. ' + selectedItem.price}</Text>
                <View style={{width: '100%', flexDirection: 'column'}}>
                  <Text
                    style={styles.inModeldiscription}
                    numberOfLines={15}
                    ellipsizeMode="tail">
                    Description: {selectedItem.description}
                  </Text>
                  <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity
                      style={[styles.buttonAddtoCart]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Add to Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      style={[styles.buttonAddtoCart, styles.buttonClose]}
                      onPress={() => setModalVisible(!modalVisible)}>
                      <Text style={styles.textStyle}>Close</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EAF0F1',
    marginBottom: 10,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    flex: 1,
    width: '95%',
    height: 150,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    elevation: 1,
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'scroll',
    padding: 8,
  },
  itemInModel: {
    justifyContent: 'center',
    width: '80%',
    height: '60%',
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 2,
    elevation: 1,
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'scroll',
    padding: 8,
  },
  itemImage: {
    width: 100,
    height: 120,
    borderRadius: 10,
  },
  title: {
    color: 'black',
    fontSize: 12,
    fontWeight: '800',
    width: '80%',
    marginLeft: 8,
  },
  inModeldiscription: {
    color: 'black',
    paddingTop: 5,
    marginTop: 2,
    marginLeft: 10,
  },
  discription: {
    // flex: 1,
    color: 'black',
    width: '60%',
    paddingTop: 5,
    marginTop: 2,
    marginLeft: 10,
  },
  price: {
    color: 'black',
    fontWeight: '800',
    marginTop: 8,
  },
  rating: {
    color: '#F4C724',
  },
  noData: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    color: '#000',
    padding: 10,
    fontSize: 20,
  },
  recordsNotFound: {
    width: 200,
    height: 200,
    borderRadius: 30,
  },
  centeredView: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    width: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    marginTop: 10,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonAddtoCart: {
    backgroundColor: 'red',
    width: 100,
    marginTop: 10,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'black',
  },
});

export default ListScreen;
