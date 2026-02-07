/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/auth/callback/route";
exports.ids = ["app/api/auth/callback/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fcallback%2Froute&page=%2Fapi%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcallback%2Froute.ts&appDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fcallback%2Froute&page=%2Fapi%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcallback%2Froute.ts&appDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_Users_giova_Downloads_lilamkt_app_api_auth_callback_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/auth/callback/route.ts */ \"(rsc)/./app/api/auth/callback/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/auth/callback/route\",\n        pathname: \"/api/auth/callback\",\n        filename: \"route\",\n        bundlePath: \"app/api/auth/callback/route\"\n    },\n    resolvedPagePath: \"C:\\\\Users\\\\giova\\\\Downloads\\\\lilamkt\\\\app\\\\api\\\\auth\\\\callback\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_Users_giova_Downloads_lilamkt_app_api_auth_callback_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhdXRoJTJGY2FsbGJhY2slMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmF1dGglMkZjYWxsYmFjayUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmF1dGglMkZjYWxsYmFjayUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDVXNlcnMlNUNnaW92YSU1Q0Rvd25sb2FkcyU1Q2xpbGFta3QlNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNVc2VycyU1Q2dpb3ZhJTVDRG93bmxvYWRzJTVDbGlsYW1rdCZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDd0I7QUFDckc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXFVzZXJzXFxcXGdpb3ZhXFxcXERvd25sb2Fkc1xcXFxsaWxhbWt0XFxcXGFwcFxcXFxhcGlcXFxcYXV0aFxcXFxjYWxsYmFja1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvYXV0aC9jYWxsYmFjay9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2F1dGgvY2FsbGJhY2tcIixcbiAgICAgICAgZmlsZW5hbWU6IFwicm91dGVcIixcbiAgICAgICAgYnVuZGxlUGF0aDogXCJhcHAvYXBpL2F1dGgvY2FsbGJhY2svcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxVc2Vyc1xcXFxnaW92YVxcXFxEb3dubG9hZHNcXFxcbGlsYW1rdFxcXFxhcHBcXFxcYXBpXFxcXGF1dGhcXFxcY2FsbGJhY2tcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fcallback%2Froute&page=%2Fapi%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcallback%2Froute.ts&appDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/auth/callback/route.ts":
/*!****************************************!*\
  !*** ./app/api/auth/callback/route.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   GET: () => (/* binding */ GET)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n\n\nasync function GET(request) {\n    const { searchParams, origin } = new URL(request.url);\n    const code = searchParams.get('code');\n    const next = searchParams.get('next') ?? '/branding';\n    if (code) {\n        const supabase = (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_1__.createServerClient)(\"https://lwqrkjgxeotgaqcxfyqc.supabase.co\", \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx3cXJramd4ZW90Z2FxY3hmeXFjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk0NTE2NzMsImV4cCI6MjA4NTAyNzY3M30.6VncnYBZzAA2z5kQsJbKfZfjUWdwZI34Lu9QfMNxZCw\", {\n            cookies: {\n                getAll () {\n                    return request.cookies.getAll();\n                },\n                setAll (cookiesToSet) {\n                    cookiesToSet.forEach(({ name, value })=>request.cookies.set(name, value));\n                }\n            }\n        });\n        const { error } = await supabase.auth.exchangeCodeForSession(code);\n        if (!error) {\n            const forwardedHost = request.headers.get('x-forwarded-host');\n            const isLocalEnv = \"development\" === 'development';\n            if (isLocalEnv) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`${origin}${next}`);\n            } else if (forwardedHost) {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`https://${forwardedHost}${next}`);\n            } else {\n                return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`${origin}${next}`);\n            }\n        }\n    }\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.redirect(`${origin}/login?error=auth_error`);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2F1dGgvY2FsbGJhY2svcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXVEO0FBQ0w7QUFFM0MsZUFBZUUsSUFBSUMsT0FBb0I7SUFDNUMsTUFBTSxFQUFFQyxZQUFZLEVBQUVDLE1BQU0sRUFBRSxHQUFHLElBQUlDLElBQUlILFFBQVFJLEdBQUc7SUFDcEQsTUFBTUMsT0FBT0osYUFBYUssR0FBRyxDQUFDO0lBQzlCLE1BQU1DLE9BQU9OLGFBQWFLLEdBQUcsQ0FBQyxXQUFXO0lBRXpDLElBQUlELE1BQU07UUFDUixNQUFNRyxXQUFXVixpRUFBa0JBLENBQ2pDVywwQ0FBb0MsRUFDcENBLGtOQUF5QyxFQUN6QztZQUNFSSxTQUFTO2dCQUNQQztvQkFDRSxPQUFPZCxRQUFRYSxPQUFPLENBQUNDLE1BQU07Z0JBQy9CO2dCQUNBQyxRQUFPQyxZQUFZO29CQUNqQkEsYUFBYUMsT0FBTyxDQUFDLENBQUMsRUFBRUMsSUFBSSxFQUFFQyxLQUFLLEVBQUUsR0FDbkNuQixRQUFRYSxPQUFPLENBQUNPLEdBQUcsQ0FBQ0YsTUFBTUM7Z0JBRTlCO1lBQ0Y7UUFDRjtRQUdGLE1BQU0sRUFBRUUsS0FBSyxFQUFFLEdBQUcsTUFBTWIsU0FBU2MsSUFBSSxDQUFDQyxzQkFBc0IsQ0FBQ2xCO1FBQzdELElBQUksQ0FBQ2dCLE9BQU87WUFDVixNQUFNRyxnQkFBZ0J4QixRQUFReUIsT0FBTyxDQUFDbkIsR0FBRyxDQUFDO1lBQzFDLE1BQU1vQixhQUFhakIsa0JBQXlCO1lBRTVDLElBQUlpQixZQUFZO2dCQUNkLE9BQU83QixxREFBWUEsQ0FBQzhCLFFBQVEsQ0FBQyxHQUFHekIsU0FBU0ssTUFBTTtZQUNqRCxPQUFPLElBQUlpQixlQUFlO2dCQUN4QixPQUFPM0IscURBQVlBLENBQUM4QixRQUFRLENBQUMsQ0FBQyxRQUFRLEVBQUVILGdCQUFnQmpCLE1BQU07WUFDaEUsT0FBTztnQkFDTCxPQUFPVixxREFBWUEsQ0FBQzhCLFFBQVEsQ0FBQyxHQUFHekIsU0FBU0ssTUFBTTtZQUNqRDtRQUNGO0lBQ0Y7SUFFQSxPQUFPVixxREFBWUEsQ0FBQzhCLFFBQVEsQ0FBQyxHQUFHekIsT0FBTyx1QkFBdUIsQ0FBQztBQUNqRSIsInNvdXJjZXMiOlsiQzpcXFVzZXJzXFxnaW92YVxcRG93bmxvYWRzXFxsaWxhbWt0XFxhcHBcXGFwaVxcYXV0aFxcY2FsbGJhY2tcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXF1ZXN0LCBOZXh0UmVzcG9uc2UgfSBmcm9tICduZXh0L3NlcnZlcidcbmltcG9ydCB7IGNyZWF0ZVNlcnZlckNsaWVudCB9IGZyb20gJ0BzdXBhYmFzZS9zc3InXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBHRVQocmVxdWVzdDogTmV4dFJlcXVlc3QpIHtcbiAgY29uc3QgeyBzZWFyY2hQYXJhbXMsIG9yaWdpbiB9ID0gbmV3IFVSTChyZXF1ZXN0LnVybClcbiAgY29uc3QgY29kZSA9IHNlYXJjaFBhcmFtcy5nZXQoJ2NvZGUnKVxuICBjb25zdCBuZXh0ID0gc2VhcmNoUGFyYW1zLmdldCgnbmV4dCcpID8/ICcvYnJhbmRpbmcnXG5cbiAgaWYgKGNvZGUpIHtcbiAgICBjb25zdCBzdXBhYmFzZSA9IGNyZWF0ZVNlcnZlckNsaWVudChcbiAgICAgIHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCEsXG4gICAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSEsXG4gICAgICB7XG4gICAgICAgIGNvb2tpZXM6IHtcbiAgICAgICAgICBnZXRBbGwoKSB7XG4gICAgICAgICAgICByZXR1cm4gcmVxdWVzdC5jb29raWVzLmdldEFsbCgpXG4gICAgICAgICAgfSxcbiAgICAgICAgICBzZXRBbGwoY29va2llc1RvU2V0KSB7XG4gICAgICAgICAgICBjb29raWVzVG9TZXQuZm9yRWFjaCgoeyBuYW1lLCB2YWx1ZSB9KSA9PlxuICAgICAgICAgICAgICByZXF1ZXN0LmNvb2tpZXMuc2V0KG5hbWUsIHZhbHVlKVxuICAgICAgICAgICAgKVxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9XG4gICAgKVxuXG4gICAgY29uc3QgeyBlcnJvciB9ID0gYXdhaXQgc3VwYWJhc2UuYXV0aC5leGNoYW5nZUNvZGVGb3JTZXNzaW9uKGNvZGUpXG4gICAgaWYgKCFlcnJvcikge1xuICAgICAgY29uc3QgZm9yd2FyZGVkSG9zdCA9IHJlcXVlc3QuaGVhZGVycy5nZXQoJ3gtZm9yd2FyZGVkLWhvc3QnKVxuICAgICAgY29uc3QgaXNMb2NhbEVudiA9IHByb2Nlc3MuZW52Lk5PREVfRU5WID09PSAnZGV2ZWxvcG1lbnQnXG5cbiAgICAgIGlmIChpc0xvY2FsRW52KSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QoYCR7b3JpZ2lufSR7bmV4dH1gKVxuICAgICAgfSBlbHNlIGlmIChmb3J3YXJkZWRIb3N0KSB7XG4gICAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UucmVkaXJlY3QoYGh0dHBzOi8vJHtmb3J3YXJkZWRIb3N0fSR7bmV4dH1gKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChgJHtvcmlnaW59JHtuZXh0fWApXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIE5leHRSZXNwb25zZS5yZWRpcmVjdChgJHtvcmlnaW59L2xvZ2luP2Vycm9yPWF1dGhfZXJyb3JgKVxufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsImNyZWF0ZVNlcnZlckNsaWVudCIsIkdFVCIsInJlcXVlc3QiLCJzZWFyY2hQYXJhbXMiLCJvcmlnaW4iLCJVUkwiLCJ1cmwiLCJjb2RlIiwiZ2V0IiwibmV4dCIsInN1cGFiYXNlIiwicHJvY2VzcyIsImVudiIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX1VSTCIsIk5FWFRfUFVCTElDX1NVUEFCQVNFX0FOT05fS0VZIiwiY29va2llcyIsImdldEFsbCIsInNldEFsbCIsImNvb2tpZXNUb1NldCIsImZvckVhY2giLCJuYW1lIiwidmFsdWUiLCJzZXQiLCJlcnJvciIsImF1dGgiLCJleGNoYW5nZUNvZGVGb3JTZXNzaW9uIiwiZm9yd2FyZGVkSG9zdCIsImhlYWRlcnMiLCJpc0xvY2FsRW52IiwicmVkaXJlY3QiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/auth/callback/route.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@opentelemetry","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/cookie"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fauth%2Fcallback%2Froute&page=%2Fapi%2Fauth%2Fcallback%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fauth%2Fcallback%2Froute.ts&appDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5CUsers%5Cgiova%5CDownloads%5Clilamkt&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();