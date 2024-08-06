$(document).ready(function() {
  var qrcode;

  function initialize() {
    setupEventHandlers();
    generateQRCode(); // Generate initial QR code
  }

  function setupEventHandlers() {
    $("#text, #size, #colorDark, #colorLight").on("input", generateQRCode);
    $("#saveBtn").on("click", downloadQRCode);
    $("#qrcode").on("click", expandQRCode);

    // Modal event handlers
    var modal = document.getElementById("qrModal");
    var span = document.getElementsByClassName("close")[0];
    span.onclick = function() {
      modal.style.display = "none";
    }
    window.onclick = function(event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    }
  }

  function getQRCodeOptions() {
    var elText = document.getElementById("text");
    var size = parseInt(document.getElementById("size").value);
    var colorDark = document.getElementById("colorDark").value;
    var colorLight = document.getElementById("colorLight").value;

    return {
      text: elText.value.trim(),
      size: size,
      colorDark: colorDark,
      colorLight: colorLight
    };
  }

  function generateQRCode() {
    var options = getQRCodeOptions();
    var qrcodeContainer = document.getElementById("qrcode");
    var saveButton = document.getElementById("saveBtn");

    if (!options.text) {
      clearQRCode();
      qrcodeContainer.classList.add('hidden'); // Hide QR code container
      saveButton.style.display = 'none'; // Hide Save button
      return;
    }

    clearQRCode();
    qrcodeContainer.classList.remove('hidden'); // Show QR code container

    qrcode = new QRCode(qrcodeContainer, {
      text: options.text,
      width: options.size,
      height: options.size,
      colorDark: options.colorDark,
      colorLight: options.colorLight
    });

    saveButton.style.display = 'inline-block'; // Show Save button
  }

  function clearQRCode() {
    document.getElementById("qrcode").innerHTML = '';
  }

  function downloadQRCode() {
    var canvas = document.querySelector("#qrcode canvas");
    if (canvas) {
      var link = document.createElement('a');
      link.href = canvas.toDataURL("image/png");
      link.download = 'qrcode.png';
      link.click();
    } else {
      alert("Please generate a QR code first.");
    }
  }

  function expandQRCode() {
    var canvas = document.querySelector("#qrcode canvas");
    if (canvas) {
      var modalImg = document.getElementById("qrModalImg");
      modalImg.src = canvas.toDataURL("image/png");
      var modal = document.getElementById("qrModal");
      modal.style.display = "block";
    }
  }

  initialize();
});
