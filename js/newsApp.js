/********************
 *
 * FETCH DATA
 *
 ********************/

// Init weather
export let articles = [];

export function fetchNews(dataRequest) {
  fetch(dataRequest)
    .then((response) => {
      if (!response.ok) {
        throw response;
      }
      // Parse the response
      return response.json();
    })
    // Select data from the server to display
    .then((data) => {
      articles = data;
      // console.log('articles', articles);
      // Save curent search to local storage
      localStorage.setItem('cityNews', JSON.stringify(articles));
      // Render the fetched data in DOM
      renderNewsList(articles);
    })
    .catch((err) => {
      console.log('error', err.message);
    });
}

/********************
 *
 * RENDER DATA FUNCTION
 *
 ********************/

export let mountNodeNews = document.getElementById('target-news');

// Data passed to this function inside the fetch call
export function renderNewsList(data) {
  const list = document.createElement('ul');
  list.classList.add('news-list');

  // Get current weather from storage
  // Turned this off in app.js as I don't want to render 'old' news on load, but still goot to have in storage  needed
  const storedNews = JSON.parse(localStorage.getItem('cityNews'));
  data = storedNews;

  // Li for each article
  for (const { title, content, image, url, source } of data.articles) {
    // build the list
    const li = document.createElement('li');
    li.innerHTML = `
          <div class="news-wrapper">
            <h3 class="news-headline">${title}</h3>
            <a href="${url}"><img src="${image}" class="news-image"></a>
            <p class="news-content">${content.slice(0, -12)}</p>
            <a href="${url}" class="news-link">Read the ${
      source.name
    } story here</a>
          </div>
          `;
    list.append(li);
  }
  mountNodeNews.innerHTML = ``;
  mountNodeNews.append(list);
}
