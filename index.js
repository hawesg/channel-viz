xively.setKey('bKmY9Tj3153tYjWcTrEMmR6ZlPDLxzufq1RWiqxFxTsEv2Q6');
angular.module('myModule', ['ui.bootstrap']);
function MainCtrl($scope) {
  $scope.max = {
	RH1: 65,
	RH2: 65,
	RH3: 65,
	RH4: 65,
	Temp1: 65,
	Temp2: 65,
	Temp3: 65,
	Temp4: 65,
  };
  $scope.min = {
	RH1: 65,
	RH2: 65,
	RH3: 65,
	RH4: 65,
	Temp1: 65,
	Temp2: 65,
	Temp3: 65,
	Temp4: 65,
  };
  $scope.datastreams = {
    RH1: 65,
    Temp1: 65,
	RH2: 65,
	Temp2: 65,
	RH3: 65,
	Temp3: 65,
	RH4: 65,
	Temp4: 65,
  };
  $scope.feed_id = "657709964";
  angular.forEach(Object.keys($scope.datastreams), function( ds ) {
    xively.datastream.get( $scope.feed_id, ds, function( data ) {  
      $scope.$apply(function(){
        $scope.datastreams[ds] = data.current_value;
		$scope.max[ds] = data.max_value;
		$scope.min[ds] = data.min_value;
      });
      xively.datastream.subscribe( $scope.feed_id, ds, function( event, data ) {
        $scope.$apply(function(){
          $scope.datastreams[ds] = data.current_value;
		  $scope.max[ds] = data.max_value;
		  $scope.min[ds] = data.min_value;
        });
      });
    });
  });
};
