const loadSeafood = async(searchText) =>{
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
  try{
    const res = await fetch(url);
    const data = await res.json();
    displaySeafood(data.meals)
  }
  catch(error){
    console.log(error)
  }
}



const displaySeafood = meals =>{
const seaFoodContainer = document.getElementById('seaFoodContainer');
seaFoodContainer.innerHTML = ' ';
meals.forEach(meal =>{
  console.log(meal)
  const mealDiv = document.createElement('div');
  // mealDiv.classList.add('col');
  mealDiv.innerHTML = `
  <div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${meal.strMealThumb}" class="img-fluid" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title fw-bold fs-5">${meal.strMeal}</h5>
        <p class="card-text">There are many variations of passages of available, but the majority have suffered</p>  

        <button onclick="loadMealDetails(${meal.idMeal})" type="button" class="btn text-decoration-underline fs-6 text-warning" data-bs-toggle="modal" data-bs-target="#showMealDetails">View Details
</button>
       
      </div>
    </div>
  </div>
</div>
  `;

  seaFoodContainer.appendChild(mealDiv)
});
};
const searchMeal = () =>{
  const searchText = document.getElementById('search-field').value;
  loadSeafood(searchText);
};

const loadMealDetails = async(strMeal) =>{
const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${strMeal}`
try{
  const res = await fetch(url);
const data = await res.json();
displayMealsDetails(data.meals[0])

} catch(error){
  console.log(error);
}

}
const displayMealsDetails  = meal =>{
  document.getElementById('staticBackdropLabel').innerText = meal.strMeal;
  const mealDetails = document.getElementById('mealsDetailsBody');
  mealDetails.innerHTML = ` 
  <img class= "img-fluid" src="${meal.strMealThumb}">
  <p class="fs-5 mt-2 fw-bold" >Category: ${meal.strCategory}</p>
  <p class="fs-5 mt-2 fw-bold" >Area: ${meal.strArea}</p>
  <p class="fs-5 mt-2 fw-bold" >Instructions: ${meal.strInstructions}</p>
  <p class="fs-5 mt-2 fw-bold" >Youtube: ${meal.strYoutube}</p>
  `;
}



loadSeafood('fish');