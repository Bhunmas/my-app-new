import { StyleSheet, Text, View } from 'react-native'
import {Link} from 'expo-router';
import React from 'react'

const About = () => {
  return (
    <View>
      <Text>About</Text>
      <Link href="/">Click HomePage</Link>
    </View>
  )
}

export default About

const styles = StyleSheet.create({})