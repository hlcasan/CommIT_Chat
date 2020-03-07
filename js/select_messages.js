/* Handler for the display of names entered in the DB
	Uses the var itemRaw which comes json-encoded from the DB through select_names.php
*/

var select_messages = function () {

	//This is the backend file connecting to the DB
	const php = "php/select_messages.php";

	//Handles the server call to the PHP file and the data we get back
	const xhr = new XMLHttpRequest();

	//Send the users for the conversation to the PHP
	let formData = new FormData();
	formData.append("user_current",window.localStorage.getItem("user_current"));
	formData.append("user_partner",window.localStorage.getItem("user_partner"));

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
			let container = document.getElementById('messagesContainer');
			//Clean up the html
			container.innerHTML = "";

			//Dump items in the DOM
			for (let c in itemRaw) {
				//c contains every user found, one at a time
				console.log(c);

				//Container div for each person
				let messageDIV = document.createElement('div');
				let messageContent = document.createElement('p');
				let messageDetails = document.createElement('p');

				if (itemRaw[c].from_user == window.localStorage.getItem("user_current")) {
					messageDIV.classList.add("from");
				}

				//Setup links for each user
				messageContent.innerHTML = itemRaw[c].content;
				messageDetails.innerHTML = itemRaw[c].timestamp;

				//Dump the message in the container
				messageDIV.appendChild(messageContent);
				messageDIV.appendChild(messageDetails);
				container.appendChild(messageDIV);

			}
        }
	};
	//xhr.send();
	xhr.send(formData);
};
if (window.localStorage.getItem("user_current") == null) {
	window.location.href = "index.html";
}
else if (window.localStorage.getItem("user_partner") == null) {
	window.location.href = "list.html";
}
else {
	select_messages();
}
