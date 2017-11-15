var Observable = require('FuseJS/Observable');

var callt=Observable(false);
var calld=Observable(false);

var inputText=Observable("");
var items=Observable();

function addItem(){
	if(inputText.value!=""){
		items.add({
			text:inputText.value
		});
		inputText.value="";
	}
}

function removeItem(arg){
	items.remove(arg.data);

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
}

function goToAccessEquipment(){
	calld.value=false;

	router.goBack();

}
function goback(){
	
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
