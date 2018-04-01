angular.module('meanhotel').controller('HotelsController', HotelsController);

function HotelsController(hotelDataFactory) {
    console.log("Getting here?");
    var vm = this;
    vm.title = 'MEAN Hotel App';
    hotelDataFactory.hotelList().then(function(response) {
        console.log(response);
        vm.hotels = response;
    })
}
