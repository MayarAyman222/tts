# Voxi User Flow - Mermaid

This document maps the current app features from the React routes, page behavior, API helpers, and Express endpoints.

## 1. Overall App Navigation

```mermaid
flowchart TD
  U([User]) --> Landing["Landing page /"]

  Landing --> Info["Browse Home, Features, Users, About"]
  Landing --> Login["Login /login"]
  Landing --> Signup["Signup /signup"]
  Signup --> SignupForm["Enter first name, last name, email, password, patient type"]
  SignupForm --> SignupApi["POST /api/auth/signup"]
  SignupApi --> Login
  Login --> LoginForm["Enter email and password"]
  LoginForm --> LoginApi["POST /api/auth/login"]
  LoginApi --> SaveUser["Save loggedInUser in localStorage"]
  SaveUser --> Landing
  Landing --> Logout["Logout"]
  Logout --> Login

  Landing --> StartOnline["Start Online Mode"]
  StartOnline --> Main["Main Categories /main-categories"]

  Landing --> StartOffline["Offline Mode"]
  StartOffline --> SetOffline["Set voxi:offline-mode"]
  SetOffline --> OnlineCheck{Connection online?}
  OnlineCheck -- Yes --> SyncCache["Sync offline manifest, API JSON, media, landing assets"]
  OnlineCheck -- No --> UseCache["Use existing service worker cache"]
  SyncCache --> Main
  UseCache --> Main

  Main --> RegularCategory["Regular icon category"]
  Main --> RealLife["Real Life Activities"]
  Main --> Emergency["Emergency"]
  Main --> Training["Try and Train to Speak"]
  Main --> Drawing["Express Your Feelings By Drawing"]
  Main --> Assistant["AAC Assistant"]
  Main --> Routine["Daily Routine"]

  RegularCategory --> IconsByCategory["Icons /icons/:mainCategoryId"]
  RealLife --> TimePeriods["Time periods /maincategories/:id/timeperiods"]
  TimePeriods --> IconsByTime["Icons /timeperiods/:timePeriodId/icons"]
  IconsByCategory --> SubIcons["SubIcons /subicons/:iconId"]
  IconsByTime --> SubIcons

  SubIcons --> SubDecision{Selected SubIcon has SubSubIcons?}
  SubDecision -- Yes --> SubSubList["SubSubIcons /icons/:iconId/subicons/:subIconId/subsubicons"]
  SubDecision -- No --> SubDetail["SubIcon detail /icons/:iconId/subicons/:subIconId"]
  SubSubList --> SubSubDetail["SubSubIcon detail /icons/:iconId/subicons/:subIconId/subsubicons/:subSubIconId"]

  Emergency --> EmergencyPage["Emergency page /emergency"]
  EmergencyPage --> MessagePage["AAC Message page /message"]
  Training --> TrainingPage["Training page /training"]
  Drawing --> DrawingPage["Drawing page /express-drawing"]
  Assistant --> ChatPage["Chat page /chat"]
  Routine --> RoutinePage["Daily Routine page /daily-routine"]
```

## 2. AAC Icons, Speech, and Content Management

```mermaid
flowchart TD
  Start["User opens an Icons page"] --> LoadIcons["GET /maincategories/:id/icons or /timeperiods/:id/icons"]
  LoadIcons --> PickIcon["Tap icon card"]
  PickIcon --> LoadSubIcons["GET /icons/:iconId"]
  LoadSubIcons --> SubIconsPage["SubIcons page"]

  SubIconsPage --> ChooseControls["Choose time, connector, voice mode, volume, speed"]
  ChooseControls --> SelectSubIcons["Select one or more SubIcons"]
  SelectSubIcons --> SentencePreview["Generated sentence and selected image preview"]
  SentencePreview --> PlaySubIcons["Play selected sounds"]

  PlaySubIcons --> VoiceMode{Voice mode}
  VoiceMode -- Human Records --> PlayRecordings["Play parent and selected recordings"]
  VoiceMode -- Male or Female --> BrowserSpeech["Browser speech synthesis"]
  VoiceMode -- AI Male or AI Female --> ElevenLabs["ElevenLabs TTS"]
  ElevenLabs --> TtsFallback{TTS fails?}
  TtsFallback -- Yes --> GoogleFallback["Google TTS fallback"]
  TtsFallback -- No --> TrackRoutine
  GoogleFallback --> TrackRoutine["Track played items in daily routine storage"]
  BrowserSpeech --> TrackRoutine
  PlayRecordings --> TrackRoutine
  TrackRoutine --> RoutineThreshold{Item played 3 or more times?}
  RoutineThreshold -- Yes --> DailyRoutineVisible["Item appears in Daily Routine"]
  RoutineThreshold -- No --> StayHidden["Keep usage count only"]

  SubIconsPage --> ReorderCheck{Category is Food and Drink or Medicine?}
  ReorderCheck -- Yes --> SaveOrder["Move spoken items to end and save iconOrder in localStorage"]
  ReorderCheck -- No --> NoReorder["Keep current order"]

  SubIconsPage --> CardTap["Tap SubIcon card body"]
  CardTap --> HasChildren{Has SubSubIcons?}
  HasChildren -- Yes --> LoadSubSub["Open SubSubIcons page"]
  HasChildren -- No --> SubIconDetail["Open SubIcon detail"]

  SubIconDetail --> DetailVoice["Choose voice mode"]
  DetailVoice --> DetailSpeak["Speak item"]
  DetailSpeak --> TrackRoutine

  LoadSubSub --> SearchSubSub["Search SubSubIcons"]
  SearchSubSub --> SelectSubSub["Select one or more SubSubIcons"]
  SelectSubSub --> SubSubSentence["Generated sentence with parent SubIcon"]
  SubSubSentence --> PlaySubSub["Play selected SubSubIcons"]
  PlaySubSub --> VoiceMode

  LoadSubSub --> SubSubDetail["Tap SubSubIcon detail"]
  SubSubDetail --> SubSubDetailSpeak["Choose voice, volume, speed, then Speak"]
  SubSubDetailSpeak --> TrackRoutine

  SubIconsPage --> AddSubIcon["Add SubIcon"]
  SubIconsPage --> EditSubIcon["Edit SubIcon"]
  SubIconsPage --> DeleteSubIcon["Delete SubIcon"]
  AddSubIcon --> SubIconForm["Title, expression, category, image, audio"]
  EditSubIcon --> SubIconForm
  SubIconForm --> ImageChoice["Image by upload, URL, or camera"]
  SubIconForm --> AudioChoice["Audio by upload, URL, or microphone capture"]
  ImageChoice --> SaveSubIcon["POST or PUT /icons/:iconId/subicons"]
  AudioChoice --> SaveSubIcon
  DeleteSubIcon --> DeleteSubIconApi["DELETE /icons/:iconId/subicons/:subIconId"]

  LoadSubSub --> AddSubSub["Add SubSubIcon"]
  LoadSubSub --> EditSubSub["Edit SubSubIcon"]
  LoadSubSub --> DeleteSubSub["Delete SubSubIcon"]
  AddSubSub --> SubSubForm["Title, expression, category, image, audio"]
  EditSubSub --> SubSubForm
  SubSubForm --> SubSubImageChoice["Image by upload, URL, or camera"]
  SubSubForm --> SubSubAudioChoice["Audio by upload, URL, or microphone capture"]
  SubSubImageChoice --> SaveSubSub["POST /subicons/:subIconId/subsubicons or PUT nested endpoint"]
  SubSubAudioChoice --> SaveSubSub
  DeleteSubSub --> DeleteSubSubApi["DELETE nested SubSubIcon endpoint"]
```

## 3. Emergency, AAC Messages, and WhatsApp

```mermaid
flowchart TD
  EmergencyStart["Open Emergency page"] --> LoadNumbers["GET /emergency-numbers"]
  EmergencyStart --> UserLogged{Logged in?}

  UserLogged -- No --> LoginPrompt["Show login prompt for personal inbox"]
  UserLogged -- Yes --> PollInbox["GET /aac-messages?receiverId=user.id every 3 seconds"]
  PollInbox --> NewMessage{New message found?}
  NewMessage -- Yes --> IncomingNotice["Show incoming notice"]
  NewMessage -- No --> InboxList["Render existing inbox messages"]
  IncomingNotice --> AutoSpeakCheck{Auto Speak enabled?}
  AutoSpeakCheck -- Yes --> SpeakIncoming["Speak new message with ElevenLabs then browser fallback"]
  AutoSpeakCheck -- No --> InboxList
  InboxList --> ManualSpeak["User can press Speak per message"]
  ManualSpeak --> SpeakIncoming

  EmergencyStart --> EnableAutoSpeak["Enable Auto Speak"]
  EnableAutoSpeak --> AutoSpeakReady["Store enabled flag in page state and speak confirmation"]

  EmergencyStart --> AddNumber["Add Emergency Number"]
  AddNumber --> NumberForm["Number plus optional labels in English, Arabic, French, Spanish"]
  NumberForm --> SaveNumber["POST /emergency-numbers"]
  SaveNumber --> LoadNumbers

  EmergencyStart --> UrgentMessage["Send Urgent Message"]
  UrgentMessage --> PickEmergencyNumber["Choose saved emergency number"]
  PickEmergencyNumber --> WriteUrgentText["Write urgent text"]
  WriteUrgentText --> OpenWhatsApp["Open https://wa.me/:phone?text=:message"]

  EmergencyStart --> MessagePage["Open AAC Message page"]
  MessagePage --> MessageLogin{Logged in?}
  MessageLogin -- No --> MessageLoginPrompt["Prompt user to login"]
  MessageLogin -- Yes --> LoadUsers["GET /api/users excluding current user"]
  LoadUsers --> PickReceiver["Choose receiver account"]
  PickReceiver --> ComposeMessage["Write message or append quick AAC phrase"]
  ComposeMessage --> Preview["Preview receiver text"]
  Preview --> SpeakPreview["Speak preview with browser voice"]
  Preview --> SendAac["POST /aac-messages"]
  SendAac --> StoredMessage["Store sender, receiver, source, message in AacMessage"]
  StoredMessage --> ReceiverPoll["Receiver Emergency page picks it up during polling"]

  WhatsAppInbound["WhatsApp webhook receives external reply"] --> NormalizeWebhook["Normalize Twilio, Meta, or generic payload"]
  NormalizeWebhook --> SaveWhatsAppMessage["Save source=whatsapp in AacMessage"]
  SaveWhatsAppMessage --> ReceiverPoll

  BackendSend["Optional backend WhatsApp send API"] --> MetaApi["POST Meta Graph messages API"]
```

## 4. Speech Training

```mermaid
flowchart TD
  TrainingStart["Open /training"] --> EnterTarget["Enter target word or sentence"]
  EnterTarget --> SelectLanguage["Choose language"]
  SelectLanguage --> StartRecording["Start Recording"]

  StartRecording --> ValidateTraining{Ready?}
  ValidateTraining -- Not secure context --> SecureError["Show HTTPS or localhost error"]
  ValidateTraining -- Unsupported browser --> BrowserError["Show SpeechRecognition support error"]
  ValidateTraining -- Empty target --> TargetError["Ask user to enter target"]
  ValidateTraining -- Offline --> NetworkError["Show network recognition message"]
  ValidateTraining -- Ready --> MicPermission["Request microphone permission"]

  MicPermission --> PermissionResult{Permission granted?}
  PermissionResult -- No --> PermissionError["Show microphone permission error"]
  PermissionResult -- Yes --> StartMediaRecorder["Start MediaRecorder"]
  StartMediaRecorder --> StartSpeechRecognition["Start Web Speech recognition"]

  StartSpeechRecognition --> RecognitionResult{Recognition result}
  RecognitionResult -- Transcript --> Score["Normalize text and calculate Levenshtein score"]
  RecognitionResult -- No speech or error --> RecognitionError["Show specific recognition error"]
  Score --> SaveAttempt["Save attempt in localStorage training_attempts_v1"]
  SaveAttempt --> DisplayResult["Show transcript, score, pass or retry message"]
  DisplayResult --> Improvement["Compare with previous attempt"]
  Improvement --> Chart["Update progress chart and attempts table"]

  StartSpeechRecognition --> StopRecording["Stop"]
  StopRecording --> StopRecognizer["Stop recognition"]
  StopRecognizer --> StopRecorder["Stop recorder and create audio playback URL"]
  Chart --> ClearAttempts["Clear attempts for current word"]
```

## 5. Drawing Recognition and AAC Assistant

```mermaid
flowchart TD
  DrawingStart["Open /express-drawing"] --> DrawingLanguage["Choose recognition and TTS language"]
  DrawingLanguage --> DrawCanvas["Draw text or feeling on canvas"]
  DrawCanvas --> PreviewCanvas["Live preview canvas"]
  PreviewCanvas --> RunOcr["Run OCR"]
  RunOcr --> DrawingApi["POST /api/drawing/recognize"]
  DrawingApi --> Tesseract["Preprocess PNG and recognize with Tesseract"]
  Tesseract --> RecognizedText["Show recognized phrase and raw OCR"]
  RecognizedText --> EditText["User edits phrase"]
  EditText --> SpeakText["Speak Text"]
  SpeakText --> GoogleDrawingTts["POST /api/tts/gtts"]
  GoogleDrawingTts --> PlayDrawingAudio["Play generated speech audio"]
  DrawingStart --> ClearDrawing["Clear drawing"]
  RecognizedText --> ClearText["Clear recognized text"]

  ChatStart["Open /chat"] --> ChatLanguage["Choose assistant language"]
  ChatLanguage --> Welcome["Show language-specific welcome message"]
  Welcome --> QuickPrompt["Tap quick prompt"]
  Welcome --> TypeQuestion["Type AAC question"]
  QuickPrompt --> SendChat["POST /api/chat"]
  TypeQuestion --> SendChat
  SendChat --> ChatProvider{Configured provider}
  ChatProvider -- Groq --> GroqApi["Call Groq OpenAI-compatible chat API"]
  ChatProvider -- Local --> LocalDataset["Match local AAC response dataset"]
  LocalDataset --> ClarifyCheck{Input unclear?}
  ClarifyCheck -- Yes --> ClarifyReply["Return local clarify response"]
  ClarifyCheck -- No --> AssistantReply["Return matched or default reply"]
  GroqApi --> AssistantReply
  AssistantReply --> ChatMessages["Append assistant message"]
  ChatMessages --> SpeakReply["Speak last reply"]
  SpeakReply --> GoogleChatTts["POST /api/tts/gtts"]
  GoogleChatTts --> AudioControls["Play, pause, resume reply audio"]
```

## 6. Daily Routine

```mermaid
flowchart TD
  PlayAny["User plays SubIcon or SubSubIcon speech"] --> Track["trackRoutinePlayback"]
  Track --> SaveRoutine["Save item, sourcePath, media, parent, count, timestamps in localStorage"]
  SaveRoutine --> CountCheck{Speak count >= 3?}
  CountCheck -- No --> NotShown["Not shown in Daily Routine yet"]
  CountCheck -- Yes --> RoutinePage["Open /daily-routine"]

  RoutinePage --> LoadRoutine["Read daily_routine_items_v1"]
  LoadRoutine --> GroupItems["Group by parent title or category"]
  GroupItems --> RenderCards["Render routine cards with speak count"]
  RenderCards --> SpeakAll["Speak all routine items"]
  RenderCards --> SpeakOne["Speak one item"]
  RenderCards --> OpenSource["Tap card to navigate back to original item"]
  RenderCards --> RemoveOne["Remove one routine item"]
  RenderCards --> ClearAll["Clear full routine"]

  SpeakAll --> RoutineVoice{Voice mode}
  SpeakOne --> RoutineVoice
  RoutineVoice -- Human with audio --> PlayRoutineAudio["Play stored recording"]
  RoutineVoice -- Human without audio --> BrowserFallback["Browser female voice fallback"]
  RoutineVoice -- Male or Female --> BrowserRoutine["Browser speech"]
  RoutineVoice -- AI Male or AI Female --> ElevenRoutine["ElevenLabs TTS"]
```

## 7. Backend and Offline Support

```mermaid
flowchart TD
  Frontend["React frontend"] --> ApiHelpers["api.js and auth.js"]
  ApiHelpers --> Express["Express backend"]
  Express --> Prisma["Prisma Client"]
  Prisma --> Database["PostgreSQL models: User, MainCategory, TimePeriod, Icon, SubIcon, SubSubIcon, EmergencyNumber, AacMessage, SpeechAttempt"]

  Express --> StaticPublic["Serve /public images, uploads, audio, default image fallback"]
  Express --> Uploads["Multer uploads for icon images and audio"]
  Express --> TtsSpeak["POST /api/tts/speak"]
  TtsSpeak --> ElevenBackend["ElevenLabs API"]
  ElevenBackend --> ElevenFallback{Certain ElevenLabs errors?}
  ElevenFallback -- Yes --> GoogleBackendTts["Google TTS fallback"]
  ElevenFallback -- No --> AudioResponse["Return audio/mpeg"]
  GoogleBackendTts --> AudioResponse

  Express --> Gtts["POST /api/tts/gtts"]
  Gtts --> GoogleTts["google-tts-api"]
  GoogleTts --> AudioResponse

  Express --> ChatApi["POST /api/chat"]
  ChatApi --> GroqOrLocal["Groq provider if configured, otherwise local dataset"]

  Express --> DrawingApi["POST /api/drawing/recognize"]
  DrawingApi --> Ocr["Tesseract OCR with eng or ara trained data"]

  Frontend --> OfflineWorker["Service worker /offline-sw.js"]
  Frontend --> OfflineSync["syncOfflineCache"]
  OfflineSync --> OfflineManifest["GET /offline-manifest"]
  OfflineManifest --> ManifestBuild["Build cached API responses and media list"]
  ManifestBuild --> CacheStorage["Browser Cache Storage"]
  ApiHelpers --> CachedFetch["cachedFetch"]
  CachedFetch --> OfflineRuntime{Offline mode or connection offline?}
  OfflineRuntime -- Yes --> CacheStorage
  OfflineRuntime -- No --> Express
```

## 8. Relational Tables / ERD

```mermaid
erDiagram
  MainCategory {
    Int id PK
    String name UK
    String title_en
    String title_ar
    String title_fr
    String title_es
    String imgUrl "nullable"
    Int userId FK "nullable"
  }

  TimePeriod {
    Int id PK
    String name
    String title_en
    String title_ar
    String title_fr
    String title_es
    String imgUrl "nullable"
    Int order
    Int mainCategoryId FK
  }

  Icon {
    Int id PK
    String title_en
    String title_ar
    String title_fr
    String title_es
    String expression_en
    String expression_ar
    String expression_fr
    String expression_es
    String imgUrl "nullable"
    String iconName "nullable"
    String category
    String audioUrl "nullable"
    Int mainCategoryId FK
    Int timePeriodId FK "nullable"
    DateTime createdAt
  }

  SubIcon {
    Int id PK
    String title_en
    String title_ar
    String title_fr
    String title_es
    String expression_en
    String expression_ar
    String expression_fr
    String expression_es
    String imgUrl
    String category
    String audioUrl "nullable"
    Int iconId FK
    DateTime createdAt
  }

  SubSubIcon {
    Int id PK
    String title_en
    String title_ar
    String title_fr
    String title_es
    String expression_en
    String expression_ar
    String expression_fr
    String expression_es
    String imgUrl "nullable"
    String category
    String audioUrl "nullable"
    Int subIconId FK
    DateTime createdAt
  }

  User {
    Int id PK
    String firstName
    String lastName
    String email UK
    String passwordHash
    String salt
    Condition condition
    DateTime createdAt
    DateTime updatedAt
  }

  AacMessage {
    Int id PK
    String senderName
    String message
    String source
    String senderPhone "nullable"
    String externalId "nullable"
    Int senderId FK "nullable"
    Int receiverId FK "nullable"
    Int replyToId FK "nullable"
    DateTime createdAt
  }

  EmergencyNumber {
    Int id PK
    String number UK
    String label_en
    String label_ar
    String label_fr
    String label_es
    Int userId FK "nullable"
  }

  SpeechAttempt {
    Int id PK
    String word
    String transcript
    Int score
    Int userId FK "nullable"
    DateTime createdAt
  }

  MainCategory ||--o{ TimePeriod : has
  MainCategory ||--o{ Icon : contains
  TimePeriod |o--o{ Icon : optionally_groups
  Icon ||--o{ SubIcon : has
  SubIcon ||--o{ SubSubIcon : has
  User |o--o{ MainCategory : creates
  User |o--o{ AacMessage : sends
  User |o--o{ AacMessage : receives
  User |o--o{ EmergencyNumber : saves
  User |o--o{ SpeechAttempt : practices
  AacMessage |o--o{ AacMessage : replies_to
```
