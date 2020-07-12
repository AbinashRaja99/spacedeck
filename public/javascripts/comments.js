function putcomment() {
	var x = document.getElementById("CommentMsg");
	let request=new XMLHttpRequest();
	var a=localStorage.getItem("activespaceId");
	console.log("inside putcomment")
	request.open('GET', 'http://localhost:9666/api/comment/'+a+'/'+x.value, true)
	request.onload = function() {
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	        console.log(data);
	    } 
	    else {
	        console.log('error')
	    }
	}
	request.send()
}
function retrive_comment(callback) {
	console.log("retrive_comment called");
	let request=new XMLHttpRequest();
	var a=localStorage.getItem("activespaceId");
	request.open('GET', 'http://localhost:9666/api/comment/'+a, true)
	request.onload = function() {
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	        callback(data)
	    } 
	    else {
	        console.log('error')
	    }
	}
	request.send()
}
function delete_comment(mid) {
	let request=new XMLHttpRequest();
	request.open('DELETE', 'http://localhost:9666/api/comment/delete/'+mid, true)
	request.onload = function() {
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	        console.log(data);
	    } 
	    else {
	        console.log('error')
	    }
	}
	request.send()
}
function like_comment(mid) {
	let request=new XMLHttpRequest();
	    var u=localStorage.getItem("activeuserId");
	request.open('GET', 'http://localhost:9666/api/comment/like/'+mid+'/'+u, true)
	request.onload = function() {
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	        console.log(data);
	    } 
	    else {
	        console.log('error');
	    }
	}
	request.send()
}
function dislike_comment(mid) {
	let request=new XMLHttpRequest();
	    var u=localStorage.getItem("activeuserId");
	request.open('GET', 'http://localhost:9666/api/comment/dislike/'+mid+'/'+u, true)
	request.onload = function() {
	    var data = JSON.parse(this.response);
	    if (request.status >= 200 && request.status < 400) {
	        console.log(data);
	    } 
	    else {
	        console.log('error');
	    }
	}
	request.send()
}