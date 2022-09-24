import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js'
import Routes from './Routes/Routes';
import { Router  } from "react-router-dom";
import './App.sass';
import history from "./utils/history";

function App() {
  return (
		<Router history={history}>
			<Routes/>
		</Router>
  );
}

export default App;