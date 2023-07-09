import { View, Text,StyleSheet,FlatList,Dimensions } from 'react-native'
import React from 'react'
import { musicdata } from '../Musicdata'
import MusicListItem from '../common/MusicListItem'
const {height} = Dimensions.get("window")
const Home = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>
            Music App
        </Text>
       
      </View>
       <FlatList data={musicdata}
        renderItem={(item,i)=>{
            return <MusicListItem index={i} item={item} />
        }}
        />
    </View>
  )
}


const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    header:{
        height:60,
        backgroundColor:"#fff",
        width:"100%",
        elevation:5,
        justifyContent:"center"
    },
    logo:{
        fontSize:20,
        fontWeight:"700",
        color:"red",
        marginLeft:20
    }
})

export default Home