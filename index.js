xively.setKey('bKmY9Tj3153tYjWcTrEMmR6ZlPDLxzufq1RWiqxFxTsEv2Q6');
function MainCtrl($scope) {
  $scope.datastreams = {
    RH1: 65,
    Temp1: 65,
	RH2: 65,
	Temp2: 65,
	RH3: 65,
	Temp3: 65,
  };
  //var datastreams = {
  //  user_present: 'false',
  //  total_coins: 0,
  //};
  //$scope.datastreams = {
  //  get user_present( ) { return datastreams.user_present; },
  //  set user_present(x) { datastreams.user_present = x; },
  //  get total_coins( ) { return datastreams.total_coins; },
  //  set total_coins(x) { datastreams.total_coins = x; },
  //};
  $scope.feed_id = "657709964";
  angular.forEach(Object.keys($scope.datastreams), function( ds ) {
  //for ds in Object.keys($scope.datastreams) {
    xively.datastream.get( $scope.feed_id, ds, function( data ) {  
      $scope.$apply(function(){
        $scope.datastreams[ds] = data.current_value;
      });
      xively.datastream.subscribe( $scope.feed_id, ds, function( event, data ) {
        $scope.$apply(function(){
          $scope.datastreams[ds] = data.current_value;
        });
      });
    });
  });
};
