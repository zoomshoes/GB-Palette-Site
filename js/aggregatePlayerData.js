function aggregatePlayer (statsArray) {
        return _.filter(statsArray, function (stat) { 
          if (stat.season === 2000) {
            return stat
            }
        }
    )
}

function fetchData () {
    fetch('data/export.json')
        .then(response => response.json())
        .then(data => {
            
        }
    )
}