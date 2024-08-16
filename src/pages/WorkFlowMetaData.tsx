import { useState } from "react";
import MetaDataCard from "../components/MetaDataCard";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { useLoaderData, useLocation, useNavigate, useParams } from "react-router-dom";
import "../widget/Widget.css";

function WorkFlowMetaDataPage() {
    const { state } = useLocation();
    let entryData: any = {};
    let metaDataToLoad: any = {};
    let workFlowDataToLoad: any = {};
    let isNavLink = false;
    entryData = useLoaderData();
    if (entryData){
        metaDataToLoad = entryData.metadata;
    }
    else{
        if (state){
            metaDataToLoad = state.metadata;
            if (state.entrydata !== undefined){
                entryData =  state.entrydata;
            }
            if (state.isNavLink !== undefined){
                isNavLink = state.isNavLink;
            }
        }
    }
    
    const [metaData, setMetaData] = useState<any>(metaDataToLoad)
    const navigate = useNavigate();
    let params = useParams();
    const workFlowType = params.workflowtype;

    function updateMetaData(metadata: any) {
        if (metaData) {
            if (isNavLink){
                navigate("../workflow/" + workFlowType, { state: { metadata: metadata, entrydata: entryData, isNavLink:isNavLink } });
            }
            else{
                navigate("../workflow/" + workFlowType, { state: { metadata: metadata, entrydata: entryData } });
            }
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
