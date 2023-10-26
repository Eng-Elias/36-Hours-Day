import{W as p}from"./index-9fccfe46.js";class g extends p{constructor(){super(),this.speechSynthesis=null,"speechSynthesis"in window&&(this.speechSynthesis=window.speechSynthesis,window.addEventListener("beforeunload",()=>{this.stop()}))}async speak(t){this.speechSynthesis||this.throwUnsupportedError(),await this.stop();const o=this.speechSynthesis,e=this.createSpeechSynthesisUtterance(t);return new Promise((i,n)=>{e.onend=()=>{i()},e.onerror=s=>{n(s)},o.speak(e)})}async stop(){this.speechSynthesis||this.throwUnsupportedError(),this.speechSynthesis.cancel()}async getSupportedLanguages(){return{languages:this.getSpeechSynthesisVoices().map(i=>i.lang).filter((i,n,s)=>s.indexOf(i)==n)}}async getSupportedVoices(){return{voices:this.getSpeechSynthesisVoices()}}async isLanguageSupported(t){return{supported:(await this.getSupportedLanguages()).languages.includes(t.lang)}}async openInstall(){this.throwUnimplementedError()}createSpeechSynthesisUtterance(t){const o=this.getSpeechSynthesisVoices(),e=new SpeechSynthesisUtterance,{text:i,lang:n,rate:s,pitch:r,volume:h,voice:c}=t;return c&&(e.voice=o[c]),h&&(e.volume=h>=0&&h<=1?h:1),s&&(e.rate=s>=.1&&s<=10?s:1),r&&(e.pitch=r>=0&&r<=2?r:2),n&&(e.lang=n),e.text=i,e}getSpeechSynthesisVoices(){return this.speechSynthesis||this.throwUnsupportedError(),(!this.supportedVoices||this.supportedVoices.length<1)&&(this.supportedVoices=this.speechSynthesis.getVoices()),this.supportedVoices}throwUnsupportedError(){throw this.unavailable("SpeechSynthesis API not available in this browser.")}throwUnimplementedError(){throw this.unimplemented("Not implemented on web.")}}export{g as TextToSpeechWeb};
