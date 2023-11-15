import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Widget from "./widget/Widget";
import { workerData } from "worker_threads";

function App() {
  const sampleData = {
    "metadata": {
      "protocolName": "Test data",
      "imagingMethod": "",
      "studyDescription": "",
      "biologicalEntity": "",
    },
    "data": [
      {
        "method": "High Pressure Freezing",
        "orderNumber": 1,
        "fillmedium": [
          {}
        ],
        "coatingmedium": [],
        "pressure": {
          "pressure": 3,
          "pressureunit": "bar"
        },
        "duration": {
          "duration": 31,
          "durationunit": "Min"
        },
        "boredetials": {
          "borediameter": 32,
          "boredepth": 33
        },
        "instrumentdetails": {
          "instrument": "34",
          "instrumentwattage": 35,
          "instrumentramp": 36,
          "instrumentspeed": 37
        },
        "notes": "38",
        "safetynotes": "39",
        "isundervaccum": true
      },
      {
        "method": "Chemical Fixation",
        "orderNumber": 2,
        "reagentlist": [
          {
            "reagentdetail": {
              "reagent": "NA",
              "solvent": "Uranyl Acetate"
            },
            "concentrationdetails": {
              "concentration": "11",
              "concentrationunits": "%"
            }
          },
          {
            "reagentdetail": {
              "reagent": "Uranyl Acetate",
              "solvent": "Thiocarbohydrazide"
            },
            "concentrationdetails": {
              "concentration": "112",
              "concentrationunits": "%"
            }
          }
        ],
        "ph": 1,
        "temperature": {
          "temperature": 12,
          "temperatureunit": "K"
        },
        "duration": {
          "duration": 13,
          "durationunit": "Min"
        },
        "repeats": 14,
        "notes": "15",
        "safetynotes": "16",
        "instrument": {
          "instrumentname": "17",
          "instrumentwattage": "18"
        },
        "isundervaccum": true,
        "instrumentwattage": "19"
      },
      {
        "method": "Chemical Fixation",
        "orderNumber": 3,
        "reagentlist": [
          {
            "reagentdetail": {
              "reagent": "Uranyl Acetate",
              "solvent": "Thiocarbohydrazide"
            },
            "concentrationdetails": {
              "concentration": "22",
              "concentrationunits": "%W/V"
            }
          },
          {
            "reagentdetail": {
              "reagent": "Tannic acid",
              "solvent": "Sucrose"
            },
            "concentrationdetails": {
              "concentration": "221",
              "concentrationunits": "%W/V"
            }
          }
        ],
        "ph": 2,
        "temperature": {
          "temperature": 22,
          "temperatureunit": "C"
        },
        "duration": {
          "duration": 23,
          "durationunit": "Hr"
        },
        "repeats": 24,
        "notes": "25",
        "safetynotes": "26",
        "instrument": {
          "instrumentname": "27",
          "instrumentwattage": "28"
        },
        "isundervaccum": true,
        "instrumentwattage": "29"
      }
    ]
  };

  return (
    <div className="App">
     <Widget></Widget>
    </div>
  );
}

export default App;
