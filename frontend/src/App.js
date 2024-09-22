
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
          path: "/adminlogin",
          element: <Login/>
        },
        {
          path: "/home",
          element: <Buttons/>
        }
        
      ]
    }
    


  ])


  return (
    <RouterProvider router={router}/>
    
  );
}

export default App;
