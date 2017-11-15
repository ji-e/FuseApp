var Observable = require('FuseJS/Observable');
var Bundle = require("FuseJS/Bundle");
var Storage = require('FuseJS/Storage');


var titledata=this.Parameter;
var MeetingName=titledata.map(function(x){return x.MeetingName});
var MeetingId=titledata.map(function(x){return x.MeetingId});


var data = Observable();





function a(){
	console.log(MeetingName.value);
	//console.log(num);
	var url='http://localhost:8080/test/AccessEquipmentSelect.jsp?';
	var requestObject = {
		MeetingId:MeetingId.value,
	};
	fetch(url+formEncode(requestObject),
	//fetch(url+MeetingId+"="+MeetingId.value,
	{
		method:'GET',
		headers: {
			"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
		}

	})
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

function formEncode(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

//function select() {
	// var url='http://localhost:8080/test/AccessEquipmentSelect.jsp?';
	// var requestObject = {
	// 	MeetingId:MeetingId.value
	// };
	// //fetch(url+formEncode(requestObject),
	// fetch(url+MeetingId+"="+MeetingId.value,
	// {
	// 	method:'GET',
	// 	headers: {
	// 		"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
	// 	}

	// })
	// .then(function(response) { 
	// 	return response.json(); 
	// })
	// .then(function(responseObject) {
	// 	data.replaceAll(responseObject);
	// })
	// .catch(function(err) {
	// 	console.log("error : " + err);
	// });

//}


/*function Data(place, address, time) {
	this.place = place;
	this.address = address;
	this.time = time;
	this.sound=Observable(false);
	this.isSelected=Observable(false);
}

var data = Observable(
	new Data("서울지역본부 306호", "test1@xxxx.com", "00:34:04"),
	new Data("대전충남지역본부", "test2@xxxx.com", "00:23:01"),
	new Data("충북지역본부", "test3@xxxx.com", "00:31:04"),
	new Data("전남지역본부", "test4@xxxx.com", "00:14:40"),
	new Data("전북지역본부", "test5@xxxx.com", "00:34:07")
	);*/

	dtv=Observable(false);
	mtv=Observable(false);
	ltv=Observable(false);
	etv=Observable(false);

	selectionMode = Observable(false);

	function setMtv(){
		if(mtv.value==false){
			mtv.value=true;
			dtv.value=false;
			ltv.value=false;
			etv.value=false;
			
		}
		else
			mtv.value=false;
		//console.log(num);
		
	}

	function b(args){
		EquipmentId=args.data.EquipmentId;
		if(args.data.EquipmentMute=="False")
			EquipmentMute="True";
		else if(args.data.EquipmentMute=="True")
			EquipmentMute="False";
		//EquipmentMute=args.data.EquipmentMute;
		
		var url='http://localhost:8080/test/AccessEquipmentMuteUpdate.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value,
			EquipmentId:EquipmentId,
			EquipmentMute:EquipmentMute

		};
		fetch(url+formEncode(requestObject),
	//fetch(url+MeetingId+"="+MeetingId.value,
	{
		method:'GET',
		headers: {
			"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
		}

	})
		.then(function(response) { 
			return response.json(); 
		})
		.then(function(responseObject) {
			data.replaceAll(responseObject);
		})
		.catch(function(err) {
			console.log("error : " + err);
		});
		//a();

	}
	

	function setDtv(args){
		if(dtv.value==false){
			dtv.value=true;
			mtv.value=false;
			ltv.value=false;
			etv.value=false;

		}
		else{
			dtv.value=false;
			data.removeWhere(function (p) {
				return p.isSelected.value === true;
			});
			dtv.value=false;
			selectionMode.value = false;
		}
	}

	function setLtv(){
		if(ltv.value==false){
			ltv.value=true;
			mtv.value=false;
			dtv.value=false;
			etv.value=false;
		}
		else{
			ltv.value=false;

		}
	}


	function setEtv(){
		if(etv.value==false){
			etv.value=true;
			mtv.value=false;
			dtv.value=false;
			ltv.value=false;
		}
		else
			etv.value=false;
	}




	function AlertDone(){
		router.goto("InProgressMeeting");
		etv.value=false;
	}

	function goToAddEquipment(){
		router.push("addEquipment");
	}

	function goback(){
		router.goBack();
	}


// function goToSelectionMode(args) {
// 	if (selectionMode.value === true) return;
// 	selectionMode.value = true;
// 	args.data.isSelected.value = true;
// }

// function toggleSelect(args) {
// 	if (selectionMode.value === false) return;
// 	args.data.isSelected.value = !args.data.isSelected.value;
// }

// function deleteSelected(args) {
// 	data.removeWhere(function (p) {
// 		return p.isSelected.value === true;
// 	});
// 	dtv.value=false;
// 	selectionMode.value = false;
// }

function checkToggle(args){
	if(args.data.sound.value ==false) 
		args.data.sound.value = true;
	else
		args.data.sound.value = false;
}

function allCheck(){

}



module.exports = {
	goToAddEquipment:goToAddEquipment,
	AlertDone:AlertDone,
	data:data,
	mtv:mtv,
	dtv:dtv,
	ltv:ltv,
	etv:etv,
	setMtv:setMtv,
	setDtv:setDtv,
	setLtv:setLtv,
	setEtv:setEtv,
	selectionMode : selectionMode,
	/*goToSelectionMode : goToSelectionMode,
	toggleSelect : toggleSelect,
	deleteSelected : deleteSelected,*/
	goback:goback,
	checkToggle:checkToggle,
	// allCheck:allCheck,
	MeetingName:MeetingName,
	MeetingId:MeetingId,
	a:a,
	b:b

	
};
