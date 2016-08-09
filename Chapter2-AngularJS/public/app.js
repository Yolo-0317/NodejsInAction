/**
 * Created by baymax on 16/8/8.
 */
var app = angular.module('nodeChat',[]);

app.controller('mainCtrl',mainCtrl);
app.directive('autoScroll',autoScroll);
app.directive('autoFocus',autoFocus);

autoScroll.$inject = ['$location','$anchorScroll'];
function autoScroll($location, $anchorScroll) {
    return{
        restrict: 'A',
        scope: {
            messages: "="
        },
        link: function (scope, elem, attrs, ctrl) {
            scope.$watch("messages",function (n,o) {
                if(elem[0].scrollHeight > 370){
                    $location.hash('message'+ (n.length-1));
                    $anchorScroll();
                }
            },true);
        }
    }
}

autoFocus.$inject = [];
function autoFocus() {
    return{
        restrict: 'A',
        link: function (scope, elem, attr, ctrl) {
            console.log(attr);
            // scope.$watch(attr.autoFocus,function (n, o) {
            //     console.log(n);
            //     console.log("焦点");
                elem[0].focus();
            // });
        }
    }
}

mainCtrl.$inject = ['$scope','chatUiServer'];
function mainCtrl($scope,chatUiServer) {
    console.log('mainCtrl');
    var vm = this;
    vm.chatInfo = {};
    vm.systemInfo = {};

    vm.chatInfo.messages = [];
    // vm.textareaFocus = false;

    vm.socket = io.connect();
    vm.chatApp = new chatUiServer.ChatServer(vm.socket);

    //显示更名尝试的结果
    vm.socket.on('nameResult', function (result) {
        if(result.success){
            vm.systemInfo.userName = result.name;
            if(result.initName){
                vm.systemInfo.nameChangeInfo = '你的初始用户名为: ' + result.name + '.';
            }else{
                vm.systemInfo.nameChangeInfo = '你的用户名更改为: ' + result.name + '.';
            }
        }else{
            vm.systemInfo.nameChangeInfo = result.message;
        };
    });

    //显示房间变更的结果
    vm.socket.on('joinResult', function (result) {
        $scope.$apply(function () {
            vm.systemInfo.roomName = result.room;
        });

    });

    //显示接收到的消息
    vm.socket.on('message:userInput', function (message) {
        if(message.chatMsg){
            console.log(message);
            vm.chatInfo.messages.push(message);
        }
    });

    //显示接收到的系统信息
    vm.socket.on('message:system',function (message) {
        console.log(message);
        vm.chatInfo.messages.push({systemMessage: message.text});
    });

    //显示可用房间列表
    vm.socket.on('rooms',function (rooms) {
        vm.systemInfo.roomList = [];

        for(var room in rooms){
            room = room.substring(1, room.length);
            if(room != ''){
                $scope.$apply(function () {
                    vm.systemInfo.roomList.push(room);
                });
            }
        }
    });

    //每一秒询问当前已有房间
    setInterval(function () {
        vm.socket.emit('rooms')
    }, 1000);

    //点击房间名可用换到那个房间中
    vm.turnToRoom = function (command) {
      vm.chatApp.processCommand(command);
    };

    //处理原始的用户输入
    vm.processUserInput = function(userInput) {
        var message = userInput;
        var systemMessage;

        if(message.charAt(0) == '/'){       //如果是用户输入的内容以斜杠开头, 将其作为聊天命令
            systemMessage = vm.chatApp.processCommand(message);
            if(systemMessage){
                console.log(systemMessage);
            }
        }else{
            //将非命令输入广播给其他用户
            vm.chatApp.sendMessage(vm.systemInfo.roomName, userInput);
            vm.chatInfo.messages.push({nickName: vm.systemInfo.userName, text: userInput, myMsg:true});
        }
        // $('#send-message').val('');
        vm.chatInfo.userInput = '';
    };

    //用户发送信息
    vm.sendMessage = function (userInput) {
        // vm.textareaFocus = true;
        vm.processUserInput(userInput);
        return false;
    };

    //在用户页面中显示消息及可用房间
    function divEscapedContentElement(message, isRoom) {
        if(isRoom){
            return '<div>' +
                '<div class="userNameContent" class="text-info">' + vm.systemInfo.userName + ':' + '</div>' +
                '<div class="message-content" class="text-warning">'+ message +'</div>' +
                '</div>'
        }else{
            return '<div>' +
                '<div class="userNameContent" class="text-info">' + vm.systemInfo.userName + ':' + '</div>' +
                '<div class="message-content" class="text-warning">'+ message +'</div>' +
                '</div>'
        }
    }

    function divSystemContentElement(message) {
        return $('<div id="systemMessage-content"></div>').html('<i>'+message+"</i>");
    }
}