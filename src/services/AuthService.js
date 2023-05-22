import fetch from 'auth/FetchInterceptor'

const AuthService = {}


AuthService.login = function (data) {
	console.log("object");
	return fetch({
		url: '/Login',
		method: 'post',
		data: JSON.stringify(data)
	})
}

AuthService.register = function (data) {
	return fetch({
		url: '/auth/register',
		method: 'post',
		data: data
	})
}

AuthService.logout = function () {
	return fetch({
		url: '/auth/logout',
		method: 'post'
	})
}

AuthService.loginInOAuth = function () {
	return fetch({
		url: '/auth/loginInOAuth',
		method: 'post'
	})
}

export default AuthService;