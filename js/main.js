var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");

var bookmarkList = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  var siteName = siteNameInput.value;
  var siteUrl = siteUrlInput.value.trim();

  if (siteName === "" || siteUrl === "") {
    Swal.fire({
      icon: "error",
      title:
        "<h5>Site Name or Url is not valid, Please follow the rules below :</h5>",
      html: `<h6>Site name must contain at least 3 characters</h6>
        <h6>Site URL must be a valid one</h6>`,
    });
    return;
  } else {
    Swal.fire({
      icon: "success",
      title: "Your Bookmark has been saved",
      showConfirmButton: false,
      timer: 1500,
    });
  }
  if (!isValidName(siteName)) {
    Swal.fire({
      icon: "error",
      title: "<h5>The site name must contain 3 or more characters.</h5>",
    });

    return;
  }
  if (!isValidURL(siteUrl)) {
    Swal.fire({
      icon: "error",
      title: "<h5>Please enter a valid URL (https://example.com)</h5>",
    });

    return;
  }
  var bookmark = {
    name: siteName,
    url: siteUrl,
  };
  bookmarkList.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
  clearInputs();
}

function isValidURL(value) {
  var pattern =
    /https:\/\/(www\.)[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;
  var isValid = pattern.test(value);
  if (isValid) {
    siteUrlInput.classList.remove("is-invalid");
    siteUrlInput.classList.add("is-valid");
  } else {
    siteUrlInput.classList.add("is-invalid");
    siteUrlInput.classList.remove("is-valid");
  }
  return isValid;
}

function isValidName(value) {
  var pattern = /^[A-Za-z]{3,}$/;
  var isValid = pattern.test(value);
  if (isValid) {
    siteNameInput.classList.remove("is-invalid");
    siteNameInput.classList.add("is-valid");
  } else {
    siteNameInput.classList.add("is-invalid");
    siteNameInput.classList.remove("is-valid");
  }
  return isValid;
}

function displayBookmarks() {
  var resultData = "";
  for (var i = 0; i < bookmarkList.length; i++) {
    resultData += `
    <tr class="align-middle" >
      <td>${i + 1}</td>
      <td>${bookmarkList[i].name}</td>
      <td>
        <button onclick="visitBookmark(${i})" class="btn btn-primary">
          <i class="fa-solid fa-eye pe-2"></i>
          Visit
        </button>
      </td>
      <td>
        <button onclick="deleteBookmark(${i})" class="btn btn-danger">
          <i class="fa-solid fa-trash-can pe-2"></i>
          Delete
        </button>
      </td>
    </tr>
    `;
  }
  tableContent.innerHTML = resultData;
}

function clearInputs() {
  siteNameInput.value = "";
  siteUrlInput.value = "";
  siteNameInput.classList.remove("is-invalid", "is-valid");
  siteUrlInput.classList.remove("is-invalid", "is-valid");
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
}

function visitBookmark(index) {
  window.open(bookmarkList[index].url, "_blank");
}
