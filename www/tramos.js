  var deferred = $q.defer();
        var datosInsertar = {};
        var datosCabecera = {};

        var dataEducacion = [];
        var dataLaboral = [];
        var dataCursos = [];
        db.transaction(function (tx) {
          tx.executeSql('SELECT * FROM inscriptos', [], function (tx, registroCabecera) {
            datosCabecera = registroCabecera.rows[0];
            tx.executeSql('SELECT * FROM estudios', [], function (tx, registrosEducacion) {
              var dsEstudios = registrosEducacion.rows;
              deferred.resolve(dataset);
              for (var i = dataset.length - 1; i >= 0; i--)
                dataEducacion[i] = dataset.item(i);
            });
            tx.executeSql('SELECT * FROM historia_laboral', [], function (tx, registrosHistoriaLaboral) {
              var dataset = registrosHistoriaLaboral.rows;
              deferred.resolve(dataset);
              for (var i = dataset.length - 1; i >= 0; i--)
                dataLaboral[i] = dataset.item(i);
            });

            tx.executeSql('SELECT * FROM cursos', [], function (tx, registrosCursos) {
              var dataset = registrosCursos.rows;
              deferred.resolve(dataset);
              for (var i = dataset.length - 1; i >= 0; i--)
                dataCursos[i] = dataset.item(i);
            });
            datosInsertar = {
              cabecera: datosCabecera,
              historiaLaboral: dataLaboral,
              estudios: dataEducacion,
              cursos: dataCursos
            };
            deferred.resolve(datosInsertar);
          });
        }
        )
        return deferred.promise;