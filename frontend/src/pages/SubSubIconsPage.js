import React, { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button, Form, Modal } from "react-bootstrap";
import {
  API_BASE_URL,
  fetchJson,
  isElevenLabsVoiceMode,
  normalizeMediaUrl,
  speakWithBrowserVoice,
  speakWithElevenLabsVoice,
} from "../api/api";
import { trackRoutinePlayback } from "../utils/dailyRoutine";
import "./SubSubIconsPage.css";

const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const TIME_OPTIONS = ["اليوم", "أمس", "غدًا"];
const CONNECTOR_OPTIONS = ["و", "أو", "ثم"];
const VOICE_MODE_OPTIONS = [
  { value: "human", label: "Human Records" },
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "ai-male", label: "Records with AI - Male" },
  { value: "ai-female", label: "Records with AI - Female" },
];

function SubSubIconsPage() {
  const { iconId, subIconId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const audioRef = useRef(null);
  const cameraInputRef = useRef(null);
  const micInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [timeOption, setTimeOption] = useState(TIME_OPTIONS[0]);
  const [connector, setConnector] = useState(CONNECTOR_OPTIONS[0]);
  const [voiceMode, setVoiceMode] = useState("human");
  const [volume, setVolume] = useState(1);
  const [speed, setSpeed] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loading, setLoading] = useState(true);
  const [parentSubIcon, setParentSubIcon] = useState(location.state?.parentSubIcon || null);
  const [parentIcon, setParentIcon] = useState(location.state?.parentIcon || null);
  const [showModal, setShowModal] = useState(false);
  const [editingSubSubIcon, setEditingSubSubIcon] = useState(null);
  const [title, setTitle] = useState("");
  const [expression, setExpression] = useState("");
  const [category, setCategory] = useState("");
  const [imageMethod, setImageMethod] = useState("upload");
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [audioMethod, setAudioMethod] = useState("url");
  const [audioFile, setAudioFile] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [recordedFile, setRecordedFile] = useState(null);
  const [audioPreview, setAudioPreview] = useState("");

  useEffect(() => {
    const fetchSubIcon = async () => {
      try {
        setLoading(true);
        const data = await fetchJson(`${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}`, {
          cache: "no-store",
        });
        setParentSubIcon(data);
        setParentIcon(data?.icon || location.state?.parentIcon || null);
      } catch (error) {
        console.log(error);
        setParentSubIcon(null);
      } finally {
        setLoading(false);
      }
    };

    fetchSubIcon();
  }, [iconId, subIconId, location.state?.parentIcon]);

  useEffect(() => () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    if (typeof window !== "undefined" && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.playbackRate = speed;
    }
  }, [speed, volume]);

  const subSubIcons = useMemo(
    () => (Array.isArray(parentSubIcon?.subSubIcons) ? parentSubIcon.subSubIcons : []),
    [parentSubIcon],
  );

  const filteredSubSubIcons = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();
    if (!normalizedSearch) return subSubIcons;

    return subSubIcons.filter((item) => {
      const title = String(item?.title || "").toLowerCase();
      const expression = String(item?.expression || "").toLowerCase();
      return title.includes(normalizedSearch) || expression.includes(normalizedSearch);
    });
  }, [searchTerm, subSubIcons]);

  const toggleSelect = (id) => {
    setSelectedIds((previous) =>
      previous.includes(id)
        ? previous.filter((currentId) => currentId !== id)
        : [...previous, id],
    );
  };

  const generateSentence = () => {
    const selectedExpressions = subSubIcons
      .filter((item) => selectedIds.includes(item.id))
      .map((item) => String(item?.expression || item?.title || "").trim())
      .filter(Boolean);

    if (!selectedExpressions.length) {
      return "";
    }

    const parentExpression = String(parentSubIcon?.expression || parentSubIcon?.title || "").trim();
    const sentenceStart = [timeOption, parentExpression].filter(Boolean).join(" ");
    return [sentenceStart, selectedExpressions.join(` ${connector} `)]
      .filter(Boolean)
      .join(` ${connector} `)
      .trim();
  };

  const selectedSubSubIcons = useMemo(
    () =>
      selectedIds
        .map((id) => subSubIcons.find((item) => item.id === id))
        .filter(Boolean),
    [selectedIds, subSubIcons],
  );

  const readResponseError = async (res) => {
    const errorText = await res.text();

    try {
      const data = JSON.parse(errorText);
      return data?.message || data?.details || errorText || "Request failed";
    } catch (err) {
      return errorText || `Request failed with status ${res.status}`;
    }
  };

  const resetSubSubIconForm = () => {
    setEditingSubSubIcon(null);
    setTitle("");
    setExpression("");
    setCategory("");
    setImageMethod("upload");
    setImageFile(null);
    setImageUrl("");
    setImagePreview(null);
    setAudioMethod("url");
    setAudioFile(null);
    setAudioUrl("");
    setRecordedFile(null);
    setAudioPreview("");
  };

  const openAddModal = () => {
    resetSubSubIconForm();
    setCategory(parentSubIcon?.category || parentIcon?.category || "");
    setShowModal(true);
  };

  const openEditModal = (item) => {
    setEditingSubSubIcon(item);
    setTitle(item?.title || "");
    setExpression(item?.expression || "");
    setCategory(item?.category || parentSubIcon?.category || "");
    setImageMethod("url");
    setImageFile(null);
    setImageUrl(item?.imageUrl || "");
    setImagePreview(normalizeMediaUrl(item?.imageUrl || item?.imgUrl) || null);
    setAudioMethod("url");
    setAudioFile(null);
    setAudioUrl(item?.audioUrl || "");
    setRecordedFile(null);
    setAudioPreview(normalizeMediaUrl(item?.audioUrl || item?.recordingUrl) || "");
    setShowModal(true);
  };

  const closeSubSubIconModal = () => {
    setShowModal(false);
    resetSubSubIconForm();
  };

  const handleImageFile = (file) => {
    if (!file) return;
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleCameraCapture = (event) => {
    handleImageFile(event.target.files?.[0]);
  };

  const submitSubSubIcon = async () => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("expression", expression);
    formData.append("category", category);

    if (imageMethod === "upload" && imageFile) formData.append("image", imageFile);
    if (imageMethod === "url") formData.append("imageUrl", imageUrl);
    if (imageMethod === "camera" && imageFile) formData.append("image", imageFile);
    if (audioMethod === "upload" && audioFile) formData.append("audio", audioFile);
    if (audioMethod === "url" && audioUrl) formData.append("audioUrl", audioUrl);
    if (audioMethod === "record" && recordedFile) formData.append("audio", recordedFile);

    try {
      const requestUrl = editingSubSubIcon
        ? `${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons/${editingSubSubIcon.id}`
        : `${API_BASE_URL}/subicons/${subIconId}/subsubicons`;
      const res = await fetch(requestUrl, {
        method: editingSubSubIcon ? "PUT" : "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error(await readResponseError(res));
      }

      const savedSubSubIcon = await res.json();
      setParentSubIcon((previous) => {
        const currentSubSubIcons = Array.isArray(previous?.subSubIcons)
          ? previous.subSubIcons
          : [];
        const nextSubSubIcons = editingSubSubIcon
          ? currentSubSubIcons.map((item) =>
              item.id === savedSubSubIcon.id ? savedSubSubIcon : item,
            )
          : [...currentSubSubIcons, savedSubSubIcon];

        return {
          ...previous,
          subSubIcons: nextSubSubIcons,
        };
      });
      closeSubSubIconModal();
    } catch (error) {
      console.log("Save SubSubIcon error:", error);
      alert(`Failed to save SubSubIcon: ${error.message}`);
    }
  };

  const deleteSubSubIcon = async (item) => {
    const confirmed = window.confirm(`Delete "${item.title}"?`);
    if (!confirmed) return;

    try {
      const res = await fetch(
        `${API_BASE_URL}/icons/${iconId}/subicons/${subIconId}/subsubicons/${item.id}`,
        { method: "DELETE" },
      );

      if (!res.ok) {
        throw new Error(await readResponseError(res));
      }

      setParentSubIcon((previous) => ({
        ...previous,
        subSubIcons: (previous?.subSubIcons || []).filter(
          (subSubIcon) => subSubIcon.id !== item.id,
        ),
      }));
      setSelectedIds((previous) => previous.filter((id) => id !== item.id));
    } catch (error) {
      console.log("Delete SubSubIcon error:", error);
      alert(`Failed to delete SubSubIcon: ${error.message}`);
    }
  };

  const handleSpeak = async () => {
    if (!selectedIds.length) return;

    const audio = audioRef.current || new Audio();
    audioRef.current = audio;

    const playSource = (src) =>
      new Promise((resolve) => {
        audio.pause();
        audio.src = src;
        audio.currentTime = 0;
        audio.volume = volume;
        audio.playbackRate = speed;
        audio.onended = resolve;
        audio.onerror = resolve;

        const playPromise = audio.play();
        if (playPromise?.catch) {
          playPromise.catch(() => resolve());
        }
      });

    const markSelectedRoutineItems = () => {
      trackRoutinePlayback(
        selectedSubSubIcons.map((item) => ({
          ...item,
          type: "subsubicon",
          parentTitle: parentSubIcon?.title || "",
          parentCategory: parentIcon?.category || parentSubIcon?.category || "",
          sourcePath: `/icons/${iconId}/subicons/${subIconId}/subsubicons/${item.id}`,
        })),
      );
    };

    setIsPlaying(true);

    try {
      if (isElevenLabsVoiceMode(voiceMode)) {
        const audioPlayed = await speakWithElevenLabsVoice(generateSentence(), voiceMode, {
          volume,
          rate: speed,
        });
        if (!audioPlayed) {
          throw new Error("ElevenLabs TTS failed");
        }
        markSelectedRoutineItems();
        return;
      }

      if (voiceMode !== "human") {
        const audioPlayed = await speakWithBrowserVoice(generateSentence(), voiceMode, {
          volume,
          rate: speed,
        });
        if (!audioPlayed) {
          alert("Speech is not available in this browser");
          return;
        }
        markSelectedRoutineItems();
        return;
      }

      const queue = [];
      const parentAudio = parentSubIcon?.recordingUrl || parentSubIcon?.audioUrl;

      if (parentAudio) {
        queue.push(normalizeMediaUrl(parentAudio));
      }

      selectedSubSubIcons.forEach((item) => {
        const audioUrl = item?.recordingUrl || item?.audioUrl;
        if (audioUrl) {
          queue.push(normalizeMediaUrl(audioUrl));
        }
      });

      if (!queue.length) {
        throw new Error("No recording available for the selected items");
      }

      for (const src of queue) {
        await playSource(src);
      }
      markSelectedRoutineItems();
    } catch (error) {
      console.log("TTS playback error:", error);
      alert(error.message || "TTS failed");
    } finally {
      setIsPlaying(false);
    }
  };

  if (loading) {
    return <p className="text-center mt-5">جاري التحميل...</p>;
  }

  if (!parentSubIcon) {
    return <p className="text-center mt-5">لا توجد بيانات.</p>;
  }

  return (
    <div className="subsub-page">
      <div className="subsub-hero">
        <button
          type="button"
          className="subsub-back"
          onClick={() => navigate(-1)}
        >
          رجوع
        </button>

        <h1 className="subsub-title">{parentSubIcon.title}</h1>
        <p className="subsub-subtitle">
          {parentIcon?.title ? `${parentIcon.title} / ${parentSubIcon.title}` : parentSubIcon.expression}
        </p>
      </div>

      <div className="subsub-controls">
        <input
          type="text"
          className="subsub-input"
          placeholder="بحث"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
        />

        <select
          className="subsub-select"
          value={connector}
          onChange={(event) => setConnector(event.target.value)}
        >
          {CONNECTOR_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="subsub-select"
          value={timeOption}
          onChange={(event) => setTimeOption(event.target.value)}
        >
          {TIME_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <select
          className="subsub-select"
          value={voiceMode}
          onChange={(event) => setVoiceMode(event.target.value)}
        >
          {VOICE_MODE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <button
          type="button"
          className="subsub-action"
          onClick={handleSpeak}
          disabled={isPlaying || selectedIds.length === 0}
        >
          {isPlaying ? "جاري التشغيل..." : "تشغيل التسجيلات"}
        </button>

        <button
          type="button"
          className="subsub-action"
          onClick={openAddModal}
        >
          Add SubSubIcon
        </button>
      </div>

      <div className="subsub-audio-controls">
        <label className="subsub-slider">
          <span>Volume {Math.round(volume * 100)}%</span>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(event) => setVolume(Number(event.target.value))}
          />
        </label>

        <label className="subsub-slider">
          <span>Speed {speed.toFixed(2)}x</span>
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.05"
            value={speed}
            onChange={(event) => setSpeed(Number(event.target.value))}
          />
        </label>
      </div>

      {selectedIds.length > 0 ? (
        <div className="subsub-sentence-box">
          <p className="subsub-sentence-text">{generateSentence()}</p>
          <div className="subsub-preview-row">
            {selectedSubSubIcons.map((item) => (
              <div key={item.id} className="subsub-preview-item">
                <img
                  src={normalizeMediaUrl(item?.imageUrl || item?.imgUrl) || DEFAULT_IMAGE}
                  alt={item.title}
                  className="subsub-preview-image"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = DEFAULT_IMAGE;
                  }}
                />
                <span>{item.title}</span>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {filteredSubSubIcons.length ? (
        <div className={`subsub-grid ${selectedIds.length ? "has-selection" : ""}`}>
          {filteredSubSubIcons.map((item) => {
            const selected = selectedIds.includes(item.id);
            return (
              <div
                key={item.id}
                className={`subsub-card ${selected ? "is-selected" : ""}`}
              >
                <button
                  type="button"
                  className="subsub-check"
                  onClick={() => toggleSelect(item.id)}
                >
                  {selected ? "✔" : "○"}
                </button>

                <div className="subsub-card-tools">
                  <button
                    type="button"
                    className="subsub-tool-button"
                    onClick={(event) => {
                      event.stopPropagation();
                      openEditModal(item);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="subsub-tool-button is-danger"
                    onClick={(event) => {
                      event.stopPropagation();
                      deleteSubSubIcon(item);
                    }}
                  >
                    Delete
                  </button>
                </div>

                <button
                  type="button"
                  className="subsub-card-body"
                  onClick={() =>
                    navigate(
                      `/icons/${iconId}/subicons/${subIconId}/subsubicons/${item.id}`,
                      {
                        state: {
                          subSubIcon: item,
                          parentSubIcon,
                          parentIcon,
                        },
                      },
                    )
                  }
                >
                  <img
                    src={normalizeMediaUrl(item?.imageUrl || item?.imgUrl) || DEFAULT_IMAGE}
                    alt={item.title}
                    className="subsub-card-image"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = DEFAULT_IMAGE;
                    }}
                  />

                  <div className="subsub-card-footer">
                    <h3>{item.title}</h3>
                    <p>{item.expression}</p>
                  </div>
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="text-center mt-4">لا توجد عناصر فرعية إضافية.</p>
      )}

      <Modal show={showModal} onHide={closeSubSubIconModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingSubSubIcon ? "Edit SubSubIcon" : "Add SubSubIcon"}
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Title</Form.Label>
              <Form.Control
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Expression</Form.Label>
              <Form.Control
                value={expression}
                onChange={(event) => setExpression(event.target.value)}
              />
            </Form.Group>

            <Form.Group className="mt-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                value={category}
                onChange={(event) => setCategory(event.target.value)}
              />
            </Form.Group>

            <hr />

            <h5>Image</h5>
            <Form.Select
              value={imageMethod}
              onChange={(event) => setImageMethod(event.target.value)}
            >
              <option value="upload">Upload</option>
              <option value="url">URL</option>
              <option value="camera">Camera</option>
            </Form.Select>

            {imageMethod === "upload" && (
              <Form.Control
                type="file"
                accept="image/*"
                onChange={(event) => handleImageFile(event.target.files?.[0])}
              />
            )}

            {imageMethod === "url" && (
              <Form.Control
                placeholder="Image URL"
                value={imageUrl}
                onChange={(event) => {
                  setImageUrl(event.target.value);
                  setImagePreview(event.target.value);
                }}
              />
            )}

            {imageMethod === "camera" && (
              <>
                <input
                  ref={cameraInputRef}
                  type="file"
                  accept="image/*"
                  capture="environment"
                  style={{ display: "none" }}
                  onChange={handleCameraCapture}
                />

                <Button
                  className="mt-2"
                  onClick={(event) => {
                    event.preventDefault();
                    cameraInputRef.current?.click();
                  }}
                >
                  Open Camera
                </Button>
              </>
            )}

            {imagePreview && (
              <div className="mt-3 text-center">
                <p>Image Preview</p>
                <img
                  src={imagePreview}
                  style={{ width: "200px", borderRadius: "10px" }}
                  alt="preview"
                />
              </div>
            )}

            <hr />

            <h5>Audio</h5>
            <Form.Select
              value={audioMethod}
              onChange={(event) => setAudioMethod(event.target.value)}
            >
              <option value="upload">Upload Audio</option>
              <option value="url">Audio URL</option>
              <option value="record">Record (Microphone)</option>
            </Form.Select>

            {audioMethod === "upload" && (
              <Form.Control
                type="file"
                accept="audio/*"
                onChange={(event) => {
                  const file = event.target.files?.[0];
                  if (!file) return;
                  setAudioFile(file);
                  setAudioPreview(URL.createObjectURL(file));
                }}
              />
            )}

            {audioMethod === "url" && (
              <Form.Control
                placeholder="Audio URL"
                value={audioUrl}
                onChange={(event) => {
                  setAudioUrl(event.target.value);
                  setAudioPreview(event.target.value);
                }}
              />
            )}

            {audioMethod === "record" && (
              <>
                <input
                  ref={micInputRef}
                  type="file"
                  accept="audio/*"
                  capture
                  style={{ display: "none" }}
                  onChange={(event) => {
                    const file = event.target.files?.[0];
                    if (!file) return;
                    setRecordedFile(file);
                    setAudioPreview(URL.createObjectURL(file));
                  }}
                />

                <Button
                  className="mt-2"
                  onClick={(event) => {
                    event.preventDefault();
                    micInputRef.current?.click();
                  }}
                >
                  Record Audio
                </Button>
              </>
            )}

            {audioPreview && (
              <div className="mt-3 text-center">
                <p>Audio Preview</p>
                <audio controls src={audioPreview} />
              </div>
            )}
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={closeSubSubIconModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={submitSubSubIcon}>
            {editingSubSubIcon ? "Update" : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SubSubIconsPage;
