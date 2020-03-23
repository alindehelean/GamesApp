var apiURL = "https://games-world.herokuapp.com"; // heroku blocu . games world ii etaju . ce ii dupa com is camere in bloc
                    // dupa fiecare  / devine mai specific

    fetch(apiURL + "/games", {
        method: "GET",
        headers: {
            "Content-Type":"application/x-www-form-urlencoded"
        }
    }).then(function(response){
        return response.json();
    }).then(function(jsonResponse){
        console.log("the response  ", jsonResponse );
    });


