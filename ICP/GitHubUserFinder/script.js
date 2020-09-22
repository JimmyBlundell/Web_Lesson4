function getGithubInfo(user) {
    //1. Create an instance of XMLHttpRequest class and send a GET request using it.
    // The function should finally return the object(it now contains the response!)
    fetch("https://api.github.com/users/" + user)
        .then((result) => {
            if(result.status === 200) {
                let valid_user = result.json()
                valid_user.then((user_info) => showUser(user_info))
            } else {
                noSuchUser(user)
            }
        })
}

function showUser(user_info) {
    //2. set the contents of the h2 and the two div elements in the div '#profile' with the user content
    $("#user_name").text("User name: " + user_info.name)
    $("#profile_pic").html("<img src='" + user_info.avatar_url + "' width='90%'>")
    $("#user_id").text("User ID: " + user_info.id)
    $("#user_url").html("<a href='"+ user_info.html_url + "/' > Github Page </a>")

}

function noSuchUser(username) {
    //3. set the elements such that a suitable message is displayed
    $("#user_name").text("User not found!")
    $("#profile_pic").html("")
    $("#user_id").text("User ID not found!")
    $("#user_url").html("<a href='' > GitHub Page not found </a>")

}

$(document).ready(function () {
    $(document).on('keypress', '#username', function (e) {
        //check if the enter(i.e return) key is pressed
        if (e.which == 13) {
            //get what the user enters
            username = $(this).val();
            //reset the text typed in the input
            $(this).val("");
            //get the user's information and store the respsonse
            response = getGithubInfo(username);
            //if the response is successful show the user's details
            if (response.status == 200) {
                showUser(JSON.parse(response.responseText));
                //else display suitable message
            } else {
                noSuchUser(username);
            }
        }
    })
});
