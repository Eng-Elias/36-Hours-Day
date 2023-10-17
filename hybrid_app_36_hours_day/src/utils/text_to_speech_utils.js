import { TextToSpeech } from "@capacitor-community/text-to-speech";

export default class TextToSpeechUtils {
  static async speakText(text) {
    await TextToSpeech.speak({
      text: text,
      lang: "en-US",
      rate: 1.0,
      pitch: 1.0,
      volume: 1.0,
      category: "ambient",
    });
  }

  static async stop() {
    await TextToSpeech.stop();
  }

  static async getSupportedLanguages() {
    const languages = await TextToSpeech.getSupportedLanguages();
    return languages;
  }

  static async getSupportedVoices() {
    const voices = await TextToSpeech.getSupportedVoices();
    return voices;
  }

  static async isLanguageSupported(lang) {
    const isSupported = await TextToSpeech.isLanguageSupported({ lang });
    return isSupported;
  }
}
