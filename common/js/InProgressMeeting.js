var Observable = require('FuseJS/Observable');


var data = Observable();
var nameinput=Observable();
var addressinput=Observable();
var callinput=Observable();



function select() {
	fetch('http://localhost:8080/test/InProgressSelet.jsp')
	.then(function(response) { 
		return response.json(); 
	})
	.then(function(responseObject) {
		data.replaceAll(responseObject);
	})
	.catch(function(err) {
		console.log("error : " + err);
	});

}
fetch('http://localhost:8080/test/InProgressSelet.jsp')
.then(function(response) { 
	return response.json(); 
})
.then(function(responseObject) {
	data.replaceAll(responseObject);
})
.catch(function(err) {
	console.log("error : " + err);
});

function formEncode(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

function insert(){
	var url='http://localhost:8080/test/InProgressInsert.jsp?';
	var requestObject = {
		MeetingName: nameinput.value,
		MeetingURI: addressinput.value,
		CallID: callinput.value
	};
	var status = 0;
	var response_ok = false;

	fetch(url+formEncode(requestObject),
	{
		method:'GET',
		headers: {
			"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
		}

	})
	.catch(function(err) {
		console.log("error : " + err);
	});
}

function goToaccessEquipment(arg){
	var titledata=arg.data;
	
	router.push("accessEquipment", titledata)

}


module.exports = {
	data: data,
	nameinput:nameinput,
	addressinput:addressinput,
	callinput:callinput,
	insert:insert,
	goToaccessEquipment:goToaccessEquipment,
	select:select
};
