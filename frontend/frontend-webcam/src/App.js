import { BrowserRouter as Router } from "react-router-dom";
// import RouteList from "./WebcamCaptures/RouteList";
import WebcamCapture from "./screens/CallScreen";

function App() {
  return (
    <Router>
      <WebcamCapture />
    </Router>
  );
}

export default App;