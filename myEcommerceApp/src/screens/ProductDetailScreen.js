// src/screens/ProductDetailScreen.js
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProductDetailScreen = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`https://fakestoreapi.com/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [productId]);

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

  if (!product) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{product.title}</Text>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text>{product.description}</Text>
      <Text>Price: ${product.price}</Text>
      <Button title="Add to Cart" onPress={() => addToCart(product)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  image: {
    width: 200,
    height: 200,
  },
});

export default ProductDetailScreen;
