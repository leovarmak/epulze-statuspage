

$(document).ready(function(){

	var presenttime = new Date();
	presenttime.getMonth();
	$(".current-time").append(presenttime);

	getStats(); //Executes the function to get stats from the steam gauge API
	
	setInterval(function(){ // This functions automatically 
		getStats();			// sends a GET request every 60 seconds
		}, 50000);
		
	function blinker() {
			$("#blink").removeClass("status-bubble status-up light blink");
			$("#blink").addClass("status-bubble status-down light blink");
			$("#title").empty();
			$("#title").append("Some services are offline.");
			
		}

	function getStats() { 
	
		$.getJSON( "https://updown.io/api/checks/ak3i?api-key=pnavjcju48ceily98fny", function( data ){
				console.log(data.down)
					if (data.down == true) {
						// Turn the Epulze Website into red
						blinker();
						$("#1").css("background-color", "#FA6D46");
						$("#epulzeweb").empty();
						$("#epulzeweb").append("Offline");	
					}
		});
		$.getJSON( "https://api.coinmarketcap.com/v1/ticker/bitcoin", function( data ){
				console.log(data.down);
		});
		
		$.getJSON( "https://updown.io/api/checks/iqi4?api-key=pnavjcju48ceily98fny", function( data ){
				console.log(data.last_status)
					if (data.last_status != 403) { 
						//We receive 403 since we are not authenticated. But incase if the
						//if the API is really down then the status should change to 500.
						//So the API's last status should eventually change. Purely hypothetical
						// Turn the Epulze Website into red
						blinker();
						$("#2").css("background-color", "#FA6D46");
						$("#epulzeapi").empty();
						$("#epulzeapi").append("Offline");
					}
		});
		
		$.getJSON( "https://steamgaug.es/api/v2", function( data ){
				console.log(data.ISteamUser.online)
					if (data.ISteamUser.online != 1) {
						//Turn Steam API into red
						blinker();
						$("#3").css("background-color", "#FA6D46");
						$("#steamapi").empty();
						$("#steamapi").append("Offline");
					}
		});
		
		$.getJSON( "https://steamgaug.es/api/v2", function( data ){
				console.log(data.ISteamGameCoordinator[570].online)
					if (data.ISteamGameCoordinator[570].online != 1) {
						//Turn Dota 2 Game Coordinator into red
						blinker();
						$("#4").css("background-color", "#FA6D46");
						$("#dotagc").empty();
						$("#dotagc").append("Offline");
					}
		});
		
		$.getJSON( "https://steamgaug.es/api/v2", function( data ){
				console.log(data.IEconItems[570].online)
					if (data.IEconItems[570].online != 1) {
						//Turn Dota 2 API into red
						blinker();
						$("#5").css("background-color", "#FA6D46");
						$("#dotaapi").empty();
						$("#dotaapi").append("Offline");
					}
		});

	}
	
});
