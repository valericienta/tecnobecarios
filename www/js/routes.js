angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    

  .state('menu.inicio', {
    url: '/page1',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inicio.html',
        controller: 'inicioCtrl'
      }
    }
  })

  .state('menu', {
    url: '/side-menu21',
    templateUrl: 'templates/menu.html',
    controller: 'menuCtrl'
  })

  .state('menu.inscribirme', {
    url: '/inscribirme',
    views: {
      'side-menu21': {
        templateUrl: 'templates/inscribirme.html',
        controller: 'inscribirmeCtrl'
      }
    }
  })

  .state('menu.bienvenidos', {
    url: '/bienvenidos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bienvenidos.html'
        
      }
    }
  })

  .state('menu.cursos', {
    url: '/cursos',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cursosDeFormaciN.html',
        controller: 'cursosDeFormaciNCtrl'
      }
    }
  })

  .state('menu.historia', {
    url: '/historia',
    views: {
      'side-menu21': {
        templateUrl: 'templates/historiaLaboral.html',
        controller: 'historiaLaboralCtrl'
      }
    }
  })

    .state('menu.educar', {
    url: '/educacion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/educaciN.html',
        controller: 'educaciNCtrl'
      }
    }
  })

  .state('historiaLaboral', {
    url: '/laboral',
    templateUrl: 'templates/historiaLaboral.html',
    controller: 'historiaLaboralCtrl'
  })

  .state('bienvenidos', {
    url: '/bienvenidos',
    templateUrl: "templates/bienvenidos.html"
  })

  .state('educaciN', {
    url: '/educacion',
    templateUrl: 'templates/educaciN.html',
    controller: 'educaciNCtrl'
  })

  .state('consulta', {
    url: '/consulta',
    templateUrl: 'templates/consulta.html',
    controller: 'consultaCtrl'
  })

  .state('cursosDeFormaciN', {
    url: '/cursos',
    templateUrl: 'templates/cursosDeFormaciN.html',
    controller: 'cursosDeFormaciNCtrl'
  })

  .state('menu.bases', {
    url: '/bases',
    views: {
      'side-menu21': {
        templateUrl: 'templates/bases.html',
        controller: 'basesCtrl'
      }
    }
  })


  .state('menu.cronograma', {
    url: '/cronograma',
    views: {
      'side-menu21': {
        templateUrl: 'templates/cronograma.html'
      }
    }
  })

  .state('menu.consulta', {
    url: '/consulta',
    views: {
      'side-menu21': {
        templateUrl: 'templates/consulta.html',
        controller: 'consultaCtrl'
      }
    }
  })

  .state('menu.enviar', {
    url: '/enviarinscripcion',
    views: {
      'side-menu21': {
        templateUrl: 'templates/enviarinscripcion.html',
        controller: 'enviarInscripcionCtrl'
      }
    }
  })


$urlRouterProvider.otherwise('/side-menu21/bienvenidos')


});