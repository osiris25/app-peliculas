import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';

import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
//Posicion del telefon
const { width: windowWidth } = Dimensions.get('window');
export const HomeScreen = () => {
  const { nowPlaying, isLoading,popular,topRated,upcoming } = useMovies();
  const { top } = useSafeAreaInsets();


  if (isLoading) {
    //ActivityIndicator es un load
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    )
  }

  return (
    <ScrollView>
      <View style={{ marginTop: top + 20 }}>

        {/*  <MoviePoster
        movie={peliculasEnCine[0]}/> */}
        {/* Carrucel principal */}
        <View style={{ height: 440 }}>
          <Carousel
            data={nowPlaying}
            renderItem={({ item }: any) =>
              //ES EL COMPONENTE QUE RENDERIZAMOS
              (<MoviePoster movie={item} />)
            }
            sliderWidth={windowWidth}
            itemWidth={300}
            inactiveSlideOpacity={0.9}
          />
        </View>
            <HorizontalSlider title='Popular' movie={popular}/>
            <HorizontalSlider title='Top Rated' movie={topRated}/>
            <HorizontalSlider title='Upcoming' movie={upcoming}/>
      </View>
    </ScrollView>
  )
}
