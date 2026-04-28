/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Modal } from "react-bootstrap";
import "./SubIconsPage.css";
import "./SubSubIconsPage.css";
import { API_BASE_URL, normalizeMediaUrl } from "../api/api";

const AUDIO_PLAYBACK_RATE = 1.4;
const AUDIO_FALLBACK_TIMEOUT_MS = 15000;

function SubIconsPage() {

const { iconId } = useParams();
const navigate = useNavigate();

const BACKEND_URL = API_BASE_URL;
const DEFAULT_IMAGE = normalizeMediaUrl("/public/default.jpg");
const [mainIcon,setMainIcon]=useState(null);
const [orderedIcons,setOrderedIcons]=useState([]);
const [selectedIds,setSelectedIds]=useState([]);

const [timeOption,setTimeOption]=useState("الآن");
const [connector,setConnector]=useState("و");

const [isPlaying,setIsPlaying]=useState(false);
const audioRef=useRef(new Audio());

const reorderCategories=["Food and Drink","Medicine"];

/* ================= MODAL STATES ================= */

const [showModal,setShowModal]=useState(false);

const [title,setTitle]=useState("");
const [expression,setExpression]=useState("");
const [category,setCategory]=useState("");

const [imageMethod,setImageMethod]=useState("upload");
const [imageFile,setImageFile]=useState(null);
const [imageUrl,setImageUrl]=useState("");
const [imagePreview,setImagePreview]=useState(null);

// Audio states
/*const [audioMethod,setAudioMethod]=useState("url"); // "url" or "record"
const [audioUrl,setAudioUrl]=useState("");          // for URL input
const [audioPreview,setAudioPreview]=useState(null);// preview for URL or recording
const [recordedFile,setRecordedFile]=useState(null);// for recording file
const [recording,setRecording]=useState(false);

const mediaRecorderRef=useRef(null);
const audioChunksRef=useRef([]);*/
const [audioMethod,setAudioMethod] = useState("url");

const [audioFile,setAudioFile] = useState(null);
const [audioUrl,setAudioUrl] = useState("");

const [recordedFile,setRecordedFile] = useState(null);

const [audioPreview,setAudioPreview] = useState("");

const micInputRef = useRef(null);

// Camera refs - kept for potential future use
//const videoRef=useRef(null);
//const canvasRef=useRef(null);
const cameraInputRef = useRef(null);
//const audioInputRef = useRef(null);
// NEW: ref for the hidden camera file input

/* ================= FETCH DATA ================= */

useEffect(()=>{

const fetchData=async()=>{

try{

const res=await fetch(`${BACKEND_URL}/icons/${iconId}`);
const data=await res.json();

setMainIcon(data);

const enableReorder=reorderCategories.includes(data.category);

if(!enableReorder){
setOrderedIcons(data.subIcons || []);
return;
}

const savedOrder=localStorage.getItem(`iconOrder_${iconId}`);

if(savedOrder){

const parsedOrder=JSON.parse(savedOrder);

const reordered=parsedOrder
.map(id=>data.subIcons.find(s=>s.id===id))
.filter(Boolean);

const missing=data.subIcons.filter(
s=>!parsedOrder.includes(s.id)
);

setOrderedIcons([...reordered,...missing]);

}else{

setOrderedIcons(data.subIcons || []);

}

}catch(err){

console.log(err);

}

};

fetchData();

},[iconId,BACKEND_URL,reorderCategories]);

useEffect(() => () => {
  if (audioRef.current) {
    audioRef.current.pause();
    audioRef.current.src = "";
  }
}, []);

/* ================= SELECT ICON ================= */

const toggleSelect=id=>{

setSelectedIds(prev=>
prev.includes(id)
? prev.filter(x=>x!==id)
: [...prev,id]
);

};

/* ================= SENTENCE ================= */

const generateSentence=()=>{

if(!mainIcon) return "";

const expressions=selectedIds
.map(id=>{
const sub=orderedIcons.find(s=>s.id===id);
return sub?sub.expression:"";
})
.filter(Boolean);

if(expressions.length===0) return "";

return `${timeOption} ${mainIcon.expression} ${connector} ${expressions.join(` ${connector} `)}`;

};

const getAudioUrl = (item) => normalizeMediaUrl(item?.recordingUrl || item?.audioUrl);

const playAudioSource = (audioRef, src) =>
  new Promise(resolve => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }

    const audio = new Audio(src);
    audioRef.current = audio;
    audio.preload = "auto";
    audio.playbackRate = AUDIO_PLAYBACK_RATE;

    let settled = false;
    let timeoutId = null;

    const finish = () => {
      if (settled) return;
      settled = true;
      clearTimeout(timeoutId);
      audio.pause();
      audio.src = "";
      resolve();
    };

    const setDurationTimeout = () => {
      clearTimeout(timeoutId);
      const durationMs = Number.isFinite(audio.duration)
        ? (audio.duration * 1000) / AUDIO_PLAYBACK_RATE + 700
        : AUDIO_FALLBACK_TIMEOUT_MS;
      timeoutId = setTimeout(
        finish,
        Math.min(Math.max(durationMs, 1500), AUDIO_FALLBACK_TIMEOUT_MS),
      );
    };

    audio.onloadedmetadata = setDurationTimeout;
    audio.onended = finish;
    audio.onerror = finish;
    timeoutId = setTimeout(finish, AUDIO_FALLBACK_TIMEOUT_MS);

    const playPromise = audio.play();
    if (playPromise?.catch) {
      playPromise.catch(finish);
    }
  });

/* ================= PLAY AUDIO ================= */

/*const playSelectedSounds=async()=>{

if(!mainIcon) return;

const enableReorder=reorderCategories.includes(mainIcon.category);

const selectedSubs=selectedIds
.map(id=>orderedIcons.find(s=>s.id===id))
.filter(Boolean);

if(selectedSubs.length===0) return;

setIsPlaying(true);

for(let sub of selectedSubs){

if(!sub.audioUrl) continue;

audioRef.current.src =
sub.audioUrl.startsWith("http")
? sub.audioUrl
: `${BACKEND_URL}${sub.audioUrl}`;

await audioRef.current.play();

await new Promise(resolve=>{
audioRef.current.onended=resolve;
});

}

setIsPlaying(false);

if(enableReorder){

setOrderedIcons(prev=>{

const spoken=prev.filter(icon=>selectedIds.includes(icon.id));
const remaining=prev.filter(icon=>!selectedIds.includes(icon.id));

const newOrder=[...remaining,...spoken];

localStorage.setItem(
`iconOrder_${iconId}`,
JSON.stringify(newOrder.map(i=>i.id))
);

return newOrder;

});

}

setSelectedIds([]);

};*/
const playSelectedSounds = async () => {
  if (!mainIcon) return;

  const enableReorder = reorderCategories.includes(mainIcon.category);
  const selectedIdsToPlay = [...selectedIds];
  const selectedSubs = selectedIdsToPlay
    .map(id => orderedIcons.find(s => s.id === id))
    .filter(Boolean);
  const audiosToPlay = selectedSubs
    .map(sub => getAudioUrl(sub))
    .filter(Boolean);

  if (!audiosToPlay.length) return;

  setIsPlaying(true);

  try {
    for (let src of audiosToPlay) {
      await playAudioSource(audioRef, src);
    }

    if (enableReorder) {
      setOrderedIcons(prev => {
        const spoken = prev.filter(icon => selectedIdsToPlay.includes(icon.id));
        const remaining = prev.filter(icon => !selectedIdsToPlay.includes(icon.id));
        const newOrder = [...remaining,...spoken];
        localStorage.setItem(
          `iconOrder_${iconId}`,
          JSON.stringify(newOrder.map(i => i.id))
        );
        return newOrder;
      });
    }

    setSelectedIds([]);
  } finally {
    setIsPlaying(false);
  }
};

/* ================= CAMERA (Mobile-Compatible) ================= */

// بدل getUserMedia، بنستخدم input[type=file capture=environment]
// ده بيشتغل على موبايل حتى على HTTP لأنه بيفتح الكاميرا native
const startCamera = () => {
  if (cameraInputRef.current) {
    cameraInputRef.current.click();
  }
};

const handleCameraCapture = (e) => {
  const file = e.target.files[0];
  if (!file) return;
  setImageFile(file);
  setImagePreview(URL.createObjectURL(file));
};

/* ================= AUDIO RECORD ================= */

/*const startRecording = async () => {
  if (!navigator.mediaDevices?.getUserMedia) {
    alert("Microphone not supported");
    return;
  }

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorderRef.current = new MediaRecorder(stream);

    audioChunksRef.current = [];

    mediaRecorderRef.current.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(audioChunksRef.current, { type: "audio/mp3" });
      const file = new File([blob], "record.mp3");
      setRecordedFile(file);
      setAudioPreview(URL.createObjectURL(blob)); // preview
      audioChunksRef.current = [];
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  } catch (err) {
    console.error(err);
    alert("Cannot access microphone");
  }
};

const stopRecording = () => {
  mediaRecorderRef.current.stop();
  setRecording(false);
};*/
/* ================= SUBMIT ================= */

/*const submitSubIcon=async()=>{

const formData=new FormData();

formData.append("title",title);
formData.append("expression",expression);
formData.append("category",category);

if(imageMethod==="upload" && imageFile)
formData.append("image",imageFile);

if(imageMethod==="url")
formData.append("imageUrl",imageUrl);

if(imageMethod==="camera" && imageFile)
formData.append("image",imageFile);

/*if(audioMethod==="url")
formData.append("audioUrl",audioUrl);

if(audioMethod==="record" && audioUrl instanceof File)
formData.append("audio",audioUrl);*
if(audioMethod === "url" && audioUrl) formData.append("audioUrl", audioUrl);
if(audioMethod === "record" && recordedFile) formData.append("audio", recordedFile);

await fetch(`${BACKEND_URL}/icons/${iconId}/subicons`,{

method:"POST",
body:formData

});

window.location.reload();

};
*/const submitSubIcon = async () => {
  const formData = new FormData();

  formData.append("title", title);
  formData.append("expression", expression);
  formData.append("category", category);

  if (imageMethod === "upload" && imageFile) formData.append("image", imageFile);
  if (imageMethod === "url") formData.append("imageUrl", imageUrl);
  if (imageMethod === "camera" && imageFile) formData.append("image", imageFile);
   if (audioMethod === "upload" && audioFile)formData.append("audio", audioFile);
  if (audioMethod === "url" && audioUrl) formData.append("audioUrl", audioUrl);
  if (audioMethod === "record" && recordedFile) formData.append("audio", recordedFile);

  try {
    const res = await fetch(`${BACKEND_URL}/icons/${iconId}/subicons`, {
      method: "POST",
      body: formData
    });

    const newSubIcon = await res.json(); // backend يرجع object الجديد

    // إضافة الـ SubIcon الجديد مباشرة للـ state
    setOrderedIcons(prev => [...prev, newSubIcon]);

    // اغلاق الـ modal ومسح الـ form
    setShowModal(false);
    setTitle("");
    setExpression("");
    setCategory("");
    setImageFile(null);
    setImageUrl("");
    setImagePreview(null);
    setAudioUrl("");
    setAudioPreview(null);
    setRecordedFile(null);
    setAudioMethod("url");
    setImageMethod("upload");

  } catch (err) {
    console.error(err);
    alert("Failed to add SubIcon");
  }
};
if(!mainIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

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

<h1 className="subsub-title">{mainIcon.title}</h1>
{mainIcon.expression && (
<p className="subsub-subtitle">{mainIcon.expression}</p>
)}
</div>

<div className="subsub-controls">

<select className="subsub-select" value={timeOption} onChange={e=>setTimeOption(e.target.value)}>
<option value="الآن">الآن</option>
<option value="بعد شوية">بعد شوية</option>
<option value="غدًا">غدًا</option>
</select>

<select className="subsub-select" value={connector} onChange={e=>setConnector(e.target.value)}>
<option value="و">و</option>
<option value="ثم">ثم</option>
<option value="أو">أو</option>
</select>

<button type="button" className="subsub-action" onClick={playSelectedSounds} disabled={isPlaying || selectedIds.length===0}>
{isPlaying ? "جاري التشغيل..." : "تشغيل التسجيلات"}
</button>

<button type="button" className="subsub-action" onClick={()=>setShowModal(true)}>
Add SubIcon
</button>

</div>

{/* ================= SENTENCE ================= */}

{selectedIds.length>0 && (

<div className="subsub-sentence-box">

<p className="subsub-sentence-text">

{generateSentence()}
</p>

<div className="subsub-preview-row">
  {selectedIds.map(id => {
    const sub = orderedIcons.find(s => s.id === id);
    if (!sub) return null;

    return (
<div key={id} className="subsub-preview-item">
<img
  src={normalizeMediaUrl(sub.imageUrl || sub.imgUrl) || DEFAULT_IMAGE}
  alt={sub.title}
  className="subsub-preview-image"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = DEFAULT_IMAGE;
  }}
/>
<span>{sub.title}</span>
</div>
);

})}

</div>

</div>

)}



{orderedIcons.length ? (

<div className={`subsub-grid ${selectedIds.length ? "has-selection" : ""}`}>

{orderedIcons.map(sub=>{
const selected=selectedIds.includes(sub.id);

return (

<div key={sub.id} className={`subsub-card ${selected ? "is-selected" : ""}`}>

<button
type="button"
className="subsub-check"
onClick={()=>toggleSelect(sub.id)}
>
{selected ? "✔" : "○"}
</button>

<button
type="button"
className="subsub-card-body"
onClick={()=>{
if (Array.isArray(sub.subSubIcons) && sub.subSubIcons.length > 0) {
navigate(`/icons/${iconId}/subicons/${sub.id}/subsubicons`, {
state: {
parentIcon: mainIcon,
parentSubIcon: sub,
},
});
return;
}

navigate(`/icons/${iconId}/subicons/${sub.id}`);
}}
>
<img
  src={normalizeMediaUrl(sub.imageUrl || sub.imgUrl) || DEFAULT_IMAGE}
  alt={sub.title}
  className="subsub-card-image"
  onError={(event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = DEFAULT_IMAGE;
  }}
/>

<div className="subsub-card-footer">
<h3>{sub.title}</h3>

<p>
{sub.expression}
</p>

</div>

</button>

</div>

);
})}

</div>

) : (
<p className="text-center mt-4">لا توجد عناصر فرعية.</p>
)}

<Modal show={showModal} onHide={()=>setShowModal(false)} size="lg">

<Modal.Header closeButton>
<Modal.Title>Add SubIcon</Modal.Title>
</Modal.Header>

<Modal.Body>

<Form>

<Form.Group>
<Form.Label>Title</Form.Label>
<Form.Control value={title} onChange={e=>setTitle(e.target.value)}/>
</Form.Group>

<Form.Group className="mt-3">
<Form.Label>Expression</Form.Label>
<Form.Control value={expression} onChange={e=>setExpression(e.target.value)}/>
</Form.Group>

<Form.Group className="mt-3">
<Form.Label>Category</Form.Label>
<Form.Control value={category} onChange={e=>setCategory(e.target.value)}/>
</Form.Group>

<hr/>

<h5>Image</h5>

<Form.Select value={imageMethod} onChange={e=>setImageMethod(e.target.value)}>
<option value="upload">Upload</option>
<option value="url">URL</option>
<option value="camera">Camera</option>
</Form.Select>

{imageMethod==="upload" && (
<Form.Control type="file" onChange={e=>{
setImageFile(e.target.files[0]);
setImagePreview(URL.createObjectURL(e.target.files[0]));
}}/>
)}

{imageMethod==="url" && (
<Form.Control placeholder="Image URL" onChange={e=>{
setImageUrl(e.target.value);
setImagePreview(e.target.value);
}}/>
)}

{imageMethod==="camera" && (
<>
  <input
    ref={cameraInputRef}
    type="file"
    accept="image/*"
    capture="environment"
    style={{ display: "none" }}
    onChange={handleCameraCapture}
  />

  <Button className="mt-2" onClick={(e)=>{ e.preventDefault(); startCamera(); }}>
    📷 Open Camera
  </Button>

  {imagePreview && (
    <p className="mt-2 text-success">✔️ Photo captured!</p>
  )}
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
<hr/>

<h5>Audio</h5>

<Form.Select value={audioMethod} onChange={e=>setAudioMethod(e.target.value)}>
  <option value="upload">Upload Audio</option>
  <option value="url">Audio URL</option>
  <option value="record">Record (Microphone)</option>
</Form.Select>


{/* Upload */}
{audioMethod==="upload" && (
<Form.Control
  type="file"
  accept="audio/*"
  onChange={e=>{
    const file = e.target.files[0];
    setAudioFile(file);
    setAudioPreview(URL.createObjectURL(file));
  }}
/>
)}


{/* URL */}
{audioMethod==="url" && (
<Form.Control
  placeholder="Audio URL"
  onChange={e=>{
    setAudioUrl(e.target.value);
    setAudioPreview(e.target.value);
  }}
/>
)}


{/* Record like camera */}
{audioMethod==="record" && (
<>
  <input
    ref={micInputRef}
    type="file"
    accept="audio/*"
    capture
    style={{ display:"none" }}
    onChange={(e)=>{
      const file = e.target.files[0];
      setRecordedFile(file);
      setAudioPreview(URL.createObjectURL(file));
    }}
  />

  <Button
    className="mt-2"
    onClick={(e)=>{
      e.preventDefault();
      micInputRef.current.click();
    }}
  >
    🎤 Record Audio
  </Button>

  {audioPreview && (
    <p className="mt-2 text-success">✔️ Audio recorded!</p>
  )}
</>
)}
{/* Audio Preview */}
{audioPreview && (
  <div className="mt-3 text-center">
    <p>Audio Preview</p>
    <audio controls src={audioPreview} />
  </div>
)}
</Form>

</Modal.Body>

<Modal.Footer>

<Button variant="secondary" onClick={()=>setShowModal(false)}>
Cancel
</Button>

<Button variant="primary" onClick={submitSubIcon}>
Save
</Button>

</Modal.Footer>

</Modal>

</div>

);

}

export default SubIconsPage;
