import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';



export function ChemicalFixationDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('ph' in cardData || 'temperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('ph' in cardData) && <span>pH: <b>{cardData["ph"]}</b></span>}
                    {('temperature' in cardData) &&
                        <span>Temperature:
                            <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                        </span>}
                </Stack>
            }
            {('duration' in cardData || 'repeats' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('duration' in cardData) &&
                        <span>Duration:
                            <b>{cardData["duration"]["duration"]} {cardData["duration"]["temperatureunit"]}</b>
                        </span>}
                    {('repeats' in cardData) && <span>Repeats: <b>{cardData["repeats"]}</b></span>}
                </Stack>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);

}

export function PlungeFreezongDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("material" in data) {
                    listElement.push(<span>Material:
                        <b>{data["material"]}</b>
                    </span>)
                }
                if ("proportion" in data) {
                    listElement.push(<span>Proportion:
                        <b>{data["proportion"]}</b>
                    </span>)
                }

                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            {('instrumentdetails' in cardData) &&
                <>
                    <Stack direction="row" spacing={3}>
                        {('instrument' in cardData["instrumentdetails"]) && <span>Instrument: <b>{cardData["instrumentdetails"]["instrument"]}</b></span>}
                    </Stack>
                </>
            }
            {('chambertemperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('temperature' in cardData["chambertemperature"]) && <span>Chamber Temperature: <b>{cardData["chambertemperature"]["temperature"]}</b></span>}
                    {('temperatureunit' in cardData["chambertemperature"]) &&
                        <span>
                            <b>{cardData["chambertemperature"]["temperatureunit"]} </b>
                        </span>}
                </Stack>
            }
            {('cryogentemperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('temperature' in cardData["cryogentemperature"]) && <span>Chamber Temperature: <b>{cardData["cryogentemperature"]["temperature"]}</b></span>}
                    {('temperatureunit' in cardData["cryogentemperature"]) &&
                        <span>
                            <b>{cardData["cryogentemperature"]["temperatureunit"]} </b>
                        </span>}
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);
}

export function HighPressureFreezingDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('fillmedium' in cardData) {
            cardData["fillmedium"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("fillmediumdetail" in data) {
                    if ("reagent" in data["fillmediumdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["fillmediumdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["fillmediumdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["fillmediumdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        if ('coatingmedium' in cardData) {
            cardData["coatingmedium"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("coatingmediumdetail" in data) {
                    if ("reagent" in data["coatingmediumdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["coatingmediumdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["coatingmediumdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["coatingmediumdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            {('pressure' in cardData || 'duration' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('pressure' in cardData) &&
                        <span>Pressure:
                            <b>{cardData["pressure"]["pressure"]} {cardData["pressure"]["pressureunit"]}</b>
                        </span>}
                    {('duration' in cardData) &&
                        <span>Duration:
                            <b>{cardData["duration"]["duration"]} {cardData["duration"]["durationunit"]}</b>
                        </span>}
                </Stack>
            }
            {('boredetials' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('boredepth' in cardData["boredetials"]) &&
                        <span>Bore Depth:
                            <b>{cardData["boredetials"]["boredepth"]}</b>
                        </span>}
                    {('borediameter' in cardData["boredetials"]) &&
                        <span>Bore Diameter:
                            <b>{cardData["boredetials"]["borediameter"]}</b>
                        </span>}
                </Stack>
            }
            {('instrumentdetails' in cardData) &&
                <>
                    <Stack direction="row" spacing={3}>
                        {('instrument' in cardData["instrumentdetails"]) && <span>Instrument: <b>{cardData["instrumentdetails"]["instrument"]}</b></span>}
                        {('instrumentwattage' in cardData["instrumentdetails"]) &&
                            <span>
                                <b>{cardData["instrumentdetails"]["instrumentwattage"]} W</b>
                            </span>}

                        {('instrumentramp' in cardData["instrumentdetails"]) && <span>Instrument Ramp: <b>{cardData["instrumentdetails"]["instrumentramp"]}</b></span>}
                        {('instrumentspeed' in cardData["instrumentdetails"]) &&
                            <span>Instrument Speed:
                                <b>{cardData["instrumentdetails"]["instrumentspeed"]} W</b>
                            </span>}
                    </Stack>
                </>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);
}

export function StainingDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('ph' in cardData || 'temperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('ph' in cardData) && <span>pH: <b>{cardData["ph"]}</b></span>}
                    {('temperature' in cardData) &&
                        <span>Temperature:
                            <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                        </span>}
                </Stack>
            }
            {('duration' in cardData || 'repeats' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('duration' in cardData) &&
                        <span>Duration:
                            <b>{cardData["duration"]["duration"]} {cardData["duration"]["temperatureunit"]}</b>
                        </span>}
                    {('repeats' in cardData) && <span>Repeats: <b>{cardData["repeats"]}</b></span>}
                </Stack>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);

}

export function DehydrationDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentconcentration' in cardData) {
            cardData["reagentconcentration"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("repeats" in data) {
                    listElement.push(<span>Repeats:
                        <b>{data["repeats"]}</b>
                    </span>)
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]} {data["concentrationdetails"]["concentrationunits"]}</b>
                        </span>)
                    }
                }
                if ("duration" in data) {
                    if ("duration" in data["duration"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["duration"]["duration"]} {data["duration"]["durationunit"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('reagent1' in cardData || 'reagent2' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('reagent1' in cardData) && <span>Reagent 1: <b>{cardData["reagent1"]}</b></span>}
                    {('reagent2' in cardData) && <span>Reagent 2: <b>{cardData["reagent2"]}</b></span>}
                    {('temperature' in cardData) &&
                        <span>Temperature:
                            <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                        </span>}
                </Stack>
            }
            {'temperature' in cardData &&
                <Stack direction="row" spacing={3}>
                    <span>Temperature:
                        <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                    </span>
                </Stack>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentconcentration' in cardData) && listComponent()}
        </Box>);

}

export function RinsingDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('ph' in cardData || 'temperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('ph' in cardData) && <span>pH: <b>{cardData["ph"]}</b></span>}
                    {('temperature' in cardData) &&
                        <span>Temperature:
                            <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                        </span>}
                </Stack>
            }
            {('duration' in cardData || 'repeats' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('duration' in cardData) &&
                        <span>Duration:
                            <b>{cardData["duration"]["duration"]} {cardData["duration"]["temperatureunit"]}</b>
                        </span>}
                    {('repeats' in cardData) && <span>Repeats: <b>{cardData["repeats"]}</b></span>}
                </Stack>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);

}

export function InfiltrationDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("weightdetails" in data) {
                    if ("weight" in data["weightdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["weightdetails"]["weight"]} {data["weightdetails"]["weightunits"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        if ('infiltrationlist' in cardData) {
            cardData["infiltrationlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("count" in data) {
                    listElement.push(<span>Count:
                        <b>{data["count"]}</b>
                    </span>)
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]} {data["concentrationdetails"]["concentrationunits"]}</b>
                        </span>)
                    }
                }
                if ("duration" in data) {
                    if ("duration" in data["duration"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["duration"]["duration"]} {data["duration"]["durationunit"]}</b>
                        </span>)
                    }
                }
                if ("starttemperature" in data) {
                    if ("starttemperature" in data["starttemperature"]) {
                        listElement.push(<span>Start Temp:
                            <b>{data["starttemperature"]["temperature"]} {data["starttemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                if ("endtemperature" in data) {
                    if ("endtemperature" in data["endtemperature"]) {
                        listElement.push(<span>End Temp:
                            <b>{data["endtemperature"]["endtemperature"]} {data["endtemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('instrumentdetails' in cardData) &&
                <>
                    <Stack direction="row" spacing={3}>
                        {('instrument' in cardData["instrumentdetails"]) && <span>Instrument: <b>{cardData["instrumentdetails"]["instrument"]}</b></span>}
                        {('instrumentwattage' in cardData["instrumentdetails"]) &&
                            <span>
                                <b>{cardData["instrumentdetails"]["instrumentwattage"]} W</b>
                            </span>}

                        {('instrumentramp' in cardData["instrumentdetails"]) && <span>Instrument Ramp: <b>{cardData["instrumentdetails"]["instrumentramp"]}</b></span>}
                        {('instrumentspeed' in cardData["instrumentdetails"]) &&
                            <span>Instrument Speed:
                                <b>{cardData["instrumentdetails"]["instrumentspeed"]} W</b>
                            </span>}
                    </Stack>
                </>
            }{('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData || 'infiltrationlist' in cardData) && listComponent()}
        </Box>);

}

export function IncubationDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('reagentlist' in cardData) {
            cardData["reagentlist"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('ph' in cardData || 'temperature' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('ph' in cardData) && <span>pH: <b>{cardData["ph"]}</b></span>}
                    {('temperature' in cardData) &&
                        <span>Temperature:
                            <b>{cardData["temperature"]["temperature"]} {cardData["temperature"]["temperatureunit"]}</b>
                        </span>}
                </Stack>
            }
            {('duration' in cardData || 'repeats' in cardData) &&
                <Stack direction="row" spacing={3}>
                    {('duration' in cardData) &&
                        <span>Duration:
                            <b>{cardData["duration"]["duration"]} {cardData["duration"]["temperatureunit"]}</b>
                        </span>}
                    {('repeats' in cardData) && <span>Repeats: <b>{cardData["repeats"]}</b></span>}
                </Stack>
            }
            {('instrument' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Instrument:
                        <b>{cardData["instrument"]["instrument"]} {cardData["instrument"]["instrumentwattage"]}</b>
                    </span>
                </Stack>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('reagentlist' in cardData) && listComponent()}
        </Box>);

}

export function OvenCuringDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('warmingprocedure' in cardData) {
            cardData["warmingprocedure"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("duration" in data) {
                if ("starttemperature" in data) {
                    if ("starttemperature" in data["starttemperature"]) {
                        listElement.push(<span>Start Temp:
                            <b>{data["starttemperature"]["starttemperature"]} {data["starttemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                if ("endtemperature" in data) {
                    if ("endtemperature" in data["endtemperature"]) {
                        listElement.push(<span>End Temp:
                            <b>{data["endtemperature"]["endtemperature"]} {data["endtemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                if ("duration" in data["duration"]) {
                    listElement.push(<span>Concentration:
                        <b>{data["duration"]["duration"]} {data["duration"]["durationunit"]}</b>
                    </span>)
                }
            }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('instrumentdetails' in cardData) &&
                <>
                    <Stack direction="row" spacing={3}>
                        {('instrument' in cardData["instrumentdetails"]) && <span>Instrument: <b>{cardData["instrumentdetails"]["instrument"]}</b></span>}
                        {('instrumentwattage' in cardData["instrumentdetails"]) &&
                            <span>
                                <b>{cardData["instrumentdetails"]["instrumentwattage"]} W</b>
                            </span>}

                        {('instrumentramp' in cardData["instrumentdetails"]) && <span>Instrument Ramp: <b>{cardData["instrumentdetails"]["instrumentramp"]}</b></span>}
                        {('instrumentspeed' in cardData["instrumentdetails"]) &&
                            <span>Instrument Speed:
                                <b>{cardData["instrumentdetails"]["instrumentspeed"]} W</b>
                            </span>}
                    </Stack>
                </>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('warmingprocedure' in cardData) && listComponent()}
        </Box>);

}

export function UvPolymerisationCuringDataCard(cardData: any) {
    const listComponent = () => {
        let listComponentJsx: any = [];
        if ('fixationmedium' in cardData) {
            cardData["fixationmedium"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("reagentdetail" in data) {
                    if ("reagent" in data["reagentdetail"]) {
                        listElement.push(<span>Reagent:
                            <b>{data["reagentdetail"]["reagent"]}</b>
                        </span>)
                    }
                    if ("solvent" in data["reagentdetail"]) {
                        listElement.push(<span>Solvent:
                            <b>{data["reagentdetail"]["solvent"]}</b>
                        </span>)
                    }
                }
                if ("concentrationdetails" in data) {
                    if ("concentration" in data["concentrationdetails"]) {
                        listElement.push(<span>Concentration:
                            <b>{data["concentrationdetails"]["concentration"]}</b>
                        </span>)
                    }
                }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        if ('warmingprocedure' in cardData) {
            cardData["warmingprocedure"].map((data: any, index: number) => {
                let listElement: any = [];
                if ("duration" in data) {
                if ("starttemperature" in data) {
                    if ("starttemperature" in data["starttemperature"]) {
                        listElement.push(<span>Start Temp:
                            <b>{data["starttemperature"]["starttemperature"]} {data["starttemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                if ("endtemperature" in data) {
                    if ("endtemperature" in data["endtemperature"]) {
                        listElement.push(<span>End Temp:
                            <b>{data["endtemperature"]["endtemperature"]} {data["endtemperature"]["temperatureunit"]}</b>
                        </span>)
                    }
                }
                if ("duration" in data["duration"]) {
                    listElement.push(<span>Concentration:
                        <b>{data["duration"]["duration"]} {data["duration"]["durationunit"]}</b>
                    </span>)
                }
            }
                listComponentJsx.push(<Stack direction="row" spacing={3}>{listElement}</Stack>);
            })
        }
        return (
            <>
                {listComponentJsx}
            </>
        )
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            {('instrumentdetails' in cardData) &&
                <>
                    <Stack direction="row" spacing={3}>
                        {('instrument' in cardData["instrumentdetails"]) && <span>Instrument: <b>{cardData["instrumentdetails"]["instrument"]}</b></span>}
                        {('instrumentwattage' in cardData["instrumentdetails"]) &&
                            <span>
                                <b>{cardData["instrumentdetails"]["instrumentwattage"]} W</b>
                            </span>}

                        {('instrumentramp' in cardData["instrumentdetails"]) && <span>Instrument Ramp: <b>{cardData["instrumentdetails"]["instrumentramp"]}</b></span>}
                        {('instrumentspeed' in cardData["instrumentdetails"]) &&
                            <span>Instrument Speed:
                                <b>{cardData["instrumentdetails"]["instrumentspeed"]} W</b>
                            </span>}
                    </Stack>
                </>
            }
            {('safetynotes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Safety Notes: <b>{cardData["safetynotes"]}</b></span>
                </Stack>
            }
            {('notes' in cardData) &&
                <Stack direction="row" spacing={3}>
                    <span>Notes: <b>{cardData["notes"]}</b></span>
                </Stack>
            }
            {('warmingprocedure' in cardData || 'fixationmedium' in cardData) && listComponent()}
        </Box>);

}


