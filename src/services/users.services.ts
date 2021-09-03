import $axios from '../plugins/axios'

class UserService {

	login(data: any) {

		return $axios.post(`/data/Users`, data)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	register(data: any) {

		return $axios.post(`/data/Users`, data)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

	getAllUsers() {

		return $axios.get(`/data/Users?loadRelations=role`)
			.then(res => {

				return res.data;
			})
			.catch((error) => {

				console.log(error)
				throw error;
			})
	}

}

export default new UserService();
