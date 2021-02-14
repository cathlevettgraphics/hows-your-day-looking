/********************
 *
 * FETCH DATA
 *
 ********************/

//  init food
export let food = [];

export function fetchFood(dataRequest) {
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
      // console.log(data.meals.slice(0, 5));
      food = data.meals;
      console.log('foods', food);

      // Save to storage
      localStorage.setItem('foodItem', JSON.stringify(food));

      // Render to DOM
      renderFoodList(food);
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

export let mountNodeFood = document.getElementById('target-food');

// Data passed to this function inside the fetch call
export function renderFoodList() {
  if (!food) {
    mountNodeFood.innerHTML = 'No meals found ... please search again';
  } else {
    const list = document.createElement('ul');
    list.classList.add('food-list-wrapper');
    const storedFood = JSON.parse(localStorage.getItem('foodItem'));
    food = storedFood;

    // Build list for each food option
    for (const { strMeal, strMealThumb, strYoutube } of food) {
      const li = document.createElement('li');
      li.classList.add('food-list-grid');
      li.innerHTML = `
        <div class="food-wrapper">
        <h3 class="food-headline">${strMeal}</h3>
        <a href=${strYoutube}"><img src="${strMealThumb}" class="food-image"></a>
        <a href="${strYoutube}" class="food-link">Watch the recipie here</a>
        </div>
        `;
      list.append(li);
    }
    mountNodeFood.innerHTML = '';
    mountNodeFood.append(list);
  }
}
