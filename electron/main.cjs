const { app, BrowserWindow, session } = require('electron');
const path = require('path');
const fs = require('fs');
const { spawn } = require('child_process');

let pythonProcess = null;

function getBridgeExePath() {
  const possiblePaths = [
    path.join(process.resourcesPath, 'bridge/bridge.exe'),
    path.join(process.resourcesPath, 'bridge.exe'),
    path.join(path.dirname(process.execPath), 'resources/bridge/bridge.exe'),
    path.join(path.dirname(process.execPath), 'resources/bridge.exe'),
    path.join(path.dirname(process.execPath), 'bridge/bridge.exe'),
    path.join(path.dirname(process.execPath), 'bridge.exe'),
    path.join(__dirname, '../bridge_dist/bridge/bridge.exe'),
    path.join(__dirname, '../dist/bridge/bridge.exe'),
    path.join(__dirname, '../bridge/bridge.exe'),
    path.join(process.cwd(), 'bridge_dist/bridge/bridge.exe'),
    path.join(process.cwd(), 'dist/bridge/bridge.exe'),
    path.join(process.cwd(), 'bridge.exe')
  ];
  return possiblePaths.find(p => p && fs.existsSync(p));
}

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
  const exePath = getBridgeExePath();
  if (exePath) {
    console.log(`[Bridge] 독립 실행 바이너리 실행: ${exePath}`);
    const exeDir = path.dirname(exePath);
    try {
      const proc = spawn(exePath, [], {
        cwd: exeDir,
        windowsHide: true,
        stdio: 'pipe'
      });

      proc.on('error', (err) => {
        console.error('[Bridge Exe Err]:', err.message);
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
      return;
    } catch (err) {
      console.error('[Bridge Exe] 구동 실패:', err.message);
    }
  }

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

  // 웹캠, 마이크 및 미디어 권한 무조건 완전 자동 승인
  session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
    callback(true);
  });

  session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
    return true;
  });

  // 렌더러(웹) 콘솔 로그를 터미널로 전달
  win.webContents.on('console-message', (event, level, message, line, sourceId) => {
    console.log(`[Web Console] ${message}`);
  });

  // F12 키로 개발자 도구(DevTools) 토글 지원
  win.webContents.on('before-input-event', (event, input) => {
    if (input.key === 'F12') {
      win.webContents.toggleDevTools();
    }
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
