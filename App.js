import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { View, Alert, StyleSheet } from 'react-native';

import { Button } from 'react-native-elements';

import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';

import AsyncStorage from '@react-native-async-storage/async-storage';

import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';

const Stack = createStackNavigator();

const App = () => {

  const [cameraPermission, askForCameraPermission] = Permissions.usePermissions(Permissions.CAMERA, {ask:true})
  const [cameraRollPermission, askForCameraRollPermission] = Permissions.usePermissions(Permissions.CAMERA, {ask:true})

  const [items, setItems] = useState ([])

  //hook anything updating will store, async storage
  useEffect( () => {
    if (items.length != 0) {
      storeData(items);
    }
  });

  const storeData = async (items) => {
    try {
      const json = JSON.stringify(items)
      await AsyncStorage.setItem('@items', json)
    } 
    catch (e) {
      console.log(e)
      // saving error
    }
  }

  const takePhoto = async () => {
    if (cameraPermission.status == 'granted') {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });

      if (result.uri) {
        if (cameraRollPermission.status == 'granted') {
          MediaLibrary.saveToLibraryAsync(result.uri);
          const item = {
            image: result.base64
          }
          setItems([...items, item]);
          //saves items
        }
      }

    }
    else {
      askForCameraPermission()
    }
  }

  const pickPhoto = async () => {
    if (cameraRollPermission.status == 'granted') {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
      });

      //pick image, save
      if (result.base64) {
          const item = {
            image: result.base64
          }
          setItems([...items, item]);
      }

    }
    else {
      askForCameraRollPermission()
    }
  }



  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Item List"
        component={ItemList}
        options={{
          headerRight: () => (
            <View Style={styles.buttons}>


            <Button
              title="Camera" 
              onPress={takePhoto}
              />
            <Button
              title="Library" 
              onPress={pickPhoto}
              buttonStyle={styles.libraryButton}
              />

            </View>
          )
        }}
        />
        <Stack.Screen name="Item Details" component={ItemDetails} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;




const styles = StyleSheet.create({
  buttons: {
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
    libraryButton: {
      marginLeft: 5
    }

})
