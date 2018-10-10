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
myApp.controller('myCtrl', ['$scope', 'config', function ($scope, config) {
    console.log(config,'常量')
    $scope.nav=[
        {id:1,name:'首页'},{id:2,name:'日志'},{id:3,name:'策略'},{id:4,name:'设置'},{id:5,name:'关于'}
    ];
    $scope.olNav={
        id:1,
        name:"首页"
    };
    $scope.olnavText = '';
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
    $scope.$watch("olnavText",function(n,o){
        //console.log(o);
        if(n!=''){
            $scope.$broadcast("olNavChange", n);
        }
        //$scope.$broadcast("olNavChange", n);
    });

    $scope.$on("child1Change",function(e,m){
        $scope.olnavText=m;
        $scope.$broadcast("child2Change",m)
    });
}]);
myApp.controller('Page1Controller', ['$scope', '$http','Data',function ($scope,$http,Data) {
    $scope.searchTxt = '';
    //$scope.child = '';
    $http({
        method:'GET',
        url:'http://127.0.0.1:3000/data/testlist/list'
    }).then(function(res){
        $scope.list=res.data.data;
        //console.log($scope.list);
    });
    //父子控制器的作用域继承，子控制器可以访问父控制器上的数据
    $scope.parentNav=$scope.$parent.nav;
    $scope.data=Data;
   
    //上级向下级传递消息
    $scope.$on("olNavChange",function(e,m){
        //console.log(m);
        $scope.child=m;
    });

    //下级向上级传递消息
    $scope.$watch("child",function(n,o){
        $scope.$emit("child1Change",n);
    });
}]);
myApp.controller('Page2Controller', ['$scope','$http','Data',function ($scope,$http,Data) {
    $scope.child = '';
    $http({
        method:'GET',
        url:'http://127.0.0.1:3000/data/testlist/list'
    }).then(function(res){
        $scope.list2=res.data.data;
    });
    $scope.parentNav=$scope.$parent.nav;
    $scope.data=Data;

    $scope.$on("olNavChange",function(e,m){
        console.log(m);
        $scope.child=m;
    });

    $scope.$on("child2Change",function(e,m){
        $scope.child=m;
    });

}]);
myApp.filter('changeStatus',function(){
    return function(status){
        return status?'正常':'异常';
    }
});
//定义一个service，可以用于任何需要通信的controller之间
myApp.service('Data', [function () {
    var data={};
    return data;
}]);

myApp.constant('config', {
    'name' : 'sendcloud',
    'key': 'sd'
})
