var siteNameInput = document.getElementById("bookmarkName");
var siteUrlInput = document.getElementById("bookmarkURL");
var tableContent = document.getElementById("tableContent");


var bookmarkList = [];

if (localStorage.getItem("bookmarks") !== null) {
  bookmarkList = JSON.parse(localStorage.getItem("bookmarks"));
  displayBookmarks();
}

function addBookmark() {
  var bookmark = {
    name: siteNameInput.value,
    url: siteUrlInput.value.trim(),
  };
  if (bookmark.name === "" || bookmark.url === "") {
    alert("Please Inter All Data");
    return;
  }

  if (!isValidURL(bookmark.url)) {
    alert("Please enter a valid URL (https://example.com)");
    return;
  }

  bookmarkList.push(bookmark);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
  clearInputs();
}

function isValidURL(url) {
  var pattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\S*)$/;
  return pattern.test(url);
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
}

function deleteBookmark(index) {
  bookmarkList.splice(index, 1);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarkList));
  displayBookmarks();
}

function visitBookmark(i) {
  window.open(bookmarkList[i].url, "_blank");
}
