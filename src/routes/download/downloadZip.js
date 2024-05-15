
function downloadZip() {

    var zip = new JSZip();

   // var lib = zip.folder("lib"); //WILL NEED THIS!
   // let libContent = JSON.parse(localStorage.libFiles);

    Object.keys(libContent).forEach((k) =>
        lib.file(k.replace("lib/", ""), libContent[k])
    );

    var proj = zip.folder($now.currentProject.projectName);

    $now.currentProject.figures.forEach(fig => {
        var figFolder = proj.folder(fig.figureName);

        Object.keys(fig.scripts).forEach(scriptKey => {
            figFolder.file(scriptKey.replace("_", "."), fig.scripts[scriptKey]);//need to add file types to objects
        }
        )
    }
    )
    zip.generateAsync({ type: "blob" })
        .then(function (content) {
            saveAs(content, $now.currentProject.projectName + ".zip");
        });
}