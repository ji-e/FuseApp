var Observable = require("FuseJS/Observable");
var Storage = require("FuseJS/Storage");

var SAVENAME = "localStorage.json";

var welcomeText = Observable("");
var welcomeText1 = Observable("");
var ip = Observable("");
var id = Observable("");
var password = Observable("");
var hasStored = Observable(false);
debug_log("Js initialized");

Storage.read(SAVENAME).then(function(content) {
    var data = JSON.parse(content);
    ip.value = data.ip;
    id.value = data.id;
    password.value = data.password;
}, function(error) {
    //For now, let's expect the error to be because of the file not being found.
    welcomeText.value = "There is currently no local data stored";
});

 
function saveMessage() {
    var storeObject = {id: id.value, ip: ip.value, password : password.value};
    Storage.write(SAVENAME, JSON.stringify(storeObject));
    hasStored.value = true;
    router.goto("InProgressMeeting");
}


module.exports = {
    welcomeText: welcomeText,
    ip: ip,
    id: id,
    password: password,
    saveMessage: saveMessage,
    hasStored: hasStored,
};
