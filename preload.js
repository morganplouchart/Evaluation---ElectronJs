window.addEventListener('DOMContentLoaded', () => {
  var htmlToImage = require('html-to-image');

  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');

  const url = 'mongodb://localhost:27017';

  const dbName = 'generator';

  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    const db = client.db(dbName);

    $("#color").change(function(){
    var clr = $(this).val();
      $(".img").css("background-color",clr);
    });

    $("#styleyColor").change(function(){
    var clr = $(this).val();
      $("#styley").css("color",clr);
    });
    let inputRange = document.getElementById("Range");
    inputRange.addEventListener("change", function(event){
      let imgHeight = (document.getElementById('resize').style.height = event.target.value + "px");
      let imgWidth = (document.getElementById('resize').style.width = event.target.value + "px");

    })

    let inputRangeText = document.getElementById("RangeText");
    inputRangeText.addEventListener("change", function(event){
      let RangeTextSize = (document.getElementById('styley').style.fontSize = event.target.value + "em");
      console.log(RangeTextSize);
    })

    let inputSizeWidth = document.getElementById("sizeWidth");
    inputSizeWidth.addEventListener("change", function(event){
      let imgWidth = (document.getElementById('resize').style.width = event.target.value + "px");
    })
    let inputSizeHeight = document.getElementById("sizeHeight");
    inputSizeHeight.addEventListener("change", function(event){
      let imgHeight = (document.getElementById('resize').style.height = event.target.value + "px");
    })

    let arrondi = document.getElementById("arrondi");
    arrondi.addEventListener("click", function(){
      document.getElementById('resize').style.borderRadius = "20px";
    });

    let ronds = document.getElementById("ronds");
    ronds.addEventListener("click", function(){
      document.getElementById('resize').style.borderRadius = "100px";
    });

    let droits = document.getElementById("droits");
    droits.addEventListener("click", function(){
      document.getElementById('resize').style.borderRadius = "0px";
    });

    let addText = document.getElementById("addtext");
    addText.addEventListener("click", function(){
      document.getElementById("contentText").innerHTML=`<div id="draggable"><p id="styley">Styley !!!!!</p></div>`;
      $('#draggable').easyDrag({
        	cursor: 'move',
        	ontop: true,
        	clickable: true
        });
    });

    const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))

    let ExportJpg = document.getElementById('exportJPG');
    ExportJpg.addEventListener("click", function(){
      htmlToImage.toJpeg(document.getElementById('resize'), { quality: 0.95 })
        .then(function (dataUrl) {
          var link = document.createElement('a');
          link.download = 'my-image-name.jpeg';
          link.href = dataUrl;
          link.click();
        });
    });

    let inputElement = document.getElementById("file-input");
    inputElement.addEventListener("change", handleFiles, false);
    function handleFiles() {
      var fileList = this.files;
      toDataURL(fileList[0].path)
        .then(dataUrl => {
          let image = {
              src:dataUrl
          }
          db.collection('images').update({},image, () => {
            db.collection('images').find({}).toArray((error, res) => {
              res.forEach((img) => {
              document.getElementById("img").innerHTML = `<div class="image"><div id="contentText"></div><img class="img" id="resize" style="width:auto; height:auto;" src="${img.src}"/></div>`
              })
            });
          })
        })
      }
  });


});
