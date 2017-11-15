var Observable = require('FuseJS/Observable');
var name=Observable();
var address=Observable();
var call=Observable();
var listitem=Observable([]);
var images = Observable([]);
var titleTxt = Observable();
var Storage = require("FuseJS/Storage");

var SAVENAME = "localStorage.json";

var  datatmp= [];

datatmp.push(new dataitem('서울 본부 회의 PT','00:47:12','0417@lh.or.kr','2000'));
datatmp.push(new dataitem('대전 본부 회의 PT','00:37:12','0417@lh.or.kr','4000'));
datatmp.push(new dataitem('논산 본부 회의 PT','00:37:12','0417@lh.or.kr','4000'));
datatmp.push(new dataitem('광주 본부 회의 PT','00:37:12','0417@lh.or.kr','4000'));
datatmp.push(new dataitem('부산 본부 회의 PT','00:37:12','0417@lh.or.kr','4000'));

listitem.replaceAll(datatmp);
var items = [];
    items.push(new ImageData("assets/images/done2.png","assets/images/done2.png","assets/images/done2.png")) ;

	images.replaceAll(items);


name.value = "";
address.value ="";
call.value = "";

titleTxt.value = "현재 진행 중인 회의";

function goToAddMeeting(){
	router.push("AddMeeting");

}

function dataitem(name,time,URI,Call_ID){
	this.name = name;
	this.time = time;
	this.URI = URI;
	this.Call_ID = Call_ID;

}


/*function goToaccessEquipment(arg){
	var titledata=arg.data;
	console.log(titledata.value);
	router.push("accessEquipment",titledata),
	Background="Gray";

}*/

function goTosettingPage(){
	router.push("settingPage"),
    Background="Gray";

}




function ImageData(img1,img2,img3) {
	this.img1=img1;
	this.img2 = img2;
	this.img3 = img3;
	
}


function txtValueChanged(args) {
	
  
	if(name.value == "") {
        items[0].img1 = "assets/images/done2.png";
   }else {

   	     items[0].img1= "assets/images/done1.png";
   	    
   }
  
	if(address.value == "") {
           items[0].img2 ="assets/images/done2.png";
   }else {
   	     items[0].img2 = "assets/images/done1.png";
   	  

   }
 
	if(call.value == "") {
           items[0].img3 = "assets/images/done2.png";
   }else {
   	    items[0].img3 = "assets/images/done1.png";
   	    
   }

    images.replaceAll(items);
 
}



function gosideBar(args) {
	

	if(args.sender == "newConf" ) {
         titleTxt.value= "새로운 회의 생성";
     }else  {
     	 titleTxt.value= "현재 진행중인 회의";
     }

  datatmp.push(new dataitem(name.value,'00:00:00',address.value,call.value));
  listitem.replaceAll(datatmp);

}

function goStorage(name,address,call){

}


module.exports = {
	goTosettingPage:goTosettingPage,
	goToAddMeeting:goToAddMeeting,
	//goToaccessEquipment:goToaccessEquipment,
	gosideBar,
	titleTxt:titleTxt,
	name:name,
	address:address,
	call:call,
	images:images,
	listitem:listitem,
	txtValueChanged:txtValueChanged
};
