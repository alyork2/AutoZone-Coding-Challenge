import { useState, useEffect } from 'react';
import './App.css';


function App() {

    /*
    These are the react useStates that I created for this coding project
    The first 3 are used in the useEffects that I created the years in as
    well as fetched the make and model info from using an api fetch. The 
    second 3 are used in the return portion of the file in order to set
    the selected portion of the dropdowns.
    */

    const [year, setYears] = useState([]);
    const [make, setMake] = useState([]);
    const [model, setModel] = useState([]);
    const [selectedYear, setSelectedYear] = useState('');
    const [selectedMake, setSelectedMake] = useState('');
    const [selectedModel, setSelectedModel] = useState('');


    /*
    This first useEffect was used to generate the years for the first dropdown
    out of the 3. I used a simple while loop that ended when the year hit 2025
    */

    useEffect(() => {
        let yearCount = 1995;
        let allYears = [];

        while (yearCount <= 2025) {
             allYears.push(yearCount);
             yearCount++;
        }
        setYears(allYears);
    }, []);


    /*
    This second useEffect was to fetch the make info from the api. It is only fetched 
    after the year is selected
    */

    useEffect(() => {
        async function getMake() {
             const makeURL = 'https://vpic.nhtsa.dot.gov/api/vehicles/GetMakesForVehicleType/car?format=json';
             const response = await fetch(makeURL);
             const data = await response.json();
             setMake(data.Results);
        }
        if (selectedYear) {
             getMake();
        }
    }, [selectedYear]);

    /*
    This is the final useEffect that I used to get the model info. The model
    info is only displayed after the make is selected
    */

    useEffect(() => {
        async function getModel() {
             const modelURL = `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformake/${selectedMake}?format=json`;
             const response = await fetch(modelURL);
             const data = await response.json();
             setModel(data.Results);
        }
        if (selectedMake && selectedYear) {
             getModel();
        }
    }, [selectedMake]);


    /*
    This return is used to display the dropdown. It has the text on the left, it
    then goes into 3 categories: year, make, model. Each of the 3 dropdowns uses a
    select function. Year is selected first, then make can be selected, then model. 
    The first option, instead of being blank, is the category name. The rest of the
    options are generated from the api, and if the option is changed, the new 
    selection is displayed.
    */

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

