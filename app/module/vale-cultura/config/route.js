mdlValeCultura.config(function($stateProvider, $mdThemingProvider, $locationProvider, $urlRouterProvider) {
    $locationProvider.html5Mode(true);

    let strTemplateUrlHeader = 'app/module/vale-cultura/view/header.ng.html';
    // let strTemplateUrlFooter = 'module/vale-cultura/view/footer.ng.html';

    $stateProvider
        .state('/', {
                url: '/',
                views: {
                    "header": {
                       templateUrl: strTemplateUrlHeader,
                    },
                    "main": {
                        templateUrl: 'app/module/vale-cultura/view/painel.ng.html',
                        controller: 'PainelCtrl as ctrl'
                    },
                    //"footer": {
                    //    templateUrl: $footer,
                    //}
                }
            }
        );

    // let strHeaderUrl = 'module/main/client/view/header.ng.html';
    // let strFooterUrl = 'module/main/client/view/footer.ng.html';
    //
    // $stateProvider
    //     .state('/', {
    //         url: '/',
    //         views: {
    //             //"header": {
    //             //    templateUrl: $header,
    //             //},
    //             "main": {
    //                 templateUrl: 'module/main/client/view/default.ng.html',
    //                 controller: 'DefaultAdminCtrl'
    //             },
    //             //"footer": {
    //             //    templateUrl: $footer,
    //             //}
    //         }
    //     }
    // );
    //
    // $urlRouterProvider.otherwise("/main");


    // $mdThemingProvider.theme('default')
    //     .primaryPalette('orange', {
    //         'default': '400', // by default use shade 400 from the pink palette for primary intentions
    //         'hue-1': '100', // use shade 100 for the <code>md-hue-1</code> class
    //         'hue-2': '600', // use shade 600 for the <code>md-hue-2</code> class
    //         'hue-3': 'A100' // use shade A100 for the <code>md-hue-3</code> class
    //     })
    //     // If you specify less than all of the keys, it will inherit from the
    //     // default shades
    //     .accentPalette('purple', {
    //         'default': '200' // use shade 200 for default, and keep all other shades the same
    //     });


    $mdThemingProvider.theme('admin')
        .dark()
        .primaryPalette('grey', {
            'default': '900',
        })
        .warnPalette('red', {
            'default': '900',
        })
        .accentPalette('green', {
            'default': 'A700',
        });


    $mdThemingProvider.setDefaultTheme('admin');
    $mdThemingProvider.alwaysWatchTheme(true);

    // $stateProvider.state(helloState);
    // $stateProvider.state(aboutState);
});