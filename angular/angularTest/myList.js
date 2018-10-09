angular.module('myApp',[])
.controller('listCtrl', ['$scope', '$http', 'customService', function ($scope, $http, customService) {
    $scope.submitData = {};
    $http({
        method:'GET',
        url:'http://127.0.0.1:3000/data/testlist/list'
    }).then(function successCallback(response){
        console.log(response);
        $scope.list=response.data.data;
        $scope.list.map(it=>{it.choose=false;});
        console.log($scope.list);
    });

    $scope.edit=true;
    $scope.editList=function(id){
        console.log(id);
        if(id=='new')
        {
            $scope.edit=true;
            $scope.title="";
            $scope.name="";
            $scope.id=$scope.list.length+1;
            $scope.status="true";
        }
        else{
            $scope.edit=false;
            $scope.id=$scope.list[id-1].id;
            $scope.name=$scope.list[id-1].name;
            $scope.title=$scope.list[id-1].title;
            $scope.status=$scope.list[id-1].status;
        }
    };

    $scope.saveChanges=function(){
        //console.log("success");
        if($scope.id!=null){
            $scope.item={};
            if($scope.edit==true){
                $scope.item.id=$scope.id;
                $scope.item.name=$scope.name;
                $scope.item.title=$scope.title;
                $scope.item.status=$scope.status;
                //console.log(typeof($scope.status));
                //console.log($scope.item,$scope.list);
                $scope.list.push($scope.item);
            }
            else{
                var id=$scope.id-1;
                $scope.list[id].name=$scope.name;
                $scope.list[id].title=$scope.title;
                $scope.list[id].status=$scope.status;
                console.log($scope.item,$scope.list);
            }
            $scope.id="";
            $scope.name="";
            $scope.title="";
            $scope.status=null;
        }
    };
    $scope.deleteList=function(id){
        $scope.list.splice(id-1,1);
    };

    var item = {
        name :'sdasda',
        title:'cccccc',
        status:true
    }
    $scope.submitData = item;

    $scope.selectAll=function(){
        var unchooseList=$scope.list.filter(item=>{return item.choose==false;});
        //console.log(unchooseList.length);
        if(unchooseList.length!=0){
            $scope.list.filter(it=>{
                if(it.choose==false)
                {
                    it.choose=true;
                }
            });
        }
        else{
            $scope.list.filter(it=>{it.choose=!it.choose;});
        }
 
    };
    console.log(customService.add(1,2),'toolkit');
}])
//过滤器，主要用于前端数据状态翻译使用，并不改变实际数据源类型
.filter('changeStatus', function() { //可以注入依赖
    return function(status) {
        return status ? '正常' : '异常';
    }
})
//自定义服务，公用方法的集合，或者是公用的方法库，便于其他模块的调用，一般使用，现定义服务，再在控制器中引入使用
.service('customService', [function () {
    var toolkit = {};
    toolkit.add = function(a,b){
        return a+b;
    };
    return toolkit;
}])