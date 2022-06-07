import React from 'react'
import { View, Text } from 'react-native';
import { Movie } from '../interfaces/movieInferface';
import { FlatList } from 'react-native-gesture-handler';
import { MoviePoster } from './MoviePoster';
interface Props {
    title?:string;
    movie:Movie[]
}
export const HorizontalSlider = ({title,movie}:Props) => {
  return (
      <View>          
        {/* Carrucel popular */}
        <View style={{ height:(title)?260:220}}>
          
          {title && <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{title}</Text> }
          <FlatList
            data={movie}
            renderItem={({ item }: any) => <MoviePoster movie={item} width={140} height={200} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>
   
  )
}
