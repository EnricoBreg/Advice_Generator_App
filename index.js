document.addEventListener("DOMContentLoaded", getRandomAdvice);
document.querySelector("#dice").addEventListener("click", getRandomAdvice);

// Get random Advice using XMLHttpRequest
/* function getRandomAdvice() {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "https://api.adviceslip.com/advice", true);

    xhr.onload = function() {
        if(this.status === 200) {
            // Parse the response
            let adv = JSON.parse(this.responseText)["slip"];
            // Change the DOM
            // Change advice id
            document.querySelector("#advice-id").innerHTML = `Advice #${adv.id}`;
            // Change advice quote
            document.querySelector("#advice-quote").innerHTML = adv.advice;
        } else if(this.status >= 400) {
            alert("Something went wrong, try again");
        }
    }
    xhr.send();
} */

// Get random Advice using Fetch API
function getRandomAdvice() {
    fetch("https://api.adviceslip.com/advice", {
        method: "GET"
    })
    .then((res) => res.json()) // parse the response
    .then((data) => {
        let adv = data["slip"];
        // Change the DOM
        // Change advice id
        document.querySelector("#advice-id").innerHTML = `Advice #${adv.id}`;
        // Change advice quote
        document.querySelector("#advice-quote").innerHTML = adv.advice;
    })
    .catch((err) => { // Handling error
        let msg = `Something went wrong. Please try again. (Server Error: ${err})`;
        console.log(msg);
    });

    // Disable the dice button for 2 seconds, the server within 2 seconds
    // sends always the same advice (read Documentation)
    disableDiceButton();
}

function disableDiceButton() {
    let btn = document.querySelector("#dice");
    btn.disabled = true;
    setTimeout(function() {
        btn.disabled = false;
    }, 2000);
}