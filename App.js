import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import axios from "axios";
import CurrentWeather from "./components/CurrentWeather"
import Forecasts from "./components/Forecasts"
import Search from "./components/Search"

const API_URL_BY_COORDINATES = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=8be68f1eb1b21fe99350af1b85024028&lang=fr&units=metric`

const API_URL_BY_CITY = (city) => `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=8be68f1eb1b21fe99350af1b85024028&lang=fr&units=metric`

export default function App() {

  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)
  const [city, setCity] = useState(null);


  useEffect(() => {
    const getCoordinates = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        return
      }
      if (city == null) {
        const userLocation = await Location.getCurrentPositionAsync()
        getWeather(userLocation)
      } else {
        searchCity(city)
      }
    }

    getCoordinates()
  }, [city])

  const getWeather = async (location) => {
    try {
      const response = await axios.get(API_URL_BY_COORDINATES(location.coords.latitude, location.coords.longitude))
      setData(response.data)
      setLoading(false)

    } catch (e) {
      console.error("Erreur dans getWeather: ", e.message)
    }
  }

  async function searchCity() {
    try {
      const response = await axios.get(API_URL_BY_CITY(city))
      const {lat, lon} = response.data[0]
      const weatherResponse= await axios.get(API_URL_BY_COORDINATES(lat, lon))
      setLoading(false)
      setData(weatherResponse.data);
    } catch (e) {
      console.error("Erreur dans searchCity: ", e.message)
    }
  }


  if (loading) {
    return <View style={styles.container}>
      <ActivityIndicator />
    </View>
  }
  return (

    <View style={styles.container}>
      <ScrollView
        nestedScrollEnabled={true}
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <Search setCity={setCity} />
        <CurrentWeather data={data} />
        <Forecasts data={data} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    padding: 8,
  },
  scrollView : {
    height: "100%",
  }

});
