var Observable = require('FuseJS/Observable');

var callt=Observable(false);
var calld=Observable(false);

var inputText=Observable();
//var items=Observable();

var items=Observable([]);
var listitem= [];

var MeetingId;
this.Parameter.onValueChanged(module,function(param) {
	return MeetingId=JSON.stringify(param);
});

items.replaceAll(listitem);

function formEncode(obj) {
	var str = [];
	for(var p in obj)
		str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
	return str.join("&");
}

function dataitem(text){
	this.text = text;
}

function addItem(){
	if(inputText.value!=""){
		// items.add({
		// 	text:inputText.value
		// });
		listitem.push(new dataitem(inputText.value));
	}
	items.replaceAll(listitem);

	inputText.value="";
}

function removeItem(arg){
	//console.log(arg.data.text);
	for(var i=0;i<listitem.length;i++){
		if(arg.data.text==listitem[i].text){
			listitem.splice(i, 1);
		}
	}

	items.replaceAll(listitem);
}

function setCallt(){
	if(callt.value==false)
		callt.value=true;
	else
		callt.value=false;
}

function callDone(){
	if(calld.value==false){
		calld.value=true;
		callt.value=false;
	}
	else
		calld.value=false;

	MeetingId=MeetingId.replace(/\"/g,'');
	for(var i=0;i<listitem.length;i++){
		EquipmentId=listitem[i].text;
		var url='http://localhost:8080/test/AddEquipmentInsert.jsp?';
		var requestObject = {
			MeetingId:MeetingId,
			EquipmentId:EquipmentId
		};
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
	listitem.length = 0;
	items.replaceAll(listitem);
}

function goToAccessEquipment(){
	calld.value=false;

	router.goBack();
}

function goback(){
	listitem.length = 0;
	items.replaceAll(listitem);
	router.goBack();
}


module.exports = {
	callt:callt,
	calld:calld,
	setCallt:setCallt,
	callDone:callDone,
	items : items,
	addItem : addItem,
	removeItem:removeItem,
	inputText:inputText,
	goToAccessEquipment:goToAccessEquipment,
	goback:goback
};
