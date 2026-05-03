export const DAILY_ROUTINE_STORAGE_KEY = "daily_routine_items_v1";
export const DAILY_ROUTINE_THRESHOLD = 3;

const readRoutineMap = () => {
  if (typeof window === "undefined") return {};

  try {
    const raw = window.localStorage.getItem(DAILY_ROUTINE_STORAGE_KEY);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" && !Array.isArray(parsed)
      ? parsed
      : {};
  } catch (error) {
    console.log(error);
    return {};
  }
};

const writeRoutineMap = (routineMap) => {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(
      DAILY_ROUTINE_STORAGE_KEY,
      JSON.stringify(routineMap),
    );
  } catch (error) {
    console.log(error);
  }
};

const getRoutineKey = (item) => {
  const type = item?.type || "item";
  const id = item?.id ?? `${item?.category || "general"}-${item?.title || ""}`;
  return `${type}:${id}`;
};

const normalizeRoutineItem = (item) => {
  const title = String(item?.title || "").trim();
  if (!title) return null;

  return {
    id: item?.id ?? title,
    type: item?.type || "item",
    title,
    expression: String(item?.expression || "").trim(),
    imageUrl: item?.imageUrl || item?.imgUrl || "",
    audioUrl: item?.recordingUrl || item?.audioUrl || "",
    category: item?.category || "",
    parentTitle: item?.parentTitle || "",
    parentCategory: item?.parentCategory || "",
    sourcePath: item?.sourcePath || "",
  };
};

export const trackRoutinePlayback = (items) => {
  const routineItems = (Array.isArray(items) ? items : [items])
    .map(normalizeRoutineItem)
    .filter(Boolean);

  if (!routineItems.length) return [];

  const routineMap = readRoutineMap();
  const spokenAt = new Date().toISOString();

  routineItems.forEach((item) => {
    const key = getRoutineKey(item);
    const previous = routineMap[key] || {};

    routineMap[key] = {
      ...previous,
      ...item,
      key,
      speakCount: Number(previous.speakCount || 0) + 1,
      firstSpokenAt: previous.firstSpokenAt || spokenAt,
      lastSpokenAt: spokenAt,
    };
  });

  writeRoutineMap(routineMap);
  return Object.values(routineMap);
};

export const getRoutinePlaybackItems = () =>
  Object.values(readRoutineMap()).sort((a, b) => {
    const countDelta = Number(b.speakCount || 0) - Number(a.speakCount || 0);
    if (countDelta !== 0) return countDelta;
    return new Date(b.lastSpokenAt || 0) - new Date(a.lastSpokenAt || 0);
  });

export const getDailyRoutineItems = () =>
  getRoutinePlaybackItems().filter(
    (item) => Number(item.speakCount || 0) >= DAILY_ROUTINE_THRESHOLD,
  );

export const removeDailyRoutineItem = (key) => {
  const routineMap = readRoutineMap();
  delete routineMap[key];
  writeRoutineMap(routineMap);
};

export const clearDailyRoutineItems = () => {
  writeRoutineMap({});
};
