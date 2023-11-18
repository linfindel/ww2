function setFilter(filter, value) {
    localStorage.setItem(filter, value);

    if (value == "on") {
        document.getElementById(filter).onclick = () => {
            setFilter(filter, "off");
        };

        document.getElementById(filter).classList.add("card");
        document.getElementById(filter).classList.add("interactive");
        document.getElementById(filter).classList.remove("card-subtle");
    }
    
    else {
        document.getElementById(filter).onclick = () => {
            setFilter(filter, "on");
        };

        document.getElementById(filter).classList.remove("card");
        document.getElementById(filter).classList.remove("interactive");
        document.getElementById(filter).classList.add("card-subtle");
    }

    fetchSettings();
}

function getFilter(filter) {
    return localStorage.getItem(filter);
}

function enableAll() {
    fetch("items.json")
    .then(respone => respone.json())
    .then(data => {
        data.forEach(item => {
            setFilter(item, "on");
        })
    })
}

function fetchSettings() {
    fetch('items.json')
    .then(response => response.json())
    .then(data => {
        var on = 0;
        var off = 0;

        data.forEach(item => {
            if (getFilter(item) == "off") {
                off++;

                document.getElementById(item).onclick = () => {
                    setFilter(item, "on");
                }

                document.getElementById(item).classList.remove("card");
                document.getElementById(item).classList.remove("interactive");
                document.getElementById(item).classList.add("card-subtle");
            }

            else {
                on++;
            }
        });

        console.log("On:", on);
        console.log("Off:", off);

        if (off == 0) {
            document.getElementById("enable-all").inert = true;
            document.getElementById("enable-all").className = "button-subtle";
        }

        else {
            document.getElementById("enable-all").inert = false;
            document.getElementById("enable-all").className = "";
        }
    })
    .catch(
        error => console.error('Error:', error)
    );
}

fetchSettings();