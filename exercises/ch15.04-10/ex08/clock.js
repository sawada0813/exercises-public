function updateClock() {
  let now = new Date();
  let sec = now.getSeconds();
  let min = now.getMinutes() + sec / 60;
  let hour = (now.getHours() % 12) + min / 60;
  let secangle = (sec * 360) / 60;
  let minagle = min * 6;
  let hourangle = hour * 30;

  let minhand = document.querySelector("#clock .minutehand");
  let hourhand = document.querySelector("#clock .hourhand");

  minhand.setAttribute("transform", `rotate(${minagle},50,50)`);
  hourhand.setAttribute("transform", `rotate(${hourangle},50,50)`);

  // 秒針を消す

  // 秒針を足す
  let secHands = document.querySelector("#clock .ticks line");
  const line = document.createElement("line");
  secHands.setAttribute("transform", `rotate(${secangle},50,50)`);

  setTimeout(updateClock, 1000);
}

updateClock();
