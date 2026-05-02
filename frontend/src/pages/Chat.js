import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  generateGoogleTtsAudioUrl,
  normalizeMediaUrl,
  sendChatMessage,
} from "../api/api";

const welcomeByLang = {
  en: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
  ar: "أهلا. أنا مساعد AAC. اسألني عن استخدام الجهاز، الكلمات الأساسية، السلوك، modeling، المدرسة، أو احتياجات التواصل اليومية.",
  fr: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
  es: "Hello. I am your AAC assistant. Ask me about device use, core words, behavior, modeling, school, or daily communication needs.",
};

const placeholderByLang = {
  en: "Ask an AAC question...",
  ar: "اكتب سؤالا عن AAC...",
  fr: "Ask an AAC question...",
  es: "Ask an AAC question...",
};

const sendLabelByLang = {
  en: "Send",
  ar: "إرسال",
  fr: "Envoyer",
  es: "Enviar",
};

const speakLabelByLang = {
  en: "Speak",
  ar: "تشغيل",
  fr: "Parler",
  es: "Hablar",
};

const titleByLang = {
  en: "AAC Assistant",
  ar: "مساعد AAC",
  fr: "AAC Assistant",
  es: "AAC Assistant",
};

const quickPromptsByLang = {
  en: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
  ar: [
    "كيف أبدأ AAC؟",
    "ابني يرفض الجهاز",
    "ما الكلمات الأساسية التي أبدأ بها؟",
  ],
  fr: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
  es: [
    "How do I start AAC?",
    "My child refuses the device",
    "What core words should I teach first?",
  ],
};

const errorReplyByLang = {
  en: "I could not reply right now. Please try again.",
  ar: "لم أستطع الرد الآن. حاول مرة أخرى.",
  fr: "Je ne peux pas repondre maintenant. Reessaie.",
  es: "No pude responder ahora. Intenta otra vez.",
};

const languageOptions = [
  { value: "en", label: "English" },
  { value: "ar", label: "العربية" },
  { value: "fr", label: "Français" },
  { value: "es", label: "Español" },
];

const colors = {
  background: "#f4f6fb",
  card: "#ffffff",
  text: "#172033",
  muted: "#647086",
  border: "#dfe4ee",
  accent: "#dc3545",
  accentSoft: "#fbe7ea",
};

const buildMessage = (role, text) => ({
  id: `${role}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  role,
  text,
});

function Chat() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const audioUrlRef = useRef("");
  const [language, setLanguage] = useState("en");
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [speechStatus, setSpeechStatus] = useState("idle");
  const [lastReplyText, setLastReplyText] = useState("");
  const [messages, setMessages] = useState(() => [
    buildMessage("assistant", welcomeByLang.en),
  ]);

  const releaseAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
      audioRef.current = null;
    }

    if (audioUrlRef.current?.startsWith("blob:")) {
      URL.revokeObjectURL(audioUrlRef.current);
    }

    audioUrlRef.current = "";
  }, []);

  useEffect(() => {
    releaseAudio();
    setSpeechStatus("idle");
    setLastReplyText("");
    setMessages([buildMessage("assistant", welcomeByLang[language] || welcomeByLang.en)]);
  }, [language, releaseAudio]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, sending]);

  useEffect(() => {
    return () => releaseAudio();
  }, [releaseAudio]);

  const quickPrompts = quickPromptsByLang[language] || quickPromptsByLang.en;
  const isRtl = language === "ar";
  const speechLoading = speechStatus === "loading";
  const speechPlaying = speechStatus === "playing";
  const speechPaused = speechStatus === "paused";
  const speechActive = speechLoading || speechPlaying || speechPaused;
  const speakButtonDisabled = sending || !lastReplyText || speechLoading;
  const speakButtonLabel = speechLoading
    ? "..."
    : speechPlaying
      ? "Pause"
      : speechPaused
        ? "Play"
        : speakLabelByLang[language] || speakLabelByLang.en;

  const stopCurrentSpeech = () => {
    releaseAudio();
    setSpeechStatus("idle");
  };

  const handleSend = async (presetText) => {
    const text = String(presetText ?? input).trim();
    if (!text || sending) return;

    const history = messages.map((message) => ({
      role: message.role,
      content: message.text,
    }));
    const userMessage = buildMessage("user", text);

    setMessages((previous) => [...previous, userMessage]);
    setInput("");
    setSending(true);
    stopCurrentSpeech();

    try {
      const result = await sendChatMessage({
        message: text,
        language,
        history,
      });

      const replyText = result?.reply || errorReplyByLang[language] || errorReplyByLang.en;
      setLastReplyText(replyText);
      setMessages((previous) => [
        ...previous,
        buildMessage("assistant", replyText),
      ]);
    } catch (error) {
      console.error("Chat page error:", error);
      const replyText = errorReplyByLang[language] || errorReplyByLang.en;
      setLastReplyText(replyText);
      setMessages((previous) => [
        ...previous,
        buildMessage("assistant", replyText),
      ]);
    } finally {
      setSending(false);
    }
  };

  const handleSpeak = async () => {
    const textToSpeak = lastReplyText.trim();
    if (!textToSpeak || speechLoading) return;

    try {
      if (audioRef.current) {
        if (!audioRef.current.paused) {
          audioRef.current.pause();
          setSpeechStatus("paused");
          return;
        }

        await audioRef.current.play();
        setSpeechStatus("playing");
        return;
      }

      setSpeechStatus("loading");
      const url = await generateGoogleTtsAudioUrl({
        text: textToSpeak,
        language,
      });

      const audio = new Audio(normalizeMediaUrl(url));
      audioRef.current = audio;
      audioUrlRef.current = url;

      audio.onended = () => {
        releaseAudio();
        setSpeechStatus("idle");
      };
      audio.onerror = () => {
        console.error("Chat audio playback error");
        releaseAudio();
        setSpeechStatus("idle");
      };

      await audio.play();
      setSpeechStatus("playing");
    } catch (error) {
      console.error("Chat speak error:", error);
      releaseAudio();
      setSpeechStatus("idle");
    }
  };

  return (
    <div style={styles.page}>
      <Container style={styles.shell}>
        <div style={styles.header}>
          <Button
            variant="light"
            onClick={() => navigate(-1)}
            style={styles.backButton}
            aria-label="Back"
          >
            ←
          </Button>

          <h2 style={styles.title}>{titleByLang[language] || titleByLang.en}</h2>

          <Form.Select
            value={language}
            onChange={(event) => setLanguage(event.target.value)}
            style={styles.languageSelect}
            aria-label="Language"
          >
            {languageOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Form.Select>
        </div>

        <div style={styles.quickPromptRow}>
          {quickPrompts.map((prompt) => (
            <Button
              key={prompt}
              variant="light"
              style={styles.promptChip}
              onClick={() => handleSend(prompt)}
              disabled={sending}
            >
              {prompt}
            </Button>
          ))}
        </div>

        <div style={styles.messagesPanel} dir={isRtl ? "rtl" : "ltr"}>
          {messages.map((message) => {
            const isUser = message.role === "user";
            return (
              <div
                key={message.id}
                style={{
                  ...styles.messageRow,
                  justifyContent: isUser ? "flex-end" : "flex-start",
                }}
              >
                <div
                  style={{
                    ...styles.messageBubble,
                    ...(isUser ? styles.userBubble : styles.assistantBubble),
                  }}
                >
                  {message.text}
                </div>
              </div>
            );
          })}

          {sending && (
            <div style={{ ...styles.messageRow, justifyContent: "flex-start" }}>
              <div style={{ ...styles.messageBubble, ...styles.assistantBubble }}>
                <Spinner animation="border" size="sm" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        <div style={styles.composer}>
          <Form.Control
            as="textarea"
            rows={2}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                handleSend();
              }
            }}
            placeholder={placeholderByLang[language] || placeholderByLang.en}
            style={styles.input}
            dir={isRtl ? "rtl" : "ltr"}
          />

          <div style={styles.actionRow}>
            <Button
              variant="outline-danger"
              style={{
                ...styles.speakButton,
                backgroundColor: speechActive || !lastReplyText ? colors.accentSoft : colors.card,
              }}
              onClick={handleSpeak}
              disabled={speakButtonDisabled}
            >
              {speakButtonLabel}
            </Button>

            <Button
              variant="danger"
              style={styles.sendButton}
              onClick={() => handleSend()}
              disabled={sending}
            >
              {sending ? (
                <Spinner animation="border" size="sm" />
              ) : (
                sendLabelByLang[language] || sendLabelByLang.en
              )}
            </Button>
          </div>
        </div>
      </Container>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: colors.background,
    padding: "24px 12px",
  },
  shell: {
    maxWidth: "960px",
    minHeight: "calc(100vh - 48px)",
    display: "flex",
    flexDirection: "column",
    backgroundColor: colors.card,
    border: `1px solid ${colors.border}`,
    borderRadius: "8px",
    boxShadow: "0 12px 32px rgba(23, 32, 51, 0.08)",
    padding: 0,
    overflow: "hidden",
  },
  header: {
    minHeight: "68px",
    display: "grid",
    gridTemplateColumns: "auto minmax(0, 1fr) minmax(110px, 150px)",
    alignItems: "center",
    gap: "12px",
    padding: "12px 16px",
    borderBottom: `1px solid ${colors.border}`,
  },
  backButton: {
    width: "44px",
    height: "44px",
    borderRadius: "8px",
    fontSize: "22px",
    fontWeight: 800,
  },
  title: {
    margin: 0,
    textAlign: "center",
    fontSize: "24px",
    fontWeight: 800,
    color: colors.text,
    minWidth: 0,
    overflowWrap: "anywhere",
  },
  languageSelect: {
    minHeight: "42px",
    borderRadius: "8px",
    fontWeight: 700,
  },
  quickPromptRow: {
    display: "flex",
    flexWrap: "wrap",
    gap: "8px",
    padding: "12px 16px",
    borderBottom: `1px solid ${colors.border}`,
  },
  promptChip: {
    borderRadius: "999px",
    border: `1px solid ${colors.border}`,
    color: colors.accent,
    fontWeight: 700,
  },
  messagesPanel: {
    flex: 1,
    overflowY: "auto",
    padding: "18px 16px",
    backgroundColor: "#fbfcff",
  },
  messageRow: {
    display: "flex",
    marginBottom: "10px",
  },
  messageBubble: {
    maxWidth: "82%",
    border: "1px solid transparent",
    borderRadius: "18px",
    padding: "10px 14px",
    fontSize: "15px",
    lineHeight: 1.55,
    whiteSpace: "pre-wrap",
    overflowWrap: "anywhere",
  },
  userBubble: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
    color: "#ffffff",
  },
  assistantBubble: {
    backgroundColor: colors.card,
    borderColor: colors.border,
    color: colors.text,
  },
  composer: {
    borderTop: `1px solid ${colors.border}`,
    padding: "12px",
    backgroundColor: colors.card,
  },
  input: {
    minHeight: "54px",
    maxHeight: "120px",
    borderRadius: "8px",
    resize: "none",
  },
  actionRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "10px",
  },
  speakButton: {
    minWidth: "112px",
    minHeight: "46px",
    borderRadius: "8px",
    fontWeight: 800,
  },
  sendButton: {
    flex: 1,
    minHeight: "46px",
    borderRadius: "8px",
    fontWeight: 800,
  },
};

export default Chat;
