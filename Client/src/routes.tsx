import { useRoutes, Navigate } from "react-router-dom";

//layouts
import AppLayout from "./layouts/App/App";

//pages
import Dashboard from "./layouts/App/components/Dashboard";
import Facility from "./pages/Facility";
import Classifications from "./pages/Classifications/Classifications";
import { NotFound } from "./layouts/App/pages/NotFound";
import SetClassification from "./pages/Classifications/SetClassification";
import FacilityFileImport from "./pages/FacilityFileImport";
import ClassificationFileImport from "./pages/ClassificationFileImport";
import FormBuilder from "./pages/FormBuilder/FormBuilder";
import FormBuilderCreate from "./pages/FormBuilder/FormBuilderCreate";
import FormGenerate from "./pages/FormBuilder/FormGenerate";
import FormGenerate2 from "./pages/FormBuilder/FormGenerate2";
// import Main from './pages/Main';

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <AppLayout />,
      children: [
        { path: "", element: <Dashboard /> },
        { path: "facility", element: <Facility /> },
        { path: "classifications", element: <Classifications /> },
        { path: "formbuilder", element: <FormBuilder /> },
        { path: "formgenerate", element: <FormGenerate /> },
        { path: "formgenerate2", element: <FormGenerate2 /> },

      ],
    },
    {
      path: "/classifications",
      element: <AppLayout />,
      children: [{ path: ":id", element: <SetClassification /> }],
    },
    {
      path: "/facility",
      element: <AppLayout />,
      children: [{ path: "fileimport", element: <FacilityFileImport /> }],
    },
    {
      path: "/classifications",
      element: <AppLayout />,
      children: [{ path: "fileimport", element: <ClassificationFileImport /> }],
    },
    {
      path: "/formbuilder",
      element: <AppLayout />,
      children: [{ path: "create", element: <FormBuilderCreate /> }],
    },
    {
      path: "/404",
      element: <NotFound />,
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
