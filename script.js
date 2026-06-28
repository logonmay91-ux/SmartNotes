
const deleteAllBtn = document.getElementById("deleteAllBtn");
const title = document.getElementById("title");
const note = document.getElementById("note");
const saveBtn = document.getElementById("saveBtn");
const notesContainer = document.getElementById("notesContainer");
const search = document.getElementById("search");

let notes = JSON.parse(localStorage.getItem("notes")) || [];
notes.forEach(note=>{

if(note.pinned===undefined){

note.pinned=false;

}

});
let editIndex = -1;
function saveLocal() {
  localStorage.setItem("notes", JSON.stringify(notes));
}

function displayNotes(filter = "") {
notesContainer.innerHTML = "";
notes.sort((a,b)=>(b.pinned===true)-(a.pinned===true));
const filteredNotes = notes.filter(n =>
  n.title.toLowerCase().includes(filter.toLowerCase()) ||
  n.text.toLowerCase().includes(filter.toLowerCase())
);

if (filteredNotes.length === 0) {
  notesContainer.innerHTML = `
    <div class="note">
      <h3>📝 No Notes Yet</h3>
      <p>Create your first note by entering a title and note above.</p>
    </div>
  `;
  return;
}
  filteredNotes.forEach((n) => {

const index = notes.indexOf(n);

      notesContainer.innerHTML += `
      <div class="note">
          <h3>
          ${n.pinned ? "📌 " : ""}
          ${n.favorite ? "⭐ " : ""}
          ${n.title}
          </h3>
          <p>${n.text}</p>
          <small>📅 ${n.date}</small>
          <div class="actions">
          <button class="pinBtn"
          onclick="pinNote(${index})">
          ${n.pinned ? "📍" : "📌"}
          </button>
          <button class="favBtn"
          onclick="favoriteNote(${index})">
          ⭐
          </button>
<button class="editBtn"
onclick="editNote(${index})">
Edit
</button>

<button class="deleteBtn"
onclick="deleteNote(${index})">
Delete
</button>

</div>

          
      </div>
      `;

    });
}
saveBtn.onclick = () => {

  if (title.value.trim() === "" || note.value.trim() === "") {
    alert("Please enter title and note.");
    return;
  }

  if (editIndex === -1) {
    notes.unshift({
     title:title.value,
      text:note.value,
       date:new Date().toLocaleString(),
        favorite:false,
        pinned:false
                    });
  } else {
    notes[editIndex] = {
      title:title.value,
      text:note.value,
      date:notes[editIndex].date,
      favorite:notes[editIndex].favorite || false,
      pinned:notes[editIndex].pinned || false
};
    editIndex = -1;
    saveBtn.innerText = "Save Note";

  }

  saveLocal();

  title.value = "";
  note.value = "";

  displayNotes();

};


function deleteNote(index) {

  if(confirm("Delete this note?")){

      notes.splice(index,1);

      saveLocal();

      displayNotes();

  }

}
function editNote(index){

title.value = notes[index].title;

note.value = notes[index].text;

editIndex = index;

saveBtn.innerText = "Update Note";

window.scrollTo({
top:0,
behavior:"smooth"
});

}
search.oninput = () => {

  displayNotes(search.value);

};

displayNotes();
const themeBtn = document.getElementById("themeBtn");

if(localStorage.getItem("theme")=="dark"){
document.body.classList.add("dark");
themeBtn.innerHTML="☀️";
}

themeBtn.onclick=()=>{

document.body.classList.toggle("dark");

if(document.body.classList.contains("dark")){

localStorage.setItem("theme","dark");

themeBtn.innerHTML="☀️";

}else{

localStorage.setItem("theme","light");

themeBtn.innerHTML="🌙";

}

};
function favoriteNote(index){

notes[index].favorite = !notes[index].favorite;

saveLocal();

displayNotes(search.value);

}
function pinNote(index){

notes[index].pinned = !notes[index].pinned;

saveLocal();

displayNotes(search.value);

}
deleteAllBtn.onclick = () => {

if(notes.length===0){

alert("No notes available.");

return;

}

if(confirm("Delete ALL notes?")){

notes=[];

saveLocal();

displayNotes(search.value);

}

};