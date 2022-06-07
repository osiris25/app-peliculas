import { StackScreenProps } from '@react-navigation/stack';
import React from 'react'
import { Image, StyleSheet, View, Dimensions, Text, ActivityIndicator, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { RootStackParams } from '../navigation/Navigation';
import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetail } from '../components/MovieDetail';
const screenHeight = Dimensions.get('screen').height;
//Recibir informacion
interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { };

export const DetailScreen = ({ route,navigation }: Props) => {
  const movie = route.params;
  const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
  const { cast, isLoading, movieFull } = useMovieDetails(movie.id);
  return (
    <ScrollView>
      <View style={styles.imageContainer}>
        <View style={styles.borderImage}>
          <Image source={{ uri }} style={styles.posterImage} ></Image>
        </View>
      </View>
      <View style={styles.marginContainer}>
        <Text style={styles.subTitle}>{movie.original_title}</Text>
        <Text style={styles.title}>{movie.title}</Text>
      </View>
      {
        //Validacion para que aparezca el loading
        isLoading
          ? <ActivityIndicator size={35} color='grey' style={{ marginTop: 20 }} />
          : <MovieDetail movieFull={movieFull!} cast={cast} />
      }

      <View  style={styles.backButton}>
        {/*el pop hace que se vaya a la pantalla */}
        <TouchableOpacity onPress={()=>navigation.pop()}>
          <Icon color='white' name='arrow-back-outline' size={50} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  imageContainer: {
    width: '100%',
    height: screenHeight * 0.7,
    borderRadius: 18,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.9,
    shadowRadius: 4.65,
    borderBottomEndRadius: 25,
    borderBottonStarRadius: 25,
    elevation: 10,
  },
  borderImage: {
    flex: 1,
    overflow: 'hidden',
    borderBottomEndRadius: 25,
    borderBottonStarRadius: 25
  },
  posterImage: {
    flex: 1
  },
  marginContainer: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  subTitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  backButton: {
    position: 'absolute',
    elevation: 9,
    top: 30,
    left: 20
  }
});