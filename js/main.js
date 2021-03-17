import gallery from "./gallery-items.js";


const galleryImages = document.querySelector('.gallery')
const lightbox = document.querySelector('.lightbox');
const lightboxContent = document.querySelector('.lightbox__content');
const lightboxImg = document.querySelector('.lightbox__image');
const lightboxBtn = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlay = document.querySelector('.lightbox__overlay')


const GaleryItem = createGaleryItems(gallery)
galleryImages.insertAdjacentHTML('afterbegin', GaleryItem)

function createGaleryItems(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href=""
  >
    <img
    class = "gallery__image"
      src = "${preview}"
      data-source = "${original}"
      alt = "${description}"
    />
  </a>
</li>
    
    `
  }).join('')
}

galleryImages.addEventListener('click', onOpenModal)
lightboxBtn.addEventListener('click', onCloseModal);
lightBoxOverlay.addEventListener('click', onClicklightBoxOverlay);


function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyPress)

    if (e.target.nodeName !== 'IMG') {
      return;
    }
    
      lightbox.classList.add("is-open");
      lightboxImg.src = e.target.dataset.source;
      lightboxImg.alt = e.target.alt;
  
 }

 function onCloseModal () {
  window.removeEventListener('keydown', onEscKeyPress)
  lightbox.classList.remove("is-open");
};


function onClicklightBoxOverlay (e) {
if (e.currentTarget === e.target){
  onCloseModal () 
}
}

function onEscKeyPress (e){
  const ESC_KEY_CODE = 'Escape';
  if (e.code === ESC_KEY_CODE){
    onCloseModal () 
  }
}

