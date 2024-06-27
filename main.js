const { app, BrowserWindow, screen } = require('electron');

const createWindow = () => {
    const window = new BrowserWindow({
        icon: __dirname + '/icon.png',
        width: 250,
        height: 250,
        center: true,
        resizable: false,
        frame: false,
        alwaysOnTop: true,
        webPreferences: {
            nodeIntegration: true
        }
    });

    window.removeMenu();
    window.loadFile(__dirname + "/index.html");

    let x = 0, y = 0;
    let dx = 20, dy = 20;

    const display = screen.getPrimaryDisplay().workAreaSize;
    
    setInterval(() => {
        x += dx;
        y += dy;

        if (x < 0 || x + 260 > display.width) dx = -dx;
        if (y < 0 || y + 255 > display.height) dy = -dy;

        window.setPosition(x, y);
    }, 10);

    setInterval(() => { window.setSize(250, 250); }, 1);
}

app.whenReady().then(() => {
    createWindow();
});

app.on('before-quit', () => {
    app.quit();
});