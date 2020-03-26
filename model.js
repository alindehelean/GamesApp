var apiURL = "https://games-world.herokuapp.com"; // heroku blocu . games world ii etaju . ce ii dupa com is camere in bloc
                    // dupa fiecare  / devine mai specific

    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.json();
    }).then(function(arrayOfGames){ // jsoneresponse ii aray
        //console.log("the response  ", arrayOfGames );

       var container = document.querySelector('.container'); 

        // for(var i=0; i < arrayOfGames.length; i++){
        //     //console.log(arrayOfGames[i]);

        // const h1 = document.createElement("h1");
        // const p = document.createElement("p");
        // const img = document.createElement("img");

        // h1.innerHTML = arrayOfGames[i].title;
        // p.innerHTML = arrayOfGames[i].description;

        // img.setAttribute("scr", arrayOfGames[i].imageUrl);

        // container.appendChild(h1);
        // container.appendChild(img);
        // container.appendChild(p);

        // arrayOfGames[i].title
        // arrayOfGames[i].description
        // arrayOfGames[i].imageUrl

        let gameElements = "";

        for(var i=0; i < arrayOfGames.length; i++){
            //  gameElements += "<h1>"+ arrayOfGames[i].title +"</h1>" + // gEl += gEl + h1 ...
            //                     "<img src='" + arrayOfGames[i].imageUrl + "' />" +
            //                     "<p>" + arrayOfGames[i].description + "</p>" +
            //                     "<button class='delete-btn' "+
            //                         " onclick=\"deleteGame('" + arrayOfGames[i]._id + "')\">Delete</button>";
        
            // acelasi cod se poate scrie asa :

        gameElements += `<h1>${arrayOfGames[i].title}</h1> 
        <img src="${arrayOfGames[i].imageUrl}" />
        <p>${arrayOfGames[i].description}</p> 
        <button class="delete-btn" onclick="deleteGame('${arrayOfGames[i]._id}')">Delete</button>`;

        }
        container.innerHTML= gameElements;
    });

    function deleteGame(gameID){

        fetch(apiURL + "/games/" + gameID,{
            method: "DELETE"
        }).then(function(r){
            return r.text();
        }).then(function(apiresponse){
            console.log(apiresponse)
        });    

    
    }

    document.querySelector('.submit-Btn').addEventListener("click", function(event){
        event.preventDefault();

        const gameTitle = document.getElementById("gameTitle");
        const gameDescription = document.getElementById("gameDescription");
        const gameGenre = document.getElementById("gameGenre");
        const gamePublisher = document.getElementById("gamePublisher");
        const gameImageUrl = document.getElementById("gameImageUrl");
        const gameRelease = document.getElementById("gameRelease");

        
            validateFormElement(gameTitle, "The title is required");
            validateFormElement(gameGenre, "The genre is required");
            validateFormElement(gameImageUrl, "The image URL is required");
            validateFormElement(gameRelease, "The release date is required");

            validateReleaseTimeStampElement(gameRelease, "The release date is required");
       

        if(gameTitle.value !== "" && gameGenre.value !== "" && gameImageUrl.value !== "" && gameRelease.value === ""){
            const requestParams = {
                title: gameTitle.value,
                releaseDate: gameRelease.value,
                genre: gameGenre.value,
                publisher: gamePublisher.value,
                imageURL : gameImageUrl.value,
                description: gameDescription.value
    };
    createGameRequest(requestParams);
}

});

    function validateFormElement(inputElement, errorMessage){
        if(inputElement.value === ""){
            if(!document.querySelector('[rel="'+inputElement.id+'"]')){
                buildErrorMessage(inputElement, errorMessage);

            }
        } else {
            if(document.querySelector('[rel="'+inputElement.id+'"]')){
                console.log("The error is erased!");
                document.querySelector('[rel="'+inputElement.id+'"]').remove();
                inputElement.classList.remove("inputError");
            }
        }
    };

    function validateReleaseTimeStampElement(inputElement, errorMessage){
        if(isNaN(inputElement.value) && inputElement.value !== ""){
            buildErrorMessage(inputElement, errorMessage);

        }
    }

    function buildErrorMessage(inputEl, errorMsg){
            inputEl.classList.add("inputError");
            const errorMsgElement = document.createElement("span");
            errorMsgElement.setAttribute("rel", inputEl.id);
            errorMsgElement.classList.add("errorMsg");
            errorMsgElement.innerHTML = errorMsg;
            inputEl.after(errorMsgElement);

    }
    

    function createGameRequest(gameObject){
        fetch(apiURL + "/games", {
            method:"POST",
            headers: {
                "Content-Type":"application/x-www-form-urlencoded"
            },
            body: JSON.stringify(gameObject)
        });
    };


