function onYoutubeBtnClick() {
    let idBtn = document.querySelector('.modal_button');
    filmApi.movieId = idBtn.dataset.id;
    filmApi
    .fetchYoutube()
    .then(data => {
        let results = data.results[0];
        let key = results.key;
        return key;
    })
    .then(key => iframeRender(key));
}
function iframeRender(key) {
    const BASE_YOUTUBE_URL = 'https://www.youtube.com/embed/';
  const instance = basicLightbox.create(
    `<button type="button" id="youtube-close-btn"><i class="fa-regular fa-circle-xmark"></i></button><iframe
      src="${BASE_YOUTUBE_URL}${key}"?autoplay=1&mute=1&controls=1>
      </iframe>
    `,
    {
    
        onPlay: instance => {
            instance.element().querySelector('#youtube-close-btn').onclick = instance.close;
        },
      },
  )
  instance.show();
}