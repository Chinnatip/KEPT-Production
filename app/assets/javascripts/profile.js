
function profile(){
				FB.api("/me",
						function (response) {
						var facebookID;
						facebookID = response.id;
						getUserInfo(facebookID);
					});
}

function getUserInfo(userid){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/";
	console.log(ch);
	var ref = messagesRef.child(ch);
	console.log(ref);
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {
	    //console.log("checkPost -- " + JSON.stringify(snapshot.val()));

		var picture_profile;
		var username;
		console.log(snapshot);
	    snapshot.forEach(function (childSnapshot) {
			console.log(childSnapshot);
			var value = childSnapshot.val();
		if(userid==value.userID){
			document.getElementById('profile_pic').src = value.user_pic;
			document.getElementById('profile_name').innerHTML = "<b>  "+ value.Name + " </b>";
		}
		});
			
			
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});
}
