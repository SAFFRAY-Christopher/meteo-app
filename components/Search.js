import { View, StyleSheet, Text, TextInput, TouchableOpacity } from "react-native"
import  React, {useState} from 'react';


export default function Search ({ setCity}) {
    const [cty, setCty] = useState(null)
    return (
    <View style={styles.container}>

      <TextInput
      underlineColorAndroid='transparent'
      style={styles.inp}
      onChangeText={(text) => setCty(text)}
      />

      <TouchableOpacity
        onPress={() => setCity(cty)}
        style={styles.button}  
      >
        <Text style={styles.buttonText}>Rechercher une ville</Text>
      </TouchableOpacity>
    </View>
    )
}
  
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  inp: {
    height: 40,
    borderColor:'burlywood',
    borderWidth: 1,
    paddingHorizontal: 20,
    marginTop: 30,
    marginBottom: 5,
    fontSize: 16,
    fontWeight: "600",
    borderRadius: 5
  },
  button:{
    borderRadius: 5,
    padding: 12,
    backgroundColor: 'burlywood'
  },
  buttonText: {
    color: "white"
  }
})
  
