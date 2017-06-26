
//////////API Facebook
	function ShowMyName() {
			var messagesRef = new Firebase('https://kept-ef59d.firebaseio.com/');	
			 var config = {
                 apiKey: 'AIzaSyB60Hc7GEGgilbDATju6uxqWliRQUe711c',
                 authDomain: 'localhost',
                 databaseURL: 'https://kept-ef59d.firebaseio.com/',
                 storageBucket: 'gs://kept-ef59d.appspot.com/'
                };
			
			firebase.initializeApp(config);
			FB.api("/me",
					function (response) {
						
						fbinfo = new Array();
						fbinfo[0] = response.id;
						fbinfo[1] = response.first_name;
						fbinfo[2] = response.last_name;
						fbinfo[3] = response.email;
						//alert('Name is ' + response.name + " ID " + fbinfo[0] + " first_name " + response.first_name + " last_name " + response.last_name + " email " + response.email  );
						

						var div = document.createElement('div');

						div.className = 'row';

						div.innerHTML = '<div align="center">ID = '+response.id+'</div>';
						div.innerHTML += '<div align="center">first_name = '+response.name+'</div>';

						 document.getElementById('content').appendChild(div);
											
						
						FB.api('/me/picture?width=4000&height=4000', function (response) {
							var im = document.getElementById("profileImage").setAttribute("src", response.data.url);
							//alert(im);
						});
						
						FB.api('/me?fields=cover&width=4000&height=4000', function (response) {
						//alert("Test");
						//alert(response.cover.source);
						var im = document.getElementById("profileCover").setAttribute("src", response.cover.source);
						});
						
						
						
						
					});
				
				FB.api('/me/posts?fields=full_picture,description,source', function (response) {
						for ( i = 0; i < response.data.length; i++ ) {
										// process this row		
										var id = (response.data[i].id ? response.data[i].id : '');
										var full_picture = (response.data[i].full_picture ? response.data[i].full_picture : '');
										var description = (response.data[i].description ? response.data[i].description : '');
										var source = (response.data[i].source ? response.data[i].source : '');
										messagesRef.push({postID:id, picture:full_picture,description:description,source:source});
										//gs://kept-ef59d.appspot.com/
										if(full_picture&&full_picture!=''){
										var storageRef = firebase.storage().ref();
										var storageRef = firebase.storage().ref("123.jpg");
										storageRef.put(full_picture);
										}
											
										
							  }
						 
						//alert('Test2');	
						});
				
					
				//getFriends();		
						
					

     //var im = document.getElementById("profileImage").setAttribute("src", "http://graph.facebook.com/" + response.id + "/picture?type=normal");
	}