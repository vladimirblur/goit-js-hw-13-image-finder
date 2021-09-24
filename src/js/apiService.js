const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23521468-535c53472c6d56fb98e2bf6f2';

export default class ApiServise {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.perPage = 12;
  }

  async fetchImages() {
    const URL = `${BASE_URL}?image_type=photo&orientation=horizontal&q=${this.searchQuery}&page=${this.page}&per_page=${this.perPage}&key=${API_KEY}`;
   
    const response = await fetch(URL);
    const data = await response.json();
    this.incrementPage();
    return data;
  }
  
  resetPage() {
    this.page = 1;
  }

  incrementPage() {
    this.page += 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
};