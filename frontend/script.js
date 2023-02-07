// script.js

const form = document.getElementById("form");

form.addEventListener("submit", submitForm);

function submitForm(e) {
  e.preventDefault();
  const name = document.getElementById("name");
  const files = document.getElementById("files");
  const gallery = document.getElementById("gallery");
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("files", files.files[0]);
  console.log(gallery.files);
  for (const el of gallery.files) {
    formData.append("gallery", el);
  }
  //Display the key/value pairs
  for (let key of formData.entries()) {
    console.log(key[0], key[1], key[2]);
  }
  updateSettings(formData);
}
const updateSettings=async(data)=>{
    try {
      await axios({
        method: "POST",
        url: "http://localhost:8000/upload_files",
        data
      });
    }catch(err){
      console.log("error", err);
    }
}
