const submitButton = document.getElementById("submit");

submitButton.addEventListener("click", async () => {
  const accessToken = document.getElementById("token").value;
  const file = document.getElementById("file").files[0];

  const url = `https://graph.microsoft.com/v1.0/me/drive/root:/${file.name}:/content`;

  const formData = new FormData();
  formData.append("file", file);

  const resultText = document.createElement("p");

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
      body: formData,
    });

    if (response.ok) {
      resultText.textContent = "upload succeeded";
    } else {
      resultText.textContent = "upload failed";
    }
  } catch (error) {
    resultText.textContent = "error occurred";
  }
  document.body.appendChild(resultText);
});
