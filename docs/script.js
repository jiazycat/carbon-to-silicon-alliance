const avatarList = document.getElementById("avatarList");

let names = [];

function submitName() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;

  names.push(name);
  createAvatar(name);
  input.value = "";
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
