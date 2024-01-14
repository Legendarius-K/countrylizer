$(() => {

const countryURL = "https://restcountries.com/v3.1/name/";
const imageURL = "https://api.unsplash.com/search/photos?page=1&query="
const image_KEY = "&client_id=ozWfLK5sNU3wz4H1jJj3wwsWIg7iuPzEXAFS1mgcgsc"
const countryArea = $(".country-area");

const getCountry = async url => {
    
    try {
        let response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`Sorry, something went wrong: ${error}`)
        }

        let data = await response.json();
        renderFacts(data);
        renderArms(data);
        console.log(data);
        
    } catch(error) {
        countryArea.append("Oopsie-doodle-doo! An error occured!")
    }    
}

const getImage = async url => {
    try {
        let response = await fetch(url);

        if (!response.ok) {
            throw new Error(`Oh nooez! An error occured fetching the image. You'll have to imagine what the country looks like. ${error}`)
        } 

        let data2 = await response.json();
        renderImage(data2)
        console.log(data2);
        
    } catch(error) {
        countryArea.append("Oh nooez! An error occured fetching the image. You'll have to imagine what the country looks like.")
    }
}

const renderImage = data2 => {
    countryArea.append(
        `
        <div class="image-area">
            <image class="country-image" src="${data2.results[0].urls.regular}"
        </div>
        `
    )
} 

const renderFacts = data => {

    countryArea.append(
        `
        <div class="facts-area">
            <p>Capital: ${data[0].capital}</p>
            <p>Population: ${data[0].population} </p>
            <p class="borders">Borders: </p>
            <p>Continent: ${data[0].continents} </p>
            <p class="flag-container">${data[0].flag}</p>
        </div>
        `
    )
       
    data[0].borders.map(country => {
        $(".borders").append(`${country}, `)
    })
}

const renderArms = data => {
    
    if (data[0].coatOfArms) {
        countryArea.append(
            `
            <div class="arms-area">
                <img class="arms" src="${data[0].coatOfArms.png}"    
            </div>
            `
        )
    } else {
        countryArea.append(
            `
            <div class="arms-area">
                <p>Sorry, this country doesn't seem to have a coat of arms</p>    
            </div>
            `
        )
    }
}


$("button").on("click", () => {
    countryArea.empty();
    let userCountry = $("input").val();
    getCountry(countryURL + userCountry);
    getImage(imageURL + userCountry + image_KEY)

    if (userCountry === "italy" || userCountry === "Italy") {
        countryArea.append(
            `
            <p>BOUNGIORNO DAVIDE BALDI! 🤌 </p>
            `
        )
    }

    if (userCountry === "australia" || userCountry === "Australia")  {
        countryArea.append(
            `
            <p>I knew it Rob! You cheeky aussie!</p>
            `
        )
    }
})

});


















// const renderMap = data => {

//     const mapOptions = {
//         center: { lat: -33.860664, lng: 151.208138 },
//         zoom: 14
//       };

//     countryArea.append(
//         `
//         <div class="map-area">
//             <div class="map"></div>
//             <script async defer src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"></script>
//         </div>
//         `        
//     )
// }

// const getMap = (data) => {
//     countryArea.append(
//         `
//         <div class="map"></div>
//         <script>
//             function initMap() {
//                 let countryMap = {lat: ${data[0].latlng[0]}, lng: ${data[0].latlng[1]}};
//                 let map = new google.maps.Map(
//                     document.querySelectior(".map"), {zoom: 2, center: countryMap}
//                 ); 
//                 let marker = new google.maps.Marker({position: countryMap, map: map})
//             }    
//         </script>
//         <script async defer src"${googleMapsAPI}">
        
//         `
//     )
// }

// const getMap = async url => {
   

//     try {
//         let response = await fetch(url);

//         if (!response.ok) {
//             throw new Error(`Sorry, something went wrong: ${error}`)
//         }

//         let data2 = await response.json();
//         console.log(data2);
//     } catch(error) {
//         countryArea.append(`Oopsie-doodle-doo! An error occured! ${error}`)
//     }    
// }

// const renderMap = data => {

    // let countryMap = {lat: data[0].latlng[0], lng: data[0].latlng[1]};
    // let map = new google.maps.Map(
    //     $(".map"), {zoom: 2, center: countryMap}
    // ); 

//     countryArea.append(
//         `
//         <div class="map"></div>

//         `
//     )
// }