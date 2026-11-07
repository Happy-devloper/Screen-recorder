# Screen Recorder

Record a screen or app window from a simple desktop app. Pick a source, check the live preview, and save the recording as a WebM video.

## What it does

- Lists available screens and windows as recording sources.
- Previews the selected source before recording.
- Starts and stops a recording on demand.
- Downloads the finished recording as a `.webm` file.

Recordings are saved to your Downloads folder. This app currently records video without audio.

## Get started

You’ll need [Node.js](https://nodejs.org/) and npm.

```bash
git clone <repository-url>
cd screen-recorder
npm install
npm start
```

Replace `<repository-url>` with the URL of your project repository. If you already have the project files, open a terminal in the project folder and run `npm install` followed by `npm start`.

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

## Built with

- Electron
- Electron Forge
- HTML, CSS, and JavaScript
