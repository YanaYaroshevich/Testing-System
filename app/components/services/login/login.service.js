'use strict';

angular.module('login')

.service('loginService', ['$http', '$state', '$rootScope', function($http, $state, $rootScope){
    return {
        login: function(form, rememberMe){
            return $http.post('/rest/login', form).then(function(res){
                if(res.data.noErrors){
                    $rootScope.account = res.data.account;
                    $rootScope.id = res.data.account._id;
                    if (rememberMe){
                        if(typeof(Storage) != 'undefined') {
                            localStorage.setItem('id', res.data.account._id);
                        }
                    }    
                    else {
                        if(typeof(Storage) != 'undefined') {
                            localStorage.removeItem('id');
                        }
                    }
                    $state.go('main');
                    return {
                        wrongInput: false
                    }
                }
                else {
                    return  {
                        wrongInput: true,
                        errData: ''
                    };
                }
            }, function(err){
                return {
                    wrongInput: true,
                    errData: err.data
                };
            });
        }
    };
}]);