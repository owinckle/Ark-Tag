const {app, BrowserWindow, ipcMain} = require("electron")
const fs = require("fs")
const path = require("path")

function createWindow () {
	const mainWindow = new BrowserWindow({
		width: 1600,
		height: 900
	})

	mainWindow.setMenuBarVisibility(false)
	mainWindow.loadURL("http://localhost:3000")

	mainWindow.webContents.on("new-window", (event, url, frameName, disposition, options, additionalFeatures) => {
		if (frameName === "PDFView") {
			event.preventDefault();
			Object.assign(options, {
				parent: mainWindow,
				width: 814,
				height: 900
			});

			event.newGuest = new BrowserWindow(options);
			event.newGuest.setMenuBarVisibility(false);
			event.newGuest.setResizable(false);
			event.newGuest.setTitle("PDF");

			var pdfOptions = {
					landscape: false,
					silent: true,
					marginsType: 0,
					printBackground: false,
					printSelectionOnly: false,
					pageSize: "A4"
			}

			event.newGuest.webContents.on("did-finish-load", () => {
				event.newGuest.webContents.print(pdfOptions, (err, data) => {
					if (err) {
						console.log(err);
						return;
					}
					
					try {
						fs.writeFileSync("./test.pdf", data);
					} catch(err) {
						console.log(err);
					}
				});
			});
		}
	});
}

app.whenReady().then(() => {
	createWindow()

	app.on("activate", function () {
		if (BrowserWindow.getAllWindows().length === 0) createWindow()
	})
})

app.on("window-all-closed", function () {
	if (process.platform !== "darwin") {
		app.quit()
	}
})
