import { View, StyleSheet, Button, TextInput,  } from "react-native"
import  React, {useState} from 'react';


export default function Search ({ setCity}) {
    const [cty, setCty] = useState(null)
    return (
    <View>

      <TextInput
      underlineColorAndroid='transparent'
      style={styles.inp}
      onChangeText={(text) => setCty(text)}
      />

      <Button 
      color="burlywood" onPress={() => setCity(cty)} title="Rechercher une ville" />
    </View>
    )
}
  
const styles = StyleSheet.create({
  inp: {
    height: 40,
    borderColor:'burlywood',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginTop: 30,
    marginBottom: 5
    }
})
  
