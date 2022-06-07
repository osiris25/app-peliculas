import axios from "axios";

//Hacer la peticios a la API
 const movieDB = axios.create({
     baseURL:'https://api.themoviedb.org/3/movie',
     params:{
         api_key:'48e5feb3d6963a53590c31420179082f',
         language:'es-ES'
     }
 });
 export default movieDB;