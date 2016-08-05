angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, Auth, $state, $ionicPopup, $http) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

showAlert = function(title, nachricht) {
  var alertPopup=$ionicPopup.alert({
      title: title,
      template: nachricht
  }); 
  
}





  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    $scope.listdata = [];
    console.log('Doing login', $scope.loginData);
    if(!angular.isDefined($scope.loginData.login_id) || !angular.isDefined($scope.loginData.password) || 
    $scope.loginData.login_id.trim() == "" || $scope.loginData.password.trim() == ""){
      showAlert("error", "Please enter username or password!");
      return;
    }
    else{
      $http.get("http://procric.com/ionic_app/ion_registration/ion_login.php?login_id="
       + $scope.loginData.login_id + "&password=" + $scope.loginData.password).then
       (function(response){
         $scope.listdata = response;
         if(response.data.success == "LoginDone"){
          $scope.name = response.data.name;
          $scope.referral_code = response.data.referral_code;
          $scope.clss = response.data.class;
          $scope.phone = response.data.phone;
          $scope.school = response.data.school;
          $scope.email = response.data.email;
          $scope.dob = response.data.dob;
          $scope.state = response.data.state;
          $scope.login_id = response.data.login_id;
          $scope.user_type = response.data.user_type;
          //console.log( $scope.referral_code);
           Auth.setUser({
             name : $scope.name,
             referral_code : $scope.referral_code,
             class : $scope.clss,
             phone : $scope.phone,
             school : $scope.school,
             email : $scope.email,
             dob : $scope.dob,
             state : $scope.state,
             login_id : $scope.login_id,
             user_type : $scope.user_type
           })
             $state.go("app.home");
         }
         else if(response.data = "error_2"){
           showAlert("error", "password wrong!");
           return;
         }
         else{
           showAlert("404", "error coourred during login");
           return;
         }
       })
    }
   
  };
  
  $scope.logout = function() {
    Auth.logout();
    showAlert("success", " You have successfully logged out.");
    $state.go("login");
  }; 
})

.controller('PlaylistsCtrl', function($scope, Auth, backcallFactory) {
  backcallFactory.backcallfun();
  $scope.name = Auth.getUser().name;
  $scope.referral_code = Auth.getUser().referral_code;
  $scope.class = Auth.getUser().class;
  $scope.phone = Auth.getUser().phone;
  $scope.email = Auth.getUser().email;
  $scope.state = Auth.getUser().state;
  $scope.dob = Auth.getUser().dob;
  $scope.school = Auth.getUser().school;
  $scope.pincode = Auth.getUser().pincode;
  $scope.login_id = Auth.getUser().login_id;
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('PlaylistCtrl', function($scope, $stateParams) {
  
})

.factory('backcallFactory', ['$state','$ionicPlatform','$ionicHistory','$timeout',function($state,$ionicPlatform,$ionicHistory,$timeout){
 
var obj={}
    obj.backcallfun=function(){
  
       $ionicPlatform.registerBackButtonAction(function () {
          if ($state.current.name == "app.home") {
         // alert("m here");
            var action= confirm("Do you want to Exit?");
             if(action){
                navigator.app.exitApp();
              }//no else here just if
      }
      else if($state.current.name == "app.playlists"){
          $ionicHistory.nextViewOptions({
                 disableBack: true
                });
        $state.go('app.home');
      }
      else{
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

