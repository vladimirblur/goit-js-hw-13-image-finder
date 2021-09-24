import refs from './refs.js'
import imageCardTpl from '../templates/imageCard.hbs'

export default function renderMarkup  (dataArray)  {

  return refs.galleryListRef.insertAdjacentHTML('beforeend', imageCardTpl(dataArray));

}




