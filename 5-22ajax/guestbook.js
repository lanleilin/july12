window.onload = function() {

	function id(id) {
		return document.getElementById(id);
	}

	//验证用户名
	id('username1').onkeyup = function() {
			var url = '/5-22ajax/guestbook/index.php';
			var data = 'm=index&a=verifyUserName&username=' + id('username1').value;
			ajax('get', url, data, function(str) {
				//			console.log(str);
				var js = JSON.parse(str);
				//			console.log(js);
				id('verifyUserNameMsg').innerHTML = js.message;
				if(js.code) {
					id('verifyUserNameMsg').style.color = "red";
				} else {
					id('verifyUserNameMsg').style.color = "green";

				}
			})
		}
		//注册和登录功能
		/*
	用户注册
	get/post
		guestbook/index.php
			m : index
			a : reg
			username : 要注册的用户名
			password : 注册的密码
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	id('btnReg').onclick = function() {

		var url = '/5-22ajax/guestbook/index.php';
		var data = 'm=index&a=reg&username=' + id('username1').value + '&password=' + id('password1').value;
		ajax('post', url, data, function(str) {
			//			console.log(str);
			var regStr = JSON.parse(str);
			console.log(regStr);
			if(regStr.code) {
				alert(regStr.message);
			} else {
				alert(regStr.message);
			}
		})
	}

	id('btnLogin').onclick = function() {
			var url = '/5-22ajax/guestbook/index.php';
			var data = 'm=index&a=login&username=' + id('username2').value + '&password=' + id('password2').value;
			ajax('post', url, data, function(str) {
				//			console.log(str);
				var loginStr = JSON.parse(str);
				//			console.log(loginStr);

				//			}
				alert(loginStr.message);
			})
		}
		//改变登录状态

	//查看cookie值
	function getCookie(key) {
		var arr1 = document.cookie.split(';');
		for(var i = 0; i < arr1.length; i++) {
			var arr2 = arr1[i].split('='); //=号分割
			if(arr2[0] == key) {
				return arr2[1];
			}
		}
	}
	//function getCookie(key){
	//	return document.cookie;
	//}

	//	function getUsernameCookie(key) {
	//		var arr2 = document.cookie.split(';')[1].split('=')[1];
	//		return(arr2);
	//	}
	//	var usn = getUsernameCookie('username');
	//var usn='lannister';

	function updateStatus() {
		var uid = getCookie('uid');
		var reg = document.getElementById('reg');
		var login = document.getElementById('login');
		var user = document.getElementById('user');
		var userInfo = document.getElementById('userinfo');

		//		if(uid) {
		//			reg.style.display = 'none';
		//			login.style.display = 'none';
		//			user.style.display = 'block';
		//			userInfo.innerHTML = usn;
		//			alert('yes');
		//		} else {
		//			reg.style.display = 'block';
		//			login.style.display = 'block';
		//			user.style.display = 'none';
		//			alert('no');
		//		}

	}
	updateStatus();
	/*
	用户退出
	get/post
		guestbook/index.php
			m : index
			a : logout
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	id('logout').onclick = function() {
		//		alert('success');
		var url = '/5-22ajax/guestbook/index.php';
		var data = 'm=index&a=logout';
		ajax('post', url, data, function(str) {
			var arr = JSON.parse(str);
			alert(arr.message);
		})

	}

	//留言功能
	/*
	留言
	post
		guestbook/index.php
			m : index
			a : send
			content : 留言内容
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				data : 返回成功的留言的详细信息
					{
						cid : 留言id	
						content : 留言内容 
						uid : 留言人的id
						username : 留言人的名称
						dateline : 留言的时间戳(秒)
						support : 当前这条留言的顶的数量
						oppose : 当前这条留言的踩的数量
					}
				message : 返回的信息 具体返回信息
			}
	*/
	function createList(str) {
		//			console.log(str);
		var contentStr = JSON.parse(str);
					console.log(contentStr);

		var oDl = document.createElement('dl');
		var oDt = document.createElement('dd');
		var oStrong = document.createElement('strong');
		var oList = document.createElement('div');
		oList.id = 'list';

		oStrong.innerHTML = contentStr.data.username + '  说: ';
		oDt.appendChild(oStrong);
		var oDd1 = document.createElement('dd');
		oDd1.innerHTML = contentStr.data.content;
		var oDd2 = document.createElement("dd");
		oDd2.className = 't';

		var a1 = document.createElement('a');
		var a2 = document.createElement('a');
		a1.innerHTML = '点赞(<span>' + contentStr.data.support + ')</span>';
		a2.innerHTML = '反对(<span>' + contentStr.data.oppose + ')</span>';
		oDd2.appendChild(a1);
		oDd2.appendChild(a2);
		oDd1.appendChild(oDd2);

		oList.appendChild(oDt);

		oList.appendChild(oDd1);
		id('myList').appendChild(oList);

	}

	function createAl(str) {
		var oDl = document.createElement('dl');
		var oDt = document.createElement('dd');
		var oStrong = document.createElement('strong');
		var oList = document.createElement('div');
		oList.id = 'list';

		oStrong.innerHTML = str.username + '  说: ';
		oDt.appendChild(oStrong);
		var oDd1 = document.createElement('dd');
		oDd1.innerHTML = str.content;
		var oDd2 = document.createElement("dd");
		oDd2.className = 't';

		var a1 = document.createElement('a');
		var a2 = document.createElement('a');
		a1.innerHTML = '点赞(<span class="like">' + str.support + ')</span>';
		a2.innerHTML = '反对(<span class="against">' + str.oppose + ')</span>';
		oDd2.appendChild(a1);
		oDd2.appendChild(a2);
		oDd1.appendChild(oDd2);

		oList.appendChild(oDt);

		oList.appendChild(oDd1);
		id('myList').appendChild(oList);

	}

	id('btnPost').onclick = function() {
		var url = '/5-22ajax/guestbook/index.php';
		var data = 'm=index&a=send&content=' + id('content').value;
//		console.log(id('content').value);
		ajax('post', url, data,createList);
	}

	//初始化留言列表
	function showList() {
		var url = '/5-22ajax/guestbook/index.php';
		var data = 'm=index&a=getList&page=1&n=2';
		ajax('post', url, data, function(str) {
			var showArr = JSON.parse(str);
						console.log(showArr);
			var list = showArr.data.list;
//						console.log(list[1]);
			//			var list1=list[1];
			//			createAl(list1);
			for(var i = 0; i < list.length; i++) {
				createAl(list[i]);
			}
		})
	}
	showList();

	//点赞功能
	/*
	顶贴
	post
		guestbook/index.php
			m : index
			a : doSupport
			cid :对应帖子的id
		返回
			{
				code : 返回的信息代码 0 = 没有错误，1 = 有错误
				message : 返回的信息 具体返回信息
			}
	*/
	function like() {
		var url = '/5-22ajax/guestbook/index.php';
		var data = 'm=index&a=doSupport&cid=1';
		id('likeFirst').onclick = function() {
			ajax('post', url, data, function(str) {
				var arr = JSON.parse(str);
//				console.log(arr);
				alert(arr.message);
			})
		}

	}
	like();

}