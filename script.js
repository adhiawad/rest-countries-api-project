const newCard=document.querySelector('.countries-info')
const filter=document.querySelector('.filter')
const input=document.querySelector('.input')
const theme=document.querySelector('.theme')
const themeText = document.getElementById('theme-text');

let allCountriesData

fetch('https://restcountries.com/v3.1/all').then((res)=>res.json())
.then((data)=>{
    renderCountries(data)
    allCountriesData=data
})

filter.addEventListener('change',(e)=>{
    fetch(`https://restcountries.com/v3.1/region/${e.target.value}`).then((res)=>res.json())
    .then(renderCountries)})

function renderCountries(data){
       
    newCard.innerHTML=''
        data.forEach((country) => {
               
            const countriesInfo= document.createElement('a')
            countriesInfo.href=`country.html?name=${country.name.common}`
            countriesInfo.classList.add('countries-card')
            const countryCardInfo =`<img src="${country.flags.svg}"alt="countryFlag">
                            <div class="card-text">
                                <h3 class="card-title">${country.name.common}</h3>
                                <p><b>Population : </b>${country.population.toLocaleString('en-IN')}</p>
                                <p><b>Region : </b>${country.region}</p>
                                <p><b>Capital : </b>${country.capital|| " "}</p>
                            </div>`
            
            countriesInfo.innerHTML=countryCardInfo
            newCard.append(countriesInfo)
        });
    }


input.addEventListener('input',(e)=>{
   const filteredCountries= allCountriesData.filter((country)=> (country.name.common.toLowerCase()).includes(e.target.value.toLowerCase()))
   renderCountries(filteredCountries)
})

theme.addEventListener('click',()=>{
    document.body.classList.toggle('dark')
    if (document.body.classList.contains('dark')) {
        localStorage.setItem('theme', 'dark');
       
      } else {
        localStorage.setItem('theme', 'light');
        
      }
})
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark');
      
    } 
  });




