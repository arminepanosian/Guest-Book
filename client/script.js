const addButton = document.getElementById("btn");
const name = document.getElementById("name");
const pass = document.getElementById("pass");
const message = document.getElementById("message");
const revForm = document.getElementById("revForm");

let allReviews = [];

const getRev = async () => {
  try {
    const request = await fetch("http://localhost:3001/get");
    const response = await request.json();
    console.log(response);
    response.map((e) => {
      allReviews.push(e);
    });
    if (response?.length > 0) {
      revForm.innerHTML = "";
      allReviews.reverse().map((e, i) => {
        if (i < 10) {
          revForm.innerHTML += `
            <div class="review">
                <div class="first">
                    <div class="name">${e.name}</div>
                    <div class="data">${e.createdAt} <span onclick='handleClick(${i})'>X</span></div>
                </div>
                <div class="text">
                    ${e.disc}
                </div>
            </div>
            
            `;
        }
      });
    } else {
      revForm.innerHTML = `
            <h1>There is not a message</h1>
        `;
    }
  } catch (err) {
    console.log(err);
  }
};
getRev();

async function handleClick(i) {
  try {
    let password = prompt("pass");
    const id = allReviews[i]._id;
    const request = await fetch("http://localhost:3001/delete-review", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        password: password,
      }),
    });
    getRev();
  } catch (err) {
    console.log(err);
  }
}

addButton.addEventListener("click", async () => {
  try {
    if (name.value !== "" || pass.value !== "" || message.value !== "") {
      const request = await fetch("http://localhost:3001/add-review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.value,
          password: pass.value,
          disc: message.value,
        }),
      });
      const response = await request.json();
      console.log(response);
      getRev();
      name.value = "";
      pass.value = "";
      message.value = "";
    } else {
      alert("all fields are reuired");
    }
  } catch (err) {
    console.log(err);
  }
});

document.getElementById("shm").addEventListener("click", () => {
  revForm.innerHTML = "";
  allReviews.reverse().map((e, i) => {
    revForm.innerHTML += `
          <div class="review">
              <div class="first">
                  <div class="name">${e.name}</div>
                  <div class="data">${e.createdAt} <span  onclick="handleClick(${i})>X</span></div>
              </div>
              <div class="text">
                  ${e.disc}
              </div>
          </div>
          `;
  });
});

document.getElementById("shl").addEventListener("click", () => {
  revForm.innerHTML = "";
  allReviews.reverse().map((e, i) => {
    if (i < 10) {
      revForm.innerHTML += `
          <div class="review">
              <div class="first">
                  <div class="name">${e.name}</div>
                  <div class="data">${e.createdAt} <span  onclick="handleClick(${i})>X</span></div>
              </div>
              <div class="text">
                  ${e.disc}
              </div>
          </div>
          `;
    }
  });
});