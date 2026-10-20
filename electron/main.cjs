const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let pythonProcess = null;

function getBridgeScriptPath() {
  const possiblePaths = [
    path.join(__dirname, '../bridge_openvino.py'),
    path.join(process.resourcesPath, 'bridge_openvino.py'),
    path.join(path.dirname(process.execPath), 'resources/bridge_openvino.py'),
    path.join(path.dirname(process.execPath), 'bridge_openvino.py'),
    path.join(process.cwd(), 'bridge_openvino.py')
  ];
  return possiblePaths.find(p => p && fs.existsSync(p));
}

function startPythonBridge() {
  const scriptPath = getBridgeScriptPath();
  if (!scriptPath) {
    console.log('[Bridge] bridge_openvino.py 파일을 찾을 수 없어 건너뜁니다.');
    return;
  }

  const scriptDir = path.dirname(scriptPath);

  function trySpawn(cmd) {
    try {
      console.log(`[Bridge] ${cmd} -u ${scriptPath} (cwd: ${scriptDir}) 실행`);
      const proc = spawn(cmd, ['-u', scriptPath], {
        cwd: scriptDir,
        windowsHide: true,
        stdio: 'pipe'
      });

      proc.on('error', (err) => {
        console.error(`[Bridge] ${cmd} 실패:`, err.message);
        if (cmd === 'python') {
          trySpawn('py');
        }
      });

      proc.stdout.on('data', (data) => {
        console.log(`[Bridge Log] ${data.toString().trim()}`);
      });

      proc.stderr.on('data', (data) => {
        console.error(`[Bridge Err] ${data.toString().trim()}`);
      });

      proc.on('close', (code) => {
        console.log(`[Bridge] 종료됨 (code: ${code})`);
        pythonProcess = null;
      });

      pythonProcess = proc;
    } catch (err) {
      console.error(`[Bridge] ${cmd} 시작 실패:`, err.message);
      if (cmd === 'python') {
        trySpawn('py');
      }
    }
  }

  trySpawn('python');
}

function stopPythonBridge() {
  if (pythonProcess && pythonProcess.pid) {
    try {
      console.log('[Bridge] 파이썬 프로세스 종료 중...');
      if (process.platform === 'win32') {
        spawn('taskkill', ['/pid', pythonProcess.pid.toString(), '/f', '/t'], { windowsHide: true });
      } else {
        pythonProcess.kill();
      }
    } catch (err) {
      console.error('[Bridge] 종료 에러:', err);
    }
    pythonProcess = null;
  }
}

function createWindow() {
  const win = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 800,
    minHeight: 600,
    backgroundColor: '#0c0f14',
    autoHideMenuBar: true,
    title: 'AuraSynth (Gesture Synthesizer)',
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      backgroundThrottling: false, // 창이 비활성화되어도 오디오/카메라 끊김 방지
    },
  });

  // 웹캠 및 오디오 권한 자동 승인
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    const allowed = ['media', 'camera', 'microphone'];
    if (allowed.includes(permission)) {
      callback(true);
    } else {
      callback(false);
    }
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return ['media', 'camera', 'microphone'].includes(permission);
  });

  // 개발 모드 플래그 확인
  const isDev = process.argv.includes('--dev');

  if (isDev) {
    win.loadURL('http://localhost:5173');
  } else {
    win.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  startPythonBridge();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('will-quit', () => {
  stopPythonBridge();
});

app.on('window-all-closed', () => {
  stopPythonBridge();
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
