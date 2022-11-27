import "./fetch"
const refs = {
  queueBtn: document.querySelector('.queue-btn'),
    watchedBtn: document.querySelector('.wached-btn'),

    addToQueueBtn: document.querySelector('QUEUE'),
    addToWatchedBtn: document.querySelector('#WATCHED'),
  
}
arrayOfQueue = [];
refs.queueBtn.addEventListener('click', showQueue)

function showQueue() {
    refs.watchedBtn.classlist.remove('active')
    refs.queueBtn.classlist.add('active')
    console.log('click')
}


refs.addToQueueBtn.addEventListener('click', addMovie)
refs.addToWatchedBtn.addEventListener('click', addMovie)


function addMovie(movie) {
    arrayOfQueue.push(movie)
}