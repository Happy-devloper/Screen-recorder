# Screen Recorder

Record a screen or app window from a simple desktop app. Pick a source, check the live preview, and save the recording as a WebM video.

**App Screenshot**

<img width="480" height="270" alt="preview_1" src="https://github.com/user-attachments/assets/67205baf-18e2-48d8-8933-da92a73dc850" />

## What it does

- Lists available screens and windows as recording sources.
- Previews the selected source before recording.
- Starts and stops a recording on demand.
- Downloads the finished recording as a `.webm` file.

Recordings are saved to your Downloads folder. This app currently records video without audio.

**App Screenshot**

<img width="480" height="270" alt="preview_2" src="https://github.com/user-attachments/assets/e842c03a-b362-4b8b-bb6c-b6b3a91e8247" />


## Get started

You’ll need [Node.js](https://nodejs.org/) and npm.

```bash
git clone https://github.com/Happy-devloper/Screen-recorder
cd screen-recorder
npm install
npm start
```

## Use the app

1. Choose a screen or window from the source menu.
2. Check the preview and select **Start Recording**.
3. Select **Stop Recording** when you’re done.
4. Find the downloaded WebM file in your Downloads folder.

## Package the app

Electron Forge is configured for packaging and making distributables:

```bash
npm run package
npm run make
```

## Future Improvements
- Add system audio recording (loopback)
- Add pause/resume functionality
- Allow choosing output format (MP4, GIF)

## Tech Stack

- **Framework:** Electron
- **Build Tool:** Electron Forge
- **Frontend:** HTML, CSS, JavaScript
- **Media API:** Web Media API (MediaRecorder, getUserMedia)
- **Security:** Context Isolation, Preload Scripts
