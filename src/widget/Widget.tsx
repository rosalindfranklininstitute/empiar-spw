import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import PublishedWorkFlows from '../pages/PublishedWorkFlows';
import { PublishedListDataLoader, SavedListDataLoader, TemplateListDataLoader, ViewWorkFlowDataLoader, MetaDataLoader } from "../utils/WidgetUtility"
import SavedWorkFlows from '../pages/SavedWorkFlows';
import TemplateWorkFlows from '../pages/TemplateWorkFlows';
import Home from '../pages/Home';
import ViewWorkFlow from '../pages/ViewWorkFlow';
import BaseLayout from '../layouts/BaseLayout';
import BuildLayout from '../layouts/BuildLayout';
import WorkFlowMetaData from  '../pages/WorkFlowMetaData';
import WorkFlowSteps from '../pages/WorkFlowSteps';
import { RoutError } from '../pages/RouteError';
import { WorkFlowError } from '../pages/WorkFlowError';
import ReviewWorkFlow from '../pages/ReviewWorkFlow';
import Help from '../pages/Help';
import Faq from '../pages/Faq';

export default function Widget() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />} errorElement={<WorkFlowError /> }>
        <Route index element={<Home />} />
        <Route path="/published" element={<PublishedWorkFlows />} loader={PublishedListDataLoader} />
        <Route path="/saved" element={<SavedWorkFlows />} loader={SavedListDataLoader} />
        <Route path="/template" element={<TemplateWorkFlows />} loader={TemplateListDataLoader}/>
        <Route path="/view/:workflowtype/:workflowid" element={<ViewWorkFlow />} loader={ViewWorkFlowDataLoader}/>
        <Route path="build" element={<BuildLayout />} errorElement={<WorkFlowError /> }>
          <Route path="metadata/:workflowtype" element={<WorkFlowMetaData />} />
          <Route path="metadata/:workflowtype/:workflowid" element={<WorkFlowMetaData />} loader={MetaDataLoader} />
          <Route path="workflow/:workflowtype" element={<WorkFlowSteps />} />
          <Route path="review/:workflowtype" element={<ReviewWorkFlow />} />
        </Route>
        {/* <Route path="/help" element={<Help />} /> */}
        <Route path="/faq" element={<Faq />} />
        <Route path='*' element={<RoutError />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} /> 
  );
}
