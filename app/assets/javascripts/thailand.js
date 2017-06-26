
function thailandJS(){
				FB.api("/me",
						function (response) {
						var facebookID;							
						facebookID = response.id;
						getThailand(facebookID);
					});	
}

function getThailand(userid){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/Thailand/";
	console.log(ch);
	var ref = messagesRef.child(ch);
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {		
	    //console.log("checkPost -- " + JSON.stringify(snapshot.val()));
		var like_accumurate = 0;
		var picture_accumurate = 0;
		var Comments_accumurate = 0;
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			//console.log("postID is : " + value.postID + " ");		
			if(value.full_picture.trim()!=''){
				var img = document.createElement('img');	
				document.getElementById('gall-container').appendChild(img);
				img.src = value.full_picture;
				picture_accumurate++;
			}
			var likeCount = value.likes_total_count? value.likes_total_count : 0;
			var commentCount = value.comment_total_count? value.comment_total_count : 0;
			like_accumurate = like_accumurate+likeCount;
			Comments_accumurate = Comments_accumurate+commentCount;
			
		});	 

			document.getElementById('countPic').innerHTML = "<b>  "+picture_accumurate+ " Pictures </b>";
			document.getElementById('countLik').innerHTML = "<b>  "+like_accumurate+ " Like </b>";
			document.getElementById('countCom').innerHTML = "<b>  "+Comments_accumurate+ " Comments </b>";
			
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	});	
}