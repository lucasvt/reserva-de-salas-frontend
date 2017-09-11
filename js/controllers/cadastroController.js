var app = angular.module('app');

app.controller('CadastroController', function($scope, $location, $routeParams, $http)
{
    var idReserva = $routeParams.id;// ID enviado por quem requisitou a rota
    if(idReserva){
        // Requisição AJAX para obter a reserva ou criar uma nova
        $http.get('http://localhost:5000/reservas/' + idReserva)
            .then(function(response) {
                $scope.reserva = response.data;
                $scope.reserva.dataInicio = new Date($scope.reserva.dataInicio);
                $scope.reserva.dataFim = new Date($scope.reserva.dataFim);
            });
    } else {
        $scope.reserva = {};
    }

    $scope.locais = [];

    // Requisição AJAX para obter a lista de locais do backend
    $http.get('http://localhost:5000/locais')
        .then(function(response) {
            $scope.locais = response.data;
        });

    $scope.salva = function salva(formularioEhValido) {
        if(!formularioEhValido) return;
        if($scope.reserva._id){
            $http.put('http://localhost:5000/reservas', $scope.reserva)
                .then(function(response) {
                    $location.path('/');
                });
        } else {
            $http.post('http://localhost:5000/reservas', $scope.reserva)
                .then(function(response) {
                    $location.path('/');
                });
        }
    }

    $scope.abreModalEditar = function abreModalEditar(reserva, indice) {
        $scope.reserva = reserva;
        $scope.indice = indice;
        $('#editar').modal('show');
    };

    $scope.cancelar = function cancelar() {
        $location.path("/");

    };
})