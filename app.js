window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDegree=document.querySelector('.degree');
    let temperatureDescription=document.querySelector('.description');
    let locationTimezone=document.querySelector('.timezone');
    let degreeSection=document.querySelector('.degree-section');
    let degree=document.querySelector('.degree-section span')

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position=>{
            long = position.coords.longitude;
            lat=position.coords.latitude;
            
            // const proxy="http://cors-anywhere.herokuapp.com/corsdemo";
            const api=`https://api.weatherapi.com/v1/current.json?key=84154940c093448284264657211111&q=${lat},${long}`;

            

            fetch(api)
                .then(response =>{
                    return response.json();
                })
                .then(data => {
                    const {temp_c, temp_f,}=data.current;
                    const{text,icon}= data.current.condition;
                    temperatureDegree.textContent=temp_c;
                    locationTimezone.textContent=data.location.name;
                    temperatureDescription.textContent=text;

                    setIcon(icon);

                    degreeSection.addEventListener('click', ()=>{
                        if(degree.textContent === "°C"){
                            temperatureDegree.textContent=temp_f;
                            degree.textContent="°F";
                        } else{
                            temperatureDegree.textContent=temp_c;
                            degree.textContent="°C";
                        }
                    })
                });
            
            function setIcon(icon_link){
                let img=document.createElement('img');
                let link=icon_link.substring(21);
                img.src=link;
                document.querySelector('.icon').appendChild(img);
            }
        });

        

    }
});

//cdn.weatherapi.com/weather/64x64/day/143.png
// http://api.weatherapi.com/v1/current.json?key=84154940c093448284264657211111&q=$london