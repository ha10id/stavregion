(function(){
	$(".button-collapse").sideNav({
		closeOnClick: true
	});
	$('.modal-trigger').leanModal();

	var app = angular.module('natzaim_landing',['ui.mask']);

	app.directive('integer', function(){
	    return {
	        require: 'ngModel',
	        link: function(scope, ele, attr, ctrl){
	            ctrl.$parsers.unshift(function(viewValue){
	                return parseInt(viewValue, 10);
	            });
	        }
	    };
	});

	app.controller('AnketaCtrl', ['$scope' ,'$http', function($scope, $http){
		self=this;

		this.summ = {
			'min' : 10000,
			'max' : 30000,
			'current':17000
		};
		this.days = {
			'min' : 14,
			'max' : 196,
			'current':98
		};
		this.stavka = 0;
		this.period = 14;
		$scope.$watchGroup(['anketa.summ.current', 'anketa.days.current', 'anketa.stavka'], function(newValues){
			$scope.calcParams = newValues;
			self.period = 14;

			if (newValues[0] < 10000){
				self.summ.current = self.summ.min;
			} else if (newValues[0] > 30000){
				self.summ.current = self.summ.max;
			}

		     if (newValues[1]>=14 && newValues[1]<=30){
		      newValues[2] = 2.3;
		      self.period = 7;
		     } else if (newValues[1]>30 && newValues[1]<=60){
		      newValues[2] = 1.28;
		     } else if (newValues[1]>60 && newValues[1]<=196){
		      newValues[2] = 1.04;
		     } else if(newValues[1]> self.days.max) {
		     	self.days.current = self.days.max;
		     } else if (newValues[1] < self.days.min) {
		     	self.days.current = self.days.min;
		     } else{
		     	self.days.current = self.days.min;
		     }

		     ann = newValues[1]/self.period;

		     $scope.result = (newValues[0] * ((newValues[2]/100) * self.period) * Math.pow((1 + ((newValues[2]/100) * self.period)), ann)) / (Math.pow((1 + ((newValues[2]/100) * self.period)), ann)-1) * ann;
		     $scope.result = $scope.result/ann;
		     
		   });

		$scope.submitted = false;
		$scope.submit = function() {
		    if ($scope.anketa_form.$valid) {
		      // alert(self.fio);
		      window.onload = function(){
		      	console.log('yupiiie;');
		      	yaCounter31456878.reachGoal('landing_click');
		      };
		      
		      document.getElementById("message").textContent = "";

		      var request = $http({
		          method: "post",
		          url: window.location.href + "anketa.php",
		          data: {
		              fio: self.fio,
		              birthdate: self.birthdate,
		              crhist:self.data.credit_history,
		              phone:self.phone,
		              income:self.income,
		              city:self.city,
		              street:self.street,
		              house:self.house,
		              appart:self.appart,
		              passportSer:self.passport.serie,
		              passportId:self.passport.id,
		              passportBD:self.passport.birthdate,
		              passportFather:self.passport.father,
		              stavka: $scope.calcParams[2],
		              pay: $scope.result.toFixed(1),
		              summ: $scope.anketa.summ.current,
		              days: $scope.anketa.days.current

		          },
		          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
		      });

		      /* Check whether the HTTP Request is successful or not. */
		      request.success(function (data) {
		       document.getElementById("message").textContent = "Заявка отправлена. В ближайшее время с Вами свяжется наш менеджер. "+ data;
		      });
		      request.error(function (data) {
		      	console.log('xuynya');
		      });
		    } else {
		      // alert(window.location.href + "anketa.php");
		      	console.log('bbb');
		      	$scope.anketa_form.submitted = true;
		    }
		}

	}]);


	app.directive('tqValidateAfter', [function() {
	  var validate_class = "tq-validate";
	  return {
	    restrict: 'A',
	    require: 'ngModel',
	    link: function(scope, element, attrs, ctrl) {
	      ctrl.validate = false;
	      
	      element.bind('focus', function(evt) {
	        if(ctrl.validate && ctrl.$invalid) // if we focus and the field was invalid, keep the validation
	        {
	          element.addClass(validate_class);
	          scope.$apply(function() {ctrl.validate = true;});
	        }
	        else
	        {
	          element.removeClass(validate_class);
	          scope.$apply(function() {ctrl.validate = false;});
	        }
	        
	      }).bind('blur', function(evt) {
	        element.addClass(validate_class);
	        scope.$apply(function() {ctrl.validate = true;});
	      });
	    }
	  }
	}]);

})();
