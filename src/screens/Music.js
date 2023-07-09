import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useRoute } from "@react-navigation/native";
import { listdatamusic, musicdata } from '../Musicdata';
import TrackPlayer, { useProgress,Capability,usePlaybackState,State } from 'react-native-track-player';
import Slider from '@react-native-community/slider';

const { width, height } = Dimensions.get("window");

const Music = () => {
  const playbackstate = usePlaybackState()
  const progress = useProgress();
  const route = useRoute();
  const [currentData, setCurrentData] = useState()
  const [currentSong, setCurrentSong] = useState(0);
  const flatListRef = useRef();





  useEffect(() => {
    if (route?.params?.data?.index !== undefined) {
    
      setCurrentSong(route.params.data.index);
    }
    // isTrackPlaying(route.params.data.index)
  }, [route?.params?.data?.index]);

  const onViewableItemsChanged = useRef(async({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setCurrentSong(viewableItems[0].index);
      await TrackPlayer.skip(viewableItems[0].index)
    }
  }).current;




  const setupPlayer = async (currSong) => {
    const track = await TrackPlayer.getTrack(currSong);
    if(track){
      setCurrentData(track)
    }

    try {
      // const track = await TrackPlayer.getCurrentTrack();
     
        await TrackPlayer.setupPlayer();
        TrackPlayer.updateOptions({
          capabilities: [
            Capability.Play,
            Capability.Pause,
            Capability.SkipToNext,
            Capability.SkipToPrevious,
            Capability.Stop,
          ],
          compactCapabilities: [Capability.Play, Capability.Pause],
        });
        await TrackPlayer.add(listdatamusic);
        await TrackPlayer.skip(currSong);
      
    } catch (err) {
      console.log(err);
    }
  };
  
  


  // useLayoutEffect(()=>{
  //   //  isTrackPlaying(currentSong)
  //   //  setupPlayer()
  //   // isTrackPlaying(currentSong)
  //   setupPlayer(currentSong)
  // },[currentSong])
  useEffect(() => {
    setupPlayer(route?.params?.data?.index || currentSong);
  }, []);
  

  const togglePlayback = async(playstate)=>{


    if(playstate === State.Ready
      || playbackstate===State.Buffering ||
      playbackstate===State.Connecting
      ){
      await TrackPlayer.play()
    }else if(playstate===State.Paused){
      await TrackPlayer.play()
    }
    else if(playstate===State.Playing){
      await TrackPlayer.pause()
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.bannerView}>
        {/* <FlatList
          ref={flatListRef}
          data={musicdata}
          horizontal
          initialScrollIndex={currentSong}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Image source={item.image} style={styles.banner} />
          )}
          snapToInterval={width}
          decelerationRate={1}
        /> */}
        <FlatList
          ref={flatListRef}
          data={musicdata}
          horizontal
          initialScrollIndex={currentSong}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <Image source={item.image} style={styles.banner} />
          )}
          snapToInterval={width}
          decelerationRate={1}
          onViewableItemsChanged={onViewableItemsChanged}
        />
      </View>
      <Text style={styles.name}>
        {
          currentData ? currentData.title:listdatamusic[currentSong].title
        }
      </Text>

      <Text style={styles.name}>
        {currentData ? currentData.artist:listdatamusic[currentSong].artist}
      </Text>
      <View style={styles.sliderview}>
        {/* <Slider
        value={progress.position}
        maximumValue={progress.duration}
        minimumValue={0}
        onValueChange={async value=>{
          await TrackPlayer.seekTo(value)
        }}
        /> */}


<Slider
        value={progress.position}
        minimumValue={0}
        maximumValue={progress.duration}
        thumbTintColor='#000'
        // onValueChange={async(value)=>{
        //   console.log(value*1000)
        //   // await TrackPlayer.seekTo(value*1000)
        // }}
        onSlidingComplete={async(val)=>{
          console.log(val*1000)
          await TrackPlayer.seekTo(Math.floor(val))
        }}
        maximumTrackTintColor='#000'
        style={styles.sliderContainer}
        />
        <Text style={{color:"#000"}}>{progress.duration}</Text>
      </View>
      <View style={styles.btnarea}>
        <TouchableOpacity onPress={async() => {
          if (currentSong > 0) {
            setCurrentSong(currentSong - 1);
            flatListRef.current.scrollToIndex({
              animated: true,
              index: currentSong - 1
            })
            await TrackPlayer.skip(currentSong - 1)
            await togglePlayback(playbackstate)
          }
        }}>
          <Image source={require("../images/back.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async()=>{
          // if(playbackstate!==State.Paused){
          // await TrackPlayer.skip(currentSong)
          // }
          await togglePlayback(playbackstate)
        }}>
          <Image source={require("../images/play-button.png")} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={async() => {
          if (musicdata.length - 1 > currentSong) {
            setCurrentSong(currentSong + 1);
            flatListRef.current.scrollToIndex({
              animated: true,
              index: currentSong + 1
            })
            await TrackPlayer.skip(currentSong + 1)
            await togglePlayback(playbackstate)
          }
        }}>
          <Image source={require("../images/next.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bannerView: {
    height: height / 2,
    width: width,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  banner: {
    width: width, // Adjust the width to the desired size
    height: "100%",
    alignSelf: "center",
    borderRadius: 10,
  },
  name: {
    marginTop: 10,
    fontSize: 20,
    // marginLeft: 20,
    textAlign: "center",
    fontWeight: "700",
    color: "#000",
  },
  sliderview: {
    marginTop: 20,
    alignSelf: "center",
    width: "90%",
  },
  btnarea: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    marginTop: 50,
  },
  icon: {
    width: 30,
    height: 30,
  },
});

export default Music;
