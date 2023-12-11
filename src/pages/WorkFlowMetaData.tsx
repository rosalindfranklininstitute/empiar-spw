import { useState } from "react";
import MetaDataCard from "../components/MetaDataCard";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useLoaderData, useNavigate } from "react-router-dom";

import "../widget/Widget.css";


const MetaDataPaper = styled(Paper)(({ theme }) => ({
    width: '75%',
    height: '75%',
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
}));

export const MetaDataLoader = async (params: any) => {
    try {
        const workflowData = await import('../static/sampledata/' + params.params.workflowtype + 'jsons/' + params.params.workflowid + '.json')
        return workflowData;
    } catch (e) {
        throw Error("Error could not load entry ID:" + params.params.workflowid);
    }
}

function WorkFlowMetaDataPage() {
    let entryData: any = useLoaderData();
    let metaDataToLoad: any = {};
    let workFlowDataToLoad: any = {};
    if (entryData) {
        metaDataToLoad = entryData.metadata;
        workFlowDataToLoad = entryData.data;
    }
    const [metaData, setMetaData] = useState<any>(metaDataToLoad)
    const navigate = useNavigate();


    function updateMetaData(metadata: any) {
        if (metaData) {
            navigate("../workflow", { state: { metadata: metadata, data: workFlowDataToLoad } });
        }
        else {
            navigate("/");
        }
    }

    return (
        <>
            <div id="metadatacontainer">
                <MetaDataPaper square>
                    <MetaDataCard id="1" data={metaData} updateMetaData={updateMetaData}></MetaDataCard>
                </MetaDataPaper>
            </div>
        </>
    );
}

export default WorkFlowMetaDataPage;
