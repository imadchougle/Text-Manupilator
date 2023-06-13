import './App.css';
import Navbar from './component/Navbar';
import TextForm from './component/TextForm';


function App() {
  return (
<>
    <Navbar></Navbar>

    <div className="container">

    <TextForm heading = " Welcome to our Text Manipulation and Analysis Tool " />



    </div>

    </>



  );
}

export default App;
