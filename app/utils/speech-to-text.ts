export type SpeechToTextCallbacks = {
  onTranscript?: (final: string, interim: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
};

export const isSpeechRecognitionSupported = (): boolean =>
  typeof window !== "undefined" &&
  (!!(window as any).SpeechRecognition ||
    !!(window as any).webkitSpeechRecognition);

export class SpeechToText {
  private recognition: SpeechRecognition | null = null;
  private listening = false;
  private finalTranscript = "";

  onTranscript?: (final: string, interim: string) => void;
  onError?: (error: string) => void;
  onStart?: () => void;
  onEnd?: () => void;

  constructor(
    private lang = "pt-BR",
    callbacks?: SpeechToTextCallbacks,
  ) {
    if (typeof window === "undefined") {
      throw new Error("Speech recognition must run in a browser environment");
    }

    const SR =
      (window as any).SpeechRecognition ??
      (window as any).webkitSpeechRecognition;
    if (!SR) throw new Error("Web Speech API not supported");

    this.recognition = new SR() as SpeechRecognition;
    this.onTranscript = callbacks?.onTranscript;
    this.onError = callbacks?.onError;
    this.onStart = callbacks?.onStart;
    this.onEnd = callbacks?.onEnd;
  }

  private build(): SpeechRecognition {
    const r = this.recognition!;
    r.continuous = true;
    r.interimResults = true;
    r.lang = this.lang;

    r.onstart = () => this.onStart?.();

    r.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const text = e.results[i][0].transcript;
        if (e.results[i].isFinal) this.finalTranscript += text + " ";
        else interim += text;
      }
      this.onTranscript?.(this.finalTranscript, interim);
    };

    r.onerror = (e: SpeechRecognitionErrorEvent) => {
      this.onError?.(e.error);
      this.stop();
    };

    r.onend = () => {
      this.onEnd?.();
      if (this.listening) r.start();
    };

    return r;
  }

  start(): void {
    this.listening = true;
    this.build().start();
  }

  stop(): void {
    this.listening = false;
    this.recognition?.stop();
  }

  clear(): void {
    this.finalTranscript = "";
  }
}
