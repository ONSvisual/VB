<script>
	
  import {now} from "../currentChoices"

	function saveAs(blob, filename) {
	  if (typeof navigator.msSaveOrOpenBlob !== "undefined") {
		return navigator.msSaveOrOpenBlob(blob, fileName);
	  } else if (typeof navigator.msSaveBlob !== "undefined") {
		return navigator.msSaveBlob(blob, fileName);
	  } else {
		var elem = window.document.createElement("a");
		elem.href = window.URL.createObjectURL(blob);
		elem.download = filename;
		elem.style = "display:none;opacity:0;color:transparent;";
		(document.body || document.documentElement).appendChild(elem);
		if (typeof elem.click === "function") {
		  elem.click();
		} else {
		  elem.target = "_blank";
		  elem.dispatchEvent(
			new MouseEvent("click", {
			  view: window,
			  bubbles: true,
			  cancelable: true,
			})
		  );
		}
		URL.revokeObjectURL(elem.href);
	  }
	}
  
	function downloadZip() {

var zip = new JSZip();

// var lib = zip.folder("lib"); //WILL NEED THIS!
// let libContent = JSON.parse(localStorage.libFiles);

// Object.keys(libContent).forEach((k) =>
// 	lib.file(k.replace("lib/", ""), libContent[k])
// );

var proj = zip.folder($now.currentProject.projectName);

$now.currentProject.figures.forEach(fig => {
	var figFolder = proj.folder(fig.figureName);

	Object.keys(fig.chartScripts).forEach(scriptKey => {
		figFolder.file(scriptKey.replace("_", "."), fig.chartScripts[scriptKey]);//need to add file types to objects
	}
	)
}
)
zip.generateAsync({ type: "blob" })
	.then(function (content) {
		saveAs(content, $now.currentProject.projectName + ".zip");
	});
}
  

</script>
  
  
  <svelte:head>
	<script src="https://unpkg.com/jszip@latest/dist/jszip.min.js"></script>
	<script
	  type="text/javascript"
	  src="https://cdnjs.cloudflare.com/ajax/libs/jszip-utils/0.1.0/jszip-utils.js"
	></script>
  </svelte:head>
  
  <br /><br /><br />

  <button class="btn" on:click={downloadZip}>download ZIP</button>
  
  <style>
	.btn {
	  font-family: open sans, Helvetica, Arial, sans-serif;
	  font-weight: 400;
	  font-size: 14px;
	  display: inline-block;
	  width: auto;
	  cursor: pointer;
	  padding: 6px 16px 10px;
	  border: 0;
	  text-align: center;
	  transition: background-color 0.25s ease-out;
	  text-decoration: none;
	  line-height: 24px;
	  background-color: #0f8243;
	  color: #fff;
	  margin: 10px;
	}
  </style>