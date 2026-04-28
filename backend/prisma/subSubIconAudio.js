const DEFAULT_SUBSUB_RECORDING_URL = "/public/recordss/thing.m4a";

const GROUP_RECORDING_FALLBACKS = {
  "Transport::تاكسي": "/public/recordss/Taxi-1.m4a",
  "Transport::عجلة": "/public/recordss/Bicycle-1.m4a",
  "Call::مكالمة فيديو": "/public/recordss/Family.m4a",
  "Call::هاتف أرضي": "/public/recordss/Home.m4a",
  "Call::رسائل": "/public/recordss/Family.m4a",
  "Call::مؤتمر": "/public/recordss/Family.m4a",
  "Call::مكالمة طوارئ": "/public/recordss/Hospital.m4a",
  "Bathroom::استحمام": "/public/records/water.m4a",
  "Bathroom::تنظيف الأسنان": "/public/recordss/Teeth.m4a",
  "Bathroom::المرحاض": "/public/recordss/Toilet.m4a",
  "Bathroom::غسل اليدين": "/public/records/water.m4a",
  "Leisure::رياضة": "/public/recordss/Sport.m4a",
  "Leisure::ألعاب": "/public/records/game.m4a",
  "Leisure::ألعاب فيديو": "/public/records/game.m4a",
  "Leisure::شاطئ": "/public/records/park.m4a",
  "Leisure::هواية": "/public/recordss/Read.m4a",
  "Leisure::ترفيه": "/public/records/game.m4a",
  "Leisure::عرض": "/public/records/game.m4a",
  "Education::نشاط تعليمي": "/public/recordss/Read.m4a",
  "Education::مهمة تعليمية": "/public/recordss/Book.m4a",
  "Education::مواد تعليمية": "/public/recordss/Book.m4a",
  "Education::معدات تعليمية": "/public/recordss/Tool.m4a",
  "Education::طاقم تعليمي": "/public/recordss/School.m4a",
  "Education::طلاب": "/public/recordss/School.m4a",
  "Education::منهجية": "/public/recordss/Read.m4a",
  "Education::مفردات أساسية": "/public/recordss/Read.m4a",
  "work::القطاع الأولي": "/public/recordss/Work.m4a",
  "work::القطاع الثانوي": "/public/recordss/Work.m4a",
  "work::القطاع الثالثي": "/public/recordss/Work.m4a",
};

const CATEGORY_RECORDING_FALLBACKS = {
  Breakfast: "/public/recordss/Eating.m4a",
  Lunch: "/public/recordss/Eating.m4a",
  Dinner: "/public/recordss/Eating.m4a",
  Snack: "/public/recordss/Eating.m4a",
  Family: "/public/recordss/Family.m4a",
  Feelings: "/public/recordss/Feelings.m4a",
  places: "/public/recordss/Places.m4a",
  Transport: "/public/recordss/Transport.m4a",
  Call: "/public/recordss/Family.m4a",
  Bathroom: DEFAULT_SUBSUB_RECORDING_URL,
  Leisure: "/public/records/game.m4a",
  Animals: "/public/recordss/Animals.m4a",
  Education: "/public/recordss/Read.m4a",
  work: "/public/recordss/Work.m4a",
};

export const resolveSubSubRecordingUrl = ({
  category,
  parentTitle,
  recordingUrl,
  audioUrl,
  parentRecordingUrl,
  parentAudioUrl,
} = {}) => {
  const groupKey = category && parentTitle ? `${category}::${parentTitle}` : null;

  return (
    recordingUrl ??
    audioUrl ??
    parentRecordingUrl ??
    parentAudioUrl ??
    (groupKey ? GROUP_RECORDING_FALLBACKS[groupKey] : null) ??
    (category ? CATEGORY_RECORDING_FALLBACKS[category] : null) ??
    DEFAULT_SUBSUB_RECORDING_URL
  );
};

export const resolveSubIconRecordingUrl = ({
  category,
  title,
  recordingUrl,
  audioUrl,
  childRecordingUrls = [],
} = {}) => {
  const groupKey = category && title ? `${category}::${title}` : null;
  const childRecordingUrl = childRecordingUrls.find(Boolean);

  return (
    recordingUrl ??
    audioUrl ??
    childRecordingUrl ??
    (groupKey ? GROUP_RECORDING_FALLBACKS[groupKey] : null) ??
    (category ? CATEGORY_RECORDING_FALLBACKS[category] : null) ??
    DEFAULT_SUBSUB_RECORDING_URL
  );
};

export const resolveIconRecordingUrl = ({
  category,
  recordingUrl,
  audioUrl,
  childRecordingUrls = [],
} = {}) => {
  const childRecordingUrl = childRecordingUrls.find(Boolean);

  return (
    recordingUrl ??
    audioUrl ??
    (category ? CATEGORY_RECORDING_FALLBACKS[category] : null) ??
    childRecordingUrl ??
    null
  );
};
