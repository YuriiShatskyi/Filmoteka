import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import '../sass/_pagination.scss';
import { fetchTrendingFilms } from '../index.js';

const pagination = require('tui-pagination');


// const pagination = tui.pagination;

const container = document.getElementById('pagination');
const options = { // below default value of options
     totalItems: 10,
     itemsPerPage: 10,
     visiblePages: 10,
     page: 1,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};
const pagination = new pagination(container, options);

pagination.on('afterMove', (event) => {
     const currentPage = event.page;
     console.log(currentPage);
});

pagination.on('beforeMove', (event) => {
    const currentPage = event.page;

    if (currentPage === 10) {
        return false;
        // return true;
    }
});