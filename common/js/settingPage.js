var Observable = require('FuseJS/Observable');
	var logout=Observable(false);

	function goToLoginpage(){
		logout.value=false;
		router.goto("LoginPage");

	}

	function goToQnA(){
		router.push("QnAPage");
	}

	function goToSettingPage(){
		router.push("settingPage");
	}

	function setLogout(){
		logout.value=true;

	}
	module.exports = {
		goToLoginpage:goToLoginpage,
			goToQnA:goToQnA,
		setLogout:setLogout,
		logout:logout
	};