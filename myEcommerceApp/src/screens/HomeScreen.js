// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Button, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (product) => {
    try {
      const existingItems = await AsyncStorage.getItem('cartItems');
      let newCartItems = existingItems ? JSON.parse(existingItems) : [];
      newCartItems.push(product);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={products}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <Text>{item.title}</Text>
          </TouchableOpacity>
          <Button title="Add to Cart" onPress={() => addToCart(item)} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  image: {
    width: 100,
    height: 100,
  },
});

export default HomeScreen;
