import LastUpdated from './LastUpdated.mjs';
import SearchStocks from './SearchStocks.mjs';

import './App.css';
import logo from './logo.svg';

function App() {
    return (
        <div className="App">
            <div className="app-body">
                <SearchStocks />
                <LastUpdated />
            </div>
        </div>
    );
}

export default App;

