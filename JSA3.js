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
        tblStr += "<tr>";
        tblStr += "<td>" + allFlights[i].flightNumber + "</td>";
        tblStr += "<td>" + allFlights[i].dayOfWeek + "</td>";
        tblStr += "<td>" + allFlights[i].departureTime + "</td>";
        tblStr += "<td>" + allFlights[i].destination.city + ", " + allFlights[i].destination.country + "</td>";
        tblStr += "<td>" + allFlights[i].pilot + "</td>";
        tblStr += "<td>" + allFlights[i].coPilot + "</td>";
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
