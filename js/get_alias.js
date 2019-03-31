/* This function lets you get the alias of a user from their id and dump it in an element
*/

var get_alias = function (id,e) {

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
            //Everything ok, get the names in JSON
            itemRaw = JSON.parse(xhr.responseText);
			//console.log(itemRaw); // print response

			document.getElementById(e).innerHTML = itemRaw[0].alias;
        }
	};
	xhr.send(formData);
};
