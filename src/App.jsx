import { useState, useEffect } from 'react';
import './App.css';

const makeURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';

function App() {
    const [year, setYears] = useState([]);
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');

    useEffect(() => {
        let yearCount = 1995;
        let allYears = [];

        while (yearCount <= 2025) {
            allYears.push(yearCount);
            yearCount++;
        }
        setYears(allYears);
    }, []);

    useEffect(() => {
        async function getMake() {
            const response = await fetch(makeURL);
            const data = await response.json();
            setMake(data.Results);
        }
        if (selectedYear) {
            getMake();
        }
    }, [selectedYear]);

    useEffect(() => {
        async function getModel() {
            const modelURL = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`;
            const response = await fetch(modelURL);
            const data = await response.json();
            setModel(data.Results);
        }
        if (selectedMake) {
            getModel();
        }
    }, [selectedMake]);

    return (
        <div className="container">
            <div className="text-container">
                <h1>SET YOUR VEHICLE</h1>
                <h2>Get an exact fit for your vehicle</h2>
            </div>

            <div className="dropdown-container">
                <div className="dropdown-row">
                    <select
                        id="year-select"
                        value={selectedYear}
                        onChange={(changeYear) => setSelectedYear(changeYear.target.value)}
                    >
                        <option value="">1 | Year</option>
                        {year.map((y) => (
                            <option key={y} value={y}>
                                {y}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dropdown-row">
                    <select
                        id="make-select"
                        value={selectedMake}
                        onChange={(changeMake) => setSelectedMake(changeMake.target.value)}
                        disabled={!selectedYear}
                    >
                        <option value="">2 | Make</option>
                        {make.map((mk) => (
                            <option key={mk.MakeId} value={mk.MakeName}>
                                {mk.MakeName}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="dropdown-row">
                    <select
                        id="model-select"
                        value={selectedModel}
                        onChange={(changeModel) => setSelectedModel(changeModel.target.value)}
                        disabled={!selectedMake}
                    >
                        <option value="">3 | Model</option>
                        {model.map((ml) => (
                            <option key={ml.Model_ID} value={ml.Model_Name}>
                                {ml.Model_Name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </div>
    );
}

export default App;

