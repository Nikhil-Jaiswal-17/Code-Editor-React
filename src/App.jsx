import SimpleCodeEditor from "./components/editor";
import './App.css'

const App = () => {
  return (
    <div>
      <h1>react-simple-code-editor</h1>
      <p>A simple no-frills code editor with syntax highlighting.</p>
      <a href="#">GITHUB</a>
      <SimpleCodeEditor />
    </div>
  );
};

export default App
