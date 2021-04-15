import gallery from "./gallery-items.js";


const galleryImages = document.querySelector('.gallery')
const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const lightboxBtn = document.querySelector('[data-action="close-lightbox"]');
const lightBoxOverlay = document.querySelector('.lightbox__overlay')


const galleryItem = createGalleryItems(gallery)
galleryImages.insertAdjacentHTML('afterbegin', galleryItem)

let currentImgIndex = null;

function createGalleryItems(gallery) {
  return gallery.map(({ preview, original, description }, index) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
    class = "gallery__image"
      src = "${preview}"
      data-source = "${original}"
      data-index = "${index}"
      alt = "${description}"
    />
  </a>
</li>
    
    `
  }).join('')
}

galleryImages.addEventListener('click', onOpenModal)



function onOpenModal(e) {
  e.preventDefault();
  window.addEventListener('keydown', onEscKeyPress)
  window.addEventListener('keydown', onClickArrowRight)
  window.addEventListener('keydown', onClickArrowLeft)
  lightboxBtn.addEventListener('click', onCloseModal);
  lightBoxOverlay.addEventListener('click', onClicklightBoxOverlay);
    if (e.target.nodeName !== 'IMG') {
      return;
    }
    
      lightbox.classList.add("is-open");
      lightboxImg.src = e.target.dataset.source;
      lightboxImg.alt = e.target.alt;
      
      currentImgIndex = +e.target.dataset.index;
    
 }

 function onCloseModal () {
  window.removeEventListener('keydown', onEscKeyPress)
  window.removeEventListener('keydown', onClickArrowRight)
  window.removeEventListener('keydown', onClickArrowLeft)
  lightboxBtn.removeEventListener('click', onCloseModal);
  lightBoxOverlay.removeEventListener('click', onClicklightBoxOverlay);
  lightbox.classList.remove("is-open");
  lightboxImg.src = '';
  lightboxImg.alt = '';
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


function onClickArrowRight (e){

 if (e.code === 'ArrowRight'){
    if (currentImgIndex === gallery.length -1){
      currentImgIndex = 0
    } else {
    currentImgIndex = currentImgIndex +1
    }
    lightboxImg.src = gallery[currentImgIndex].original

  }


}

 function onClickArrowLeft(e) {
 if (e.code === 'ArrowLeft'){
     if(currentImgIndex === 0){
      currentImgIndex = gallery.length -1
     } else {
    currentImgIndex = currentImgIndex -1
     }
    lightboxImg.src = gallery[currentImgIndex].original

  }

}


 
  

