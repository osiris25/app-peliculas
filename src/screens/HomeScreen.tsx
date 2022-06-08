import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Carousel from 'react-native-snap-carousel';
import ImageColors from 'react-native-image-colors';
import { useMovies } from '../hooks/useMovies';
import { MoviePoster } from '../components/MoviePoster';
import { HorizontalSlider } from '../components/HorizontalSlider';
import { GradientBackground } from '../components/GradientBackground';
import { getImageColors } from '../helpers/getColores';
//Posicion del telefon
const { width: windowWidth } = Dimensions.get('window');
export const HomeScreen = () => {
  const { nowPlaying, isLoading, popular, topRated, upcoming } = useMovies();
  const { top } = useSafeAreaInsets();

  const getPosterColors = async (index:number)=>{
    const movie=nowPlaying[index];
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    const {primary, secondary}= await getImageColors(uri);
    console.log({primary, secondary})
  } 

  if (isLoading) {
    //ActivityIndicator es un load
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <ActivityIndicator color={'red'} size={100} />
      </View>
    )
  }

  return (
    <GradientBackground>
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
              onSnapToItem={index => getPosterColors(index)}
            />
          </View>
          <HorizontalSlider title='Popular' movie={popular} />
          <HorizontalSlider title='Top Rated' movie={topRated} />
          <HorizontalSlider title='Upcoming' movie={upcoming} />
        </View>
      </ScrollView>
    </GradientBackground>
  )
}
