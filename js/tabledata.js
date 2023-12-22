import { aggregatePlayers, fetchData } from "./aggregatePlayerData.js";

document.addEventListener('DOMContentLoaded', async function() {
        const jsonData = await fetchData() // Fetch JSON data
        const statData = await aggregatePlayers(jsonData, 2013) // Feed data to get player stats for specified season 
            const tableBody = document.querySelector("#statdata tbody");
            statData.forEach(f => { // Iterate through stats of players
                const tableRow = document.createElement("tr");
                const name = f.name
                const statsObj = f.aggregatedStats
                // Stats defined in `calcStats.js
                tableRow.innerHTML = `
                    <td>${name}</td>
                    <td>${statsObj.pts}</td>
                    <td>${statsObj.avgTrb}</td>
                    <td>${statsObj.avgAst}</td>
                    <td>${statsObj.fg}</td>
                    <td>${statsObj.fga}</td>
                    <td>${statsObj.fgPercent}</td>
                    <td>${statsObj.tsp}</td>
                `;
                tableBody.appendChild(tableRow);
            });
})