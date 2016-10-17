/*
 * angular-pixlive v1
 * (c) 2015-2016 Vidinoti https://vidinoti.com
 * License: MIT
 * 
 * SDK Controller
 *
 */

'use strict';

pixliveModule

    /**
     * @memberof pixlive
     * @ngdoc service
     * @name PxlController
     * @param {service} $ionicPlatform The Ionic Platform helper
     * @param {service} $q Angular promise service
     * @description 
     *   Exposes PixLive SDK methods using an angular-like service
     */
    .factory('PxlController', [
        '$ionicPlatform',
        '$q',
        function PxlController($ionicPlatform, $q) {

            /*private*/

            /*public*/
            return {

                /**
                 * Display the PixLive SDK notification list over the Ionic app. 
                 * If no notification is available, the call fails and return false.
                 * 
                 * @memberof PxlController
                 * 
                 * @returns {boolean} True if the method was able to show the list (i.e. if the list is not empty), false otherwise.
                 */
                presentNotificationsList: function() {
                    var deferred = $q.defer();

                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.presentNotificationsList(function() {
                                deferred.resolve();
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });

                    return deferred.promise;
                },
                /**
                 * Will show the list of "nearby" contents. It can be either geolocalized points (GPS points)
                 * or beacons. If called with the coordinates (0, 0), a loading wheel (progress bar) will
                 * be displayed for indicating that the position is being acquired. The list can then be
                 * reloaded by calling the function PixLive.refreshNearbyList. If called 
                 * 
                 * @param {float} latitude - the current latitude
                 * @param {float} longitude - the current longitude
                 * @param {callback} success - success callback
                 * @param {callback} error - error callback
                 */
                presentNearbyList: function(latitude, longitude) {
                    var deferred = $q.defer();

                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.presentNearbyList(latitude,longitude,function() {
                                deferred.resolve();
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });

                    return deferred.promise;
                },
                /**
                 * If the list displaying the nearby GPS point is displayed, calling this function
                 * will reload the nearby elements according to the new given coordinate.
                 * The beacon list will be refreshed as well.
                 * 
                 * @param {float} latitude - the current latitude
                 * @param {float} longitude - the current longitude
                 * @param {callback} success - success callback
                 * @param {callback} error - error callback
                 */
                refreshNearbyList: function(latitude, longitude) {
                    var deferred = $q.defer();

                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.refreshNearbyList(latitude,longitude,function() {
                                deferred.resolve();
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });

                    return deferred.promise;
                },               
                /**
                 * Class returned by the getContext method of the PxlController 
                 * service that describe a single context available within the app.
                 * 
                 * @class
                 * @groupName class
                 * @name Context
                 * @memberOf pixlive
                 * @property {string}  contextId            - The ID of the context
                 * @property {string}  name                 - The name of the context as entered in PixLive Maker
                 * @property {string}  lastUpdate           - Date of last update of the context in the format YYYY-MM-DD HH:MM:SS ±HHMM
                 * @property {string}  description          - The description of the context as entered in PixLive Maker
                 * @property {string}  notificationTitle    - The title of the last notification generated by the context, or `null` if no such notification is available.
                 * @property {string}  notificationMessage  - The message of the last notification generated by the context, or `null` if no such notification is available.
                 * @property {string}  imageThumbnailURL    - The absolute URL toward the thumbnail of the image representing this context, null if not available.
                 * @property {string}  imageHiResURL        - The absolute URL toward the full resolution image representing this context, null if not available.
                 */

                /**
                 * Asynchronously return the list of contexts that is available within the app (i.e. the ones that have been synchronized.)
                 * 
                 * See {@link pixlive.Context} for the description of the Context class.
                 * 
                 * @memberof PxlController
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with an `Array<Context>` 
                 *      argument corresponding to all the context/content contained in the app. 
                 */
                getContexts: function() {
                    var deferred = $q.defer();

                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.getContexts(function(list) {
                                deferred.resolve(list);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });

                    return deferred.promise;
                },

                /**
                 * Asynchronously return the context with the given contextId if this context has been synchronized.
                 * 
                 * See {@link pixlive.Context} for the description of the Context class.
                 * 
                 * @param {string} contextId the ID (from the {@link pixlive.Context#contextId } property of the Context object) of the context to add to the bookmark list
                 * 
                 * @memberof PxlController
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with a `Context` 
                 *      argument corresponding to the context/content with the given contextId 
                 */
                getContext: function(contextId) {
                    var deferred = $q.defer();

                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.getContext(contextId,function(context) {
                                deferred.resolve(context);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });

                    return deferred.promise;
                },

                /**
                 * Asynchronously return the list of GPS points in the bounding box specified by its lower left and uper right corner
                 *
                 * See {@link pixlive.GPSPoint} for the description of the Context class.
                 *
                 * @memberof PxlController
                 *
                 * @param {Number} lat1 latitude of point 1
                 * @param {Number} lon1 longitude of point 1
                 * @param {Number} lat2 latitude of point 2
                 * @param {Number} lon2 longitude of point 2
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with a Number argument
                 *      corresponding to distance between the two GPS points
                 */
                computeDistanceBetweenGPSPoints: function(lat1, lon1, lat2, lon2) {
                    var deferred = $q.defer();
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.computeDistanceBetweenGPSPoints(lat1, lon1, lat2, lon2, function(distance) {
                                deferred.resolve(distance);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });
                    return deferred.promise;
                },

                /**
                 * Asynchronously return the list of nearby GPS points
                 *
                 * See {@link pixlive.GPSPoint} for the description of the Context class.
                 *
                 * @memberof PxlController
                 *
                 * @param {Number} myLat current latitude
                 * @param {Number} myLon current longitude
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with an `Array<GPSPoint>` 
                 *      argument corresponding to nearby GPS points
                 */
                getNearbyGPSPoints: function(myLat, myLon) {
                    var deferred = $q.defer();
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.getNearbyGPSPoints(myLat, myLon, function(list) {
                                deferred.resolve(list);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });
                    return deferred.promise;
                },

                /**
                 * Asynchronously return the list of GPS points in the bounding box specified by its lower left and uper right corner
                 *
                 * See {@link pixlive.GPSPoint} for the description of the Context class.
                 *
                 * @memberof PxlController
                 *
                 * @param {Number} latitude of the lower left corner
                 * @param {Number} longitude of the lower left corner
                 * @param {Number} latitude of the uper right corner
                 * @param {Number} longitude of the uper right corner
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with an `Array<GPSPoint>` 
                 *      argument corresponding to GPS points in the specified bounding box
                 */
                getGPSPointsInBoundingBox: function(minLat, minLon, maxLat, maxLon) {
                    var deferred = $q.defer();
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.getGPSPointsInBoundingBox(minLat, minLon, maxLat, maxLon, function(list) {
                                deferred.resolve(list);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });
                    return deferred.promise;
                },

                /**
                 * Asynchronously return the list of contexts that have been bookmarked.
                 *
                 * When bookmark support has been enabled (by calling cordova.plugins.PixLive.setBookmarkSupport(true)), 
                 * a bookmark button is displayed on fullscreen content such as web pages. Clicking it will mark the content as 
                 * bookmarked. The content that have been bookmarked can be retrieved using this method.
                 * You can also add and remove bookmarks programatically using the {@link pixlive.PxlController#addBookmark} / {@link pixlive.PxlController#removeBookmark} method
                 * 
                 * See {@link pixlive.Context} for the description of the Context class.
                 * 
                 * @memberof PxlController
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with an `Array<Context>` 
                 *      argument corresponding to the context/content that have been bookmarked. 
                 */
                getBookmarks: function() {
                    var deferred = $q.defer();
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.getBookmarks(function(list) {
                                deferred.resolve(list);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });
                    return deferred.promise;
                },

                /**
                 * Add a new bookmark for a given context. The context corresponding to the contextId
                 * will be added to the bookmark list.
                 * 
                 * @param {string} contextId the ID (from the {@link pixlive.Context#contextId } property of the Context object) of the context to add to the bookmark list
                 * 
                 * @memberof PxlController
                 */
                addBookmark: function(contextId) {
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.addBookmark(contextId);
                        }
                    });
                },

                /**
                 * Remove a context from the bookmark list.
                 * 
                 * @param {string} contextId the ID (from the {@link pixlive.Context#contextId } property of the Context object) of the context to remove from the bookmark list
                 * 
                 * @memberof PxlController
                 */
                removeBookmark: function(contextId) {
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.removeBookmark(contextId);
                        }
                    });
                },

                /**
                 * Asynchronously returns true or false depending if the context identifier by contextId (its ID) has been bookmarked or not.
                 * 
                 * @param {string} contextId the ID (from the {@link pixlive.Context#contextId } property of the Context object) of the context to check
                 *
                 * @returns {Promise} An Angular Promise where the success 
                 *      method will be called with an `boolean` 
                 *      argument indicating if the context has been bookmarked (true) or not (false)
                 * 
                 * @memberof PxlController
                 */
                isBookmarked: function(contextId) {
                    var deferred = $q.defer();
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.isBookmarked(contextId, function(bookmarked) {
                                deferred.resolve(bookmarked);
                            }, function() {
                                deferred.reject();
                            });
                        } else {
                            deferred.resolve([]);
                        }
                    });
                    return deferred.promise;
                },

                /**
                 * Will open an url with the PixLive SDK internal browser
                 * 
                 * @param {string} url - The url
                 *
                 * @memberof PxlController
                 */
                openURLInInternalBrowser: function(url) {
                    $ionicPlatform.ready(function () {
                        if(window.cordova && window.cordova.plugins && window.cordova.plugins.PixLive) {
                            window.cordova.plugins.PixLive.openURLInInternalBrowser(url);
                        }
                    });
                }               
            };
        }
    ]);