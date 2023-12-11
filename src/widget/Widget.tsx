import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import PublishedWorkFlows from '../pages/PublishedWorkFlows';
import SavedWorkFlows from '../pages/SavedWorkFlows';
import TemplateWorkFlows from '../pages/TemplateWorkFlows';
import Home from '../pages/Home';
import ViewWorkFlow from '../pages/ViewWorkFlow';
import BaseLayout from '../layouts/BaseLayout';
import BuildLayout from '../layouts/BuildLayout';
import WorkFlowMetaData, {MetaDataLoader} from  '../pages/WorkFlowMetaData';
import WorkFlowSteps from '../pages/WorkFlowSteps';
import { RoutError } from '../pages/RouteError';
import { WorkFlowError } from '../pages/WorkFlowError';
import ReviewWorkFlow from '../pages/ReviewWorkFlow';
import Help from '../pages/Help';
import Faq from '../pages/Faq';

export default function Widget() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />}>
        <Route index element={<Home />} />
        <Route path="/published" element={<PublishedWorkFlows />} />
        <Route path="/saved" element={<SavedWorkFlows />} />
        <Route path="/template" element={<TemplateWorkFlows />} />
        <Route path="/view/:workFlowType/:workFlowId" element={<ViewWorkFlow />} />
        <Route path="build" element={<BuildLayout />} errorElement={<WorkFlowError /> }>
          <Route path="new" element={<WorkFlowMetaData />} />
          <Route path="metadata/:workflowtype/:workflowid" element={<WorkFlowMetaData />} loader={MetaDataLoader} />
          <Route path="workflow" element={<WorkFlowSteps />} />
          <Route path="review" element={<ReviewWorkFlow />} />
        </Route>
        <Route path="/help" element={<Help />} />
        <Route path="/faq" element={<Faq />} />
        <Route path='*' element={<RoutError />} />
      </Route>
    )
  )

  return (
    <RouterProvider router={router} /> 
  );
}