console.log("Fire on Sidepanel open?")

chrome.runtime.onMessage.addListener(({ first, last }) => {
    if (first) {
        console.log(first);
        console.log(last.toLowerCase());
        var first = first;
        var last = last;

        document.getElementById("app").innerHTML = first;
        document.getElementById("footer").innerHTML = last;
    }

   
});



