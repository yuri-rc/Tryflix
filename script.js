/* eslint-disable no-console */
/* eslint-disable no-undef */

const createPopup = (param, summary, rating, url) => {
  const infoContainer = document.querySelector('#info-container');
  infoContainer.style.display = 'block';
  const img = document.querySelector('#cardImg');
  const p = document.querySelector('#rating');
  const pSumary = document.querySelector('#summary');
  // const info = document.querySelector('#info');

  const readMore = '<span id="read-more">Read more.</span>';

  // https://stackoverflow.com/questions/7463658/how-to-trim-a-string-to-n-chars-in-javascript
  const sumaryText = summary.substring(3, summary.length - 4);
  const sumaryLimit = sumaryText.substring(0, 250);

  img.src = param;
  p.innerHTML = `Rating: ${rating.average}`;
  pSumary.innerHTML = `${sumaryLimit}... ${readMore}`;

  const preadMore = document.querySelector('#read-more');
  preadMore.addEventListener('click', () => {
    // https://pt.stackoverflow.com/questions/39620/como-for%C3%A7ar-a-abertura-de-um-link-em-outra-aba-e-n%C3%A3o-janela
    window.open(url, '_blank');
  });
};

const setInfosPopup = async (id) => {
  const data = await fetchSeries();
  const targetId = id.target.id;
  const card = data.find((q) => q.id === Number(targetId));
  createPopup(card.image.medium, card.summary, card.rating, card.url);
};

// CRIA BANNERS

const createIcon = (idItem) => {
  const ico = document.createElement('img');
  ico.className = 'icon';
  ico.id = idItem.id;
  ico.src = 'https://img.icons8.com/material-outlined/24/ffffff/info--v1.png';
  ico.addEventListener('click', setInfosPopup);
  return ico;
};

const createImage = (item) => {
  const img = document.createElement('img');
  img.className = 'card';
  // https://www.w3schools.com/jsref/prop_img_src.asp
  img.src = item;
  return img;
};

const createDOM = (item) => {
  const movies = document.querySelector('#movies');
  const section = document.createElement('section');
  section.appendChild(createIcon(item));
  section.appendChild(createImage(item.image.medium));
  movies.appendChild(section);
};

const createCards = async () => {
  const data = await fetchSeries();
  data.forEach((item) => {
    createDOM(item);
  });
};

// ------------

const closeInfoContent = () => {
  const closeInfo = document.querySelector('#close-info');
  closeInfo.addEventListener('click', () => {
    const infoContainer = document.querySelector('#info-container');
    infoContainer.style.display = 'none';
  });
};

const burguerButton = () => {
  const burguer = document.querySelector('#burguer');
  const closeAside = document.querySelector('#close-aside');
  const aside = document.querySelector('aside');

  closeAside.addEventListener('click', () => {
    if (aside.classList.contains('showMenu')) {
      aside.classList.add('go-back');
      setTimeout(() => {
        aside.classList.remove('showMenu');
        aside.classList.remove('go-back');
      }, 950);
    }
  });

  burguer.addEventListener('click', () => {
    if (!aside.classList.contains('showMenu')) {
      aside.classList.add('showMenu');
    }
  });
};

const createGenCards = async (element) => {
  const moviesSec = document.querySelector('#movies');
  moviesSec.innerHTML = '';
  const data = await fetchSeries();
  data.forEach((item) => {
    item.genres.forEach((q) => {
      if (q === element.target.innerHTML) createDOM(item);
    });
  });
};

const getGenres = async () => {
  const data = await fetchSeries();
  const genresArray = [];
  data.forEach((item) => {
    item.genres.forEach((genre) => genresArray.push(genre));
  });
  const allGenres = [...new Set(genresArray)];
  return allGenres;
};

const setGenre = async () => {
  const ul = document.querySelector('#genres');
  const allGenres = await getGenres();
  allGenres.forEach((genre) => {
    const li = document.createElement('li');
    li.innerHTML = genre;
    li.addEventListener('click', createGenCards);
    ul.appendChild(li);
  });
};

window.onload = async () => {
  await createCards();
  closeInfoContent();
  burguerButton();
  setGenre();
};
