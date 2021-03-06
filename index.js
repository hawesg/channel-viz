xively.setKey('bKmY9Tj3153tYjWcTrEMmR6ZlPDLxzufq1RWiqxFxTsEv2Q6');
angular.module('myModule', ['ui.bootstrap']);
function MainCtrl($scope) {
  $scope.average = {
	RH1: '--',
	RH2: '--',
	RH3: '--',
	RH4: '--',
	Temp1: '--',
	Temp2: '--',
	Temp3: '--',
  };
  $scope.max = {
	RH1: 65,
	RH2: 65,
	RH3: 65,
	RH4: 65,
	Temp1: 65,
	Temp2: 65,
	Temp3: 65,
  };
  $scope.min = {
	RH1: 65,
	RH2: 65,
	RH3: 65,
	RH4: 65,
	Temp1: 65,
	Temp2: 65,
	Temp3: 65,
  };
  $scope.datastreams = {
    RH1: 65,
    Temp1: 65,
	RH2: 65,
	Temp2: 65,
	RH3: 65,
	Temp3: 65,
	RH1_avg: 65,
	RH2_avg: 65,
	RH3_avg: 65,
  };
  $scope.alert_class = {
    RH1: 'good',
    Temp1: 'good',
	RH2: 'good',
	Temp2: 'good',
	RH3: 'good',
	Temp3: 'good',
  };
	$scope.isGoodRH = function(x) {
		return x>=60 && x<=67;
	}
	$scope.isGoodTemp = function(x) {
		return x>=70 && x<=78;
	}
  $scope.feed_id = "657709964";
  angular.forEach(Object.keys($scope.datastreams), function( ds ) {
    xively.datastream.get( $scope.feed_id, ds, function( data ) {  
      $scope.$apply(function(){
        $scope.datastreams[ds] = data.current_value;
		//$scope.max[ds] = $filter('date')(new Date(), 'yyyy-MM-ddTHH:mm:ss.SSSZ');
		$scope.min[ds] = data.min_value;
		$scope.alertClass = (data.current_value >=60 && data.current_value<=67)?'good':'bad';
      });
//History
/*	  var d = new Date( (new Date)*1 - 1000*3600*1 );
	  xively.datastream.history( $scope.feed_id, ds, {'start': d.toISOString(), 'duration': '1hour', 'interval': 0, limit: 1000}, function(data){
		 $scope.datapoints = data.datapoints; // response data
		    $scope.values = [];
			angular.forEach($scope.datapoints, function(point, index){
				$scope.values.push(point.value);
			});
			var sum = 0;
			var invalid = 0;
			for(var i = 0; i < $scope.values.length; i++){
			   if(isNaN($scope.values[i]) || $scope.values[i]==32){
				invalid++;
		  	   }
			   else{
				sum += parseInt($scope.values[i], 10); //don't forget to add the base	
			   }
			}
			console.log(d.toISOString());
			console.log(ds);
			console.log($scope.values.length);
			console.log(sum);
			var avg = sum/($scope.values.length-invalid);
			console.log(avg);
			$scope.average[ds] = avg;
	  });
	*/
      
 	  xively.datastream.subscribe( $scope.feed_id, ds, function( event, data ) {
        $scope.$apply(function(){
          $scope.datastreams[ds] = data.current_value;
		  //$scope.max[ds] = data.max_value;
		  $scope.min[ds] = data.min_value;
		  $scope.alertClass = (data.current_value >=60 && data.current_value<=67)?'good':'bad';
        });
      });
    });
  });
};
