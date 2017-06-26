//////////API Facebook

	function ShowMyName(firebase) {
		
			var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/posts');	
			var user_id = "";
			var FBUSID = "";
			FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						console.log(response);
						//console.log(response.id);
						//console.log("response.id " + fbinfo[0]);
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						user_id = fbinfo[0];
						
						/* var div = document.createElement('div');
						div.className = 'row';

						//div.innerHTML = '<div align="center">ID = '+response.id+'</div>';
						div.innerHTML += '<div align="center">first_name = '+response.name+'</div>';

						 document.getElementById('content').appendChild(div);
						*/
						document.getElementById('content_name').innerHTML =  'first_name = '+response.name;
						
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});					
						
						
						//insert user id
						messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users');
						user_id = fbinfo[0];
						FBUSID = fbinfo[0];
						//check exists 
						var userExists = false;
						///keep User
						const promise = new Promise(function(resolve, reject){
							findSameID(user_id, resolve);
						});
						promise.then(function(return_id){
							console.log("Promise");
							console.log(user_id);
							console.log(return_id);
							
							console.log("real --> "+userExists);
							
							var picture_pro = "";
							var user_cover = "";
							FB.api('/me/picture?width=4000&height=4000', function (response) {
								picture_pro = response.data.url;
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({user_pic:picture_pro});														
								var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
								//alert(im);
							});
							
							FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
							//alert("Test");
							//alert(response.cover.source);
							user_cover = response.cover.source;
							messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
						    messagesRef.update({userCover:user_cover});	
							var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
							});
							
							if(return_id==-1){
								console.log(user_id + " Insert ");
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.set({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});
								console.log("---push successful!!--" + user_id + " " );
							}else if(user_id){
								console.log(user_id + " Update ");								
								messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id);
								messagesRef.update({userID:user_id,Name:response.name,user_pic:picture_pro,userCover:user_cover});								
								console.log("---update successful!!--" + user_id + " " );
							}
							
						});	

						
					  console.log("---BestofMonth---" + FBUSID);
					  insertPostBestofMonth(FBUSID);
					  
					});
			
			
			
				//getFriends();		
						
					

     //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
	}
var USERS_LOCATION = 'https://SampleChat.firebaseIO-demo.com/users'
	// Tests to see if /posts/<postId> has any data. 

function clearOldBestMonth(){
	
} 
	
function insertPostBestofMonth(user_id){
	
	FB.api('me/posts?fields=comments.limit(1).summary(true),likes.limit(1).summary(true),picture,place,updated_time,created_time,full_picture', function (response) {
						
						console.log(response);
						for ( i = 0; i < response.data.length; i++ ) {
							
							console.log("---Loop " + i + response.data[i].id);
							var created_time = response.data[i].created_time;
							var likes_count = response.data[i].likes.summary.total_count;
							
							var created_date =  getDate(created_time); // created_time.substring(0, 10);
							var created_tim =   getTime(created_time); //created_time.substring(11, 19);
							var created_time_d = getDay(created_date);
							var created_time_m  = getMonth(created_date);//new Date(created_date).getMonth();
							var created_time_y  = getYear(created_date);
							
							var current_time = new Date();
							//var current_date =  current_time.getDate(); 
							var current_time_d = current_time.getDate();
							var current_time_m  = current_time.getMonth()+1;//new Date(created_date).getMonth();
							var current_time_y  = current_time.getFullYear();
							
							//check post only in month
							if(current_time_y==created_time_y){
								//console.log("---same year");
								//check in same month
								if(current_time_m==created_time_m){
									console.log("---same month----" + current_time_m + " "+ created_time_m );
								     //keep data
									  // process this row
										
										var postid = response.data[i].id;
										var full_picture = response.data[i].full_picture;
										var description = response.data[i].description;
										var source = response.data[i].source;
										var updated_time = response.data[i].updated_time;
										var comment_total_count = response.data[i].comments.summary.total_count;
										var likes_total_count = response.data[i].likes.summary.total_count;
										var full_picture = (response.data[i].full_picture? response.data[i].full_picture : '');
										var useFlag = true;
												var messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/Users/'+user_id+'/posts/BestofMonth/'+postid);										  
												var id = (postid ? postid : '');
												var full_picture = (full_picture? full_picture : '');
												var description = (description? description : '');
												var source = (source? source : '');
												messagesRef.set({postID:id, picture:full_picture,description:description,source:source,updated_time:updated_time,comment_total_count:comment_total_count,likes_total_count:likes_total_count,full_picture:full_picture,useflag:true});
												console.log("---POST PUSH SUCCESSfUL!");

								}
								
							}			
						}

					});
	
}	


function findSameID(user_id, resolve){
  
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
						var ref = messagesRef.child("Users");
						// Attach an asynchronous callback to read the data at our posts reference
						ref.on("value",function(snapshot) {						  
						   snapshot.forEach( function (childSnapshot) {							   
								var value = childSnapshot.val();
								console.log("ID is : " + value.userID);
								if(value.userID==user_id){
									//console.log(user_id + " Exists!! ");
									resolve(value.userID);
									return;
								}
							});
							
							resolve(-1);
						   
						}, function (errorObject) {
						  console.log("The read failed: " + errorObject.code);
						});			
}
	
function checkPostByUser(postid,userid,resolve){
	messagesRef = new Firebase('https://kept-7b0c3.firebaseio.com/');
	var ch= "Users/"+userid+"/posts/BestofMonth/";
	console.log("ch");
	console.log(ch);
	var ref = messagesRef.child(ch);
	
	// Attach an asynchronous callback to read the data at our posts reference
	ref.on("value",function(snapshot) {		
	    console.log("checkPost -- " + JSON.stringify(snapshot.val()));	  
	    snapshot.forEach(function (childSnapshot) {
			var value = childSnapshot.val();
			console.log("postID is : " + value.postID + " " + postid);
			if(value.postID==postid){
				console.log(postid + " Exists!! ");
				resolve(value.postID);
				//return;
			}
		});	  		
		
		resolve(-1);
	}, function (errorObject) {
	  console.log("The read failed: " + errorObject.code);
	  return false;
	});
	
}	
	
function checkIfPostIDExists(postId) {
  var usersRef = new Firebase(USERS_LOCATION);
  usersRef.child(userId).once('value', function(snapshot) {
    var exists = (snapshot.val() !== null);
    userExistsCallback(userId, exists);
  });
}
	
function getDate(timestamp){
return timestamp.substring(0, 10);
}

function getTime(timestamp){
	return timestamp.substring(11, 19);
}

function getDay(date){
	return parseInt(date.substring(8, 10));
}

function getMonth(date){
	return parseInt(date.substring(5, 7));
}

function getYear(date){
	return parseInt(date.substring(0, 4));
}

	