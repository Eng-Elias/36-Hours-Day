export default class TextToSpeechUtils {
  static speakText(text) {
    // Init SpeechSynth API
    const synth = window.speechSynthesis;
    synth.speak(new SpeechSynthesisUtterance(text));
  }
}
