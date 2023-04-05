import { View, Text } from 'react-native'
import React from 'react'
import Barcode from 'react-native-barcode-builder';
export const Barcodebuilder = () => {
  return (
    <View>
        <Barcode value="Hello World" format="CODE128" />
      <Text>barcodebuilder</Text>
    </View>
  )
}
