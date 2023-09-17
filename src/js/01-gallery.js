import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line
const container = document.querySelector('.gallery');
const markup = galleryItems.map(
  ({ preview, original, description }) =>
    ` <li class="gallery__item"> <a class="gallery__link" href="${original}"> <img
class="gallery__image"
src="${preview}"
alt="${description}"
/>
</a>
</li>`
);
container.insertAdjacentHTML('afterbegin', markup.join(''));

let gallery = new SimpleLightbox('.gallery__link', {
  overlayOpacity: 1,
  closeText: '',
  maxZoom: 2,
  showCounter: false,
});
gallery.on('show.simplelightbox');
