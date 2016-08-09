/**
 * Created by baymax on 16/8/2.
 */
/**
 * 创建一个原型函数:用来处理聊天命令、发送消息、请求变更房间昵称
 *
 * */

app.service('chatUiServer',chatUiServer);

chatUiServer.$inject = [];
function chatUiServer() {

    var ChatServer = function (socket) {
        this.socket = socket;

        //发送聊天消息
        this.sendMessage = function (room, text) {
            var message = {
                room: room,
                text: text
            };
            this.socket.emit('message:userInput', message);
        };

        //变更房间的函数
        this.changeRoom = function (room) {
            this.socket.emit('join',{
                newRoom: room
            })
        };

        //处理聊天命令
        this.processCommand = function (command) {
            var words = command.split(' ');
            //从第一个单词开始解析命令
            var command = words[0].substring(1, words[0].length).toLowerCase();
            var message = false;

            switch(command){
                case 'join':
                    words.shift();
                    var room = words.join(" ");
                    this.changeRoom(room);      //处理房间的变换和创建
                    break;
                case 'nick':
                    words.shift();
                    var name = words.join(' ');
                    this.socket.emit('nameAttempt', name);  //处理更名尝试
                    break;
                default:    //如果命令无法识别,返回错误信息
                    message = 'Unrecognized command.';
            }
            return message;
        };
    };
    return {
        ChatServer: ChatServer
    }
}