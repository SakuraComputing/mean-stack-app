angular.module('meanhotel').factory('AuthInterceptor', AuthInterceptor);

function AuthInterceptor($q, $window, AuthFactory) {

    return {
        request: request,
        response: response,
        responseError: responseError
    };

    function request(config) {
        config.headers = config.headers || {};
        if($window.sessionStorage.token) {
            config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
        }
        return config;
    }

    function response(response) {
        if (response === 200 && $window.sessionStorage.token && !AuthFactory.isLoggedIn) {
            AuthFactory.isLoggedIn = true;
        }
        if (response === 401) {
            AuthFactory.isLoggedIn = false;
        }
        return response || $q.when(response);
    }

    function responseError(rejection) {
        if(rejection.response === 401 || rejection.response === 403) {
            delete $window.sessionStorage.token;
            AuthFactory.isLoggedIn = false;
            $location.path('/');
        }
        return $q.reject(rejection);
    }
}
