import axios from 'axios';

let $axios = axios.create({
    baseURL: 'https://livelybat.backendless.app/api',
});

$axios.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {

        let errorMessage;

        switch (error.response.status){
            case 404: errorMessage = error.response.data; break;
            case 422: errorMessage = `Validation error`; break;
            default: errorMessage = error.response.data; break;
        }
        
        if (401 === error.response.status) {

            console.log('401');
            // location.replace('/login');
        }

        return Promise.reject(error);
    },
);

export default $axios;