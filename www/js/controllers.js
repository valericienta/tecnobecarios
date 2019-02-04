angular.module('app.controllers', [])

.controller('inicioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams) {


    }
])

.controller('inscribirmeCtrl', ['$scope', '$stateParams', '$state', '$rootScope', '$http', '$ionicLoading', 'BaseDatos', 'srvServicios', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $state, $rootScope, $http, $ionicLoading, BaseDatos, srvServicios, $ionicPopup) {

        function cargarAreas() {
            $ionicLoading.show();
            $http.get("https://ceprocor.com/tecnobecas/obtenerJson.php?f=unidades")
                .success(function(response) {
                    $scope.unidades = response;
                    $ionicLoading.hide();
                })
                .error(function(data) {
                    $ionicLoading.hide();
                    title = 'Advertencia';
                    subTitle = 'Debe tene conexión a internet al menos en esta etapa';
                    $ionicPopup.show({
                        title: title,
                        subTitle: subTitle,
                        scope: $scope,
                        buttons: [{
                            text: 'Aceptar',
                            type: 'boton'
                        }]
                    })
                });
        }

        function mostrar() {
            cargarAreas();
            srvServicios.buscarInscripto().then(function(datos) {
                if (datos.length > 0) {
                    $scope.apellido = datos[0].apellido;
                    $scope.cuil = datos[0].cuil;
                    $scope.fecha_nac = new Date(datos[0].fecha_nac);
                    $scope.domicilio = datos[0].domicilio;
                    $scope.localidad = datos[0].localidad;
                    $scope.provincia = datos[0].provincia;
                    $scope.telefono = datos[0].telefono;
                    $scope.email = datos[0].email;
                    $scope.id_lab1 = datos[0].id_lab1;
                    $scope.id_lab2 = datos[0].id_lab2;
                }
            })
        }

        mostrar();

        // cargarAreas();

        $scope.GrabarDatos = function() {
            if ($scope.apellido == undefined || $scope.apellido == "" || $scope.cuil == undefined || $scope.cuil == "" || $scope.fecha_nac == undefined || $scope.fecha_nac == "" || $scope.domicilio == undefined || $scope.domicilio == "" || $scope.localidad == undefined || $scope.localidad == "" || $scope.provincia == undefined || $scope.provincia == "" || $scope.telefono == undefined || $scope.telefono == "" || $scope.email == undefined || $scope.email == "" || $scope.id_lab1 == undefined) {
                title = 'Advertencia';
                subTitle = 'Todas las casillas debe estar completas';
                $ionicPopup.show({
                    title: title,
                    subTitle: subTitle,
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            } else {
                srvServicios.insertarInscripto($scope.apellido, $scope.cuil, $scope.fecha_nac, $scope.domicilio, $scope.localidad, $scope.provincia, $scope.telefono, $scope.email, $scope.id_lab1, $scope.id_lab2)
                    .then(function(response) {
                        // console.log(response);
                        title = 'Confirmación';
                        subTitle = 'Se grabó con éxito sus datos personales, puede seguir ingresando';
                        $ionicPopup.show({
                            title: title,
                            subTitle: subTitle,
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        })

                    })
                    .catch(function(error) {
                        $ionicPopup.show({
                            title: title,
                            subTitle: error,
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        })
                    })

            }
        }

    }
])

.controller('historiaLaboralCtrl', ['$scope', '$stateParams', 'srvServicios', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, srvServicios, $ionicPopup) {

        mostrarListado();

        function mostrarListado() {

            srvServicios.buscarHistoriaLaboral().then(function(items) {
                console.log(items);
                $scope.listado = items;
            })
        }




        $scope.agregarHistoriaLaboral = function() {

            if ($scope.actividad == undefined || $scope.periodo == undefined || $scope.lugar == undefined || $scope.telefono == undefined) {
                title = 'Advertencia';
                subTitle = 'Todas las casillas debe estar completas';
                $ionicPopup.show({
                    title: title,
                    subTitle: subTitle,
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            } else {
                srvServicios.insertarHistoriaLaboral($scope.actividad, $scope.periodo, $scope.lugar, $scope.telefono).then(function(response) {
                    mostrarListado();
                    $scope.actividad = undefined;
                    $scope.periodo = undefined;
                    $scope.lugar = undefined;
                    $scope.telefono = undefined;
                    title = 'Confirmación';
                    subTitle = 'Se grabó con éxito la formación, puede seguir ingresando';
                    $ionicPopup.show({
                            title: title,
                            subTitle: subTitle,
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        })
                        // srvServicios.insertarHistoriaLaboral($scope.actividad, $scope.periodo, $scope.lugar, $scope.telefono).then(function (response) {
                        //     mostrarListado();
                        // })
                })
            }
        }

        $scope.eliminarHistoriaLaboral = function(nrofila) {
            srvServicios.eliminarHistoriaLaboral(nrofila).then(function() {
                mostrarListado();
            })
        }
    }
])


.controller('educaciNCtrl', ['$scope', '$stateParams', 'BaseDatos', '$state', 'srvServicios', '$cordovaCamera', '$http', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, BaseDatos, $state, srvServicios, $cordovaCamera, $http, $ionicPopup) {

        mostrarListado();

        $scope.takePicture = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 771,
                targetHeight: 540,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            }

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                localStorage.setitem("imagen", imageData);
            }, function(err) {
                $ionicPopup.show({
                    title: title,
                    subTitle: err,
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            });
        };

        function imgToURI() {
            var img = document.getElementById("imagenCert");
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            return canvas.toDataURL('image/png');
        }

        $scope.agregarEducacion = function() {
            var imgCertificado = $scope.imgURI;
            if ($scope.tipo_educacion == undefined || $scope.centro == undefined || $scope.titulo == undefined) {
                title = 'Advertencia';
                subTitle = 'Todas las casillas debe estar completas';
                $ionicPopup.show({
                    title: title,
                    subTitle: subTitle,
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            } else {
                srvServicios.insertarEducacion($scope.tipo_educacion, $scope.centro, $scope.titulo, imgCertificado).then(function(response) {
                    title = 'Confirmación';
                    subTitle = 'Se grabó con éxito la formación, puede seguir ingresando';
                    $ionicPopup.show({
                        title: title,
                        subTitle: subTitle,
                        scope: $scope,
                        buttons: [{
                            text: 'Aceptar',
                            type: 'boton'
                        }]
                    })
                    $scope.centro = undefined;
                    $scope.titulo = undefined;
                    $scope.tipo_educacion = undefined;
                    document.getElementById('imagenCert').src = "#";
                    mostrarListado();
                })
            }

        }

        function mostrarListado() {

            srvServicios.buscarEducacion().then(function(items) {
                $scope.listado = items;
            })
        }

        $scope.eliminarEducacion = function(nroestudio) {
            srvServicios.eliminarEducacion(nroestudio).then(function() {
                mostrarListado();
            })
        }
    }
])



.controller('cursosDeFormaciNCtrl', ['$scope', '$stateParams', 'BaseDatos', '$state', 'srvServicios', '$cordovaCamera', '$ionicPopup', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, BaseDatos, $state, srvServicios, $cordovaCamera, $ionicPopup) {

        $scope.takePicture = function() {
            var options = {
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                allowEdit: true,
                encodingType: Camera.EncodingType.JPEG,
                targetWidth: 771,
                targetHeight: 540,
                popoverOptions: CameraPopoverOptions,
                saveToPhotoAlbum: false
            }

            $cordovaCamera.getPicture(options).then(function(imageData) {
                $scope.imgURI = "data:image/jpeg;base64," + imageData;
                localStorage.setitem("imagen", imageData);
            }, function(err) {
                $ionicPopup.show({
                    title: 'Error',
                    subTitle: 'No se puede acceder a la cámara',
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            });
        };

        function imgToURI() {
            var img = document.getElementById("imagenCert");
            var canvas = document.createElement("canvas");
            var context = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            context.drawImage(img, 0, 0);
            return canvas.toDataURL('image/png');
        }
        mostrarListado();



        $scope.guardarCurso = function() {

            var imgCertificado = $scope.imgURI;
            if ($scope.curso == undefined || $scope.centro == undefined || $scope.anio == undefined || $scope.duracion == undefined || $scope.imgURI == undefined) {
                title = 'Advertencia';
                subTitle = 'Todas las casillas debe estar completas';
                $ionicPopup.show({
                    title: title,
                    subTitle: subTitle,
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            } else {

                if ($scope.idioma == undefined) $scope.idioma = false;
                if ($scope.evaluacion == undefined) $scope.evaluacion = false;
                srvServicios.insertarCurso($scope.curso, $scope.centro, $scope.idioma, $scope.evaluacion, $scope.anio, $scope.duracion, imgCertificado).then(function(response) {
                    title = 'Confirmación';
                    subTitle = 'Se grabó con éxito el curso, puede seguir ingresando';
                    $ionicPopup.show({
                        title: title,
                        subTitle: subTitle,
                        scope: $scope,
                        buttons: [{
                            text: 'Aceptar',
                            type: 'boton'
                        }]
                    })
                    $scope.curso = undefined;
                    $scope.centro = undefined;
                    $scope.anio = undefined;
                    $scope.duracion = undefined;
                    $scope.idioma = undefined;
                    $scope.evaluacion = undefined;
                    document.getElementById('imagenCert').src = "#";
                    mostrarListado();
                })

            }
        }


        function mostrarListado() {

            // $scope.imagen = localStorage.getItem("lastImage");
            srvServicios.buscarCurso().then(function(items) {
                for (var i = items.length - 1; i >= 0; i--) {
                    if (items[i].idioma) items[i].idioma = "Sí";
                    else items[i].idioma = 'No';
                    if (items[i].evaluacion) items[i].evaluacion = "Sí";
                    else items[i].evaluacion = 'No';
                }
                $scope.listado = items;
            })
        }

        $scope.eliminarCurso = function(nrocurso) {

            srvServicios.eliminarCurso(nrocurso).then(function() {

                    mostrarListado();
                },
                function(error) {
                    console.log(error);
                })
        }
    }
])


.controller('basesCtrl', ['$scope', '$stateParams', '$http', 'srvServicios', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, srvServicios) {

        $scope.llamarPromesa = function() {

            srvServicios.getMessages(function(messages) {
                $scope.messages = messages;

            });
        }

        $scope.llamarconPromesa = function() {
            srvServicios.getMessagesconPromesa().then(function(messages) {
                $scope.messages = messages;
            });

        }

    }
])


.controller('cronogramaCtrl', ['$scope', '$stateParams', '$http', '$ionicLoading', 'srvServicios', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, $http, $ionicLoading, srvServicios) {

        function buscarFechas() {

            $ionicLoading.show();
            $http.get("https://ceprocor.com/tecnobecas/obtenerJson.php?f=fechas")
                .success(function(response) {
                    $ionicLoading.hide();
                    $scope.fechas = response;
                })
                .error(function(data) {
                    $ionicLoading.hide();
                });

        }
        buscarFechas();

        $scope.listar = function() {
            srvServicios.devolverJson().then(function(datos) {
                console.log(datos);
            })
        }
    }
])

.controller('consultaCtrl', ['$scope', '$stateParams', 'srvServicios', '$ionicLoading', '$http', '$ionicPopup', 'urlHost', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, srvServicios, $ionicLoading, $http, $ionicPopup, urlHost) {
        function mostrarDato() {
            srvServicios.buscarInscripto().then(function(datos) {
                if (datos.length > 0)
                    $scope.mail_contacto = datos[0].email;
            })
        }

        mostrarDato();


        $scope.enviar = function() {
            $ionicLoading.show();
            srvServicios.buscarInscripto().then(function(datos) {
                if (datos.length > 0)
                    $scope.mail_contacto = datos[0].email;
            })

            if ($scope.mail_contacto == undefined || $scope.cuerpo == undefined) {
                $ionicLoading.hide();
                $ionicPopup.show({
                    title: 'Advertencia: debe completar sus datos personales antes de enviar consultas',
                    subTitle: 'Intente más tarde o escriba a consultas@ceprocor.uncor.edu',
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                })
            } else {

                var urlGrabar = urlHost + 'ConsultasPorMail.php';
                var datos = {
                    'mail_contacto': $scope.mail_contacto,
                    'consulta': $scope.cuerpo
                };

                $http({
                        method: 'POST',
                        url: urlGrabar,
                        data: datos,
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(function(data) {
                        $ionicLoading.hide();
                        $ionicPopup.show({
                            title: 'Consulta Enviada',
                            subTitle: 'Su consulta ha sido enviada correctamente',
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        })

                    })
                    .error(function(error) {
                        $ionicLoading.hide();
                        $ionicPopup.show({
                            title: 'No se pudo enviar su consulta',
                            subTitle: 'Intente más tarde o escriba a consultas@ceprocor.uncor.edu',
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        })
                    })
            }
        }
    }
])


.controller('enviarInscripcionCtrl', ['$scope', '$stateParams', 'srvServicios', '$http', '$ionicLoading', '$ionicPopup', 'urlHost', '$q', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
    // You can include any angular dependencies as parameters for this function
    // TIP: Access Route Parameters for your page via $stateParams.parameterName
    function($scope, $stateParams, srvServicios, $http, $ionicLoading, $ionicPopup, urlHost, $q) {
        mostrarDatos();

        function mostrarDatos() {
            srvServicios.buscarInscripto().then(function(datos) {
                if (datos.length > 0) {
                    $scope.apellido = datos[0].apellido;
                    $scope.cuil = datos[0].cuil;
                    $scope.fecha_nac = new Date(datos[0].fecha_nac);
                    $scope.domicilio = datos[0].domicilio;
                    $scope.localidad = datos[0].localidad;
                    $scope.telefono = datos[0].telefono;
                    $scope.email = datos[0].email;
                    $scope.id_lab1 = datos[0].id_lab1;
                    $scope.id_lab2 = datos[0].id_lab2;
                    $scope.provincia = datos[0].provincia;
                }
            })

            srvServicios.buscarHistoriaLaboral().then(function(items) {
                $scope.listadoLaboral = items;
            })

            srvServicios.buscarEducacion().then(function(items) {
                $scope.listadoEducacion = items;
            })

            srvServicios.buscarCurso().then(function(items) {
                for (var i = items.length - 1; i >= 0; i--) {
                    if (items[i].idioma) items[i].idioma = "Sí";
                    else items[i].idioma = 'No';
                    if (items[i].evaluacion) items[i].evaluacion = "Sí";
                    else items[i].evaluacion = 'No';
                }
                $scope.listadoCursos = items;
            })
        }

        $scope.enviar = function() {

            if ($scope.acepta != true) {
                $ionicPopup.show({
                    title: 'Advertencia',
                    subTitle: 'Debe aceptar condiciones de la convocatoria antes de enviar su solicitud',
                    scope: $scope,
                    buttons: [{
                        text: 'Aceptar',
                        type: 'boton'
                    }]
                });
            } else {
                $ionicLoading.show();
                srvServicios.buscarInscripto().then(function(datos) {
                    if (datos.length != 0) {
                        if ($scope.pariente == undefined) $scope.pariente = 'No';
                        srvServicios.insertarEnBase($scope.pariente)
                            .then(function(resultado) {
                                $ionicLoading.hide();
                                $ionicPopup.show({
                                    title: resultado.title,
                                    subTitle: resultado.message,
                                    scope: $scope,
                                    buttons: [{
                                        text: 'Aceptar',
                                        type: 'boton'
                                    }]
                                });
                            })
                            .catch(function() {
                                $ionicLoading.hide();
                                $ionicPopup.show({
                                    title: 'Advertencia',
                                    subTitle: 'Se ha producido un error de conexión intente luego',
                                    scope: $scope,
                                    buttons: [{
                                        text: 'Aceptar',
                                        type: 'boton'
                                    }]
                                });
                            });
                    } else {
                        $ionicLoading.hide();
                        $ionicPopup.show({
                            title: 'Advertencia',
                            subTitle: 'No ha ingresado los datos necesarios para la inscripcion',
                            scope: $scope,
                            buttons: [{
                                text: 'Aceptar',
                                type: 'boton'
                            }]
                        });
                    }
                })




            }

        }
    }
])