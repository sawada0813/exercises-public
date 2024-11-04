const div = document.querySelector("h2");

fetch("https://ipinfo.io?callback")
  .then((response) => response.json())
  .then((ipInfo) => {
    const ua = window.navigator.userAgent;
    const date = new Date();
    const dateText =
      "ご登録日: " +
      date.getFullYear() +
      "年" +
      (date.getMonth() + 1) +
      "月" +
      date.getDate() +
      "日";
    const paragraph = document.createElement("h3");
    paragraph.textContent = dateText;
    div.after(paragraph);
    const ipAddress = document.createElement("h3");
    ipAddress.textContent = "あなたのIPアドレス: " + ipInfo.ip;
    div.after(ipAddress);
  });
