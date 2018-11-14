// var app = angular.module('registerController', []);
scotchApp.controller('loginCtrl',function($scope,$http, $location){


    /**
     * @description login function
     */
        $scope.login= function()
        {
            /**
             * @description email validation 
             */
            if($scope.userEmail==null||$scope.userEmail=='')
            {
                alert("email required")
                return;
            }
            /**
             * @description
             */
            if($scope.userPassword==null||$scope.userPassword=='')
            {
                alert("password is required")
                return;
            }    
             $scope.data = {
            
                "Email" :$scope.userEmail,
                "Password" :$scope.userPassword 
            }
            $http.post('/login',$scope.data)//it will request to the back end
              .then(function(response){
                  
                  if(response.data.Success==true)
                  {
                  $scope.message="login Succesfull";
                   console.log(response.data.userName);
                   

                  localStorage.setItem("token", response.data.token);//storing token in a local storage
                  localStorage.setItem("userid",response.data.userid)//storing userid in a local storage

                //   localStorage.setItem('receiverId', userId)
                //   localStorage.setItem('receiverName', userName);
                  console.log(response.data.userName);
                  
                   localStorage.setItem("userName",response.data.userName)
                   
                  
                  $location.path('/dashboard');
                  }
              },function(err)
              {
                  console.log(err);
                  $scope.message="login Unsuccessful"
                  alert("invalid credentials")
                  
              })
        }
    });