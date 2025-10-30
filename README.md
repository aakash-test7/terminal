# macOS Terminal-inspired Web App

A browser-based terminal emulator that mimics the macOS terminal with interactive functionality, file system simulation, and visual styling.

https://github.com/user-attachments/assets/681ddbb9-6915-4e23-9892-8ba45c985748

## Features

- **Realistic macOS Terminal UI**:
  - Traffic light window controls (close, minimize, maximize)
  - Light/dark mode that automatically adjusts based on time of day
  - Manual theme toggle option

- **Interactive Terminal Functions**:
  - File system navigation (cd, ls, pwd)
  - File operations (cat, touch, rm, mkdir, rmdir)
  - Text manipulation (echo)
  - System information (date, whoami)
  - Command history
  - Search functionality (grep)

- **Special Commands**:
  - `clear` - Clears the terminal
  - `help` - Displays a comprehensive command reference
  - `social` - Shows developer's social media links
  - `history` - Shows command history
  - Easter egg responses for certain commands

- **Visual Effects**:
  - Window minimize/restore animations
  - Fullscreen mode
  - Responsive design

## Installation

No installation required - runs directly in the browser. Simply open the `index.html` file in any modern web browser.

## File Structure

```
macos-terminal/
├── index.html      # Main HTML file
├── script.js      # Main JavaScript logic
├── filesystem.js  # Virtual file system implementation
└── styles.css     # CSS styling
```

## Usage

1. Open `index.html` in your browser
2. Type commands in the terminal prompt
3. Use `help` to see available commands

### Basic Commands

| Command | Description |
|---------|-------------|
| `ls`    | List directory contents |
| `cd [dir]` | Change directory |
| `pwd`   | Show current directory |
| `cat [file]` | Display file contents |
| `touch [file]` | Create new file |
| `mkdir [dir]` | Create new directory |
| `rm [file]` | Remove file |
| `rmdir [dir]` | Remove directory |
| `echo [text]` | Display text |
| `clear` | Clear the terminal |
| `help`  | Show command reference |

## Getting Started

To run Terminal locally:

```bash
git clone https://github.com/aakash-test7/terminal.git
cd terminal
```

Then open `index.html` in your browser or use a local dev server (like Live Server in VSCode).

## Customization

You can customize:

- The virtual file system by editing `filesystem.js`
- The color scheme by modifying the CSS variables in `styles.css`
- The command responses in `script.js`

## Dependencies

None - pure HTML/CSS/JavaScript with no external libraries required.

## Browser Support

Tested on modern browsers including:
- Chrome
- Firefox
- Safari
- Edge

## Author

Aakash Kharb

- GitHub: [aakashkharb0007](https://github.com/aakashkharb0007)
- LinkedIn: [aakash-kharb](https://www.linkedin.com/in/aakash-kharb)
- Twitter: [@aakash_kharb](https://x.com/aakash_kharb)
- Email: akharbrtk2@gmail.com

## License

This project is open source and available under the [MIT License](LICENSE).
