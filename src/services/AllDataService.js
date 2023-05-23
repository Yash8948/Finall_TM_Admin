import fetch from 'auth/FetchInterceptor'
// import ApirService from "./ApiService"
const AllDataService = {}


AllDataService.admin_Dashboard = function (data) {
	// console.log("object");
	return fetch({
		url: '/AdminDashboard',
		method: 'post',
		data: JSON.stringify(data)
	})
}

export default AllDataService;