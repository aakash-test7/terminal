// DOM Elements
const terminalWindow = document.querySelector('.terminal-window');
const redDot = document.querySelector('.red');
const yellowDot = document.querySelector('.yellow');
const greenDot = document.querySelector('.green');
const body = document.body;
const themeToggleButton = document.getElementById('theme-toggle-button');

let originalPosition = { left: 0, bottom: 0 }; // Store the original position

// Handle Red Dot Click (Minimize Window)
yellowDot.addEventListener('click', () => {
  originalPosition.left = terminalWindow.getBoundingClientRect().left;
  originalPosition.bottom = window.innerHeight - terminalWindow.getBoundingClientRect().bottom;

  terminalWindow.style.transition = 'all 0.5s ease';
  terminalWindow.style.transform = 'scale(0.1)';
  terminalWindow.style.opacity = '0';

  setTimeout(() => {
    terminalWindow.style.display = 'none';
    createMinimizedIcon();
  }, 500);
});

// Create a small icon for minimized window
function createMinimizedIcon() {
  const icon = document.createElement('div');
  icon.id = 'minimizedIcon';
  icon.style.width = '50px';
  icon.style.height = '50px';
  icon.style.background = 'url(icon.png) no-repeat center center';
  icon.style.backgroundSize = 'cover';
  icon.style.position = 'fixed';
  icon.style.bottom = '20px';
  icon.style.left = '50%';
  icon.style.transform = 'translateX(-50%)';
  icon.style.cursor = 'pointer';
  icon.style.borderRadius = '50%';

  // Create the small white dot
  const whiteDot = document.createElement('div');
  whiteDot.style.position = 'absolute';
  whiteDot.style.bottom = '-10px';
  whiteDot.style.left = '50%';
  whiteDot.style.transform = 'translateX(-50%)';
  whiteDot.style.width = '6px';
  whiteDot.style.height = '6px';
  //whiteDot.style.backgroundColor = '#fff';
  whiteDot.style.borderRadius = '50%';
  if (body.classList.contains('dark-mode')) {
    whiteDot.style.backgroundColor = '#fff'; // Dark mode color (dark gray)
  } else {
    whiteDot.style.backgroundColor = '#000'; // Light mode color (white)
  }

  icon.appendChild(whiteDot);


  document.body.appendChild(icon);

  icon.addEventListener('click', () => {
    restoreWindow(icon);
  });
}

// Restore the window from minimized state
function restoreWindow(icon) {
  terminalWindow.style.display = 'block';
  terminalWindow.style.position = 'absolute';
  terminalWindow.style.transform = 'scale(0.1)';
  terminalWindow.style.opacity = '0';
  terminalWindow.style.left = `${originalPosition.left}px`;
  terminalWindow.style.bottom = `${originalPosition.bottom}px`;

  setTimeout(() => {
    terminalWindow.style.transition = 'all 0.5s ease';
    terminalWindow.style.transform = 'scale(1)';
    terminalWindow.style.opacity = '1';
    terminalWindow.style.left = '50%';
    terminalWindow.style.transform = 'translateX(-50%)';
    document.body.removeChild(icon);
  }, 50);
}

// Handle Red Dot Click (Minimize Window)
redDot.addEventListener('click', () => {
  originalPosition.left = terminalWindow.getBoundingClientRect().left;
  originalPosition.bottom = window.innerHeight - terminalWindow.getBoundingClientRect().bottom;

  terminalWindow.style.transition = 'all 0.5s ease';
  terminalWindow.style.transform = 'scale(0.1)';
  terminalWindow.style.opacity = '0';

  setTimeout(() => {
    terminalWindow.style.display = 'none';
    createMinimizedIconRed(); // Use a different function for the red dot without the white dot
  }, 500);
  handleCommand("clear")
});

// Create a small icon for minimized window when red dot is clicked (without the white dot)
function createMinimizedIconRed() {
  const icon = document.createElement('div');
  icon.id = 'minimizedIconRed';
  icon.style.width = '50px';
  icon.style.height = '50px';
  icon.style.background = 'url(icon.png) no-repeat center center';
  icon.style.backgroundSize = 'cover';
  icon.style.position = 'fixed';
  icon.style.bottom = '20px';
  icon.style.left = '50%';
  icon.style.transform = 'translateX(-50%)';
  icon.style.cursor = 'pointer';
  icon.style.borderRadius = '50%';

  document.body.appendChild(icon);

  icon.addEventListener('click', () => {
    restoreWindow2(icon); // Restore window when the minimized icon is clicked
  });
}
// Restore the window from minimized state
function restoreWindow2(icon) {
  terminalWindow.style.display = 'block';
  terminalWindow.style.position = 'absolute';
  terminalWindow.style.transform = 'scale(0.1)';
  terminalWindow.style.opacity = '0';
  terminalWindow.style.left = `${originalPosition.left}px`;
  terminalWindow.style.bottom = `${originalPosition.bottom}px`;

  setTimeout(() => {
    terminalWindow.style.transition = 'all 0.5s ease';
    terminalWindow.style.transform = 'scale(1)';
    terminalWindow.style.opacity = '1';
    terminalWindow.style.left = '50%';
    terminalWindow.style.transform = 'translateX(-50%)';
    document.body.removeChild(icon);
  }, 50);
  handleCommand("close")
}

// Handle Green Dot Click (Fullscreen toggle)
greenDot.addEventListener('click', () => {
  if (!document.fullscreenElement) {
    terminalWindow.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});

// Light/Dark Mode Based on IST and Civic Daylight/Twilight
function getSunTimes() {
  const now = new Date();
  const sunrise = new Date(now);
  sunrise.setHours(6, 0, 0);
  const sunset = new Date(now);
  sunset.setHours(18, 0, 0);
  return { sunrise, sunset };
}

function updateTheme() {
  const now = new Date();
  const { sunrise, sunset } = getSunTimes();

  if (now >= sunrise && now <= sunset) {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
  } else {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
  }
}

// Update theme every minute
setInterval(updateTheme, 60000);
updateTheme(); // Initial call

// Handle manual theme toggle button click
themeToggleButton.addEventListener('click', () => {
  if (body.classList.contains('light-mode')) {
    body.classList.remove('light-mode');
    body.classList.add('dark-mode');
    themeToggleButton.textContent = '🌞'; // Change button to light mode icon
  } else {
    body.classList.remove('dark-mode');
    body.classList.add('light-mode');
    themeToggleButton.textContent = '🌙'; // Change button to dark mode icon
  }
});


import fileSystem from './filesystem.js';

// DOM Elements
const content = document.querySelector('.content');
const input = document.createElement('input');
input.type = 'text';
input.classList.add('input');
content.appendChild(input);

// File System State
let currentPath = ['home', 'user'];
let history = [];

// Helper Functions
function getCurrentDir() {
  let dir = fileSystem;
  for (const part of currentPath) {
      if (dir[part] && typeof dir[part] === 'object') {
          dir = dir[part];
      } else {
          return null;
      }
  }
  return dir;
}

function listFiles() {
  const dir = getCurrentDir();
  return dir ? Object.keys(dir).join(' ') : '';
}

function changeDirectory(newPath) {
  if (!newPath) return '';
  const parts = newPath.split('/');
  let tempPath = [...currentPath];
  let dir = getCurrentDir();
  
  for (const part of parts) {
      if (part === '..') {
          if (tempPath.length > 1) tempPath.pop();
          dir = getCurrentDir();
      } else if (dir && dir[part] && typeof dir[part] === 'object') {
          tempPath.push(part);
          dir = dir[part];
      } else {
          return `cd: no such directory: ${newPath}`;
      }
  }
  currentPath = tempPath;
  return '';
}

function readFile(filename) {
  const dir = getCurrentDir();
  return dir && dir[filename] && typeof dir[filename] === 'string' ? dir[filename] : `cat: no such file: ${filename}`;
}

function createFile(filename, content = '') {
  const dir = getCurrentDir();
  if (dir && !dir[filename]) {
      dir[filename] = content;
      return `Created file: ${filename}`;
  }
  return `touch: file already exists: ${filename}`;
}

function createDirectory(dirname) {
  const dir = getCurrentDir();
  if (dir && !dir[dirname]) {
      dir[dirname] = {}; // Ensure it's an empty directory
      return `Created directory: ${dirname}`;
  }
  return `mkdir: directory already exists: ${dirname}`;
}

function removeFile(filename) {
  const dir = getCurrentDir();
  if (dir && dir[filename]) {
      if (typeof dir[filename] === 'object') {
          return `rm: ${filename} is a directory. Use rmdir instead.`;
      }
      delete dir[filename];
      return `Removed file: ${filename}`;
  }
  return `rm: no such file: ${filename}`;
}

function removeDirectory(dirname) {
  const dir = getCurrentDir();
  if (dir && dir[dirname] && typeof dir[dirname] === 'object') {
      if (Object.keys(dir[dirname]).length === 0) {
          delete dir[dirname];
          return `Removed directory: ${dirname}`;
      } else {
          return `rmdir: ${dirname} is not empty.`;
      }
  }
  return `rmdir: no such directory: ${dirname}`;
}

function echoMessage(text, filename, append = false) {
  const dir = getCurrentDir();
  if (filename) {
      if (!dir[filename]) dir[filename] = '';
      dir[filename] = append ? dir[filename] + '\n' + text : text;
      return '';
  }
  return text;
}

function showCurrentDate() {
  return new Date().toString();
}

function showCurrentUser() {
  return 'Aakash027'; // Simulated user
}

function searchFiles(pattern, dir = getCurrentDir(), path = '') {
  let results = [];
  if (!dir) return `No files found matching: ${pattern}`;
  for (const key in dir) {
      if (key.includes(pattern)) results.push(path + '/' + key);
      if (typeof dir[key] === 'object') {
          results = results.concat(searchFiles(pattern, dir[key], path + '/' + key));
      }
  }
  return results.length ? results.join('\n') : `No files found matching: ${pattern}`;
}

// Handle Commands
function handleCommand(command) {
  history.push(command);
  const [cmd, ...args] = command.split(' ');
  if (command === 'sudo rm -rf /.') {
    return 'Chala ja swaad mt na le. Tera Fufa Jaat hai';
  }
  switch (cmd) {
      case 'ls': return listFiles();
      case 'cd': return changeDirectory(args[0]);
      case 'pwd': return '/' + currentPath.join('/');
      case 'cat': return readFile(args[0]);
      case 'mkdir': return createDirectory(args[0]);
      case 'touch': return createFile(args[0]);
      case 'rm': return removeFile(args[0]);
      case 'rmdir': return removeDirectory(args[0]);
      case 'echo': return echoMessage(args.slice(0, -2).join(' '), args[args.length - 1], args.includes('>>'));
      case 'date': return showCurrentDate();
      case 'whoami': return showCurrentUser();
      case 'grep': return searchFiles(args[0]);
      case 'close': content.innerHTML = '<p>$ Welcome to macOS-inspired terminal!</p><p>$ Type \"help\" for commands</p>';content.appendChild(input);input.focus();return '';
      case 'clear': content.innerHTML = '';content.appendChild(input);input.focus();return '';
      case 'history': return history.join('<span style="white-space: nowrap;">&emsp;&emsp;&emsp;&emsp;&emsp;</span>');
      case 'social': 
      return `
        LinkedIn: <a href="https://www.linkedin.com/in/aakash-kharb" target="_blank">https://www.linkedin.com/in/aakash-kharb</a><br>
        Twitter/X: <a href="https://x.com/aakash_kharb" target="_blank">https://x.com/aakash_kharb</a><br>
        GitHub: <a href="https://github.com/aakashkharb0007" target="_blank">https://github.com/aakashkharb0007</a><br>
        GitHub2: <a href="https://github.com/aakash-test7" target="_blank">https://github.com/aakash-test7</a><br>
        E-mail: <a href="mailto:akharbrtk2@gmail.com">akharbrtk2@gmail.com</a>
      `;
    }
}

input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const command = input.value.trim();
    if (command) {
      const output = handleCommand(command);

      const outputLine = document.createElement('div');

      function addTabAtStart(text) {
        return text; // Adds 4 spaces (tab-like indent) at the start, if needed
      }

      if (command === 'help') {
        // When the command is 'help', show the help table
        outputLine.innerHTML = `[aakash27@mac ~ % ${command}<br>${addTabAtStart('Displaying help...')}<br>`;
        
        // Insert the help table HTML dynamically
        const helpTable = `
          <table border="1">
            <thead>
              <tr>
                <th>Command</th>
                <th>Syntax</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              <tr><td>ls</td><td>ls</td><td>List directory contents</td></tr>
              <tr><td>ls -a</td><td>ls -a</td><td>List contents including hidden files</td></tr>
              <tr><td>ls -l</td><td>ls -l</td><td>List contents with detailed info</td></tr>
              <tr><td>cd</td><td>cd [dirname]</td><td>Change directory to the specified directory</td></tr>
              <tr><td>cd ~</td><td>cd ~</td><td>Change to home directory</td></tr>
              <tr><td>cd ..</td><td>cd ..</td><td>Change to parent directory</td></tr>
              <tr><td>pwd</td><td>pwd</td><td>Print the current working directory</td></tr>
              <tr><td>mkdir</td><td>mkdir [dirname]</td><td>Create a new directory</td></tr>
              <tr><td>touch</td><td>touch [filename]</td><td>Create a new file</td></tr>
              <tr><td>rm</td><td>rm [filename]</td><td>Remove a file</td></tr>
              <tr><td>rm -r</td><td>rm -r [dirname]</td><td>Remove a directory</td></tr>
              <tr><td>cp</td><td>cp [source] [destination]</td><td>Copy a file or directory</td></tr>
              <tr><td>mv</td><td>mv [source] [destination]</td><td>Move or rename a file or directory</td></tr>
              <tr><td>cat</td><td>cat [filename]</td><td>Display content of a file</td></tr>
              <tr><td>echo</td><td>echo "text"</td><td>Display text or create/write to a file</td></tr>
              <tr><td>date</td><td>date</td><td>Display the current date and time</td></tr>
              <tr><td>whoami</td><td>whoami</td><td>Show the current user logged into the system</td></tr>
              <tr><td>history</td><td>history</td><td>Display the history of commands</td></tr>
              <tr><td>grep</td><td>grep [searchterm] [filename]</td><td>Search for a term within a file</td></tr>
              <tr><td>clear</td><td>clear</td><td>Clear the terminal screen</td></tr>
              <tr><td>find</td><td>find [dir] -name [filename]</td><td>Search for files by name in a directory</td></tr>
              <tr><td>nano</td><td>nano [filename]</td><td>Open a file in the nano text editor</td></tr>
              <tr><td>head</td><td>head [filename]</td><td>Display the first 10 lines of a file</td></tr>
              <tr><td>tail</td><td>tail [filename]</td><td>Display the last 10 lines of a file</td></tr>
              <tr><td>man</td><td>man [command]</td><td>View the manual for a specific command</td></tr>
              <tr><td>tar</td><td>tar [options] [archive-file] [directory]</td><td>Create, extract, or view contents of a tarball</td></tr>
              <tr><td>ln</td><td>ln -s [filename] [symlinkname]</td><td>Create a symbolic link (symlink) to a file</td></tr>
              <tr><td>!n</td><td>!n</td><td>Run the command from history at position n</td></tr>
            </tbody>
          </table>
        `;
        outputLine.innerHTML += helpTable;

      } else if (command.startsWith('cd') && !output) {
        outputLine.innerHTML = `[aakash27@mac ~ % ${command}<br>`;
      } else if (command.startsWith('clear') && !output) {
        outputLine.innerHTML = `[aakash27@mac ~ % ${command}`;
      } else {
        outputLine.innerHTML = `[aakash27@mac ~ % ${command}<br>${addTabAtStart(output)}<br>`;
      }
      outputLine.innerHTML += `<br>`;
      content.insertBefore(outputLine, input);
      input.value = '';
      content.scrollTop = content.scrollHeight;
    }
  }
});


// Focus the input on load
input.focus();
