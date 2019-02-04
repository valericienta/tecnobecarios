angular.module('app.services', [])

.value('urlHost', 'https://ceprocor.com/tecnobecas/')
    // .value('urlHost', 'http://valeriagigena.atwebpages.com/')

.value('BaseDatos', function() {
    var db = openDatabase('dbtecnos', '1.0', 'tecnos DB', 2 * 1024 * 1024);
    return db;
})

.factory('srvServicios', function($q, $timeout, $http, urlHost) {
    var data = [];
    var db = openDatabase('dbtecnos', '1.0', 'tecnos DB', 2 * 1024 * 1024);

    return {

        devolverJson: function() {
            var deferred = $q.defer();
            var datosInsertar = {};
            datosCabecera = {};
            var dataEducacion = [];
            var dataLaboral = [];
            var dataCursos = [];

            db.transaction(
                function(tx) {
                    tx.executeSql("SELECT apellido, cuil, fecha_nac, domicilio,localidad, provincia,telefono,email,id_lab1,id_lab2 FROM inscriptos", [],
                        function(tx, registroCabecera) {
                            var dsDatos = registroCabecera.rows;
                            for (var i = dsDatos.length - 1; i >= 0; i--)
                                datosCabecera[i] = dsDatos.item(i);
                            tx.executeSql('SELECT * FROM cursos', [],
                                function(tx, registrosCursos) {
                                    var dataset = registrosCursos.rows;
                                    for (var i = dataset.length - 1; i >= 0; i--)
                                        dataCursos[i] = dataset.item(i);
                                    tx.executeSql('SELECT * FROM historia_laboral', [],
                                        function(tx, registrosHistoriaLaboral) {
                                            var dsHistoria = registrosHistoriaLaboral.rows;
                                            for (var i = dsHistoria.length - 1; i >= 0; i--)
                                                dataLaboral[i] = dsHistoria.item(i);

                                            tx.executeSql('SELECT * FROM estudios', [],
                                                function(tx, registrosEducacion) {
                                                    var dsEstudios = registrosEducacion.rows;
                                                    for (var i = dsEstudios.length - 1; i >= 0; i--)
                                                        dataEducacion[i] = dsEstudios.item(i);

                                                    datosInsertar = {
                                                        "cabecera": datosCabecera,
                                                        "cursos": dataCursos,
                                                        "historiaLaboral": dataLaboral,
                                                        "estudios": dataEducacion
                                                    };
                                                    deferred.resolve(datosInsertar);
                                                }
                                            );
                                        });
                                }

                            );
                        })

                })
            return deferred.promise;
        },

        insertarInscripto: function(apellido, cuil, fecha_nac, domicilio, localidad, provincia, telefono, email, id_lab1, id_lab2) {
            var deferred = $q.defer();
            var idOrden;
            var registros;
            db.transaction(
                function(tx) {
                    tx.executeSql('SELECT * FROM inscriptos', [], function(tx, result) {
                        deferred.resolve(result);
                        registros = result.rows.length
                        if (registros == 1)
                            tx.executeSql('UPDATE inscriptos SET apellido=(?), cuil=(?), fecha_nac=(?), domicilio=(?),localidad=(?), provincia=(?),telefono=(?),email=(?),id_lab1=(?),id_lab2=(?)', [apellido, cuil, fecha_nac, domicilio, localidad, provincia, telefono, email, id_lab1, id_lab2]);
                        else
                            tx.executeSql('INSERT INTO inscriptos (apellido, cuil, fecha_nac, domicilio,localidad, provincia,telefono,email,id_lab1,id_lab2) VALUES (?,?,?,?,?,?,?,?,?,?)', [apellido, cuil, fecha_nac, domicilio, localidad, provincia, telefono, email, id_lab1, id_lab2]);
                    });
                },
                function(error) {
                    deferred.reject('Se produjo un error: ' + error.message);
                },
                function(tx, result) {
                    deferred.resolve("Se inserto el registro");
                }

            )
            return deferred.promise;
        },

        buscarInscripto: function() {
            var deferred = $q.defer()
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM inscriptos', [], function(tx, result) {
                    var dataset = result.rows;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        data[i] = dataset.item(i);
                    }
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        buscarEducacion: function() {
            var deferred = $q.defer()
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM estudios', [], function(tx, result) {
                    var dataset = result.rows;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        data[i] = dataset.item(i);
                    }
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        eliminarEducacion: function(row) {
            var deferred = $q.defer()
            selectAllStatement = "DELETE FROM estudios WHERE nro_orden= " + row;
            console.log(selectAllStatement);
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql(selectAllStatement, [], function(tx, result) {
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        insertarEducacion: function(tipo_estudio, centro, titulo, imagen) {
            var deferred = $q.defer();
            var idOrden;

            db.transaction(
                function(tx) {
                    tx.executeSql('INSERT INTO estudios (tipo_estudio, centro,titulo,foto) VALUES (?,?,?,?)', [tipo_estudio, centro, titulo, imagen]);
                },
                function(error) {
                    deferred.reject('Se produjo un error: ' + erro.message);
                },
                function(tx, result) {
                    deferred.resolve("Se inserto el registro");
                }

            )
            return deferred.promise;
        },

        buscarCurso: function() {
            var deferred = $q.defer()
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM cursos', [], function(tx, result) {
                    var dataset = result.rows;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        data[i] = dataset.item(i);
                    }
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        eliminarCurso: function(row) {
            var deferred = $q.defer()
            db.transaction(function(tx) {
                tx.executeSql("DELETE FROM cursos WHERE nro_orden = " + row, [], function(tx, result) {
                        deferred.resolve(result);
                    },
                    function(error) { deferred.reject(error) })
            })
            return deferred.promise
        },

        insertarCurso: function(curso, centro, idioma, evaluacion, anio, duracion, foto) {
            var deferred = $q.defer();
            var idOrden;

            db.transaction(
                function(tx) {
                    tx.executeSql('INSERT INTO cursos (curso, centro, idioma, evaluacion, anio, duracion, foto) VALUES (?,?,?,?,?,?,?)', [curso, centro, idioma, evaluacion, anio, duracion, foto]);
                },
                function(error) {
                    deferred.reject('Se produjo un error: ' + error.message);
                },
                function(tx, result) {
                    deferred.resolve("Se inserto el registro");
                }

            )
            return deferred.promise;
        },

        buscarHistoriaLaboral: function() {
            var deferred = $q.defer()
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql('SELECT * FROM historia_laboral', [], function(tx, result) {
                    var dataset = result.rows;
                    for (var i = dataset.length - 1; i >= 0; i--) {
                        data[i] = dataset.item(i);
                    }
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        eliminarHistoriaLaboral: function(row) {
            var deferred = $q.defer()
            var data = new Array();
            db.transaction(function(tx) {
                tx.executeSql('DELETE FROM historia_laboral WHERE nro_orden = ' + row, [], function(tx, result) {
                    deferred.resolve(data);
                })
            })
            return deferred.promise
        },

        insertarHistoriaLaboral: function(actividad, periodo, lugar, telefono) {
            return new Promise(function(resolve, reject) {
                db.transaction(function(transaction) {
                    transaction.executeSql('INSERT INTO historia_laboral (actividad, periodo, lugar,telefono) VALUES (?,?,?,?)', [actividad, periodo, lugar, telefono], function(transaction, result) {
                        resolve("Se ejecuto correctamente"); // here the returned Promise is resolved
                    }, function nullHandler(result) {
                        console.log("Null Log : " + JSON.stringfy(result));
                    }, function errorHandler(error) {
                        console.log("Error Log : " + error);
                    });
                });
            });
        },

        insertarEnBase: function(pariente) {
            var deferred = $q.defer();
            var resultado;
            resultado = {
                "title": 'Advertencia',
                "message": 'Se ha producido un error de conexión intente luego'
            };
            this.devolverJson().then(function(datos) {
                datos.cabecera[0]["pariente"] = pariente;
                console.log(datos);
                $http({
                        method: 'POST',
                        url: urlHost + 'grabarInscripcion.php',
                        data: datos,

                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                    })
                    .success(function(resultadoInsercion) {
                        switch (resultadoInsercion) {
                            case 'INSERCION.COMPLETA':
                                resultado = {
                                    "title": 'Inscripción Enviada',
                                    "message": 'Su Inscripción ha sido enviada correctamente'
                                };
                                break;
                            case 'CUIL.EXISTE':
                                resultado = {
                                    "title": 'Advertencia',
                                    "message": 'Ya tiene una inscripción registrada en nuestras bases'
                                };
                                break;
                            default:
                                $http({
                                        method: 'POST',
                                        url: urlHost + 'grabarPlano.php',
                                        data: datos,
                                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                                    })
                                    .success(function(resultadoPlano) {
                                        console.log('6.) Resultado Inserción Normal: ' + resultadoPlano);
                                        switch (resultadoPlano) {
                                            case "INSERCION.MANUAL.OK":
                                                resultado = {
                                                    "title": 'Inscripción Enviada',
                                                    "message": 'Su Inscripción ha sido enviada correctamente'
                                                };
                                                break;
                                            default:
                                                resultado = {
                                                    "title": 'Advertencia',
                                                    "message": 'Se ha producido un error de conexión intente luego'
                                                };
                                                break;
                                        }
                                        deferred.resolve(resultado);
                                    })
                                    .error(function(errorPlano) { deferred.reject(errorPlano); })
                                break;
                        }
                        deferred.resolve(resultado);
                    })
                    .error(
                        function(errorInsercion) { deferred.reject(errorInsercion) }
                    )
            })

            return deferred.promise
        }
    }

});