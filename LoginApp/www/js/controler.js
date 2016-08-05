// Ionic Starter App

angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  
})




/*current month/oprtunity*/
.controller('customersCtrl', function($scope, $http, backcallFactory) {   
   backcallFactory.backcallfun();  
    $http.get("http://localhost/LoginApp/www/services/opportunity.php").then
       (function(response){
         $scope.names = response.data.opportunity_master;
          $scope.title =response.data.opportunity_master.opportunity_desc;
          
          
         console.log($scope.names);
       }); 


})


/*next month*/
.controller('customersCtrl2', function($scope, $http) {

   $http.get("http://localhost/LoginApp/www/services/opportunity_month2.php").then
       (function(response){
         $scope.names = response.data.opportunity_master;
          $scope.title =response.data.opportunity_master.opportunity_desc;
          console.log($scope.names);
       });       
})

/*Next two month*/
.controller('customersCtrl3', function($scope, $http) {

     $http.get("http://localhost/LoginApp/www/services/opportunity_month3.php").then
       (function(response){
         $scope.names = response.data.opportunity_master;
          $scope.title = response.data.opportunity_master.opportunity_desc;
          console.log($scope.names);
       });          
})

.controller('SendOtp', function($scope, $http) {
console.log("here");
    $http.get("http://localhost/query3.php")
  .success(function (response) {
    $scope.names = response.records;})
  .error(function(response) {
        });
})

.controller('SendOtp', function($scope, $timeout, $http, $ionicPopup, $location) {
 
  showAlert = function(title, nachricht) {
  var alertPopup=$ionicPopup.alert({
      title: title,
      template: nachricht
  }); 
  
}

 $scope.sendOtp = function(){
 console.log('Doing login', $scope.phone, $scope.email);
 if(!angular.isDefined($scope.phone) || !angular.isDefined($scope.email) || $scope.phone.trim() == "" || $scope.email.trim() == ""){
   showAlert("error", "please enter contact no or email!");
 }  
 else{
 $http.get("http://procric.com/ionic_app/ion_registration/register_otp.php?phone="+ 
  $scope.phone + "&email=" + $scope.email).then
  (function(response){
         if(response.data == "success"){
           //console.log("data inserted successfully!");
            showAlert("success", "Your A-OTP for Avakaash has been initiated, please wait....");
            $location.path("new_user_registration");
         }
         else{
            //console.log("data inserted failed!!");
            showAlert("error", "Failed to initiate...");
           return;
         }
       })
    } 
 }
})

.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){
 
var obj={}
    obj.backcallfun=function(){
  
       $ionicPlatform.registerBackButtonAction(function () {
          if ($state.current.name == "app.home") {
         alert("m here");
            var action= confirm("Do you want to Exit?");
             if(action){
                navigator.app.exitApp();
              }//no else here just if
      }
      else{
         alert("m here");
            $ionicHistory.nextViewOptions({
                 disableBack: true
                });
        $state.go('app.home');
        //go to home page
     }
        }, 100);//registerBackButton
}//backcallfun
return obj;
}]);



