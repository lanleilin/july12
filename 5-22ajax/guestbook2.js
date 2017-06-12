window.onload = function() {
	function id(id) {
		return document.getElementById(id);
	}
//查看cookie值
	function getCookie(key) {
		var arr1 = document.cookie.split(';');
		for(var i = 0; i < arr1.length; i++) {
			var arr2 = arr1[i].split('=');//=号分割
			if(arr2[0] == key) {
				return arr2[1];
			}
		}
	}
	var num = getCookie('uid');
//	alert(num);
//	function getUsernameCookie(key){
//		var arr3=document.cookie.split(';');
//		var arr5=arr3[1];
//		
//		alert(arr5);
//		return arr5;
//
//	}
//	getUsernameCookie('username');
	
//	var usn=getUsernameCookie('username');
	
//改变登录后状态
	function updateStatus() {
		var uid = getCookie('uid');
		var reg = document.getElementById('reg');
		var login=document.getElementById('login');
		var user=document.getElementById('user');
		var userInfo=document.getElementById('userinfo');

		if(uid) {
			reg.style.display = 'none';
			login.style.display='none';
			user.style.display='block';
//			userInfo.innerHTML=usn;
		} else {
			reg.style.display = 'block';
			login.style.display='block';
			user.style.display='none';
		}
	}
	updateStatus();

}