let allFlights = [];

window.onload = function() 
{
    let btnFlights = document.querySelector("#btnShowFlights");
    let btnFilter = document.querySelector("#btnFilterResults");

    btnFlights.addEventListener("click", BuildTable);
    btnFilter.addEventListener("click", BuildFiltered);

    let url = 'flights.json';

    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function() 
    {
        if (xhr.readyState === XMLHttpRequest.DONE) 
        {
            if (xhr.status === 200) 
            {
                let response = xhr.responseText;
                let json = JSON.parse(response);
                allFlights = json.flights;
            } 
            else 
            {
                console.log(`Error: server sent status code ${xhr.status}`);
            }
        }
    };

    xhr.open("GET", url, true);
    xhr.send();
}

function BuildTable()
{
    let tblStr = "";

    tblStr = "<table>";
    tblStr += "<tr class='header'>";
    tblStr += "<th>Flight Number</th>";
    tblStr += "<th>Day</th>";
    tblStr += "<th>Time</th>";
    tblStr += "<th>Destination</th>";
    tblStr += "<th>Pilot</th>";
    tblStr += "<th>Co-Pilot</th>";
    tblStr += "</tr>";

    for (let i = 0; i < allFlights.length; i++) 
    {
        let dest = allFlights[i].destination.code + " (" + allFlights[i].destination.city
         + allFlights[i].destination.country + ") " + "Region = " + 
         allFlights[i].destination.region;

        let pilot = allFlights[i].pilot;
        let pilotInfo = "";
        if(pilot)
        {
            pilotInfo = allFlights[i].pilot.firstName + " " + allFlights[i].pilot.lastName;

            let pilotNick = allFlights[i].pilot.nickName;

            if(pilotNick)
            {
                pilotInfo += " (" + pilotNick + ")";
            }

        }
        else
        {
            pilotInfo = "Not yet assigned";
        }

        let coPilot = allFlights[i].copilot;
        let coInfo ="";
        if(coPilot)
        {
            coInfo = allFlights[i].copilot.firstName + " " + allFlights[i].copilot.lastName;
        }
        else
        {
            coInfo = "Not yet assigned"
        }

        tblStr += "<tr>";
        tblStr += "<td>" + allFlights[i].flightNumber + "</td>";
        tblStr += "<td>" + allFlights[i].dayOfWeek + "</td>";
        tblStr += "<td>" + allFlights[i].departureTime + "</td>";
        tblStr += "<td>" + dest + "</td>";
        tblStr += "<td>" + pilotInfo + "</td>";
        tblStr += "<td>" + coInfo + "</td>";
        tblStr += "</tr>";
    }
                    
    tblStr += "</table>";
                
    let tableContainer = document.querySelector("#TableContainer");
    tableContainer.innerHTML = tblStr;

    let flightCount = document.querySelector("#flightCount");
    flightCount.innerHTML = "Flights (" + allFlights.length + ")";
}

function BuildFiltered()
{

}
