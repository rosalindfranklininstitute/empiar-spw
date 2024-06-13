import { Route, RouterProvider, Routes, createBrowserRouter, createRoutesFromElements, useNavigate } from 'react-router-dom';
import PublishedWorkFlows from '../pages/PublishedWorkFlows';
import { setUser, PublishedListDataLoader, SavedListDataLoader, TemplateListDataLoader, ViewWorkFlowDataLoader, MetaDataLoader, AnnotationListDataLoader, ApprovedListDataLoader, AnnotationWorkFLowDataLoader, EntriesToReleaseDataLoader} from "../utils/WidgetUtility"
import SavedWorkFlows from '../pages/SavedWorkFlows';
import TemplateWorkFlows from '../pages/TemplateWorkFlows';
import AnnotationWorkFlows from '../pages/AnnotationWorkFlows';
import ReleaseEntriesWor from '../pages/AnnotationWorkFlows';
import AnnotationReviewWorkFlow from '../pages/AnnotationReviewWorkFlow';
import ApproveReviewWorkFlow from '../pages/ApproveReviewWorkFlow';
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
import ApproveWorkFlows from '../pages/ApproveAnnotations';
import EntriesToRelease from '../pages/EntriesToRelease';
import { UserContext } from '../utils/UserContext';
import { useContext } from 'react';


export default function Widget() {
  const userContext = useContext(UserContext);
  setUser({username: userContext.username, name: userContext.name, email:userContext.email});
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<BaseLayout />} errorElement={<WorkFlowError /> }>
        <Route index element={<Home />} />
        <Route path="/empiar/deposition/widget" element={<Home />} errorElement={<WorkFlowError /> } />
        <Route path="/published" element={<PublishedWorkFlows />} loader={PublishedListDataLoader} />
        <Route path="/saved" element={<SavedWorkFlows />} loader={SavedListDataLoader} />
        <Route path="/template" element={<TemplateWorkFlows />} loader={TemplateListDataLoader}/>
        <Route path="/approved" element={<ApproveWorkFlows />}  loader={ApprovedListDataLoader} />
        <Route path="annotation" element={<AnnotationWorkFlows />} loader={AnnotationListDataLoader} />  
        <Route path="/view/:workflowtype/:workflowid" element={<ViewWorkFlow />} loader={ViewWorkFlowDataLoader}/>
        <Route path="build" element={<BuildLayout />} errorElement={<WorkFlowError /> }>
          <Route path="metadata/:workflowtype" element={<WorkFlowMetaData />} />
          <Route path="metadata/:workflowtype/:workflowid" element={<WorkFlowMetaData />} loader={MetaDataLoader} />
          <Route path="workflow/:workflowtype" element={<WorkFlowSteps />} />
          <Route path="review/:workflowtype" element={<ReviewWorkFlow />} />           
          <Route path="approvereview/:workflowtype/:workflowid" element={<ApproveReviewWorkFlow />} loader={AnnotationWorkFLowDataLoader} />
        </Route>
        <Route path="annotate" element={<BuildLayout />} errorElement={<WorkFlowError /> }>
          <Route path="metadata/:workflowtype/:workflowid" element={<WorkFlowMetaData />} loader={MetaDataLoader} />
          <Route path="workflow/:workflowtype" element={<WorkFlowSteps />} />
          <Route path="review/:workflowtype" element={<ReviewWorkFlow />} />           
          <Route path="requestapproval/:usertype/" element={<AnnotationReviewWorkFlow />} />
          <Route path="release" element={<EntriesToRelease />} loader={EntriesToReleaseDataLoader} />  
          {/* <Route path="app/approvereview/:workflowtype/:workflowid" element={<ApproveReviewWorkFlow />} loader={AnnotationWorkFLowDataLoader} /> */}
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
