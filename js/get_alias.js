/* This function lets you get the alias of a user from their id and dump it in an element
*/

var get_alias = function (id,e) {
//Here id is the id of the user you want to get
// and e is the id of the HTML you want to put the alias in

	//This is the backend file connecting to the DB
	const php = "php/get_alias.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	let formData = new FormData();
	formData.append("id",id);

	//Will contain the raw data from the DB
	let itemRaw = [];

	//Connect to the PHP
	xhr.open("POST", php, true);
	xhr.onreadystatechange = function() {
		//This is stuff to tell us what is going on
		console.log('readyState: ' + xhr.readyState);
		console.log('status: ' + xhr.status);
		if (xhr.readyState == 4 && xhr.status == 200) {
			//Everything ok, get the alias in JSON
			itemRaw = JSON.parse(xhr.responseText);

			document.getElementById(e).innerHTML = itemRaw[0].alias;
		}
	};
	xhr.send(formData);
};
