var OldFile;
var NewFile;
var Pdf;
var SecondImg = 0;
$(function () {
    var defaultUploadBtn = $('#upload');
    //uploadBtn.on('click', function (e) {
    //    e.stopPropagation();
    //    e.preventDefault();
    //    //trigger default file upload button
    //    defaultUploadBtn.click();
    //});
    defaultUploadBtn.on('change', function () {
       
        //retrieve selected uploaded files data
        $("#target").hide();
        var files = $(this)[0].files;
      
        processFiles(files);
        return false;
    });
});

function processFiles(files) {
    //check for browser support  
   
    
    if (files && typeof FileReader !== "undefined") {
        //extract FileList as File object
        for (var i = 0; i < files.length; i++) {
            readFile(files[i]);
        }
    }
    else {
        //some message or fallback
    }
}

var readFile = function (file) {

    if ((/image/i).test(file.type)) {
        //define FileReader object
        var reader = new FileReader();
       
        //init reader onload event handlers
        reader.onload = function (e) {
            var image = $('<img/>')
            .load(function () {
                //get new image URL from canvas image
               
                var newimageurl = getCanvasImage(this, file.type);
                
                //create preview using jQuery Template
                createPreview(file, newimageurl);
                OldFile = file;
                if (newimageurl != undefined) {
                    if (SecondImg == 1)
                    {
                        Pdf = dataURItoBlob(newimageurl);
                    }
                    else
                        {
                        NewFile = dataURItoBlob(newimageurl);
                    }
                }
                else
                {
                    if (SecondImg == 1)
                    {
                        Pdf = undefined;
                    }
                    else
                    { NewFile = undefined; }
                   
                }
                //upload the new image to server
                // uploadToServer(file, dataURItoBlob(newimageurl));
                 

            })
            .attr('src', e.target.result);
        };

        //begin reader read operation
        reader.readAsDataURL(file);
    } else {
        //some message for wrong file format
    }
}


var getCanvasImage = function (image ,filetype) {

    var PageName = $("#PageName").val();
    if (PageName == "module" || PageName == "hospital")
    {
        if (image.naturalWidth < 521) {
            alert("Image dimension should be greater than 521*347 (W*H).");
            $("#upload").val("");
          
            return;
        }
        if (image.naturalHeight < 347) {
            alert("Image dimension should be greater than 521*347 (W*H).");
            $("#upload").val("");
            return;
        }
    }
  
   else if (PageName == "Client") {
        if (image.naturalWidth < 75) {
            alert("Image dimension should be greater than 75*72 (W*H).");
            $("#upload").val("");

            return;
        }
        if (image.naturalHeight < 72) {
            alert("Image dimension should be greater than 75*72 (W*H).");
            $("#upload").val("");
            return;
        }
   }
   else if (PageName == "Treatment") {
       if (image.naturalWidth < 441) {
           alert("Image dimension should be greater than 441*294 (W*H).");
           $("#upload").val("");

           return;
       }
       if (image.naturalHeight < 294) {
           alert("Image dimension should be greater than 441*294 (W*H).");
           $("#upload").val("");
           return;
       }
   }
   else if (PageName != "Client")
    {
       
    //if (image.naturalWidth < 920) {
    //    alert("Image dimension should be greater than 920*687 (W*H).");
    //    $("#upload").val("");
    //    $("#target").show();
    //    return;
    //}
    //if (image.naturalHeight < 683) {
    //    $("#target").show();
    //    alert("Image dimension should be greater than 920*687 (W*H).");
    //    $("#upload").val("");
    //    return;
    //}
    }
    
    else
    {
        if (image.naturalWidth < 160) {
            alert("Image dimension should be greater than 160*145 (W*H).");
            $("#upload").val("");
            return;
        }
        if (image.naturalHeight < 145) {
            alert("Image dimension should be greater than 160*145 (W*H).");
            $("#upload").val("");
            return;
        }
    }
    
    var Width = $("#Width").val(),
   Height = $("#Height").val();
    var imgWidth = 1400;// 1600,
    imgHeight = 900;
    if (Width != null || Height != null) {
        imgWidth = Width;// 1600,
        imgHeight = Height;//1174;
    }
    var quality = 100;
    //Resize Image

    if (image.naturalWidth > image.naturalHeight) {

        if (image.naturalWidth >= imgWidth) {
            var ratioX = imgWidth / image.naturalWidth;
            var ratioY = imgHeight / image.naturalHeight;
            var ratio = Math.min(ratioX, ratioY);

            imgWidth = image.naturalWidth * ratio;
            imgHeight = image.naturalHeight * ratio;

        }
        else {

            imgWidth = image.naturalWidth;
            imgHeight = image.naturalHeight;
        }

    }

    //if (image.naturalWidth > imgWidth) {
    //    imgWidth = 1600;
    //}
    //else {
    //    imgWidth = image.naturalWidth;
    //}
    //if (image.naturalHeight > imgHeight) {
    //    imgHeight = 1174;
    //}
    //else {
    //    imgHeight = image.naturalHeight;
    //}

    //define canvas image
    var canvas = document.createElement('canvas');
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    //  canvas.width = imgWidth;
    // canvas.height = imgHeight;
    var ctx = canvas.getContext('2d');
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);


    //convert canvas to jpeg URL
    return canvas.toDataURL(filetype, quality / 100);
    //return canvas.toDataURL("image/jpeg");
}

var createPreview = function (file, newURL) {
   
    if (newURL == undefined) {
        if (SecondImg == 1) {
            $("#target_img").attr("src", "");
            $("#target_img").hide();
        }
        else {
            $("#target_img").attr("src", "");
            $("#target_img").hide();
        }
    }
    else
    {
        if (SecondImg == 1) {
            $("#target_i").attr("src", newURL);
            $("#target_i").show();
        }
        else {
            $("#target_img").attr("src", newURL);
            $("#target_img").show();
        }
      
    }
}
function uploadToServer() {
    oldFile = OldFile;
    newFile = NewFile;
    // prepare FormData 
    var formData = new FormData();
    //we still have to use back some of old file data
    //since new file doesn't contains original file data
    formData.append("filename", oldFile.name);
    formData.append("filetype", oldFile.type);
    formData.append("file", newFile);
    //Progress Bar
    var xhr = new XMLHttpRequest();
    xhr.upload.addEventListener("progress", uploadProgress, false);
    xhr.addEventListener("load", uploadComplete, false);
    xhr.addEventListener("error", uploadFailed, false);
    xhr.addEventListener("abort", uploadCanceled, false);
    xhr.open("POST", "/Logn/UploadCoverImage");
    xhr.send(formData);
}

function dataURItoBlob(dataURI) {
    //debugger;
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs
    var byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0)
        byteString = atob(dataURI.split(',')[1]);
    else
        byteString = unescape(dataURI.split(',')[1]);

    // separate out the mime component
    var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var ab = new ArrayBuffer(byteString.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    //Passing an ArrayBuffer to the Blob constructor appears to be deprecated, 
    //so convert ArrayBuffer to DataView
    var dataView = new DataView(ab);
    var blob = new Blob([dataView], { type: mimeString });

    return blob;
}
var CropImage = function (image) {

    var imgWidth = 140,
    imgHeight = 140;
    var quality = 80;
    //Resize Image
    var w = $('#crop_w').val();
    var h = $('#crop_h').val();
    var x = $('#crop_x').val();
    var y = $('#crop_y').val();
    //define canvas image
    var canvas1 = document.getElementById('myCanvas');
    canvas1.width = 359;
    canvas1.height = 300;
    var ctx1 = canvas1.getContext('2d');
    ctx1.drawImage(image, x, y, w, h, 0, 0, 359, 300);
    // context.drawImage(img, sx, sy, swidth, sheight, x, y, width, height);

    //convert canvas to jpeg URL
    return canvas1.toDataURL("image/jpeg", quality / 100);
}