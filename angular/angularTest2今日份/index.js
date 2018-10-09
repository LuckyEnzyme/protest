var myApp=angular.module('myApp', ["ui.router"]);
myApp.config(["$stateProvider","$urlRouterProvider", function($stateProvider,$urlRouterProvider){
    $urlRouterProvider.when("","/Page1");

    $stateProvider
        .state("Page1",{
            url:"/Page1",
            templateUrl:"Page1.html",
            controller:"Page1Controller"
        })
        .state("Page2",{
            url:"/Page2",
            templateUrl:"Page2.html",
            controller:"Page2Controller"
        })
        .state("Page3",{
            url:"/Page3",
            templateUrl:"Page3.html"
        })
        .state("Page4",{
            url:"/Page4",
            templateUrl:"Page4.html"
        })
        .state("Page5",{
            url:"/Page5",
            templateUrl:"Page5.html"
        });
}]);
myApp.controller('myCtrl', ['$scope', function ($scope) {
    $scope.nav=[
        {id:1,name:'首页'},{id:2,name:'日志'},{id:3,name:'策略'},{id:4,name:'设置'},{id:5,name:'关于'}
    ];
    $scope.olNav={
        id:1,
        name:"首页"
    };
    $scope.nav.filter(it=>{
        if(it.id==1){
            it.status=true;
        }
        else{
            it.status=false;
        }
    });
    $scope.changeCss=function(id){
        //console.log(id);
        $scope.nav.filter(it=>{
            if(it.id==id){
                it.status=true;
                $scope.olNav.id=id;
                $scope.olNav.name=it.name;
            }
            else{
                it.status=false;
            }
        });
        //console.log($scope.nav);
    };
}]);
myApp.controller('Page1Controller', ['$scope', '$http',function ($scope,$http) {
    $http({
        method:'GET',
        url:'http://127.0.0.1:3000/data/testlist/list'
    }).then(function(res){
        $scope.list=res.data.data;
        console.log($scope.list);
    });
}]);
myApp.controller('Page2Controller', ['$scope','$http',function ($scope,$http) {
    $http({
        method:'GET',
        url:'http://127.0.0.1:3000/data/testlist/list'
    }).then(function(res){
        $scope.list2=res.data.data;
    });
}]);
myApp.filter('changeStatus',function(){
    return function(status){
        return status?'正常':'异常';
    }
})
