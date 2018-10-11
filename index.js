const axios = require('axios');

axios.get('http://www.espncricinfo.com/ci/engine/match/1157752.json')
	.then( response => {
		let teams = response.data.team;
		
		let tdata = [
			{
				name: teams[0].team_name,
				id: teams[0].country_id,
				score: ["", ""],
				counter: 0,
			},
			{
				name: teams[1].team_name,
				id: teams[1].country_id,
				score: ["", ""],
				counter: 0,
			}
		]

		let innings = response.data.innings;
	
		for (let i in innings) {
			inning = innings[i];
			let score = inning.runs;

			if (inning.batting_team_id == (tdata[0].id)) {
				tdata[0].score[tdata[0].counter] += score;
				tdata[0].counter += 1;
			}
			else if (inning.batting_team_id == (tdata[1].id)) {
				tdata[1].score[tdata[1].counter] += score;
				tdata[1].counter += 1;
			}
			else {
				console.log('Error: team IDs don\'t match');
			}
		}
		
		for (team in tdata) {
			console.log('Team name: ' + tdata[team].name);
			console.log('Score in:')
			if (tdata[team].score[0] != '') {
				console.log('\tFirst Innings: ' + tdata[team].score[0]);
			}
			if (tdata[team].score[1] != '') {
				console.log('\tSecond Innings: ' + tdata[team].score[1]);
			}
		}
		
	})
	.catch( error => {
		console.log(error);
	});
