// src/screens/CartScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const items = await AsyncStorage.getItem('cartItems');
        if (items) {
          setCartItems(JSON.parse(items));
        }
      } catch (error) {
        console.error(error);
      }
    };

    loadCartItems();
  }, []);

  const removeFromCart = async (itemId) => {
    try {
      const existingItems = await AsyncStorage.getItem('cartItems');
      let newCartItems = existingItems ? JSON.parse(existingItems) : [];
      newCartItems = newCartItems.filter(item => item.id !== itemId);
      await AsyncStorage.setItem('cartItems', JSON.stringify(newCartItems));
      setCartItems(newCartItems);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <FlatList
      data={cartItems}
      keyExtractor={item => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <Image source={{ uri: item.image }} style={styles.image} />
          <Text>{item.title}</Text>
          <Button title="Remove from Cart" onPress={() => removeFromCart(item.id)} />
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

export default CartScreen;
