(()=>{"use strict";var Environment,Form,__webpack_require__={};(()=>{__webpack_require__.d=(exports,definition)=>{for(var key in definition)__webpack_require__.o(definition,key)&&!__webpack_require__.o(exports,key)&&Object.defineProperty(exports,key,{enumerable:!0,get:definition[key]})}})(),(()=>{__webpack_require__.o=(obj,prop)=>Object.prototype.hasOwnProperty.call(obj,prop)})(),(()=>{__webpack_require__.r=exports=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(exports,"__esModule",{value:!0})}})();var __webpack_exports__={};function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){reject(error);return}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _async_to_generator(fn){return function(){var self=this,args=arguments;return new Promise(function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)})}}__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{iframeExist:()=>iframeExist,loadJsSdk:()=>loadJsSdk}),function(Environment){Environment.Sandbox="sandbox",Environment.Production="production"}(Environment||(Environment={})),function(Form){Form.Card="card",Form.Pay="pay",Form.Token="pay-token"}(Form||(Form={}));let URLS={[Form.Card]:"card-form",[Form.Pay]:"pay-form",[Form.Token]:"pay-by-saved-card-form"},BASE_URL={[Environment.Sandbox]:"https://sandbox.cardpay.com",[Environment.Production]:"https://cardpay.com"};function destroyJsSdk(element,iframe,loadListener,windowMessageListener){return _destroyJsSdk.apply(this,arguments)}function _destroyJsSdk(){return(_destroyJsSdk=_async_to_generator(function*(element,iframe,loadListener,windowMessageListener){element.removeChild(iframe),iframe.removeEventListener("load",loadListener),windowMessageListener&&window.removeEventListener("message",windowMessageListener)})).apply(this,arguments)}function iframeExist(id){return null!==document.getElementById(id)}function loadJsSdk(settings){return _loadJsSdk.apply(this,arguments)}function _loadJsSdk(){return(_loadJsSdk=_async_to_generator(function*(settings){var _settings_environment;if(iframeExist("unlimit-js-sdk"))throw Error('[ERROR]: Cannot call the function twice, please use the "destroy" function and then call it again');let environment=(_settings_environment=settings.environment)!=null?_settings_environment:Environment.Production,{props,callback,element}=settings,iframe=document.createElement("iframe"),baseUrl=BASE_URL[environment],url=URLS[settings.form],src=`${baseUrl}/js-sdk-frame/#/${url}`;iframe.setAttribute("id","unlimit-js-sdk"),iframe.setAttribute("src",src),element.appendChild(iframe);let loadListener=()=>{if(null===iframe.contentWindow)throw Error("[ERROR]: Not possible to embed the js sdk, contentWindow is null");iframe.contentWindow.postMessage({props},"*")};if(iframe.addEventListener("load",loadListener),callback){let windowMessageListener=event=>{event.source===iframe.contentWindow&&callback(event.data)};return window.addEventListener("message",windowMessageListener),{destroy:()=>destroyJsSdk(element,iframe,loadListener,windowMessageListener)}}return{destroy:()=>destroyJsSdk(element,iframe,loadListener)}})).apply(this,arguments)}window.loadJsSdk=loadJsSdk})();