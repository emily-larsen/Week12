import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, Button, StyleSheet, Text, View } from 'react-native';

const ItemDetails= ( {navigation, route} ) => {

  const { name, image } = route.params

  const goBackToList = () => {
    navigation.navigate('Item List');
  }

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: 'data:image/jpeg;base64,' + image}} />
      <Text style={styles.title}>
        Item Details Screen
      </Text>

      <Button title="Go to back to list"
              onPress={goBackToList}/>
      <StatusBar style="auto" />

    </View>
  );
}
export default ItemDetails;





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'flex-start'

  },
  title: {
    fontSize: 36,
    margin: 20
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 10
}

});
