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
             gameElements += "<h1>"+ arrayOfGames[i].title +"</h1>" + // gEl += gEl + h1 ...
                                "<img src='" + arrayOfGames[i].imageUrl + "' />" +
                                "<p>" + arrayOfGames[i].description + "</p>" +
                                "<button class='delete-btn' "+
                                    " onclick=\"deleteGame('" + arrayOfGames[i]._id + "')\">Delete</button>";
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
