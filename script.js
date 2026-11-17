// Usa a logo adicionada em assets/logo.png; mantém a letra B como reserva.
document.querySelectorAll('.brand-logo').forEach((img) => {
  const wrapper = img.closest('.brand-logo-wrap');
  const updateLogo = () => wrapper.classList.toggle('has-logo', img.naturalWidth > 0);
  img.addEventListener('load', updateLogo);
  img.addEventListener('error', updateLogo);
  if (img.complete) updateLogo();
});

// Mostra um espaço reservado quando a captura ainda não foi adicionada.
document.querySelectorAll('.screen-card img').forEach((img) => {
  const card = img.closest('.screen-card');
  card.classList.add('missing');
  img.addEventListener('load', () => {
    img.hidden = false;
    card.classList.remove('missing');
  });
  img.addEventListener('error', () => { img.hidden = true; });
  if (img.complete && img.naturalWidth) {
    img.hidden = false;
    card.classList.remove('missing');
  } else if (img.complete) {
    img.hidden = true;
  }
});

// Amplia as capturas de tela ao clicar.
const viewer = document.querySelector('.image-viewer');
const viewerImage = viewer.querySelector('img');
document.querySelectorAll('.screen-card img').forEach((img) => {
  img.addEventListener('click', () => {
    if (!img.hidden && img.naturalWidth) {
      viewerImage.src = img.src;
      viewerImage.alt = img.alt;
      viewer.showModal();
    }
  });
});
viewer.querySelector('.viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', (event) => {
  if (event.target === viewer) viewer.close();
});

// Exibe o player somente quando o arquivo de vídeo estiver disponível.
const video = document.querySelector('.video-card video');
const videoPlaceholder = document.querySelector('.video-placeholder');
video.addEventListener('loadedmetadata', () => {
  video.hidden = false;
  videoPlaceholder.hidden = true;
});
video.addEventListener('error', () => {
  video.hidden = true;
  videoPlaceholder.hidden = false;
});
