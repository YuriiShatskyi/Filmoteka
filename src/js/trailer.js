
import { fetchVideo } from '/movie/{movie_id}/videos';
export async function fetchVideo (inputValue, modal__button);
const dataVimeo = await get/movie/{movie_id}/videos 
(https://developers.themoviedb.org/3/movies/get-movie-videos;
);

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
let idBtn = document.querySelector(id="trailer" <WATCH TRAILER>);


player.on('timeupdate',  throttle( e => {
    localStorage.setItem('/movie/{movie_id}/videos', e.seconds);
    }, 1000)
    );

player
.setCurrentTime(localStorage.getItem('/movie/{movie_id}/videos'))
.catch(function (error) {
    console.error(error)
});