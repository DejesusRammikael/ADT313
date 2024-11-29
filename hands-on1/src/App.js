import logo from './logo.svg';
import './App.css';
import Firstname from './Activity/Introduction/Firstname';
import Lastname from './Activity/Introduction/Lastname';
import Section from './Activity/Introduction/Section';
import Description from './Activity/Introduction/Description';


function App() {
  return (
    <div className="App">
     <Firstname />
     <Lastname />
     <Section />
     <Description />

    </div>
  );
}

export default App;
