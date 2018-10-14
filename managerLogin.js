    //Initalise Firebase
    var config = {
      apiKey: "AIzaSyAQk_v7BPeyt97BodhP3TQlGy-c_tnlzEM",
      authDomain: "utssupply-stationery.firebaseapp.com",
      databaseURL: "https://utssupply-stationery.firebaseio.com",
      projectId: "utssupply-stationery",
      storageBucket: "utssupply-stationery.appspot.com",
      messagingSenderId: "333420959904"
    };
    firebase.initializeApp(config);
    database = firebase.database();

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome Admin : " + email_id;

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;
  var ref = database.ref('Users/managers');
  ref.on('value',gotData,errData);

  function gotData(data){
    //console.log(data.val());
    var Users = data.val();
    var keys = Object.keys(Users);
    //console.log(keys);
    for(var i=0;i < keys.length;i++ ){
      console.log("currently in for loop: ");
      console.log("outside if statment variables: ");
      var k = keys[i];
      console.log(k);
      var email = Users[k].email;
      var password = Users[k].password;
      console.log(email);
      if(email == userEmail){
  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });

}
else{
  window.alert('please enter valid manager credentials');
}
}
}
}
function logout(){
  firebase.auth().signOut();
}
