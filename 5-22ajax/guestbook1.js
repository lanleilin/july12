window.onload = function() {
	function id(id) {
		return document.getElementById(id);
	}
function getCookie(key) {
		var arr1 = document.cookie.split(';');
		for(var i = 0; i < arr1.length; i++) {
			var arr2 = arr1[i].split('='); //=号分割
			if(arr2[0] == key) {
				return arr2[1];
			}
		}
	}

//	function getUsernameCookie(key) {
//		var arr2 = document.cookie.split(';')[1].split('=')[1];
//		return(arr2);
//				alert(arr2);
//	}
//	var usn = getUsernameCookie('username');
var usn='jonSnow';

	function updateStatus() {
		var uid = getCookie('uid');
		var reg = document.getElementById('reg');
		var login = document.getElementById('login');
		var user = document.getElementById('user');
		var userInfo = document.getElementById('userinfo');

		if(uid) {
			reg.style.display = 'none';
			login.style.display = 'none';
			user.style.display = 'block';
			userInfo.innerHTML = usn;
		} else {
			reg.style.display = 'block';
			login.style.display = 'block';
			user.style.display = 'none';

		}
	}
	updateStatus();

}