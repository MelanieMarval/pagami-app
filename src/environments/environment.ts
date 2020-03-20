// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    API_URL: 'https://us-central1-pagami-4dd5e.cloudfunctions.net/api',
    TIMEOUT: 60 * 1000
};
export const firebaseConfig = {
    apiKey: 'AIzaSyD3t5VAdEBMdICcY9FyVcgBHlkeu72OI4s',
    authDomain: 'pagami-4dd5e.firebaseapp.com',
    databaseURL: 'https://pagami-4dd5e.firebaseio.com',
    projectId: 'pagami-4dd5e',
    storageBucket: 'pagami-4dd5e.appspot.com',
    messagingSenderId: '901661269353',
    appId: '1:901661269353:web:079ee2f459b73f85f2f1f8'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
