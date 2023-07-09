import {
    View, Text, TouchableOpacity,
    StyleSheet, Dimensions, Image
} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'

const { width, height } = Dimensions.get("window")
const MusicListItem = ({ item, index, data }) => {
    const navigation = useNavigation()
    return (
        <TouchableOpacity style={styles.container}
        onPress={()=>{
            navigation.navigate("Music",{
                data:item,
                index:index
            })
        }}
        >
            <Image source={item.item.image} style={styles.songImg} />
            <View style={styles.nameview}>
                <Text style={styles.name}>
                   {item.item.title}
                </Text>
                <Text style={styles.singer}>
                    {item.item.singer}
                </Text>
            </View>
            <TouchableOpacity>
                <Image source={require("../images/play-button.png")}
                    style={styles.play}
                />
            </TouchableOpacity>
            
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    container: {
        width: width - 40,
        flex: 1,
        elevation: 5,
        marginTop: 20,
        alignSelf: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center"
    },
    songImg: {
        width: 70, // Adjust the width to the desired size
        height: 70, // Adjust the height to the desired size
        borderRadius: 10,
        marginLeft: 7,
    },
    nameview: {
        paddingLeft: 20,
        width: '60%', // Adjust the width to leave space for the play button
        flexDirection: 'column', // Change the direction to column
        justifyContent: 'center',
        color:"#000"
    },
    name: {
        fontSize: 20,
        fontWeight: "600",
        color: "#000"
    },
    singer:{
        color: "#000"
    },
    play: {
        width: 30,
        height: 30
    }
})

export default MusicListItem