function pick(obj, keys) {
    return keys.reduce((acc, key) => {
        if (obj.hasOwnProperty(key)) {
            acc[key] = obj[key];
        }
        return acc;
    }, {});
}

function round(number) {
	return number.toFixed(1)
}


export function calcStats(stats) {
	if (stats === null | stats?.length === 0) {
		return null
	}
	const fgPercent =
		round((stats.fg / stats.fga) * 100) || 0
	const tpPercent =
		round((stats.tp / stats.tpa) * 100) || 0
	const ftPercent =
		round((stats.ft / stats.fta) * 100) || 0
	const avgMin = stats?.min ? round(stats.min / stats.gp) : 0
	const avgTrb =
		round((Number(stats.orb) + Number(stats.drb)) / Number(stats.gp)) || 0
	const avgAst = round(stats.ast / stats.gp) || 0
	const avgStl = round(stats.stl / stats.gp) || 0
	const avgBlk = round(stats.blk / stats.gp) || 0
	const avgTov = round(stats.tov / stats.gp) || 0
	const avgPf = round(stats.pf / stats.gp) || 0
	const avgPts = round(stats.pts / stats.gp) || 0
	const tsPercent = calculateTSPercent(stats)
	const eFG =
		round(
			(stats.fg + 0.5 * stats.tp) / stats.fga,
			3,
		) || 0
	const eFGPercent = round(eFG * 100, 1) || 0
	const per = stats?.per || 0
	// # create equation for 3 Point Attempt Rate: 3PAr = 3PA / FGA
	const threePointAttemptRate =
		stats?.tpa && stats?.fga ? (stats.tpa / stats.fga) * 100 : 0
	// # create equation for Free Throws Per Field Goal Attempt: FT/FGA = FTA / FGA
	const ftPerFga = stats?.fta && stats?.fga ? (stats.fta / stats.fga) * 100 : 0
	// # equation for BPM: BPM = OBPM + DBPM
	const bpm = stats?.obpm && stats?.dbpm ? stats.obpm + stats.dbpm : 0
	const aggregatedStatFull = {
		...stats,
		fgPercent,
		tpPercent,
		ftPercent,
		avgMin,
		avgTrb,
		avgAst,
		avgPts,
		tsp: tsPercent,
		efg: eFG,
		efgp: eFGPercent,
		per,
		tpar: threePointAttemptRate,
		ftperfg: ftPerFga,
		bpm,
		ogObj: stats,
	}
	return aggregatedStatFull
}


function calculateTSPercent(stats) {
	const { pts, fga, fta } = stats
	return Number(pts) && Number(fga) && Number(fta) ? (Number(pts) / (2 * (Number(fga) + 0.44 * fta))) * 100 : 0
}
