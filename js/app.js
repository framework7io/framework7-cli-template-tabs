// Dom7
var $$ = Dom7;

// isCordova helper
var isCordova = !!window.cordova;

// isIos helper
var isIos = Framework7.prototype.device.ios === true;

// Framework7 App main instnce
var app  = new Framework7({
    root: '#app', // App root element
    animateNavBackIcon: true, // for iOS dynamic navbar
    material: !isIos, // Enable material theme on everything except iOS
    // Don't init automatically
    init: false
});

/* 
Define Views
*/
var mainView;
if (isIos) {
    // In iOS app we have 3 views. One view for each tab
    mainView = app.addView('.view-main', {
        dynamicNavbar: true
    });
    view2 = app.addView('.view#tab-2', {
        dynamicNavbar: true
    });
    view3 = app.addView('.view#tab-3', {
        dynamicNavbar: true
    });
}
else {
    // In Android app we have 1 view. One view for each tab
    mainView = app.addView('.view-main', {
        // required options here
    });
    // In Android app we have 1 navbar. So we may need to switch its title on tab switch
    $$('.view-main').on('tab:show', '.page[data-page="home"]', function (e) {
        var tabId = $$(e.target).attr('id');
        $$('.page[data-page="home"] .navbar .center span').hide();
        $$('.page[data-page="home"] .navbar .center span[data-tab="' + tabId + '"]').show();
    });
}


// Pages
app.onPageInit('home', function (page) {
    // Do something when Home page is initialized
});
app.onPageInit('about', function (page) {
    // Do something when About page is initialized
});
app.onPageInit('form', function (page) {
    // Do something when Form page is initialized
});

// Login Screen Demo
$$('#my-login-screen .login-button').on('click', function () {
    var username = $$('#my-login-screen [name="username"]').val();
    var password = $$('#my-login-screen [name="password"]').val();
    
    // Close login screen
    app.closeModal('#my-login-screen');

    // Alert username and password
    app.alert('Username: ' + username + '<br>Password: ' + password);
});

// Init Framework7 App
if (isCordova) {
    $$(document).on('deviceready', app.init);
}
else {
    app.init();
}