const check = () => {
  let checkDiv = document.getElementById("checkDiv");
  let chbox = document.getElementById("check");
  let btn = document.getElementById("agree-btn");

  if (checkDiv.classList.contains("checked")) {
    checkDiv.classList.add("unchecked");
    checkDiv.classList.remove("checked");
    btn.style.opacity = "0.7";
    btn.disabled = true;
    btn.style.cursor = "default";
    chbox.style.display = "none";
  } else if (checkDiv.classList.contains("unchecked")) {
    checkDiv.classList.add("checked");
    checkDiv.classList.remove("unchecked");
    btn.style.cursor = "pointer";
    btn.style.opacity = "1";
    btn.disabled = false;
    chbox.style.display = "block";
  }
};

const initCheck = () => {
  let checkDiv = document.getElementById("checkDiv");
  let chbox = document.getElementById("check");
  let btn = document.getElementById("agree-btn");

  if (checkDiv.classList.contains("checked")) {
    btn.style.opacity = "1";
    btn.disabled = false;
    chbox.style.display = "block";
  } else if (checkDiv.classList.contains("unchecked")) {
    btn.style.opacity = "0.7";

    btn.disabled = true;
    chbox.style.display = "none";
  }
};

let form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  let btn = document.getElementById("agree-btn");
  var status = document.getElementById("status");
  let data = new FormData(event.target);

  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        btn.style.display = "none";
        status.style.display = "block";
        status.innerHTML = "Thanks for your submission!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            btn.style.display = "none";
            status.style.display = "block";
            status.innerHTML = data["errors"].map((error) => error["message"]).join(", ");
          } else {
            btn.style.display = "none";
            status.style.display = "block";
            status.innerHTML = "Oops! There was a problem submitting your form";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Oops! There was a problem submitting your form";
    });
}
initCheck();

//Captcha
let captcha = document.querySelector(".captcha-wrapper");

captcha.addEventListener("click", () => (captcha.style.display = "none"));

function openRecaptcha() {
  captcha.style.display = "flex";
}

function checkRecaptcha() {
  let btn = document.getElementById("submit-btn");
  btn.click();
  captcha.style.display = "none";
}

form.addEventListener("submit", handleSubmit);

//Copyright
function setCopyYear() {
  const copy = document.getElementById('copyright');
  const currentYear = new Date();
  copy.innerHTML = `<p>Copyright © ${currentYear.getFullYear()} <a href="https://zakodix.tech/" target="_blank">Zakodix Tech Group LLC</a>. All rights reserved.</p>`
}
setCopyYear();