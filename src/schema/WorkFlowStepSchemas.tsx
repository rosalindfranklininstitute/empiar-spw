import { RJSFSchema, UiSchema, WidgetProps } from "@rjsf/utils";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const imagingMethod: string[] = [
  "TEM",
  "TEM tomography",
  "STEM",
  "FIB-SEM",
  "SBF-SEM",
  "Array Tomography",
  "X Ray Microscopy",
  "Others"
];
const temperatureUnits: string[] = ["K", "C"];
const durationUnits: string[] = ["Min", "Hr"];
const concentrationUnits: string[] = ["%", "%W/V", "M", "mg/ml", "NA"];
const pressureUnits: string[] = ["bar", "atm"];
const weightUnits: string[] = ["mg", "g"];
const reagentList: string[] = [
  "Acetone",
  "Acrolein",
  "Araldite 502",
  "Aspartic acid",
  "BDMA",
  "Calcium Chloride",
  "DDSA",
  "DER 736",
  "Dimethylaminoethanol (DMAE)",
  "DMP-30",
  "Durcupan",
  "EDTA",
  "EGTA",
  "Embed 812",
  "Epon",
  "Epon-Araldite",
  "ERL 4221",
  "ERL 4206",
  "Ethanol",
  "Glutaraldehyde",
  "HEPES",
  "Lead Acetate",
  "Lead Aspartate",
  "Lead Citrate",
  "Lead Nitrate",
  "Lowicryl HM20",
  "Lowicryl HM23",
  "Lowicryl K11M",
  "Lowicryl K4M",
  "LR Gold",
  "LR White",
  "Magnesium Chloride",
  "Magnesium Sulphate",
  "Malachite Green",
  "NMA",
  "Osmium Tetroxide",
  "Paraformaldehyde",
  "PIPES",
  "PolyBed",
  "Potassium Chloride",
  "Potassium ferricyanide",
  "Potassium ferrocyanide",
  "Potassium permanganate",
  "Potassium Phosphate",
  "Propylene oxide",
  "Resin",
  "Ruthenium Red",
  "Sodium cacodylate",
  "Sodium Chloride",
  "Sodium Phosphate (dibasic)",
  "Sodium Phosphate (monobasic)",
  "Spurrs",
  "Sucrose",
  "Tannic acid",
  "Thiocarbohydrazide",
  "Uranyl Acetate",
  "NA",
];

const metaDataSchema: RJSFSchema = {
  type: "object",
  properties: {
    name:
      { type: "string", title: "Protocol Name" },
    imagingmethod: {
      type: "string",
      enum: imagingMethod,
      title: "Imaging Method",
    },
    studydescription: { type: "string", title: "Study Description" },
    biologicalentity: { type: "string", title: "Biological Identity" },
  },
};

const metaDataUiSchema: RJSFSchema = {
  imagingmethod: {
    "ui:widget": (props: WidgetProps) => {
      return (
        <Autocomplete
          disablePortal
          id="combo-box-cf-reagent"
          options={imagingMethod}
          sx={{ width: 300 }}
          value={props.value}
          onInputChange={(event, newInputValue) => {
            props.onChange(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label="Imaging Technique" />
          )}
        />
      );
    },
  },
};

const cfSchema: RJSFSchema = {
  type: "object",
  properties: {
    ph:
      { type: "number", minimum: 0, maximum: 14, multipleOf: 0.1, title: "pH" },
    temperature: {
      type: "object",
      title: "Temperature",
      properties: {
        temperature: { type: "number", title: "Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    duration: {
      type: "object",
      title: "Duration",
      properties: {
        duration: { type: "number", minimum: 0, title: "Duration" },
        durationunit: {
          type: "string",
          enum: durationUnits,
          title: "Duration Unit",
        },
      },
    },
    repeats: { type: "number", minimum: 0, title: "Repeats" },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    instrument: {
      type: "object",
      title: "Instrument",
      properties: {
        instrumentname: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
      },
    },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    reagentlist: {
      title: "Reagent List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
  },
};

const cfUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagentlist: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
};

const pfSchema: RJSFSchema = {
  type: "object",
  properties: {
    instrumentdetails: {
      title: "Instrument Details",
      type: "object",
      properties: {
        instrument: { type: "string", title: "Instrument" },
      },
    },
    chamberhumidity: { type: "number", title: "Chamber Humidity (in%)" },
    chambertemperature: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Chamber Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    cryogentemperature: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Cryogen Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    reagentlist: {
      title: "Cyogen Composition",
      type: "array",
      items: {
        type: "object",
        properties: {
          material: {
            title: "Material",
            type: "string",
          },
          proportion: {
            title: "Proportion (in %)",
            type: "number",
          },
        },
      },
    },
  },
};

const pfUISchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
};

const hpfSchema: RJSFSchema = {
  type: "object",
  properties: {
    pressure: {
      type: "object",
      title: "Pressure",
      properties: {
        pressure: { type: "number", minimum: 0, title: "Pressure" },
        pressureunit: {
          type: "string",
          enum: pressureUnits,
          title: "Pressure Unit",
        },
      },
    },
    duration: {
      type: "object",
      title: "Duration",
      properties: {
        duration: { type: "number", minimum: 0, title: "Duration" },
        durationunit: {
          type: "string",
          enum: durationUnits,
          title: "Duration Unit",
        },
      },
    },
    boredetials: {
      type: "object",
      title: "Bore Details",
      properties: {
        borediameter: {
          type: "number",
          minimum: 0, 
          title: "Bore Diameter",
          description: "Bore/ Planchetter Diameter (in mm)",
        },
        boredepth: {
          type: "number",
          minimum: 0,
          title: "Bore Depth",
          description: "Bore depth (in um)",
        },
      },
    },
    instrumentdetails: {
      title: "Instrument Details",
      type: "object",
      properties: {
        instrument: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
        instrumentramp: { type: "number", title: "Instrument Ramp" },
        instrumentspeed: { type: "number", title: "Instrument Speed" },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    fillmedium: {
      title: "Fill Medium",
      type: "array",
      items: {
        type: "object",
        properties: {
          fillmediumdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
    coatingmedium: {
      title: "Coating Medium",
      type: "array",
      items: {
        type: "object",
        properties: {
          coatingmediumdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
  },
};

const hpfUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  fillmedium: {
    items: {
      "ui:options": { label: false },
      fillmediumdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
  coatingmedium: {
    items: {
      "ui:options": { label: false },
      coatingmediumdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
};

const stSchema: RJSFSchema = {
  type: "object",
  properties: {
    ph:
      { type: "number", title: "pH" },
    temperature: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    duration: {
      type: "object",
      properties: {
        duration: { type: "number", title: "Duration" },
        durationunit: {
          type: "string",
          enum: durationUnits,
          title: "Duration Unit",
        },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    instrument: { type: "string", title: "Instrument" },
    instrumentwattage: { type: "number", title: "Instrument Wattage" },
    reagentlist: {
      title: "Reagent List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
  },
};

const stUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagentlist: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
      },
    },
  },
};

const dhSchema: RJSFSchema = {
  type: "object",
  properties: {
    reagent1: { type: "string", title: "Reagent 1" },
    reagent2: { type: "string", title: "Reagent 2" },
    instrument: { type: "string", title: "Instrument" },
    instrumentwattage: { type: "number", title: "Instrument Wattage" },
    temperature: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    reagentconcentration: {
      title: "Reagent Concentration",
      type: "array",
      items: {
        type: "object",
        properties: {
          repeats: { type: "number", title: "Count" },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
          duration: {
            type: "object",
            properties: {
              duration: { type: "number", title: "Duration" },
              durationunit: {
                type: "string",
                enum: durationUnits,
                title: "Duration Unit",
              },
            },
          },
        }
      }
    }
  },
};

const dhUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagent1: {
    "ui:widget": (props: WidgetProps) => {
        return (
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={reagentList}
            sx={{ width: 300 }}
            renderInput={(params) => (
              <TextField {...params} label="Reagent 1" />
            )}
          />
        );
      },
    },
  reagent2: {
    "ui:widget": (props: WidgetProps) => {
      return (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={reagentList}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField {...params} label="Reagent 2" />
          )}
        />
      );
    },
  },
  reagentconcentration:{
    items:{
      "ui:options": { label: false },
    }
  }
};

const riSchema: RJSFSchema = {
  type: "object",
  properties: {
    ph:
      { type: "number", minimum: 0, maximum: 14, multipleOf: 0.1, title: "pH" },
    temperature: {
      type: "object",
      title: "Temperature",
      properties: {
        temperature: { type: "number", title: "Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    duration: {
      type: "object",
      title: "Duration",
      properties: {
        duration: { type: "number", minimum: 0, title: "Duration" },
        durationunit: {
          type: "string",
          enum: durationUnits,
          title: "Duration Unit",
        },
      },
    },
    repeats: { type: "number", minimum: 0, title: "Repeats" },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    instrument: {
      type: "object",
      title: "Instrument",
      properties: {
        instrumentname: { type: "string", title: "Instrument" },
      },
    },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    reagentlist: {
      title: "Reagent List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
  },
};

const riUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagentlist: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
    ph: {
      sx: { input: { color: "red", bgcolor: "green" } },
    },
  },
};

const ifSchema: RJSFSchema = {
  type: "object",
  properties: {
    instrumentdetails: {
      title: "Instrument Details",
      type: "object",
      properties: {
        instrument: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
        instrumentramp: { type: "number", title: "Instrument Ramp" },
        instrumentspeed: { type: "number", title: "Instrument Speed" },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    reagentlist: {
      title: "Reagent List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          weightdetails: {
            title: "Weight",
            type: "object",
            properties: {
              weight: {
                type: "string",
                title: "Weight",
              },
              weightunits: {
                type: "string",
                enum: weightUnits,
                title: "Weight Units",
              },
            },
          },
        },
      },
    },
    infiltrationlist: {
      title: "Infiltration Procedure",
      type: "array",
      items: {
        type: "object",
        properties: {
          count: { type: "number", title: "Count" },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
          duration: {
            type: "object",
            properties: {
              duration: { type: "number", title: "Duration" },
              durationunit: {
                type: "string",
                enum: durationUnits,
                title: "Duration Unit",
              },
            },
          },
          starttemperature: {
            title: "Start Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "Start Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
          endtemperature: {
            title: "End Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "End Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
        },
      },
    },
  },
};

const ifUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagentlist: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
  infiltrationlist: {
    items: {
      "ui:options": { label: false },
    },
  },
};

const icSchema: RJSFSchema = {
  type: "object",
  properties: {
    ph:
      { type: "number", title: "pH" },
    temperature: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Temperature" },
        temperatureunit: {
          type: "string",
          enum: temperatureUnits,
          title: "Temperature Unit",
        },
      },
    },
    duration: {
      type: "object",
      properties: {
        duration: { type: "number", title: "Duration" },
        durationunit: {
          type: "string",
          enum: durationUnits,
          title: "Duration Unit",
        },
      },
    },
    repeats: { type: "number", title: "Repeats" },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    instrument: {
      type: "object",
      properties: {
        instrumentname: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
      },
    },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    reagentlist: {
      title: "Reagent List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
  },
};

const icUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  reagentlist: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
};

const ocSchema: RJSFSchema = {
  type: "object",
  properties: {
    instrumentdetails: {
      title: "Instrument Details",
      type: "object",
      properties: {
        instrument: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
        instrumentramp: { type: "number", title: "Instrument Ramp" },
        instrumentspeed: { type: "number", title: "Instrument Speed" },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    warmingprocedure: {
      title: "Warming Procedure List",
      type: "array",
      items: {
        type: "object",
        properties: {
          temperature: { type: "number", title: "Temperature Ramp (in K/Hr)" },
          starttemperature: {
            title: "Start Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "Start Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
          endtemperature: {
            title: "End Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "End Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
          duration: {
            type: "object",
            properties: {
              duration: { type: "number", title: "Duration" },
              durationunit: {
                type: "string",
                enum: durationUnits,
                title: "Duration Unit",
              },
            },
          },
        },
      },
    },
  },
};

const ocUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  warmingprocedure: {
    items: {
      "ui:options": { label: false },
    },
  },
};

const uvpSchema: RJSFSchema = {
  type: "object",
  properties: {
    instrumentdetails: {
      title: "Instrument Details",
      type: "object",
      properties: {
        instrument: { type: "string", title: "Instrument" },
        instrumentwattage: { type: "number", title: "Instrument Wattage" },
        instrumentramp: { type: "number", title: "Instrument Ramp" },
        instrumentspeed: { type: "number", title: "Instrument Speed" },
      },
    },
    notes: { type: "string", title: "Notes" },
    safetynotes: { type: "string", title: "Safety Notes" },
    isundervaccum: { type: "boolean", title: "Under Vaccum" },
    fixationmedium: {
      title: "Fixation Medium List",
      type: "array",
      items: {
        type: "object",
        properties: {
          reagentdetail: {
            title: "Reagent Item",
            type: "object",
            properties: {
              reagent: {
                type: "string",
              },
              solvent: {
                type: "string",
              },
            },
          },
          concentrationdetails: {
            title: "Final Concentration",
            type: "object",
            properties: {
              concentration: {
                type: "string",
                title: "Concentration",
              },
              concentrationunits: {
                type: "string",
                title: "Concentration Units",
                enum: concentrationUnits,
              },
            },
          },
        },
      },
    },
    warmingprocedure: {
      title: "Warming Procedure List",
      type: "array",
      items: {
        type: "object",
        properties: {
          temperature: { type: "number", title: "Temperature Ramp (in K/Hr)" },
          starttemperature: {
            title: "Start Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "Start Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
          endtemperature: {
            title: "End Temperature",
            type: "object",
            properties: {
              starttemperature: { type: "number", title: "End Temperature" },
              temperatureunit: {
                type: "string",
                enum: temperatureUnits,
                title: "Temperature Unit",
              },
            },
          },
          duration: {
            type: "object",
            properties: {
              duration: { type: "number", title: "Duration" },
              durationunit: {
                type: "string",
                enum: durationUnits,
                title: "Duration Unit",
              },
            },
          },
        },
      },
    },
  },
};

const uvpUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  fixationmedium: {
    items: {
      "ui:options": { label: false },
      reagentdetail: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-reagent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-cf-solvent"
                options={reagentList}
                sx={{ width: 300 }}
                value={props.value}
                onInputChange={(event, newInputValue) => {
                  props.onChange(newInputValue);
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
  warmingprocedure: {
    items: {
      "ui:options": { label: false },
    },
  },
};

const fsSchema: RJSFSchema = {
  instrumentdetails: {
    title: "Instrument Details",
    type: "object",
    properties: {
      instrument: { type: "string", title: "Instrument" },
      instrumentwattage: { type: "number", title: "Instrument Wattage" },
      instrumentramp: { type: "number", title: "Instrument Ramp" },
      instrumentspeed: { type: "number", title: "Instrument Speed" },
    },
  },
  notes: { type: "string", title: "Notes" },
  safetynotes: { type: "string", title: "Safety Notes" },
  fixationmedium: {
    title: "Fixation Medium List",
    type: "array",
    items: {
      type: "object",
      properties: {
        reagentdetail: {
          title: "Reagent Item",
          type: "object",
          properties: {
            reagent: {
              type: "string",
            },
            solvent: {
              type: "string",
            },
          },
        },
        concentrationdetails: {
          title: "Final Concentration",
          type: "object",
          properties: {
            concentration: {
              type: "string",
              title: "Concentration",
            },
            concentrationunits: {
              type: "string",
              title: "Concentration Units",
              enum: concentrationUnits,
            },
          },
        },
      },
    },
  },
  warmingprocedure: {
    title: "Warming Procedure List",
    type: "array",
    items: {
      type: "object",
      properties: {
        temperature: { type: "number", title: "Temperature Ramp (in K/Hr)" },
        starttemperature: {
          title: "Start Temperature",
          type: "object",
          properties: {
            starttemperature: { type: "number", title: "Start Temperature" },
            temperatureunit: {
              type: "string",
              enum: temperatureUnits,
              title: "Temperature Unit",
            },
          },
        },
        endtemperature: {
          title: "End Temperature",
          type: "object",
          properties: {
            starttemperature: { type: "number", title: "End Temperature" },
            temperatureunit: {
              type: "string",
              enum: temperatureUnits,
              title: "Temperature Unit",
            },
          },
        },
        duration: {
          type: "object",
          properties: {
            duration: { type: "number", title: "Duration" },
            durationunit: {
              type: "string",
              enum: durationUnits,
              title: "Duration Unit",
            },
          },
        },
      },
    },
  },
};

const fsUiSchema: UiSchema = {
  notes: {
    "ui:widget": "textarea",
  },
  safetynotes: {
    "ui:widget": "textarea",
  },
  fixationmedium: {
    items: {
      "ui:options": { label: false },
      fillmedium: {
        reagent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={reagentList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Reagent" />
                )}
              />
            );
          },
        },
        solvent: {
          "ui:widget": (props: WidgetProps) => {
            return (
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={reagentList}
                sx={{ width: 300 }}
                renderInput={(params) => (
                  <TextField {...params} label="Solvent" />
                )}
              />
            );
          },
        },
        // },
      },
    },
  },
  warmingprocedure: {
    items: {
      "ui:options": { label: false },
    },
  },
};

export const stepMenus = [
  {
    "name": "Chemical Fixation",
    "key": "1",
    "stepkey": "cf",
    "color": "#03A9F4"
  },
  {
    "name": "Plunge Freezing",
    "key": "2",
    "stepkey": "pf",
    "color": "#03A9F4"
  },
  {
    "name": "High Pressure Freezing",
    "key": "3",
    "stepkey": "hpf",
    "color": "#03A9F4"
  },
  {
    "name": "Staining",
    "key": "4",
    "stepkey": "st",
    "color": "#00BCD4"
  },
  {
    "name": "Dehydration",
    "key": "5",
    "stepkey": "dh",
    "color": "#009688"
  },
  {
    "name": "Rinsing",
    "key": "6",
    "stepkey": "ri",
    "color": "#4CAF50"
  },
  {
    "name": "Infiltration",
    "key": "7",
    "stepkey": "if",
    "color": "#8BC34A"
  },
  {
    "name": "Incubation",
    "key": "8",
    "stepkey": "ic",
    "color": "#C0CA33"
  },
  {
    "name": "Oven Curing",
    "key": "9",
    "stepkey": "oc",
    "color": "#2196F3"
  },
  {
    "name": "Uv Polymerisation",
    "key": "10",
    "stepkey": "uvp",
    "color": "#2196F3"
  },
  // {
  //   "name": "Freeze Substitution",
  //   "key": "11",
  //   "stepkey": "fs",
  //   "color": "#ff8c00 "
  // }
];

export const stepDictObject = {
  cf: {
    stepkey: "cf",
    title: "Chemical Fixation",
    info: "Parameters describing Chemical Fixation",
    schema: cfSchema,
    uischema: cfUiSchema,
  },
  pf: {
    stepkey: "pf",
    title: "Plunge Freezing",
    info: "The process of the sample being plunged into a cryogen like liquid ethane or propane (or amixture) to freeze it rapidly.",
    schema: pfSchema,
    uischema: pfUISchema,
  },
  hpf: {
    stepkey: "hpf",
    title: "High Pressure Freezing",
    info: "The process of the sample being plunged into a cryogen like liquid ethane or propane (or amixture) to freeze it rapidly.",
    schema: hpfSchema,
    uischema: hpfUiSchema,
  },
  st: {
    stepkey: "st",
    title: "Staining",
    info: "Parameters describing staining procedure.",
    schema: stSchema,
    uischema: stUiSchema,
  },
  dh: {
    stepkey: "dh",
    title: "Dehydration",
    info: "Parameters describing dehydration procedure usually preceding resin embedding. We describe this as Medium 1 (usually buffer or water) being replaced by Medium 2 (usually some alcohol) with stepwise increasing concentrations.",
    schema: dhSchema,
    uischema: dhUiSchema,
  },
  ri: {
    stepkey: "ri",
    title: "Rinsing",
    info: "Parameters describing washing procedure.",
    schema: riSchema,
    uischema: riUiSchema,
  },
  if: {
    stepkey: "if",
    title: "Infiltration",
    info: "Infiltration procedure which usually involves initial medium(usually an alcohol) being replaced by final medium(usually a plastic resin) in a series of steps.",
    schema: ifSchema,
    uischema: ifUiSchema,
  },
  ic: {
    stepkey: "ic",
    title: "Incubation",
    info: "Parameters describing incubation procedure to harden resin to plastic.",
    schema: icSchema,
    uischema: icUiSchema,
  },
  oc: {
    stepkey: "oc",
    title: "Oven Curing",
    info: "Parameters describing oven curing",
    schema: ocSchema,
    uischema: ocUiSchema,
  },
  uvp: {
    stepkey: "uvp",
    title: "UV Polymerisation",
    info: "A resin embedded sample is exposed to UV light to induce polymerisation so that the sample is trapped in solid plastic.",
    schema: uvpSchema,
    uischema: uvpUiSchema,
  },
  fs: {
    stepkey: "fs",
    title: "Freeze Substitution",
    info: "Low temperature fixation and substitution of water in sample with gradual warm up procedure.",
    schema: fsSchema,
    uischema: fsUiSchema,
  },
};

export const metaDataObject = {
  metadata: {
    schema: metaDataSchema,
    uischema: metaDataUiSchema
  },
}
