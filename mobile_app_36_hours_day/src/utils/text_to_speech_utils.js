import Tts from 'react-native-tts';

export default class TextToSpeechUtils {
  static speakText(text) {
    Tts.speak(text);
  }

  static speakTextWithDucking(text) {
    Tts.setDucking(true);
    TextToSpeechUtils.speakText(text);
  }
}
