const videoElement = document.querySelector("video");
const videoSelect = document.getElementById("videoSelect");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const statusElement = document.getElementById("status");

let activeStream;
let mediaRecorder;
let recordedChunks = [];

startBtn.disabled = true;
stopBtn.disabled = true;

async function loadVideoSources() {
  try {
    const sources = await window.electronAPI.getVideoSources();

    for (const source of sources) {
      const option = document.createElement("option");
      option.value = source.id;
      option.textContent = source.name;
      videoSelect.appendChild(option);
    }

    if (sources.length === 0) {
      statusElement.textContent = "No screen or window sources are available.";
    }
  } catch (error) {
    statusElement.textContent = `Could not load video sources: ${error.message}`;
  }
}

videoSelect.addEventListener("change", async () => {
  const sourceId = videoSelect.value;
  if (!sourceId) return;

  videoSelect.disabled = true;
  statusElement.textContent = "Loading selected source...";

  try {
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: false,
      video: {
        mandatory: {
          chromeMediaSource: "desktop",
          chromeMediaSourceId: sourceId,
        },
      },
    });

    if (activeStream) {
      activeStream.getTracks().forEach((track) => track.stop());
    }

    activeStream = stream;
    videoElement.srcObject = stream;
    await videoElement.play();
    startBtn.disabled = false;
    statusElement.textContent = "Source ready to record.";
  } catch (error) {
    statusElement.textContent = `Could not open selected source: ${error.message}`;
  } finally {
    videoSelect.disabled = false;
  }
});

startBtn.addEventListener("click", () => {
  if (!activeStream || mediaRecorder?.state === "recording") return;

  try {
    const preferredMimeTypes = [
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ];
    const mimeType = preferredMimeTypes.find((type) =>
      MediaRecorder.isTypeSupported(type),
    );

    mediaRecorder = mimeType
      ? new MediaRecorder(activeStream, { mimeType })
      : new MediaRecorder(activeStream);
    recordedChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      if (event.data.size > 0) recordedChunks.push(event.data);
    });

    mediaRecorder.addEventListener("error", (event) => {
      statusElement.textContent = `Recording error: ${event.error.message}`;
    });

    mediaRecorder.addEventListener(
      "stop",
      () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        videoSelect.disabled = false;

        const recording = new Blob(recordedChunks, {
          type: mediaRecorder.mimeType || "video/webm",
        });
        if (recording.size === 0) {
          statusElement.textContent = "No video data was recorded.";
          return;
        }

        const downloadUrl = URL.createObjectURL(recording);
        const downloadLink = document.createElement("a");
        downloadLink.href = downloadUrl;
        downloadLink.download = `screen-recording-${Date.now()}.webm`;
        downloadLink.click();
        window.setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);
        statusElement.textContent = "Recording saved to your Downloads folder.";
      },
      { once: true },
    );

    mediaRecorder.start();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    videoSelect.disabled = true;
    statusElement.textContent = "Recording...";
  } catch (error) {
    statusElement.textContent = `Could not start recording: ${error.message}`;
  }
});

stopBtn.addEventListener("click", () => {
  if (mediaRecorder?.state === "recording") {
    mediaRecorder.stop();
  }
});

window.addEventListener("beforeunload", () => {
  if (activeStream) {
    activeStream.getTracks().forEach((track) => track.stop());
  }
});

loadVideoSources();
