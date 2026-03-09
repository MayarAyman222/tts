import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Container, Row, Col, Form, Button, Modal } from "react-bootstrap";
import "./SubIconsPage.css";

function SubIconsPage() {

const { iconId } = useParams();
const navigate = useNavigate();

const BACKEND_URL = `http://${window.location.hostname}:5551`;
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

const [audioMethod,setAudioMethod]=useState("url");
const [audioUrl,setAudioUrl]=useState("");
const [audioPreview,setAudioPreview]=useState(null);

const [recording,setRecording]=useState(false);

const mediaRecorderRef=useRef(null);
const audioChunksRef=useRef([]);

// Camera refs - kept for potential future use
const videoRef=useRef(null);
const canvasRef=useRef(null);

// NEW: ref for the hidden camera file input
const cameraInputRef=useRef(null);

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

},[iconId]);

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

/* ================= PLAY AUDIO ================= */

const playSelectedSounds=async()=>{

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

const startRecording = async () => {

if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
alert("Microphone not supported");
return;
}

try {

const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

mediaRecorderRef.current = new MediaRecorder(stream);

mediaRecorderRef.current.ondataavailable = (e) => {
audioChunksRef.current.push(e.data);
};

mediaRecorderRef.current.onstop = () => {

const blob = new Blob(audioChunksRef.current,{ type:"audio/mp3" });

const file = new File([blob],"record.mp3");

audioChunksRef.current = [];

setAudioUrl(file);
setAudioPreview(URL.createObjectURL(blob));

};

mediaRecorderRef.current.start();

setRecording(true);

} catch (err) {

console.error(err);
alert("Cannot access microphone");

}

};

const stopRecording=()=>{

mediaRecorderRef.current.stop();
setRecording(false);

};

/* ================= SUBMIT ================= */

const submitSubIcon=async()=>{

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

if(audioMethod==="url")
formData.append("audioUrl",audioUrl);

if(audioMethod==="record" && audioUrl instanceof File)
formData.append("audio",audioUrl);

await fetch(`${BACKEND_URL}/icons/${iconId}/subicons`,{

method:"POST",
body:formData

});

window.location.reload();

};

if(!mainIcon) return <p className="text-center mt-5">جاري التحميل...</p>;

return (

<Container className="mt-5">

<h2 className="mb-4 text-center">{mainIcon.title}</h2>

<div className="d-flex justify-content-center gap-2 mb-3">

<select className="form-select w-auto" value={timeOption} onChange={e=>setTimeOption(e.target.value)}>
<option value="الآن">الآن</option>
<option value="بعد شوية">بعد شوية</option>
<option value="غدًا">غدًا</option>
</select>

<select className="form-select w-auto" value={connector} onChange={e=>setConnector(e.target.value)}>
<option value="و">و</option>
<option value="ثم">ثم</option>
<option value="أو">أو</option>
</select>

<Button variant="primary" onClick={playSelectedSounds} disabled={isPlaying || selectedIds.length===0}>
{isPlaying ? "جاري التشغيل..." : "Speak"}
</Button>

<Button variant="success" onClick={()=>setShowModal(true)}>
Add SubIcon
</Button>

</div>

{/* ================= SENTENCE ================= */}

{selectedIds.length>0 && (

<>

<div className="mb-3 p-3 bg-light border rounded shadow-sm text-center">

<strong>الجملة:</strong>

<div className="mt-2 fs-5 text-primary">
{generateSentence()}
</div>

</div>

<div className="preview-bar mb-4">

{selectedIds.map(id=>{

const sub=orderedIcons.find(s=>s.id===id);

if(!sub) return null;

return(

<div key={id} className="preview-icon">

<img
src={sub.imageUrl.startsWith("http")
? sub.imageUrl
: `${BACKEND_URL}${sub.imageUrl}`
}
alt={sub.title}
/>

<div>{sub.title}</div>

</div>

);

})}

</div>

</>

)}

<Row className="g-4">

{orderedIcons.map(sub=>(

<Col key={sub.id} xs={12} sm={6} md={4} lg={3}>

<Card
className={`text-center shadow h-100 icon-card ${selectedIds.includes(sub.id) ? "selected-icon" : ""}`}
style={{cursor:"pointer"}}
onClick={e=>{
if(e.target.type!=="checkbox"){
navigate(`/icons/${iconId}/subicons/${sub.id}`);
}
}}
>

<Card.Img
variant="top"
src={sub.imageUrl.startsWith("http")
? sub.imageUrl
: `${BACKEND_URL}${sub.imageUrl}`}
style={{height:"300px",width:"100%"}}
/>

<Card.Body>

<Form.Check
type="checkbox"
checked={selectedIds.includes(sub.id)}
onChange={()=>toggleSelect(sub.id)}
/>

<Card.Title>{sub.title}</Card.Title>

<Card.Text className="text-muted">
{sub.expression}
</Card.Text>

</Card.Body>

</Card>

</Col>

))}

</Row>

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
<img src={imagePreview} style={{width:"200px",borderRadius:"10px"}} alt="preview"/>
</div>
)}

<hr/>

<h5>Audio</h5>

<Form.Select value={audioMethod} onChange={e=>setAudioMethod(e.target.value)}>
<option value="url">Audio URL</option>
<option value="record">Record Audio</option>
</Form.Select>

{audioMethod==="url" && (
<Form.Control placeholder="Audio URL" onChange={e=>setAudioUrl(e.target.value)}/>
)}

{audioMethod==="record" && (

<>
{!recording ? (

<Button className="mt-2" onClick={(e)=>{e.preventDefault();startRecording();}}>
Start Recording
</Button>

):( 

<Button className="mt-2" variant="danger" onClick={(e)=>{e.preventDefault();stopRecording();}}>
Stop Recording
</Button>

)}

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

<Button variant="secondary" onClick={()=>setShowModal(false)}>
Cancel
</Button>

<Button variant="primary" onClick={submitSubIcon}>
Save
</Button>

</Modal.Footer>

</Modal>

</Container>

);

}

export default SubIconsPage;