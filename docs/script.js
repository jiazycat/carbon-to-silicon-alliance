
const avatarList = document.getElementById("avatarList");


const githubRawPrefix = "https://raw.githubusercontent.com/jiazycat/carbon-to-silicon-alliance/main/avatars/";


const listFiles = ["list-1.json", "list-2.json"]; 


document.getElementById("pr-info").style.display = "block";


function signDeclaration() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;

  createAvatar(name); 
  input.value = "";
  alert("To complete your surrender, please submit a PR to the GitHub repository and add your name.");
}


function createAvatar(name) {
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.innerText = name.split(" ")[0]; 
  avatar.style.backgroundColor = getRandomColor();
  avatarList.appendChild(avatar);
}


function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i=0;i<6;i++){
    color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}


async function loadAllSurrenderLists() {
  let names = [];
  for (const file of listFiles) {
    const url = githubRawPrefix + file;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const list = await res.json();
        names = names.concat(list);
      }
    } catch(e) {
      console.error("Failed to load", file, e);
    }
  }
  startCarousel(names);
}


function startCarousel(names) {
  if (names.length === 0) return;

  const displayCount = 6; 
  let index = 0;

  
  updateAvatars(names, index, displayCount);

  setInterval(() => {
    index = (index + displayCount) % names.length;
    updateAvatars(names, index, displayCount);
  }, 2000); 
}


function updateAvatars(names, startIndex, count) {
  avatarList.innerHTML = "";
  for (let i = 0; i < count; i++) {
    const name = names[(startIndex + i) % names.length];
    createAvatar(name);
  }
}


loadAllSurrenderLists();
