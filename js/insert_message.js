/* Handler to add a new message
*/


var insert_message = function() {
    //The form in the HTML
    const addForm = document.getElementById("messageForm");

    //When the user submits the form (clicks the button)
    addForm.addEventListener('submit', function (event) {
        event.preventDefault();

        //This is the backend file inserting in the DB
        const php = "php/insert_message.php";

        //This is what we send to the server for the PHP file
        const xhr = new XMLHttpRequest();
        let formData = new FormData(addForm);
        formData.append("chatid",window.localStorage.getItem("chatid"));
        formData.append("chatwith",window.localStorage.getItem("chatwith"));

        //Connect to the PHP
        xhr.open("POST", php, true);
        xhr.onreadystatechange = function () {
            console.log('readyState: ' + xhr.readyState);
            console.log('status: ' + xhr.status);
            if (xhr.readyState == 4 && xhr.status == 200) {
                // Everything ok, get the response
                console.log(xhr.responseText);

                // Update the messages
                select_messages();
            }
        };
        xhr.send(formData);
    });
};
insert_message();