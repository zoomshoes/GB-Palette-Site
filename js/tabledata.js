document.addEventListener('DOMContentLoaded', function() {
    fetch('data/data.json')
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#statdata tbody");
            data.stats.forEach(f => {
                const tableRow = document.createElement("tr");

                tableRow.innerHTML = `
                    <td>${f.Name}</td>
                    <td>${f.PTS}</td>
                    <td>${f.REB}</td>
                    <td>${f.AST}</td>
                    <td>${f.FGM}</td>
                    <td>${f.FGA}</td>
                    <td>${(f.FGP * 100).toFixed(1)}</td>
                    <td>${(f.TSP * 100).toFixed(1)}</td>
                `;

                tableBody.appendChild(tableRow);
            });
        })
        .catch(error => console.error('Error:', error));
});
