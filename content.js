const urlParams = new URLSearchParams(location.search);
var name = urlParams.get("name");

document.getElementById("name").innerText = name;