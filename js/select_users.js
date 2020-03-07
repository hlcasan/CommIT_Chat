/* Handler for the display of names entered in the DB
	Uses the var itemRaw which comes json-encoded from the DB through select_names.php
*/

var select_users = function () {

	//This is the backend file connecting to the DB
	const php = "php/select_users.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//EXCLUDE CURRENT USER FROM LIST
	let formData = new FormData();
	formData.append("user_current",window.localStorage.getItem("user_current"));

	//Will contain the raw data from the DB
	let itemRaw = [];

	//Connect to the PHP
    xhr.open("POST", php, true);
    xhr.onreadystatechange = function() {
        //This is stuff to tell us what is going on
    	console.log('readyState: ' + xhr.readyState);
        console.log('status: ' + xhr.status);
        if (xhr.readyState == 4 && xhr.status == 200) {
            //Everything ok, get the names in JSON
            itemRaw = JSON.parse(xhr.responseText);
			//console.log(itemRaw); // print response

			//The HTML container for the list of names
			let container = document.getElementById('listContainer');
			//Clean up the html
			container.innerHTML = "";

			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every user found, one at a time
				console.log(c);

				/* BUILD YOUR OWN HTML FOR THE USERS LIST
				*  REMEMBER TO ASSIGN THE ID OF THE USER TO EACH ITEM
				*  SO WHEN YOU CLICK IT, THE USER IS SELECTED */

			}
        }
	};
	//xhr.send();
	//EXCLUDE CURRENT USER
	xhr.send(formData);
};
if (window.localStorage.getItem("user_current") == null) {
	window.location.href = "index.html";
}
else {
	select_users();
}
