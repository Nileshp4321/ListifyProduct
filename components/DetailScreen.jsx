import React from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from 'react-native';

const {height, width} = Dimensions.get('window');
const DetailScreen = props => {
  const item = props.route.params.item;

  const handlePrice = () => {
    const {price, discountPercentage} = item;

    const discountAmount = Math.floor((discountPercentage / 100) * price);
    const newPrice = price - discountAmount;

    return newPrice;
  };

  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: height / 2,
          justifyContent: 'center',
          alignItems: 'center',
          borderBottomWidth: 1,
          borderColor: 'grey',
        }}>
        <FlatList
          data={item.images}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          renderItem={({item}) => {
            return (
              <View
                style={{
                  width: width - 50,
                  height: height / 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#fff',
                }}>
                <TouchableOpacity
                  disabled={true}
                  style={{
                    width: '90%',
                    height: '90%',
                    borderRadius: 10,
                    borderColor: '#00CCCD',
                    borderWidth: 2,
                  }}>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image
                      source={{uri: item}}
                      style={{width: '90%', height: '90%', borderRadius: 20}}
                    />
                  </View>
                </TouchableOpacity>
              </View>
            );
          }}
        />
      </View>
      <ScrollView style={{margin: 10,marginBottom:15}}>
        <View style={styles.section}>
          <Text style={styles.heading}>Discription : </Text>
          <Text style={styles.descriptionText}>{item.description}</Text>
          <View style={{flexDirection:'row',paddingLeft:10}}>
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={{color:'#7B8788', fontSize:18}}>/5 ⭐</Text>
          </View>
        </View>
        <View style={[styles.flexSection,styles.section]}>
          <Text style={styles.heading}>Price :</Text>
          <Text style={[styles.priceText, styles.discount]}>
            {Math.floor(item.discountPercentage)}% off
          </Text>
          <Text style={[styles.priceText, styles.itemPrice]}>
            ${item.price}
          </Text>
          <Text style={[styles.priceText, styles.newPrice]}>
            ${handlePrice()}
          </Text>
        </View>
        <View style={[styles.section,styles.flexSection]}>
          <Text style={styles.heading}>Category : </Text>
          <Text style={{fontSize:20}}>{item.category}</Text>
        </View>
        <View style={[styles.section,styles.flexSection]}>
          <Text style={styles.heading}>Brand : </Text>
          <Text style={{fontSize:20}}>{item.brand}</Text>
        </View>
        <View style={[styles.section,styles.flexSection]}>
          <Text style={styles.heading}>Stock : </Text>
          <Text style={{fontSize:20}}>{item.stock}</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    fontSize: 20,
    fontWeight: '800',
  },
  section: {
    borderBottomWidth: 1,
    borderColor: '#00CCCD',
    paddingVertical:10
  },
  descriptionText: {
    marginTop: 5,
    marginLeft: 10,
  },
  rating: {
    color: '#F4C724',
    fontSize:18
  },
  flexSection: {
    flexDirection: 'row'
  },
  priceText: {
    fontSize: 20,
    paddingLeft: 20,
  },
  discount: {
    color: 'green',
    fontWeight: '800',
  },
  itemPrice: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  newPrice: {
    color: '#00CCCD',
    fontWeight: '800',
  },
});

export default DetailScreen;
