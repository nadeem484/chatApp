
    scotchApp.controller('listCtrl', function ($scope, $http, $location,SocketService) {
        var mytoken = localStorage.getItem("token");
        var id=localStorage.getItem("userid");
        var userName=localStorage.getItem("userName")
        console.log("id is",id)
          
        $http({
            method: 'GET',
            url: 'auth/users/'+id+'/userlist',
            headers:{
                'token': mytoken
            }
        }).then(function (response) {
            console.log(response);
            var arr=[];
            for(var i=0;i<response.data.data.length;i++){
                arr.push(response.data.data[i].username)
            }
            $scope.arr = arr;
        })


        $scope.person = function($event){
            console.log("hii.....",id);
            console.log("name is.......",userName);
            
            

            // localStorage.setItem('receiverId', userid)
            receivername=event.target.id;
            console.log('receivername is--- ',receivername);
            localStorage.setItem('receiverName', userName);
            $location.path("/dashboard/person");
        }

        
    $scope.chatlist = [];
    $scope.chatlistnew = [];

    /**
     * @description it will remove the token and user id from local storage and redirect to login
     */
    $scope.logout=function () {
        console.log("logout");
        
        localStorage.removeItem("token");
        localStorage.removeItem("userid");
        $location.path('/login')

    }
    var current_userid
    $scope.current_userid = id
    /**
     * @description this function will add the the messages, userid, and current date and time to database
     */
    $scope.add = function(){
        console.log("in");
        
        if($scope.message.length !== 0){
            
        SocketService.emit(
            'chatRoomBackend', {
                'userid': id, 
                'userName':userName, 
                'message': $scope.message,
                'dateTime': new Date()});
        }
        $scope.message==null;
    }

    $http({
        method: 'GET',
        url: '/auth/chatlist',
        headers: {'token': mytoken}})  
          
        .then(function(response){
            console.log(response.data.message);
            $scope.chatlist = response.data.message;
    })
    
    SocketService.on('chatroomClient', function(msg) {
        $scope.chatlist.push(msg)
    });
 })
