import './sass/main.scss';

import 'material-icons'
import refs from './js/refs.js'
import SimpleLightbox from "simplelightbox";
import GalleryApiService from './js/apiService.js';
import renderMarkup from './js/renderMarkup.js'
import { notify } from './js/pNotify.js';
import LoadMoreBtn from './js/loadMoreBtn.js'
import ScrollNewImages from './js/ScrollToViewNewImages.js'



var lightbox = new SimpleLightbox(".gallery a", { captionDelay: 250 });

const galleryApiService = new GalleryApiService();

const scrollNewImages = new ScrollNewImages({
  selector: '.js-gallery .gallery-item',
  imagesPerPage: galleryApiService.perPage,
})


const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
})

refs.formRef.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', onLoadMoreBtn)



async function  onSearch(e) {
  e.preventDefault();

  galleryApiService.query = e.currentTarget.elements.query.value;
  loadMoreBtn.hide();
  clearGalleryContainer();
  galleryApiService.resetPage();
   scrollNewImages.resetNumberItemToScroll();

  if (galleryApiService.query === '') {
    notify('error','Oops, the query is empty, enter something');
    return;
  }


    try {
        const { hits, totalHits } = await galleryApiService.fetchImages();

      renderMarkup(hits);
      loadMoreBtn.show();
      refs.formRef.reset();
        notify('success', `We founded ${totalHits} images.`);
    } catch (error) {
        errorNotify(error.message);
    }

  
};



async function onLoadMoreBtn() {
  loadMoreBtn.disable();

           try {
        const { hits } = await galleryApiService.fetchImages();

        if (hits.length === 0) {
            notify('info', `We're sorry, there are no more posts to load`);
            loadMoreBtn.hide();
            loadMoreBtn.enable();
            return;
        }

    renderMarkup(hits);
     lightbox.refresh();
    loadMoreBtn.enable();
    scrollNewImages.scroll();
             
        
    } catch (error) {
        errorNotify(error.message);
    }
};


function errorNotify(message) {
    notify('error', `Something went wrong (${message}) please try again later`);
}


function clearGalleryContainer() {
  refs.galleryListRef.innerHTML = '';
}

