
scotchApp.controller('registerCtrl',function($scope, $http){
        $scope.Registration = function()
        {
            console.log("inside register................");
            
             $scope.data = {
            
                "userName" : $scope.userName,
                "userPassword": $scope.userPassword,
                "mobile" : $scope.mobile,
                "userEmail": $scope.userEmail,
                "gender" : $scope.gender,
            }
            
            $http.post('/register',$scope.data).then(function(data, status) {
                console.log('Data posted successfully');
              })

              /**
               * @description username validatin
               */
              $scope.checkUserName = function()
              {
                  if($scope.userName == undefined || !isNaN($scope.userName)||$scope.userName<3||$scope.userName == ' '||$scope.userName==null)
                  {
                          return true;
                  }
                  else
                  {
                      return false;
                  }
              }

              /**
               * @description Email validation
               */
              $scope.checkEmail = function()
              {
                  if($scope.userEmail==undefined||!isNaN($scope.userEmail)||$scope.userEmail == '')
                  {
                          return true
                  }
                  else
                  {
                      return false;
                  }
              }
              /**
               * @description mobile number validation
               */
              $scope.checkmobileNumber = function()
              {
                 if(isNaN($scope.mobile)||$scope.mobile =='' ||$scope.mobile.length!=10||$scope.mobile!=undefined)
                 {
                   return true
                 }
                  
                  else
                  {
                      return false
                  }
              }

              /**
               * @description password validation
               */
              $scope.checkPassword = function()
              {
                  if($scope.userPassword==undefined||$scope.userPassword==' '||$scope.userPassword.length<3)
                  {
                    return true
                  }
                  else 
                  {
                      return false
                  }
              }

              /**
               * @description gender validation
               */
              $scope.checkgender = function()
              {
                  if($scope.gender==null)
                  {
                      return true
                  }
                  else
                  {
                      return false
                  }
              }

        }
    })
    


