export const updateMessageSentByLoggedInUser = (MESSAGE, CURRENT_USER) => {
  const messageUl = document.getElementById("message-ul");
  if (messageUl) {
    const li = document.createElement("li");
    li.className = "d-flex flex-column message align-self-end";
    li.style.maxWidth = "65%";

    li.innerHTML = `
      <div class="d-flex flex-row flex-row-reverse align-items-end gap-2">
        <div>
          <img class="rounded-circle" height="25" width="25" src="${
            CURRENT_USER.image_url
          }" alt="image" />
        </div>
        <div class="d-flex flex-column">
          <div style="font-size: 12px;" class="align-self-end">
            You
          </div>
          <div class="message bg-white rounded-3 py-1 px-3">
            <div>${MESSAGE.message}</div>
            <div style="font-size: 10px;">${new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    `;

    messageUl.appendChild(li);
    messageUl.scrollTop = messageUl.scrollHeight; // Auto-scroll to bottom
  }
};

export const updateMessageSentBySelectedUser = (MESSAGE, SELECTED_USER) => {
  const messageUl = document.getElementById("message-ul");
  if (messageUl) {
    const li = document.createElement("li");
    li.className = "d-flex flex-column message align-self-end";
    li.style.maxWidth = "65%";

    li.innerHTML = `
      <div class="d-flex flex-row flex-row align-items-start gap-2">
        <div>
          <img class="rounded-circle" height="25" width="25" src="${
            SELECTED_USER.image_url
          }" alt="image" />
        </div>
        <div class="d-flex flex-column">
          <div style="font-size: 12px;" class="align-self-start">
            You
          </div>
          <div class="message bg-white rounded-3 py-1 px-3">
            <div>${MESSAGE.message}</div>
            <div style="font-size: 10px;">${new Date().toLocaleString()}</div>
          </div>
        </div>
      </div>
    `;

    messageUl.appendChild(li);
    messageUl.scrollTop = messageUl.scrollHeight; // Auto-scroll to bottom
  }
};
