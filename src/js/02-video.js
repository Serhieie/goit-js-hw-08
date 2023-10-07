import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const KEY_CURRENT_TIME = 'Current Time';
const player = new Player('vimeo-player');

const videoGetTime = localStorage.getItem(KEY_CURRENT_TIME);
if (videoGetTime) {
  player.setCurrentTime(videoGetTime);
}

player.on(
  'timeupdate',
  throttle(function (data) {
    const currentTime = data.seconds;
    localStorage.setItem(KEY_CURRENT_TIME, currentTime);
  }, 1000)
);

//Ця частина можливо коли небудь мені знадобиться) а може і ні

// player
//   .getDuration()
//   .then(function (played) {
//     played = (videoGetTime / duration) * 100;
//   })
//   .catch(function (error) {
//     console.log(
//       'Відлов помилки при зміні стилів плеера яка виникає бо duration - не оголошений'
//     );
//   });
