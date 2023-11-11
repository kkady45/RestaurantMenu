
$(document).ready(() => {
    searchByName("").then(() => {
        $(".loading-screen").fadeOut(500)
        $("body").css("overflow", "visible")

    })
})

function openSideNav() {
    $(".side-nav-menu").animate({
        left: 0
    }, 500)


    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");


    for (let i = 0; i < 5; i++) {
        $(".links li").eq(i).animate({
            top: 0
        }, (i + 5) * 100)
    }
}

function closeSideNav() {
    let boxWidth = $(".side-nav-menu .nav-tab").outerWidth()
    $(".side-nav-menu").animate({
        left: -boxWidth
    }, 500)

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");


    $(".links li").animate({
        top: 300
    }, 500)
}

closeSideNav()
$(".side-nav-menu i.open-close-icon").click(() => {
    if ($(".side-nav-menu").css("left") == "0px") {
        closeSideNav()
    } else {
        openSideNav()
    }
})


let rows=document.querySelector('.rows');
let list=[];
let clicko=[];
let recipe=[]
let mealID=0;
let recipesGlobal=[];
let tagsGlobal=[];
let searchPage=document.getElementById('search');
let searcho=document.querySelector('.searcho');
let searchByword=document.querySelector('.word');
let searchByLetter=document.querySelector('.letter');
let category=document.getElementById('category');
let globalCategory=[];
let global=[];
let contactUs=document.getElementById('contactUs')

getData('https://www.themealdb.com/api/json/v1/1/search.php?s=');
// showContactUs();

async function getData(url){
     let response=await fetch(url);
     let data=await response.json();
     list=data.meals;
     console.log(list);
     showData();
}
function showData(){
    let trs='';
    for(let i=0;i<list.length;i++){

        trs+=`
        <div class="col-lg-3">
                    <div class="bg-info position-relative ">
                        <img class="" src="${list[i].strMealThumb}" alt="">
                        <div class="layer">

                            <p class="fs-1 px-2">${list[i].strMeal}</p>

                        </div>
                    </div>
                </div>
        `

    }
  
    rows.innerHTML=trs;
    let divs=document.querySelectorAll('.bg-info');
    clicko=[...divs];
    console.log(clicko);
    for(let i=0;i<list.length;i++){
        clicko[i].addEventListener('click',function(){
            console.log(list[i].idMeal);
            getRecipe(list[i].idMeal);
        })
    }

     

}

async function getRecipe(idMeal){
    let response=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`);
    let data=await response.json();
    recipe=data.meals;
    showRecipe();
    console.log(recipe);
    
}

function showRecipe(){

    searcho.classList.remove('d-flex');
    searcho.classList.add('d-none');

    let obj=recipe[0];
    let recipeDetails=[];

    for (let key in obj) {
       if(key.includes('strIngredient')&&obj[key]!=null){
        recipeDetails.push(obj[key]);
       }      
    }
    
    if(obj.strTags){
        tagsGlobal=obj.strTags.split(',');
        console.log(tagsGlobal.length);
    }
    
    let trs=`
    <div class="col-lg-4">
    <div class="">
        <img class="w-100 rounded-4" src="${recipe[0].strMealThumb}" alt="">
    </div>
</div>
<div class="col-lg-8">
    <div class="p-2">
        <h2>instructions</h2>
        <p>${recipe[0].strInstructions}</p>
        <h3>Area : <span class="fw-bold">${recipe[0].strArea}</span></h3>
        <h3>Category : <span class="fw-bold">${recipe[0].strCategory}</span></h3>
        <h3>recipes :</h3>
        <div class="d-flex  flex-wrap reces">
          
        </div>
        <h3>Tags :</h3>
        <div class="d-flex  flex-wrap tags">
         
        </div>
        <div class="d-flex">
            <div class="btn btn-success mt-3 "><a class="text-decoration-none text-white" href="${recipe[0].strSource}" target='_blank'>Source</a></div>
            <div  class="btn btn-danger mt-3 ms-2"><a target='_blank' class="text-decoration-none text-white" href="${recipe[0].strYoutube}">Youtube</a></div>

        </div>


    </div>

</div>
    `   
    rows.innerHTML=trs; 
    recipesGlobal=recipeDetails
    showRece();
    showTags();
}

function showRece(){

   let reces=document.querySelector('.reces');
   let trs='';
   for(let i=0;i<recipesGlobal.length;i++){
    if(recipesGlobal[i]!=''&&recipesGlobal[i]!='null'){
    trs+=`
    <div class="rounded-3 p-2 m-2 rece">
    ${recipesGlobal[i]}
</div>


    `
   }
}
   reces.innerHTML=trs
}

function showTags(){
    
    let tags=document.querySelector('.tags');
    let trs='';
    
    for(let i=0;i<tagsGlobal.length;i++){
        if(tagsGlobal.length>0){
            
        if(tagsGlobal[i]){

            trs+=`
            <div class="rounded-3 text-danger p-2 m-2 tago ">
        ${tagsGlobal[i]}
        </div>
    
            `
        }
            
        }

}
    tags.innerHTML=trs;

}

searchPage.addEventListener('click',function(){
    searcho.classList.remove('d-none');
    searcho.classList.add('d-flex');
    rows.innerHTML='';
    searchByword.addEventListener('keyup',function(){
        getData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByword.value}`);
    })
    searchByLetter.addEventListener('keyup',function(){
        getData(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchByLetter.value}`);
    })


})

async function getCategories(){
    let response=await fetch('https://www.themealdb.com/api/json/v1/1/categories.php');
    let data=await response.json();
    list=data.categories;
    console.log(list);
    showCategories();
}

function showCategories(){
    searcho.classList.remove('d-flex');
    searcho.classList.add('d-none');
    let trs=''

    for(let i=0;i<list.length;i++){
    trs+=`
    <div class="col-lg-3">
                <div class=" position-relative text-center bogo">
                    <img class="" src="${list[i].strCategoryThumb}" alt="">
                    <div class="layer">

                        <h4 class="fs-1 px-2">${list[i].strCategory}</h4>
                        <p class='desc'>${list[i].strCategoryDescription}</p>

                    </div>
                </div>
                
            </div>
    `
    }
    rows.innerHTML=trs;
    let divs=document.querySelectorAll('.bogo');
    global=[...divs];
    console.log(global);
    console.log(list);
    for(let i=0;i<list.length;i++){
        global[i].addEventListener('click',function(){
            getData(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${list[i].strCategory}`)
        })

        
    }
    
 
}

async function getArea(){
    let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list');
    let data=await response.json();
    list=data.meals;
    console.log(list);
    showAreas();
}

function showAreas(){
    searcho.classList.remove('d-flex');
    searcho.classList.add('d-none');
    let trs=''

    for(let i=0;i<list.length;i++){
    trs+=`
    <div class="col-lg-3">
                <div class=" position-relative text-center bogo">
                <i class='fa-solid fa-house-laptop fa-4x'></i>
                   <p class='fs-3'>${list[i].strArea}</p>
                </div>
                
            </div>
    `
    }
    rows.innerHTML=trs;
    let divs=document.querySelectorAll('.bogo');
    global=[...divs];
    console.log(global);
    console.log(list);
    for(let i=0;i<list.length;i++){
        global[i].addEventListener('click',function(){
            getData(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${list[i].strArea}`)
        })

        
    }
    
 
}

async function getIngred(){
    let response=await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    let data=await response.json();
    list=data.meals;
    console.log(list);
    showIngred();
}

function showIngred(){
    searcho.classList.remove('d-flex');
    searcho.classList.add('d-none');
    let trs=''

    for(let i=0;i<24;i++){
    trs+=`
    <div class="col-lg-3">
                <div class=" position-relative text-center bogo">
                <i class='fa-solid fa-drumstick-bite fa-4x'></i>
                   <h3 class=''>${list[i].strIngredient}</h3>
                   <p class='ingredHeight'>${list[i].strDescription}</p>
                </div>
                
            </div>
    `
    }
    rows.innerHTML=trs;
    let divs=document.querySelectorAll('.bogo');
    global=[...divs];
    console.log(global);
    console.log(list);
    for(let i=0;i<24;i++){
        global[i].addEventListener('click',function(){
            getData(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${list[i].strIngredient}`)
        })

        
    }
    
 
}

function showContactUs(){ 

    rows.innerHTML=`
    <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
                    <div class="container w-75 text-center">
                        <div class="row g-4">
                            <div class="col-md-6">
                                <input id="nameInput"  type="text" class="form-control" placeholder="Enter Your Name">
                                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Special characters and numbers not allowed
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="emailInput" type="email" class="form-control " placeholder="Enter Your Email">
                                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Email not valid *exemple@yyy.zzz
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="phoneInput" type="text" class="form-control " placeholder="Enter Your Phone">
                                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid Phone Number
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input id="ageInput"  type="number" class="form-control " placeholder="Enter Your Age">
                                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid age
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input  id="passwordInput"  type="password" class="form-control " placeholder="Enter Your Password">
                                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                                </div>
                            </div>
                            <div class="col-md-6">
                                <input  id="repasswordInput" type="password" class="form-control " placeholder="Repassword">
                                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                                    Enter valid repassword 
                                </div>
                            </div>
                        </div>
                        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
                    </div>
                </div> 

    `

}


contactUs.addEventListener('click',function(){
    showContactUs();   
    let nameInput=document.getElementById('nameInput');
    let nameAlert=document.getElementById('nameAlert');
    let emailInput=document.getElementById('emailInput');
    let emailAlert=document.getElementById('emailAlert');
    let phoneInput=document.getElementById('phoneInput');
    let phoneAlert=document.getElementById('phoneAlert');
    let ageInput=document.getElementById('ageInput');
    let ageAlert=document.getElementById('ageAlert');
    let passwordInput=document.getElementById('passwordInput');
    let passwordAlert=document.getElementById('passwordAlert');
    let repasswordInput=document.getElementById('repasswordInput');
    let repasswordAlert=document.getElementById('repasswordAlert');
    let submitBtn=document.getElementById('submitBtn');
      nameInput.addEventListener('keyup',function(){
         validateInputs();
      })
      emailInput.addEventListener('keyup',function(){
         validateInputs();
          
      })
      phoneInput.addEventListener('keyup',function(){
         validateInputs();
      })
      ageInput.addEventListener('keyup',function(){
      validateInputs();
      })
      passwordInput.addEventListener('keyup',function(){
         validateInputs();
      })
      repasswordInput.addEventListener('keyup',function(){
         validateInputs();
      })
    
  function validateInputs(){
      let regexName=/^[a-zA-Z0-9](?:[a-zA-Z0-9.,'_ -]*[a-zA-Z0-9])?$/;
      let regexEmail=/^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$/;
      let regexPhone=/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
      let regexAge=/^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/;
      let regexPassword=/^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/;

      if(regexName.test(nameInput.value)){
          nameAlert.classList.add('d-none');
          nameAlert.classList.remove('d-block');
      }
      else{
          nameAlert.classList.add('d-block');
          nameAlert.classList.remove('d-none');
      }

      if(regexEmail.test(emailInput.value)){
          emailAlert.classList.add('d-none');
          emailAlert.classList.remove('d-block');
      }
      else{
          emailAlert.classList.add('d-block');
          emailAlert.classList.remove('d-none');
      }

      if(regexPhone.test(phoneInput.value)){
          phoneAlert.classList.add('d-none');
          phoneAlert.classList.remove('d-block');
          
      }
      else{
          phoneAlert.classList.add('d-block');
          phoneAlert.classList.remove('d-none');
      }

      if(regexAge.test(ageInput.value)){
          ageAlert.classList.add('d-none');
          ageAlert.classList.remove('d-block');
          
         
          
      }
      else{
          ageAlert.classList.add('d-block');
          ageAlert.classList.remove('d-none');
      }

      if(regexPassword.test(passwordInput.value)){
          passwordAlert.classList.add('d-none');
          passwordAlert.classList.remove('d-block');
          
         
          
      }
      else{
          passwordAlert.classList.add('d-block');
          passwordAlert.classList.remove('d-none');
      }

      if(repasswordInput.value==passwordInput.value){
          repasswordAlert.classList.add('d-none');
          repasswordAlert.classList.remove('d-block');
             
      }
      else{
          repasswordAlert.classList.add('d-block');
          repasswordAlert.classList.remove('d-none');
      }

      if(regexName.test(nameInput.value)&&regexEmail.test(emailInput.value)&&regexPhone.test(phoneInput.value)&&regexAge.test(ageInput.value)&&regexPassword.test(passwordInput.value)&&passwordInput.value==repasswordInput.value){
        console.log(true);
          submitBtn.removeAttribute('disabled')
      }

      else{
          submitBtn.setAttribute('disabled',true)
      }
  
      
  }
})




























