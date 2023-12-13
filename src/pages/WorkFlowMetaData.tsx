import { useState } from "react";
import MetaDataCard from "../components/MetaDataCard";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useLoaderData, useNavigate } from "react-router-dom";
import "../widget/Widget.css";

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
        <MetaDataCard id="1" data={metaData} updateMetaData={updateMetaData}></MetaDataCard>
    );
}

export default WorkFlowMetaDataPage;
