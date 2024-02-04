/**
 * File overview:
 * aggregatePlayers takes in JSON Data and returns aggregated player stats via:
 * Iterating through each player (`fetchStats`) =>
 * Filter through individual player stats for valid stats that match the season specified =>
 * Combines the array of stats that match the specified season into one object (`combineStats`)
 * Server-Side stat calculation via `calcStat` =>
 * Push data back into `playersWithStats` array
 * Feed data back to `tableData`
 */


import { calcStats } from "./calcStats.js";
async function aggregatePlayer(jsonData) {
  const playersWithStats = await aggregatePlayers(jsonData, 2013)

}

export async function fetchData() {
    const jsonData = fetch('data/export.json')
        .then(response => response.json())
        .then(data => {
            return data
        }
    )
    return jsonData
}

export async function aggregatePlayers(jsonData, currSzn){
    const playersWithStats = []
    for (const player of jsonData.players) {
        if (player.tid < 0) {
            continue
        }
        const playerStats = await fetchStats(player, currSzn)
        // Calcualte stats and aggregate to joined object
        const aggregatedStats = calcStats(playerStats);

        if (aggregatedStats === null) {
            continue
        }
        const joinedObject = {
            name: `${player.firstName} ${player.lastName}`,
            aggregatedStats
        };
        playersWithStats.push(joinedObject);
    }
    return playersWithStats
}

export async function fetchStats(playerObj, currentSzn) {
    const statsArr = playerObj.stats
    
    // ? Validation: Player has stats in the season specified
	if (!statsArr.length) {
		return null
    }
    const hasPlayed = (statObj) => {
		return !(statObj.gp === 0 && statObj.per === 0);

    }

    /**
    // ? Filter by season & non playoff stats
    // ? Filter will create an array of stats that match the specifications
    ```
    [
    { 
        season: 2013,
        gp: 82,
        pts: 123,
        etc
    },
    {
        season: 2013,
        etc..
    }
    ]
    ```
     */
    const filteredStats = statsArr.filter(
		(stats) =>
			stats.season === currentSzn &&
			stats.playoffs === false &&
			hasPlayed(stats) === true,
    )

    if (!filteredStats || filteredStats.length === 0) {
        return null
    }

    const combined = combineStats(filteredStats)
    return combined
}


/**
 * Combines provided array of stats objects into one
 * Only adds the `gp` and `gs` props of the stat objects
 */
function combineStats(arrOfStats) {
	const skipProps = new Set([
		'tid',
		'playoffs',
		'season',
		'yearsWithTeam',
		'jerseyNumber',
	])
	const onlyAddProps = new Set(['gp', 'gs'])
	return arrOfStats.reduce((combined, stat) => {
		for (const prop of Object.keys(stat)) {
			if (!skipProps.has(prop) && !prop.includes('Max')) {
				if (onlyAddProps.has(prop)) {
					combined[prop] = (combined[prop] || 0) + stat[prop]
                } else if (combined[prop] !== undefined) {
                    const rounded = ((combined[prop] + stat[prop]) / 2).toFixed(1)
					combined[prop] = rounded
				} else {
					combined[prop] = stat[prop]
				}
			}
		}
		return combined
	})
}
