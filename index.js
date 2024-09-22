const weatherform=document.querySelector(".weatherform");
const cityInput=document.querySelector(".cityInput");
const card=document.querySelector(".card");
const apikey="57ef0be5b4c0f75fb831dc33218b9bdc";
weatherform.addEventListener("submit",async e=>{
e.preventDefault();
const city=cityInput.value;
if(city){
try {
    const weatherdata=await getweatherdata(city);
    displayweather(weatherdata)
} catch (error) {
    console.log(error);
    displayerr(error)
}
}
else{
    displayerr("Please enter a city")
}
});
async function getweatherdata(city) {
  const apiurl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}` ;
  const response=await fetch(apiurl) 
//   console.log(response);
  if(!response.ok){
    throw new Error("could not fetch")
  }
  return await response.json();
}
function displayweather(data) {
    // console.log(data);
    const {name:city,
        main:{temp,humidity,pressure},
        weather:[{description,id}]}=data
        card.textContent="";
        card.style.display="flex";

        const citydisplay=document.createElement("h1");
        citydisplay.textContent=city;
        citydisplay.classList.add("citydisplay")
        card.appendChild(citydisplay)

        const tempdisplay=document.createElement("p");
        tempdisplay.textContent=`${(temp - 273.15).toFixed(1)}°C`;
        tempdisplay.classList.add("tempdisplay")
        card.appendChild(tempdisplay)

        const weatheremoji=document.createElement("p");
        weatheremoji.textContent=getweatheremoji(id);
        weatheremoji.classList.add("weatheremoji")
        card.appendChild(weatheremoji)

        const descdisplay=document.createElement("p");
        descdisplay.textContent=description;
        descdisplay.classList.add("descdisplay")
        card.appendChild(descdisplay);

        const humiditypressurecontainer = document.createElement("div"); 
        humiditypressurecontainer.classList.add("humidity-pressure-container"); 
        
        const humid = document.createElement("p");
        humid.classList.add("humid");
        humid.textContent = `💧 Humidity : ${humidity}%`;
        humiditypressurecontainer.appendChild(humid);
        
        const pressures = document.createElement("p");
        pressures.classList.add("pressuredisplay");
        pressures.textContent = `🌬️ Pressure : ${pressure} hPa`;
        humiditypressurecontainer.appendChild(pressures);
        
        card.appendChild(humiditypressurecontainer); 
        

       
}
function getweatheremoji(weatherid) {
    switch (true) {
        case (weatherid>=200 && weatherid<300):
            return "⛈️";
            
            case (weatherid>=700 && weatherid<800):
                return "🌫️";
            
            case (weatherid>=300 && weatherid<400):
                return "🌧️";
                
                case (weatherid>=500 && weatherid<600):
                    return "☔";
                    
                case (weatherid>=600 && weatherid<700):
                    return "❄️☃️";
                    
                    case (weatherid>=801 && weatherid<900):
                        return "☁️";
                    
                    case (weatherid>=500 && weatherid<600):
                        return "☔";
                    
                        case (weatherid=800):
                    return "☀️";
                    
        default:
            return "☀️";
    }
}
function displayerr(msg) {
    const errordisplay=document.createElement("p");
    errordisplay.textContent=msg;
    errordisplay.classList.add("errordisplay")

    card.textContent="";
    card.style.display="flex";
    card.appendChild(errordisplay)
}