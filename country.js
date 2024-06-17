const countryName = new URLSearchParams(location.search).get('name');
const flagImage = document.querySelector('.country-details img')
const countryNameNew=document.querySelector('h1')
const nativeName=document.querySelector('.native-name')
const totalPeople=document.querySelector('.population')
const region=document.querySelector('.region')
const subregion=document.querySelector('.sub-region')
const capital=document.querySelector('.capital')
const tld=document.querySelector('.top-level-domain')
const currency=document.querySelector('.currencies')
const languages=document.querySelector('.languages')
const borders=document.querySelector('.border-countries')
const darkTheme=document.querySelector('.mode')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
    .then((res) => res.json())
    .then(([country] )=> {
        console.log( country);
      flagImage.src=  country.flags.svg
      countryNameNew.innerHTML=country.name.common
      
      if(country.name.nativeName){
          nativeName.innerHTML=Object.values(country.name.nativeName)[0].common
        }else{
            nativeName.innerHTML=`None`
        }
      
        totalPeople.innerHTML= country.population.toLocaleString('en-IN')

        if(country.region){
            region.innerHTML=country.region
        }
        if(country.subregion){
            subregion.innerHTML=country.subregion
        }
        tld.innerHTML=country.tld
        if (country.capital) {
            capital.innerText = country.capital?.[0]
          }

        if(country.currencies){
        currency.innerHTML=Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(', ')
        }

        if(country.languages){
            languages.innerHTML=Object.values(country.languages).join(', ')
        }

        if(country.borders){
            
            country.borders.forEach(border => {
                fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then((res)=>res.json())
                .then(([borderCountry])=>{
                    console.log(borderCountry);
                    const tag=document.createElement('a')
                    tag.innerText=borderCountry.name.common
                    tag.href=`country.html?name=${borderCountry.name.common}`
                    borders.append(tag)
                    
                })
            });
            
        }
    });

/* darkTheme.addEventListener('click',(e)=>{
    document.body.classList.toggle('darkTheme')
}) */

darkTheme.addEventListener('click',()=>{
    document.body.classList.toggle('darkTheme')
    if (document.body.classList.contains('darkTheme')) {
        localStorage.setItem('theme', 'dark');
      } else {
        localStorage.setItem('theme', 'light');
      }
})
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('darkTheme');
    }
  });
   