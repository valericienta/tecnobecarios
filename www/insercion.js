 var titulo;
                var subTitle;
                var defered = $q.defer();
                var promise = defered.promise;

                if ($scope.acepta != true) {
                    $ionicPopup.show({
                        title: 'Advertencia',
                        subTitle: 'Debe aceptar condiciones de la convocatoria antes de enviar su solicitud',
                        scope: $scope,
                        buttons: [
                            {
                                text: 'Aceptar',
                                type: 'boton'
                            }
                        ]
                    });
                }
                else {
                    srvServicios.buscarInscripto().then(function (datos) {
                        defered.resolve(datos);
                        if (datos.length > 0) {
                            var urlGrabar = urlHost + 'grabarInscripcion.php';
                            var urlAlternativa = urlHost + 'grabarPlano.php';
                            var errorCritico = false;
                            var datos;
                            titulo = 'Advertencia';
                            subTitle = 'Se ha producido un error de conexión intente luego';
                            srvServicios.devolverJson()
                                .then(function (datosJson) {
                                    defered.resolve(datosJson);
                                    var datos = datosJson;
                                    $ionicLoading.show();
                                    $http({
                                        method: 'POST',
                                        url: urlGrabar,
                                        data: datos,
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    })
                                        .success(function (resultadoInsercion) {
                                            defered.resolve(resultadoInsercion);
                                            $ionicLoading.hide();
                                            switch (resultadoInsercion) {
                                                case 'INSERCION.COMPLETA':
                                                    titulo = 'Inscripción Enviada';
                                                    subTitle = 'Su Inscripción ha sido enviada correctamente';
                                                    break;
                                                case 'CUIL.EXISTE':
                                                    titulo = 'Advertencia';
                                                    subTitle = 'Ya tiene una inscripción registrada';
                                                    break;
                                                default:
                                                    errorCritico = true;
                                                    break;
                                            }
                                            if (!errorCritico) {
                                                $ionicPopup.show({
                                                    title: titulo,
                                                    subTitle: subTitle,
                                                    scope: $scope,
                                                    buttons: [
                                                        {
                                                            text: 'Aceptar',
                                                            type: 'boton'
                                                        }
                                                    ]
                                                });
                                            }
                                            else {
                                                       debugger;
                                                $http({
                                                    method: 'POST',
                                                    url: urlAlternativa,
                                                    data: datos,
                                                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                                })
                                                    .success(function (resultadoPlano) {
                                                        debugger;
                                                        defered.resolve(resultadoPlano);
                                                        switch (resultadoPlano) {
                                                            case 'INSERCION.MANUAL.OK':
                                                                titulo = 'Inscripción Enviada';
                                                                subTitle = 'Su Inscripción ha sido enviada correctamente';
                                                                break;
                                                            case 'INSERCION.MANUAL.ERROR':
                                                                titulo = 'Advertencia';
                                                                subTitle = 'Se ha producido un error de conexión intente luego';
                                                                break;
                                                        }
                                                    })
                                                    .error(function (errorPlano) {
                                                        debugger;
                                                        defered.reject(errorPlano);
                                                        titulo = 'Advertencia';
                                                        subTitle = 'Se ha producido un error de conexión intente luego';
                                                    })

                                                $ionicPopup.show({
                                                    title: titulo,
                                                    subTitle: subTitle,
                                                    scope: $scope,
                                                    buttons: [
                                                        {
                                                            text: 'Aceptar',
                                                            type: 'boton'
                                                        }
                                                    ]
                                                });

                                            }
                                        })
                                        .error(function (errorInsercion) {
                                            $ionicLoading.hide();
                                            titulo = 'Advertencia';
                                            subTitle = 'Se ha producido un error de conexión intente luego';
                                            $ionicPopup.show({
                                                title: titulo,
                                                subTitle: subTitle,
                                                scope: $scope,
                                                buttons: [
                                                    {
                                                        text: 'Aceptar',
                                                        type: 'boton'
                                                    }
                                                ]
                                            });
                                        })
                                })
                                .catch(function (response) {
                                    $ionicPopup.show({
                                        title: 'Advertencia',
                                        subTitle: 'Se ha producido un error al obtener los datos',
                                        scope: $scope,
                                        buttons: [
                                            {
                                                text: 'Aceptar',
                                                type: 'boton'
                                            }
                                        ]
                                    });
                                })
                        }
                        else {
                            //NO ENCONTRO EL JSON
                          
                        }
                    })
                }