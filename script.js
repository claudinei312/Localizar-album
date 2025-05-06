// script.js
const apiKey = 'AIzaSyC-HpYzj3rGLgOB6ZFQSS_ahHQLA9hc5CU';
const folderId = '1zPo1pHzN1yivlv15qcy0kmBql05gKp3y';

document.getElementById('search').addEventListener('input', async function () {
  const searchTerm = this.value.trim().toLowerCase();
  const gallery = document.getElementById('gallery');
  gallery.innerHTML = 'Carregando...';

  try {
    const response = await fetch(`https://www.googleapis.com/drive/v3/files?q='${folderId}'+in+parents&key=${apiKey}`);
    const data = await response.json();

    if (!data.files) {
      gallery.innerHTML = 'Erro ao carregar imagens.';
      return;
    }

    const matchedFiles = data.files.filter(file =>
      file.name.toLowerCase().includes(searchTerm)
    );

    if (matchedFiles.length === 0) {
      gallery.innerHTML = 'Nenhum resultado encontrado.';
    } else {
      gallery.innerHTML = '';
      matchedFiles.forEach(file => {
        const img = document.createElement('img');
        img.src = `https://drive.google.com/uc?id=${file.id}`;
        img.alt = file.name;
        img.classList.add('gallery-image');
        gallery.appendChild(img);
      });
    }
  } catch (error) {
    console.error('Erro:', error);
    gallery.innerHTML = 'Erro ao buscar imagens.';
  }
});
