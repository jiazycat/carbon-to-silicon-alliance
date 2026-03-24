const avatarList = document.getElementById("avatarList");
const STORAGE_KEY = "surrenderNames";

// GitHub 仓库信息
const owner = "YOUR_USERNAME";
const repo = "carbon-to-silicon-alliance";

// 页面签名
function signDeclaration() {
  const input = document.getElementById("nameInput");
  const name = input.value.trim();
  if (!name) return;

  // 显示 PR 信息
  document.getElementById("pr-info").style.display = "block";

  // 添加到前端名单显示
  createAvatar(name);
  input.value = "";
}

// 创建头像
function createAvatar(name) {
  const avatar = document.createElement("div");
  avatar.className = "avatar";
  avatar.innerText = name.split(" ")[0]; // 显示名字第一个单词
  avatar.style.backgroundColor = getRandomColor();
  avatarList.appendChild(avatar);
}

// 随机颜色
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for(let i=0;i<6;i++){
    color += letters[Math.floor(Math.random()*16)];
  }
  return color;
}

// 从 GitHub 获取名单并轮播显示
async function loadSurrenderList() {
  const files = ["list-1.json"]; // 可以列出多个文件
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

  // 轮播显示
  let index = 0;
  setInterval(() => {
    if (names.length === 0) return;
    avatarList.innerHTML = ""; // 清空
    createAvatar(names[index % names.length]);
    index++;
  }, 1500); // 每 1.5 秒轮播
}

// 页面加载时获取名单
loadSurrenderList();
