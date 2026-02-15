import { StyleSheet, Text, View ,Modal, BackHandler, Button} from 'react-native'
import {Ionicons} from '@expo/vector-icons';
import React,{useEffect, useState} from 'react'

const ModalComponent = ({visible,onClose}) => {

    
  return (
   <Modal style={styles.modelcontent} visible={visible}  animationType='fade' transparent={true}>
        <View style={styles.overlay}>
          <View
          style={styles.modalBox}>
            <Button title='exist' onPress={()=>{BackHandler.exitApp()}}>Exist Program</Button>
            <Ionicons name="close-outline" size={24} onPress={onClose}/>
          </View>
  
        </View>
      </Modal>
  )
}

export default ModalComponent

const styles = StyleSheet.create({
    modelcontent:{
        width:"10%",
        height:"10%",
    },
    overlay:{
        
        backgroundColor: "rgba(0,0,0,0.5)",
        flex:1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalBox:{
        display:'flex',
        flexDirection:'row',
        justifyContent:"space-between",
        width:250,
        padding:20,
        backgroundColor:"white",
        borderRadius:10
    }
})