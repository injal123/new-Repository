let search = document.querySelector(".searchBox");
let button = document.querySelector(".searchBtn");
let box = document.querySelector(".boxbox");
let detail = document.querySelector(".recipe-details");
let closeBtn = document.querySelector(".recipe-close");




// async function fetchRecipe(searched){
//     let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searched}`)
       
//     let a = await response.json();
//     console.log(response);
// }



const fetchRecipe = async (ok) => {
    box.innerHTML = "Searching...";
    
    try {
        
    
     const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${ok}`);
     const response = await data.json();
    //  console.log(response);
    // console.log(response.meals[0]);

    box.innerHTML = " ";

     response.meals.forEach(value => {

        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = 
        `  <img src="${value.strMealThumb}">
            <h3>${value.strMeal}</h3>
            <p> <span> ${value.strArea}</span> Dish </p> 
            <p>Category: <span> ${value.strCategory} </span> </p> 
        `
         const Btn = document.createElement("button");
         Btn.innerHTML =  "View Recipe";
         recipeDiv.appendChild(Btn); 

         Btn.addEventListener("click", () =>{
            openRecipe(value);
         })

        box.appendChild(recipeDiv);
     });

    } catch (error) {
        box.innerHTML = "<h2>   Error occurred !!  </h2>";
    }
}


const openRecipe = (value) => {
     detail.innerHTML = `
     <h2 class = "name" > ${value.strMeal} </h2> 
     <h3> Ingredients: </h3> 
     <ul class = "list" > ${  fetchIngredients(value)  } </ul>
     <div class = "process"> 
          <h3>Instructions :</h3>
          <p> ${value.strInstructions}  </p>
      </div>
  
    `
    detail.parentElement.style.display = "block";
}


closeBtn.addEventListener("click", () => {
    detail.parentElement.style.display = "none";
});




const fetchIngredients = (value) =>{
     console.log(value);
    let ingredientsList = " ";
    for(let i=1;i<=20;i++)
    {
        const ingredient = value[`strIngredient${i}`];

        if(ingredient){
            const measure = value[`strMeasure${i}`];
            ingredientsList = ingredientsList + `<li> ${measure} ${ingredient} </li>`
        }
        else{
            break;
        }
    }
    return ingredientsList;
}




 
button.addEventListener("click", (e)=>{
    e.preventDefault();

    // console.log("clicked");
    const searched = search.value;
    // console.log(searched);
    fetchRecipe(searched);
});


