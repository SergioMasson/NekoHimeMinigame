"use strict";(self.webpackChunkdeploy=self.webpackChunkdeploy||[]).push([[770],{1770:(e,t,s)=>{s.r(t),s.d(t,{_KTXTextureLoader:()=>u});var r=s(9983);class o{constructor(e,t){if(this.data=e,this.isInvalid=!1,!o.IsValid(e))return this.isInvalid=!0,void r.V.Error("texture missing KTX identifier");const s=Uint32Array.BYTES_PER_ELEMENT,a=new DataView(this.data.buffer,this.data.byteOffset+12,13*s),i=67305985===a.getUint32(0,!0);return this.glType=a.getUint32(1*s,i),this.glTypeSize=a.getUint32(2*s,i),this.glFormat=a.getUint32(3*s,i),this.glInternalFormat=a.getUint32(4*s,i),this.glBaseInternalFormat=a.getUint32(5*s,i),this.pixelWidth=a.getUint32(6*s,i),this.pixelHeight=a.getUint32(7*s,i),this.pixelDepth=a.getUint32(8*s,i),this.numberOfArrayElements=a.getUint32(9*s,i),this.numberOfFaces=a.getUint32(10*s,i),this.numberOfMipmapLevels=a.getUint32(11*s,i),this.bytesOfKeyValueData=a.getUint32(12*s,i),0!==this.glType?(r.V.Error("only compressed formats currently supported"),void(this.isInvalid=!0)):(this.numberOfMipmapLevels=Math.max(1,this.numberOfMipmapLevels),0===this.pixelHeight||0!==this.pixelDepth?(r.V.Error("only 2D textures currently supported"),void(this.isInvalid=!0)):0!==this.numberOfArrayElements?(r.V.Error("texture arrays not currently supported"),void(this.isInvalid=!0)):this.numberOfFaces!==t?(r.V.Error("number of faces expected"+t+", but found "+this.numberOfFaces),void(this.isInvalid=!0)):void(this.loadType=o.COMPRESSED_2D))}uploadLevels(e,t){switch(this.loadType){case o.COMPRESSED_2D:this._upload2DCompressedLevels(e,t);case o.TEX_2D:case o.COMPRESSED_3D:case o.TEX_3D:}}_upload2DCompressedLevels(e,t){let s=o.HEADER_LEN+this.bytesOfKeyValueData,r=this.pixelWidth,a=this.pixelHeight;const i=t?this.numberOfMipmapLevels:1;for(let t=0;t<i;t++){const o=new Int32Array(this.data.buffer,this.data.byteOffset+s,1)[0];s+=4;for(let i=0;i<this.numberOfFaces;i++){const n=new Uint8Array(this.data.buffer,this.data.byteOffset+s,o);e.getEngine()._uploadCompressedDataToTextureDirectly(e,e.format,r,a,n,i,t),s+=o,s+=3-(o+3)%4}r=Math.max(1,.5*r),a=Math.max(1,.5*a)}}static IsValid(e){if(e.byteLength>=12){const t=new Uint8Array(e.buffer,e.byteOffset,12);if(171===t[0]&&75===t[1]&&84===t[2]&&88===t[3]&&32===t[4]&&49===t[5]&&49===t[6]&&187===t[7]&&13===t[8]&&10===t[9]&&26===t[10]&&10===t[11])return!0}return!1}}o.HEADER_LEN=64,o.COMPRESSED_2D=0,o.COMPRESSED_3D=1,o.TEX_2D=2,o.TEX_3D=3;class a{constructor(e){this._pendingActions=new Array,this._workerInfos=e.map((e=>({workerPromise:Promise.resolve(e),idle:!0})))}dispose(){for(const e of this._workerInfos)e.workerPromise.then((e=>{e.terminate()}));this._workerInfos.length=0,this._pendingActions.length=0}push(e){this._executeOnIdleWorker(e)||this._pendingActions.push(e)}_executeOnIdleWorker(e){for(const t of this._workerInfos)if(t.idle)return this._execute(t,e),!0;return!1}_execute(e,t){e.idle=!1,e.workerPromise.then((s=>{t(s,(()=>{const t=this._pendingActions.shift();t?this._execute(e,t):e.idle=!0}))}))}}class i extends a{constructor(e,t,s=i.DefaultOptions){super([]),this._maxWorkers=e,this._createWorkerAsync=t,this._options=s}push(e){if(!this._executeOnIdleWorker(e))if(this._workerInfos.length<this._maxWorkers){const t={workerPromise:this._createWorkerAsync(),idle:!1};this._workerInfos.push(t),this._execute(t,e)}else this._pendingActions.push(e)}_execute(e,t){e.timeoutId&&(clearTimeout(e.timeoutId),delete e.timeoutId),super._execute(e,((s,r)=>{t(s,(()=>{r(),e.idle&&(e.timeoutId=setTimeout((()=>{e.workerPromise.then((e=>{e.terminate()}));const t=this._workerInfos.indexOf(e);-1!==t&&this._workerInfos.splice(t,1)}),this._options.idleTimeElapsedBeforeRelease))}))}))}}i.DefaultOptions={idleTimeElapsedBeforeRelease:1e3};var n,c,d,T=s(8276);function _(e,t){const s=t?.jsDecoderModule||KTX2DECODER;e&&(e.wasmUASTCToASTC&&(s.LiteTranscoder_UASTC_ASTC.WasmModuleURL=e.wasmUASTCToASTC),e.wasmUASTCToBC7&&(s.LiteTranscoder_UASTC_BC7.WasmModuleURL=e.wasmUASTCToBC7),e.wasmUASTCToRGBA_UNORM&&(s.LiteTranscoder_UASTC_RGBA_UNORM.WasmModuleURL=e.wasmUASTCToRGBA_UNORM),e.wasmUASTCToRGBA_SRGB&&(s.LiteTranscoder_UASTC_RGBA_SRGB.WasmModuleURL=e.wasmUASTCToRGBA_SRGB),e.wasmUASTCToR8_UNORM&&(s.LiteTranscoder_UASTC_R8_UNORM.WasmModuleURL=e.wasmUASTCToR8_UNORM),e.wasmUASTCToRG8_UNORM&&(s.LiteTranscoder_UASTC_RG8_UNORM.WasmModuleURL=e.wasmUASTCToRG8_UNORM),e.jsMSCTranscoder&&(s.MSCTranscoder.JSModuleURL=e.jsMSCTranscoder),e.wasmMSCTranscoder&&(s.MSCTranscoder.WasmModuleURL=e.wasmMSCTranscoder),e.wasmZSTDDecoder&&(s.ZSTDDecoder.WasmModuleURL=e.wasmZSTDDecoder)),t&&(t.wasmUASTCToASTC&&(s.LiteTranscoder_UASTC_ASTC.WasmBinary=t.wasmUASTCToASTC),t.wasmUASTCToBC7&&(s.LiteTranscoder_UASTC_BC7.WasmBinary=t.wasmUASTCToBC7),t.wasmUASTCToRGBA_UNORM&&(s.LiteTranscoder_UASTC_RGBA_UNORM.WasmBinary=t.wasmUASTCToRGBA_UNORM),t.wasmUASTCToRGBA_SRGB&&(s.LiteTranscoder_UASTC_RGBA_SRGB.WasmBinary=t.wasmUASTCToRGBA_SRGB),t.wasmUASTCToR8_UNORM&&(s.LiteTranscoder_UASTC_R8_UNORM.WasmBinary=t.wasmUASTCToR8_UNORM),t.wasmUASTCToRG8_UNORM&&(s.LiteTranscoder_UASTC_RG8_UNORM.WasmBinary=t.wasmUASTCToRG8_UNORM),t.jsMSCTranscoder&&(s.MSCTranscoder.JSModule=t.jsMSCTranscoder),t.wasmMSCTranscoder&&(s.MSCTranscoder.WasmBinary=t.wasmMSCTranscoder),t.wasmZSTDDecoder&&(s.ZSTDDecoder.WasmBinary=t.wasmZSTDDecoder))}function l(e){let t;void 0===e&&"undefined"!=typeof KTX2DECODER&&(e=KTX2DECODER),onmessage=s=>{if(s.data)switch(s.data.action){case"init":{const r=s.data.urls;r&&(r.jsDecoderModule&&void 0===e&&(importScripts(r.jsDecoderModule),e=KTX2DECODER),_(r)),s.data.wasmBinaries&&_(void 0,{...s.data.wasmBinaries,jsDecoderModule:e}),t=new e.KTX2Decoder,postMessage({action:"init"});break}case"setDefaultDecoderOptions":e.KTX2Decoder.DefaultDecoderOptions=s.data.options;break;case"decode":t.decode(s.data.data,s.data.caps,s.data.options).then((e=>{const t=[];for(let s=0;s<e.mipmaps.length;++s){const r=e.mipmaps[s];r&&r.data&&t.push(r.data.buffer)}postMessage({action:"decoded",success:!0,decodedData:e},t)})).catch((e=>{postMessage({action:"decoded",success:!1,msg:e})}))}}}!function(e){e[e.ETC1S=0]="ETC1S",e[e.UASTC4x4=1]="UASTC4x4"}(n||(n={})),function(e){e[e.ASTC_4X4_RGBA=0]="ASTC_4X4_RGBA",e[e.BC7_RGBA=1]="BC7_RGBA",e[e.BC3_RGBA=2]="BC3_RGBA",e[e.BC1_RGB=3]="BC1_RGB",e[e.PVRTC1_4_RGBA=4]="PVRTC1_4_RGBA",e[e.PVRTC1_4_RGB=5]="PVRTC1_4_RGB",e[e.ETC2_RGBA=6]="ETC2_RGBA",e[e.ETC1_RGB=7]="ETC1_RGB",e[e.RGBA32=8]="RGBA32",e[e.R8=9]="R8",e[e.RG8=10]="RG8"}(c||(c={})),function(e){e[e.COMPRESSED_RGBA_BPTC_UNORM_EXT=36492]="COMPRESSED_RGBA_BPTC_UNORM_EXT",e[e.COMPRESSED_RGBA_ASTC_4X4_KHR=37808]="COMPRESSED_RGBA_ASTC_4X4_KHR",e[e.COMPRESSED_RGB_S3TC_DXT1_EXT=33776]="COMPRESSED_RGB_S3TC_DXT1_EXT",e[e.COMPRESSED_RGBA_S3TC_DXT5_EXT=33779]="COMPRESSED_RGBA_S3TC_DXT5_EXT",e[e.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG=35842]="COMPRESSED_RGBA_PVRTC_4BPPV1_IMG",e[e.COMPRESSED_RGB_PVRTC_4BPPV1_IMG=35840]="COMPRESSED_RGB_PVRTC_4BPPV1_IMG",e[e.COMPRESSED_RGBA8_ETC2_EAC=37496]="COMPRESSED_RGBA8_ETC2_EAC",e[e.COMPRESSED_RGB8_ETC2=37492]="COMPRESSED_RGB8_ETC2",e[e.COMPRESSED_RGB_ETC1_WEBGL=36196]="COMPRESSED_RGB_ETC1_WEBGL",e[e.RGBA8Format=32856]="RGBA8Format",e[e.R8Format=33321]="R8Format",e[e.RG8Format=33323]="RG8Format"}(d||(d={}));class R{static GetDefaultNumWorkers(){return"object"==typeof navigator&&navigator.hardwareConcurrency?Math.min(Math.floor(.5*navigator.hardwareConcurrency),4):1}static _Initialize(e){if(R._WorkerPoolPromise||R._DecoderModulePromise)return;const t={jsDecoderModule:T.S0.GetBabylonScriptURL(this.URLConfig.jsDecoderModule,!0),wasmUASTCToASTC:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToASTC,!0),wasmUASTCToBC7:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToBC7,!0),wasmUASTCToRGBA_UNORM:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRGBA_UNORM,!0),wasmUASTCToRGBA_SRGB:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRGBA_SRGB,!0),wasmUASTCToR8_UNORM:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToR8_UNORM,!0),wasmUASTCToRG8_UNORM:T.S0.GetBabylonScriptURL(this.URLConfig.wasmUASTCToRG8_UNORM,!0),jsMSCTranscoder:T.S0.GetBabylonScriptURL(this.URLConfig.jsMSCTranscoder,!0),wasmMSCTranscoder:T.S0.GetBabylonScriptURL(this.URLConfig.wasmMSCTranscoder,!0),wasmZSTDDecoder:T.S0.GetBabylonScriptURL(this.URLConfig.wasmZSTDDecoder,!0)};e&&"function"==typeof Worker&&"undefined"!=typeof URL?R._WorkerPoolPromise=new Promise((s=>{const r=`${_}(${l})()`,o=URL.createObjectURL(new Blob([r],{type:"application/javascript"}));s(new i(e,(()=>function(e,t,s){return new Promise(((r,o)=>{const a=t=>{e.removeEventListener("error",a),e.removeEventListener("message",i),o(t)},i=t=>{"init"===t.data.action&&(e.removeEventListener("error",a),e.removeEventListener("message",i),r(e))};e.addEventListener("error",a),e.addEventListener("message",i),e.postMessage({action:"init",urls:s,wasmBinaries:t})}))}(new Worker(o),void 0,t))))})):void 0===R._KTX2DecoderModule?R._DecoderModulePromise=T.S0.LoadBabylonScriptAsync(t.jsDecoderModule).then((()=>(R._KTX2DecoderModule=KTX2DECODER,R._KTX2DecoderModule.MSCTranscoder.UseFromWorkerThread=!1,R._KTX2DecoderModule.WASMMemoryManager.LoadBinariesFromCurrentThread=!0,_(t,R._KTX2DecoderModule),new R._KTX2DecoderModule.KTX2Decoder))):(R._KTX2DecoderModule.MSCTranscoder.UseFromWorkerThread=!1,R._KTX2DecoderModule.WASMMemoryManager.LoadBinariesFromCurrentThread=!0,R._DecoderModulePromise=Promise.resolve(new R._KTX2DecoderModule.KTX2Decoder))}constructor(e,t=R.DefaultNumWorkers){this._engine=e;const s="object"==typeof t&&t.workerPool||R.WorkerPool;if(s)R._WorkerPoolPromise=Promise.resolve(s);else{"object"==typeof t?R._KTX2DecoderModule=t?.binariesAndModulesContainer?.jsDecoderModule:"undefined"!=typeof KTX2DECODER&&(R._KTX2DecoderModule=KTX2DECODER);const e="number"==typeof t?t:t.numWorkers??R.DefaultNumWorkers;R._Initialize(e)}}_uploadAsync(e,t,s){const r=this._engine.getCaps(),o={astc:!!r.astc,bptc:!!r.bptc,s3tc:!!r.s3tc,pvrtc:!!r.pvrtc,etc2:!!r.etc2,etc1:!!r.etc1};if(R._WorkerPoolPromise)return R._WorkerPoolPromise.then((r=>new Promise(((a,i)=>{r.push(((r,n)=>{const c=e=>{r.removeEventListener("error",c),r.removeEventListener("message",d),i(e),n()},d=e=>{if("decoded"===e.data.action){if(r.removeEventListener("error",c),r.removeEventListener("message",d),e.data.success)try{this._createTexture(e.data.decodedData,t,s),a()}catch(e){i({message:e})}else i({message:e.data.msg});n()}};r.addEventListener("error",c),r.addEventListener("message",d),r.postMessage({action:"setDefaultDecoderOptions",options:R.DefaultDecoderOptions._getKTX2DecoderOptions()});const T=new Uint8Array(e.byteLength);T.set(new Uint8Array(e.buffer,e.byteOffset,e.byteLength)),r.postMessage({action:"decode",data:T,caps:o,options:s},[T.buffer])}))}))));if(R._DecoderModulePromise)return R._DecoderModulePromise.then((s=>(R.DefaultDecoderOptions.isDirty&&(R._KTX2DecoderModule.KTX2Decoder.DefaultDecoderOptions=R.DefaultDecoderOptions._getKTX2DecoderOptions()),new Promise(((o,a)=>{s.decode(e,r).then((e=>{this._createTexture(e,t),o()})).catch((e=>{a({message:e})}))})))));throw new Error("KTX2 decoder module is not available")}_createTexture(e,t,s){this._engine._bindTextureDirectly(3553,t),s&&(s.transcodedFormat=e.transcodedFormat,s.isInGammaSpace=e.isInGammaSpace,s.hasAlpha=e.hasAlpha,s.transcoderName=e.transcoderName);let r=!0;switch(e.transcodedFormat){case 32856:t.type=0,t.format=5;break;case 33321:t.type=0,t.format=6;break;case 33323:t.type=0,t.format=7;break;default:t.format=e.transcodedFormat,r=!1}if(t._gammaSpace=e.isInGammaSpace,t.generateMipMaps=e.mipmaps.length>1,e.errors)throw new Error("KTX2 container - could not transcode the data. "+e.errors);for(let s=0;s<e.mipmaps.length;++s){const o=e.mipmaps[s];if(!o||!o.data)throw new Error("KTX2 container - could not transcode one of the image");r?(t.width=o.width,t.height=o.height,this._engine._uploadDataToTextureDirectly(t,o.data,0,s,void 0,!0)):this._engine._uploadCompressedDataToTextureDirectly(t,e.transcodedFormat,o.width,o.height,o.data,0,s)}t._extension=".ktx2",t.width=e.mipmaps[0].width,t.height=e.mipmaps[0].height,t.isReady=!0,this._engine._bindTextureDirectly(3553,null)}static IsValid(e){if(e.byteLength>=12){const t=new Uint8Array(e.buffer,e.byteOffset,12);if(171===t[0]&&75===t[1]&&84===t[2]&&88===t[3]&&32===t[4]&&50===t[5]&&48===t[6]&&187===t[7]&&13===t[8]&&10===t[9]&&26===t[10]&&10===t[11])return!0}return!1}}R.URLConfig={jsDecoderModule:"https://cdn.babylonjs.com/babylon.ktx2Decoder.js",wasmUASTCToASTC:null,wasmUASTCToBC7:null,wasmUASTCToRGBA_UNORM:null,wasmUASTCToRGBA_SRGB:null,wasmUASTCToR8_UNORM:null,wasmUASTCToRG8_UNORM:null,jsMSCTranscoder:null,wasmMSCTranscoder:null,wasmZSTDDecoder:null},R.DefaultNumWorkers=R.GetDefaultNumWorkers(),R.DefaultDecoderOptions=new class{constructor(){this._isDirty=!0,this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC=!0,this._ktx2DecoderOptions={}}get isDirty(){return this._isDirty}get useRGBAIfASTCBC7NotAvailableWhenUASTC(){return this._useRGBAIfASTCBC7NotAvailableWhenUASTC}set useRGBAIfASTCBC7NotAvailableWhenUASTC(e){this._useRGBAIfASTCBC7NotAvailableWhenUASTC!==e&&(this._useRGBAIfASTCBC7NotAvailableWhenUASTC=e,this._isDirty=!0)}get useRGBAIfOnlyBC1BC3AvailableWhenUASTC(){return this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC}set useRGBAIfOnlyBC1BC3AvailableWhenUASTC(e){this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC!==e&&(this._useRGBAIfOnlyBC1BC3AvailableWhenUASTC=e,this._isDirty=!0)}get forceRGBA(){return this._forceRGBA}set forceRGBA(e){this._forceRGBA!==e&&(this._forceRGBA=e,this._isDirty=!0)}get forceR8(){return this._forceR8}set forceR8(e){this._forceR8!==e&&(this._forceR8=e,this._isDirty=!0)}get forceRG8(){return this._forceRG8}set forceRG8(e){this._forceRG8!==e&&(this._forceRG8=e,this._isDirty=!0)}get bypassTranscoders(){return this._bypassTranscoders}set bypassTranscoders(e){this._bypassTranscoders!==e&&(this._bypassTranscoders=e,this._isDirty=!0)}_getKTX2DecoderOptions(){if(!this._isDirty)return this._ktx2DecoderOptions;this._isDirty=!1;const e={useRGBAIfASTCBC7NotAvailableWhenUASTC:this._useRGBAIfASTCBC7NotAvailableWhenUASTC,forceRGBA:this._forceRGBA,forceR8:this._forceR8,forceRG8:this._forceRG8,bypassTranscoders:this._bypassTranscoders};return this.useRGBAIfOnlyBC1BC3AvailableWhenUASTC&&(e.transcodeFormatDecisionTree={UASTC:{transcodeFormat:[c.BC1_RGB,c.BC3_RGBA],yes:{transcodeFormat:c.RGBA32,engineFormat:32856,roundToMultiple4:!1}}}),this._ktx2DecoderOptions=e,e}};class u{constructor(){this.supportCascades=!1}loadCubeData(e,t,s,r){if(Array.isArray(e))return;t._invertVScale=!t.invertY;const a=t.getEngine(),i=new o(e,6),n=i.numberOfMipmapLevels>1&&t.generateMipMaps;a._unpackFlipY(!0),i.uploadLevels(t,t.generateMipMaps),t.width=i.pixelWidth,t.height=i.pixelHeight,a._setCubeMapTextureParams(t,n,i.numberOfMipmapLevels-1),t.isReady=!0,t.onLoadedObservable.notifyObservers(t),t.onLoadedObservable.clear(),r&&r()}loadData(e,t,s,a){if(o.IsValid(e)){t._invertVScale=!t.invertY;const r=new o(e,1),a=function(e){switch(e){case 35916:return 33776;case 35918:return 33778;case 35919:return 33779;case 37493:return 37492;case 37497:return 37496;case 37495:return 37494;case 37840:return 37808;case 36493:return 36492}return null}(r.glInternalFormat);a?(t.format=a,t._useSRGBBuffer=t.getEngine()._getUseSRGBBuffer(!0,t.generateMipMaps),t._gammaSpace=!0):t.format=r.glInternalFormat,s(r.pixelWidth,r.pixelHeight,t.generateMipMaps,!0,(()=>{r.uploadLevels(t,t.generateMipMaps)}),r.isInvalid)}else if(R.IsValid(e)){new R(t.getEngine())._uploadAsync(e,t,a).then((()=>{s(t.width,t.height,t.generateMipMaps,!0,(()=>{}),!1)}),(e=>{r.V.Warn(`Failed to load KTX2 texture data: ${e.message}`),s(0,0,!1,!1,(()=>{}),!0)}))}else r.V.Error("texture missing KTX identifier"),s(0,0,!1,!1,(()=>{}),!0)}}}}]);