import React, { useState, useEffect } from 'react'
import {
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert
} from 'react-native'
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { styles } from './style';
import ItemList from '../../components/ItemList';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const [textInput, setTextInput] = useState('');
  const [items, setItems] = useState([]);
  useEffect(() => {
    getItemsFromDevice();
  }, []);
  useEffect(() => {
    saveItemToDevice(items);
  }, [items]);

  const saveItemToDevice = async (items) => {
    try {
      const itemJson = JSON.stringify(items);
      await AsyncStorage.setItem('alligallo' , itemJson);
    } catch (error) {
      console.log(`Erro: ${error}`);
    }
  }

  const getItemsFromDevice = async () => {
    try {
      const items = await AsyncStorage.getItem('alligallo');
      if (items != null) {
        setItems(JSON.parse(items));
      }
    } catch (error) {
      console.log(`Erro: ${error}`)
    }
  }

  const addItem = () => {
    // console.log(textInput);
    if (textInput == '') {
      Alert.alert('Ocorreu um problema: (', 'Por favor, informe o nome do produto!!');
    }
    else {
      const newItem = {
        id: Math.random(),
        name: textInput,
        bought: false
      };
      setItems([...items, newItem]);
      setTextInput('');
    }
  }

  const markItemBought = itemId => {
    const  newItems = items.map((item) => {
      if (item.id == itemId) {
        return {...item, bought: true }
      }
      return item;
    });
    setItems(newItems);
  }

  const unmarkItemBought = itemId => {
    const  newItems = items.map((item) => {
      if (item.id == itemId) {
        return {...item, bought: false }
      }
      return item;
    });
    setItems(newItems);
  }

  const removeItem = itemId => {
    Alert.alert('Excluir produto?', 'Confirma a exclusão deste produto?',
    [
      {
        text: 'Sim', onPress: () => {
          const newItems = items.filter(item => item.id != itemId);
          setItems(newItems);  
        }
      },
      {
        text: 'Cancelar',
        style: 'cancel'
      }
    ]);
  }

  const removeAll = () => {
    Alert.alert('Limpar lista?', 'Confirma a exclusão de todos os produtos de sua lista?',
      [{
        text: 'Sim',
        onPress: () => { setItems([]) }
      }, {
        text: 'Cancelar',
        style: 'cancel',
      }]);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../../assets/wallpaper.jpg')}
        // resizeMode='repeat'
        style={{ flex: 1, justifyContent: 'flex-start' }}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Lista de Produtos</Text>
          <Ionicons name="trash" size={32} color='#
          ' onPress={removeAll} />
        </View>

        {/* Lista de Produto */}
        <FlatList
          contentContainerStyle={{ padding: 20, paddingBottom: 100, color: "#fff" }}
          data={items}
          renderItem={({ item }) =>
            <ItemList
              item={item}
              markItem={markItemBought}
              unmarkItem={unmarkItemBought}
              removeItem={removeItem}
            />
          }
        />
        <View style={styles.footer}>
          <View style={styles.inputContainer}>
            <TextInput
              color='#000'
              fontSize={18}
              placeholderTextColor='#aeaeae'
              placeholder='Digite o nome do produto...'
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
            />
          </View>
          <TouchableOpacity style={styles.iconContainer} onPress={addItem}>
            <Ionicons name='add' size={36} color='#fff' />
          </TouchableOpacity>
        </View>

      </ImageBackground>
      <StatusBar style="light" backgroundColor='#000' />
    </SafeAreaView>
  )
}