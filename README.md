Online Code Editor

A responsive, feature-rich online code editor built with React and CodeMirror, allowing users to write, edit, and preview HTML, CSS, and JavaScript code in real-time. Inspired by tools like CodePen, this project supports dark/light themes, flexible layouts, code formatting, and more, making it ideal for developers and learners.

Features

Real-Time Code Preview: Write HTML, CSS, and JavaScript, and see the output instantly in an iframe.
Responsive Design: Fully optimized for mobile, tablet, and desktop devices.
Dark/Light Themes: Toggle between dark and light modes with CodeMirror theme integration.
Flexible Layouts: Choose from three output positions (bottom, right, left) via a dropdown.
Editor Controls:
Maximize/minimize editor panels.
Format code for HTML, CSS, and JavaScript.
Auto-run code with a 500ms debounce.
Clear all editors or download the combined code as an HTML file.

Touch-Friendly: Larger buttons and dropdowns for mobile usability.
Syntax Highlighting: Powered by CodeMirror with support for HTML, CSS, and JavaScript.

Demo
Try the live demo here (replace with your deployed URL if available).
Installation
Follow these steps to set up the project locally:

Clone the Repository:
git clone https://github.com/milauog/online-code-editor.git
cd online-code-editor

Install Dependencies:
npm install

Run the Development Server:
npm start

The app will be available at http://localhost:3000.

Dependencies

React: ^18.2.0
CodeMirror: ^6.0.1
@uiw/react-codemirror: ^4.21.21
@codemirror/lang-html: ^6.4.9
@codemirror/lang-css: ^6.2.1
@codemirror/lang-javascript: ^6.2.2
@codemirror/theme-one-dark: ^6.1.2
@uiw/codemirror-theme-github: ^4.23.0
react-icons: ^5.3.0

Install them using:
npm install react @uiw/react-codemirror @codemirror/lang-html @codemirror/lang-css @codemirror/lang-javascript @codemirror/theme-one-dark @uiw/codemirror-theme-github react-icons

Usage

Open the app in your browser.
Write or edit code in the HTML, CSS, or JavaScript editors.
Click Run to see the output, or enable Auto-run for real-time updates.
Use the toolbar to:
Toggle themes (Dark/Light).
Switch layout (Output Bottom, Right, Left).
Adjust font size (Small, Medium, Large, X-Large).
Clear editors or download the code.

Use the dropdowns in each editor to format code or maximize/minimize panels.

Project Structure
online-code-editor/
├── public/
│ ├── index.html
│ └── favicon.ico
├── src/
│ ├── App.js
│ ├── App.css
│ └── index.js
├── package.json
├── README.md
├── .gitignore
└── LICENSE

Contributing
Contributions are welcome! To contribute:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

Please ensure your code follows the existing style and includes tests where applicable.
License
This project is licensed under the MIT License.
Author

Millyon Tilahun
GitHub: milauog
LinkedIn: millyon-tilahun

Acknowledgements

CodeMirror for syntax highlighting and editor functionality.
React for the frontend framework.
react-icons for icons.

⭐ If you find this project useful, give it a star on GitHub!
