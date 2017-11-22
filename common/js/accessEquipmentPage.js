var Observable = require('FuseJS/Observable');
var Bundle = require("FuseJS/Bundle");
var Storage = require('FuseJS/Storage');


var titledata=this.Parameter;
var MeetingName=titledata.map(function(x){return x.MeetingName});
var MeetingId=titledata.map(function(x){return x.MeetingId});


//var items=Observable([]);
var aaa= [];

var data = Observable();


function dataitemDisconnection(name){
	this.name = name;
}

function disconnectionDelete(args){

	if(aaa.length==0){
		aaa.push(new dataitemDisconnection(args.data.EquipmentId));
	}
	else{
		aaa.push(new dataitemDisconnection(args.data.EquipmentId));
		for(var i=0;i<aaa.length-1;i++){
			if(args.data.EquipmentId==aaa[i].name){
				aaa.splice(i, 1);
				aaa.splice(aaa.length-1, 1);
			}
		}
	}
	EquipmentId=args.data.EquipmentId;
	if(args.data.EquipmentDisconnection=="False")
		EquipmentDisconnection="True";
	else if(args.data.EquipmentDisconnection=="True")
		EquipmentDisconnection="False";
	
	var url='http://localhost:8080/test/AccessEquipmentDisconnectionUpdate.jsp?';
	var requestObject = {
		MeetingId:MeetingId.value,
		EquipmentId:EquipmentId,
		EquipmentDisconnection:EquipmentDisconnection

	};
	fetch(url+formEncode(requestObject),
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





function select(){
	var url='http://localhost:8080/test/AccessEquipmentSelect.jsp?';
	var requestObject = {
		MeetingId:MeetingId.value
	};
	fetch(url+formEncode(requestObject),
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


dtv=Observable(false);
mtv=Observable(false);
ltv=Observable(false);
etv=Observable(false);





function Muteupdate(args){
		//select();
		EquipmentId=args.data.EquipmentId;
		if(args.data.EquipmentMute=="False")
			EquipmentMute="True";
		else if(args.data.EquipmentMute=="True")
			EquipmentMute="False";
		
		var url='http://localhost:8080/test/AccessEquipmentMuteUpdate.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value,
			EquipmentId:EquipmentId,
			EquipmentMute:EquipmentMute

		};
		fetch(url+formEncode(requestObject),
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
	function dataitem(name,state){
		this.name = name;
		this.state;
	}

	var listitem=Observable([]);
	var  items= [];

	items.push(new dataitem('All Equal'));
	items.push(new dataitem('Speaker only'));
	items.push(new dataitem('Stacked'));
	items.push(new dataitem('Telepresence'))
	items.push(new dataitem('All Equal4'));
	items.push(new dataitem('All Equal9'));
	items.push(new dataitem('All Equal16'));
	items.push(new dataitem('All Equal25'));
	items.push(new dataitem('1 Plus 5'));
	items.push(new dataitem('1 Plus 7'));
	items.push(new dataitem('1 Plus 9'));



	function Layoutupdate(args){
		select();
		EquipmentId=args.data.EquipmentId;
		EquipmentLayout=args.data.EquipmentLayout;
		for(var i=0; i< items.length;i++){
			items[i].state=false;
			if(EquipmentLayout==items[i].name){
				items[i].state=true;
			}
		}	
		listitem.replaceAll(items);

		EquipmentId=args.data.EquipmentId;
		if(args.data.EquipmentLayoutState=="False")
			EquipmentLayoutState="True";
		else if(args.data.EquipmentLayoutState=="True")
			EquipmentLayoutState="False";

		var url='http://localhost:8080/test/AccessEquipmentLayoutCheckUpdate.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value,
			EquipmentId:EquipmentId,
			EquipmentLayoutState:EquipmentLayoutState

		};
		fetch(url+formEncode(requestObject),
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


	function as(args){
		for(var i=0; i< items.length;i++){
			items[i].state=false;
			if(args.data.name==items[i].name){
				items[i].state=true;
			}
		}	
		var url='http://localhost:8080/test/AccessEquipmentLayoutUpdate.jsp?';
		var requestObject = {
			EquipmentId:EquipmentId,
			EquipmentLayout:args.data.name
		};
		fetch(url+formEncode(requestObject),
		{
			method:'GET',
			headers: {
				"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
			}
		}).catch(function(err) {
			console.log("error : " + err);
		});
		listitem.replaceAll(items);
	}


	function setMtv(){
		if(mtv.value==false){
			mtv.value=true;
			dtv.value=false;
			ltv.value=false;
			etv.value=false;
		}
		else
			mtv.value=false;
	}

	function setDtv(){
		select();
		if(dtv.value==false){
			dtv.value=true;
			mtv.value=false;
			ltv.value=false;
			etv.value=false;
		}
		else{
			for(var i=0;i<aaa.length;i++){
				var url='http://localhost:8080/test/AccessEquipmentDisconnetcionDelete.jsp?';
				var requestObject = {
					EquipmentId:aaa[i].name
				};
				fetch(url+formEncode(requestObject),
				{
					method:'GET',
					headers: {
						"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
					}

				}).catch(function(err) {
					console.log("error : " + err);
				});
			}
			dtv.value=false;
			aaa=[];
			equipment=[];

		}
		select();
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
		var url='http://localhost:8080/test/MeetingDelete.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value
		};
		fetch(url+formEncode(requestObject),
		{
			method:'GET',
			headers: {
				"Content-type": "application/x-www-form-urlencoded charset=UTF-8"
			}

		}).catch(function(err) {
			console.log("error : " + err);
		});
		select();

		router.goto("InProgressMeeting");
		etv.value=false;
	}

	function goToAddEquipment(){
		router.push("addEquipment",MeetingId.value );
	}

	function goback(){
		router.goBack();
	}



	function allMuteCheckOn(){
		var url='http://localhost:8080/test/AccessEquipmentMuteAllUpdate.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value,
			EquipmentMute:"False"

		};
		fetch(url+formEncode(requestObject),
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

	function allMuteCheckOff(){
		var url='http://localhost:8080/test/AccessEquipmentMuteAllUpdate.jsp?';
		var requestObject = {
			MeetingId:MeetingId.value,
			EquipmentMute:"True"

		};
		fetch(url+formEncode(requestObject),
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
	//selectionMode : selectionMode,
	/*goToSelectionMode : goToSelectionMode,
	toggleSelect : toggleSelect,
	deleteSelected : deleteSelected,*/
	goback:goback,
	//checkToggle:checkToggle,
	allMuteCheckOn:allMuteCheckOn,
	allMuteCheckOff:allMuteCheckOff,
	MeetingName:MeetingName,
	MeetingId:MeetingId,
	select:select,
	Muteupdate:Muteupdate,
	Layoutupdate:Layoutupdate,
	listitem:listitem,
	as:as,
	disconnectionDelete:disconnectionDelete
	
};
