
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"




import ClientsPage from "./pages/ClientsIntake";
import Layout from "./components/Layout";
import Home from "./pages/Home"

function App() {
  const router= createBrowserRouter([
    {
      element: <Layout/>,
      children: [
        
        {
          path: "/home",
          element: <Home/>
        },
        {
          path: "/clientintake",
          element: <ClientsPage/>

        }
        
      ]
    }
    


  ])


  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
