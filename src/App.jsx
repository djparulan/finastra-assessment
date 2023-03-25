import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import Students from './pages/Students';
import Profile from './pages/Profile';
import { useEffect } from "react";
import axios from "axios";
import { useAppDispatch } from './store/index.hook'
import { storeStudents } from './store/students'
import { storeCourses, storeCurrencyTypes, storeCoursesExchangeRates } from './store/courses'
import { storeProfile } from './store/profile'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Students />,
  },
  {
    path: "/:studentId",
    element: <Profile />,
  },
]);

const App = () => {
  const dispatch = useAppDispatch()
  
  useEffect(() => {
    const getData = async (endpoint, setData) => {
      try {
        const response = await axios.get(endpoint);
        dispatch(setData(response.data))
      } catch(err) {
        dispatch(setData([]))
      }
    }

    getData('https://run.mocky.io/v3/79ebd782-efd6-469b-8dd5-663cf03406ad', storeStudents)
    getData('https://run.mocky.io/v3/34bdbb5f-70c0-41ce-aa0c-2bf46befa477', storeCourses)
    getData('https://run.mocky.io/v3/214aef9d-b18a-4188-b55f-a25046408a7e', storeProfile)
    getData('https://gist.githubusercontent.com/JCGonzaga01/9f93162c5fb799b7c084bb28fc69a2f1/raw/94c55f89dc4c1e2e7ca49de5658c3441a2b348af/Updated-Common-Currency.json', storeCurrencyTypes)
    getData('https://v6.exchangerate-api.com/v6/1e8746aa1fbe2007357fd8ff/latest/USD', storeCoursesExchangeRates)
  }, [dispatch])
  
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App