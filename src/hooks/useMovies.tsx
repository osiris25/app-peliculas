import { useEffect, useState } from 'react';
import movieDB from '../api/movieDB';
import { Movie, MovieDBResponse } from '../interfaces/movieInferface';

interface MovieState {
  nowPlaying: Movie[];
  popular: Movie[];
  topRated: Movie[];
  upcoming: Movie[];
}
export const useMovies = () => {
  //Se crea un useState para la data cuando se consume un solo servicio
  //const [peliculasEnCine,setPeliculasEnCine] = useState<Movie[]>([]);

  //Se crea un state para hacer una peticion multiple
  const [movieState, setMovieState] = useState<MovieState>(
    {nowPlaying:[],popular:[],topRated:[],upcoming:[]}
  );
  //Se crea un useState para el Loading´
  const [isLoading, setIsLoading] = useState(true);
  //Peticion a la api de lo que queremos mostrar
  const getMovies = async () => {
    //para un solo servicio
    //const respNowPlaying = await movieDB.get<MovieDBResponse>('/now_playing');

    //Multiples peticiones promesas
    const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing');
    const popularPromise = movieDB.get<MovieDBResponse>('/popular');
    const topRaderPromise = movieDB.get<MovieDBResponse>('/top_rated');
    const upcomingPromise = movieDB.get<MovieDBResponse>('/upcoming');

    const resp = await Promise.all([
      nowPlayingPromise,
      popularPromise,
      topRaderPromise,
      upcomingPromise
    ]);

    setMovieState({
      nowPlaying :resp[0].data.results,
      popular :resp[1].data.results,
      topRated :resp[2].data.results,
      upcoming :resp[3].data.results,
    });
    setIsLoading(false);

  }
  useEffect(() => {
    getMovies();
  }, [])
  return {
    ...movieState,
    isLoading,

  }
}