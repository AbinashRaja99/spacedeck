function myFunction(msg) {
  var x = document.getElementById("snackbar");
  x.innerHTML=msg.called;
  if(msg.id==2)
  {
    x=document.getElementById("snackbar1");
  }
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); },3000);
}
function check_spaVote(callback){
    let request=new XMLHttpRequest();
    var a=localStorage.getItem("activespaceId");
    var u=localStorage.getItem("activeuserId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a+'/check/'+u, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            // console.log(data);
            callback(data);
        } 
        else {
            console.log('error')
        }
    }
    request.send()
    // console.log("request made to cheese");
}
function resetVote(callback)
{
    let request=new XMLHttpRequest();
    var a=localStorage.getItem("parentSpaceId");
    var u=localStorage.getItem("activeuserId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a+'/reset/'+u, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            callback();
        } 
        else {
            console.log('error')
        }
    }
    request.send()
    // console.log("request made to reset vote");
}
function getVoteStatus(callback){
    let request=new XMLHttpRequest();
    var a=localStorage.getItem("parentSpaceId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            // console.log(data);
            callback(data);
        } 
        else {
            console.log('error')
        }
    }
    request.send()
    // console.log("request made to getVoteStatus")
}
function updatdeVotestatus(callback){
    let request=new XMLHttpRequest();
    var a=localStorage.getItem("parentSpaceId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a+'/startVoting', true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            callback(data)
        } 
        else {
            console.log('error')
        }
    }
    request.send()
    // console.log("request made to updatdeVotestatus")
}
function updatdeVoteCount(callback){
 let request=new XMLHttpRequest();
    var a=localStorage.getItem("activespaceId");
    var u=localStorage.getItem("activeuserId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a+'/'+u, true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            myFunction(data);
            callback()
        } 
        else {
            console.log('error')
        }
    }
    request.send()
    // console.log("request made to updatdeVoteCount")
}
function votingResult(callback){
 let request=new XMLHttpRequest();
    var a=localStorage.getItem("parentSpaceId");
    request.open('GET', 'http://localhost:9666/api/vote/'+a+'/vote/result', true)
    request.onload = function() {
        var data = JSON.parse(this.response);
        if (request.status >= 200 && request.status < 400) {
            console.log(data);
            callback(data)
        } 
        else {
            console.log('error')
        }
    }
    request.send();
    // console.log("request made to votingResult");
}