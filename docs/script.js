const avatarList = document.getElementById("avatarList");


const owner = "jiazycat";
const repo = "carbon-to-silicon-alliance";


function signDeclaration() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;

  document.getElementById("pr-info").style.display = "block";
  addLocalAvatar(name);
  input.value = "";
}


function addLocalAvatar(name) {
  createAvatar(name);
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

async function loadSurrenderList() {
  const files = ["list-1.json"]; 
  let names = [];

  for (const file of files) {
    const url = `https://raw.githubusercontent.com/${owner}/${repo}/main/avatars/${file}`;
    try {
      const res = await fetch(url);
      if (res.ok) {
        const list = await res.json();
        names = names.concat(list);
      }
    } catch(e) { console.error(e); }
  }

  startCarousel(names);
}

function startCarousel(names) {
  if (names.length === 0) return;

  const displayCount = 6; 
  let index = 0;

  setInterval(() => {
    avatarList.innerHTML = "";
    for (let i = 0; i < displayCount; i++) {
      const name = names[(index + i) % names.length];
      createAvatar(name);
    }
    index = (index + displayCount) % names.length;
  }, 2000); 
}

loadSurrenderList();
