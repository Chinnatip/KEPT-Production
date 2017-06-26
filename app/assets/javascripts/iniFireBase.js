function iniFB(){	

		var messagesRef = new Firebase('https://bestofthemonth-3418f.firebaseio.com/');	
			 var config = {
                 apiKey: 'AIzaSyA8uKyZZpaRZ7bbV8pQGR3Nll2ukhBB508',
                 authDomain: 'https://console.firebase.google.com/',
                 databaseURL: 'https://kept-7b0c3.firebaseio.com/',
                 storageBucket: 'gs://kept-7b0c3.appspot.com/'
             };
			
			firebase.initializeApp(config);
			return firebase;
}