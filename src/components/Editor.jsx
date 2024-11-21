
import React, { useState, useEffect, useRef } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism.css';  //For Normal Use or Bydefault
import 'prismjs/components/prism-javascript.min.js'; // for javascript
// import 'prism-themes/themes/prism-material-light.css'; // Light Theme
// import 'prismjs/themes/prism-tomorrow.css'; // Dark Theme
import 'prismjs/components/prism-jsx.min.js'; // for jsx 

const SimpleCodeEditor = () => {
  const [code, setCode] = useState(`import React from "react";
    import ReactDOM from "react-dom";
    
    function App() {
      return (
        <h1>Hello world</h1>
      );
    }
    
    ReactDOM.render(<App /> 
    document.getElementById("root"));`); 
  const textareaRef = useRef(null); 
  const preRef = useRef(null); // 

  // Update syntax highlighting when code changes
  useEffect(() => {
    if (preRef.current) {
      // Highlight the code using PrismJS
      const highlightedCode = Prism.highlight(code, Prism.languages.javascript, 'javascript');
      
      // send highlighted code into pre
      preRef.current.innerHTML = `<code class="language-javascript">${highlightedCode}</code>`;
    }
  }, [code]); //  code change

  // Synchronize the scroll position between the textarea and pre
  const syncScrollPosition = () => {
    if (textareaRef.current && preRef.current) {
      preRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  // USED TO UPDATE CODE STATE
  const handleChange = (e) => {
    setCode(e.target.value);
  };


  return (
    <div style={styles.container}>
      {/* SYNTAX ARE HIGHLIGTED*/}
      <pre
        ref={preRef}
        style={styles.pre}
        className="language-javascript"
        aria-hidden="true"
      />

      {/* TEXT AREA STARTED FOR WRITE CODE */}
      <textarea
        ref={textareaRef}
        value={code}
        onChange={handleChange}
        placeholder="Start typing your code..."
        spellCheck="false"
        autoCorrect="off"
        autoCapitalize="off"
        rows="10"
        onScroll={syncScrollPosition} // Sync scroll position between textarea and pre
      />
    </div>
  );
};

const styles = {
  container: {
    position: 'relative',
    width: '600px',
    height: '400px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  pre: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    margin: 0,
    padding: '10px',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    pointerEvents: 'none', // Prevent interaction with the pre element
    zIndex: 1,
    color: 'transparent', // Hide the text content, only for highlighting
  },
  textarea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    padding: '10px',
    fontFamily: 'monospace',
    fontSize: '14px',
    backgroundColor: 'transparent',
    caretColor: 'black',
    border: 'none',
    zIndex: 2,
    color: 'inherit', // Ensure the text color of the textarea matches the highlighted code
    outline: 'none',
    resize: 'none',
    overflow: 'auto',
  },
};

export default SimpleCodeEditor;
