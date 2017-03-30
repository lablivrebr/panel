angular.bootstrap(document,
    [
        'main',
        'vale-cultura'
    ]
);

let mdThemingProvider = '';
theme = ['$mdIconProvider', '$mdThemingProvider' , function ($mdIconProvider, $mdThemingProvider) {
    $mdIconProvider
        .iconSet("social", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-social.svg")
        .iconSet("action", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-action.svg")
        .iconSet("communication", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-communication.svg")
        .iconSet("content", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-content.svg")
        .iconSet("toggle", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-toggle.svg")
        .iconSet("navigation", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-navigation.svg")
        .iconSet("image", "/packages/planettraining_material-design-icons/bower_components/material-design-icons/sprites/svg-sprite/svg-sprite-image.svg");

    $mdThemingProvider.theme('main')
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
    //
    // $mdThemingProvider.theme('brotherhood')
    //     .primaryPalette('grey', {
    //         'default': '900',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('orange', {
    //         'default': 'A700',
    //     });
    //
    //
    // $mdThemingProvider.theme('drive')
    //     .primaryPalette('grey', {
    //         'default': '500',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('orange', {
    //         'default': 'A700',
    //     });
    //
    // $mdThemingProvider.theme('game')
    //     .primaryPalette('red', {
    //         'default': '800',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('orange', {
    //         'default': 'A700',
    //     });
    //
    // $mdThemingProvider.theme('scrum')
    //     .primaryPalette('brown', {
    //         'default': '700',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('orange', {
    //         'default': '800',
    //     });
    //
    // $mdThemingProvider.theme('user')
    //     .primaryPalette('orange', {
    //         'default': '800',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('green', {
    //         'default': '700',
    //     });
    //
    // $mdThemingProvider.theme('tec')
    //     .primaryPalette('blue', {
    //         'default': '800',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('orange', {
    //         'default': '700',
    //     });
    //
    // $mdThemingProvider.theme('parties')
    //     .primaryPalette('orange', {
    //         'default': '800',
    //     })
    //     .warnPalette('red', {
    //         'default': '900',
    //     })
    //     .accentPalette('green', {
    //         'default': '700',
    //     });

    $mdThemingProvider.setDefaultTheme('main');
    mdThemingProvider = $mdThemingProvider;
    $mdThemingProvider.alwaysWatchTheme(true);
}];

angular.module('main').config(theme);
