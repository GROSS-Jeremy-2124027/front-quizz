import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from "./screens/HomePage"
import Difficulty from "./screens/Difficulty"
import Pseudo from "./screens/Pseudo"
import Explaination from "./screens/Explaination"
import Language from "./screens/Language"
import Category from "./screens/Category"
import Question from "./screens/Question"

const Routes = () => {
    const publicRoutes = [
        /*---------------------------------*/
        /*-------------- Home -------------*/
        /*---------------------------------*/
        {
            path: '/',
            element: <HomePage />
        },
        {
            path: '/home',
            element: <HomePage />
        },
        /*---------------------------------*/
        /*------------ Language -----------*/
        /*---------------------------------*/
        {
            path: '/language',
            element: <Language />
        },
        /*---------------------------------*/
        /*----------- Difficulty ----------*/
        /*---------------------------------*/
        {
            path: '/difficulty',
            element: <Difficulty />
        },
        /*---------------------------------*/
        /*------------ Pseudo -----------*/
        /*---------------------------------*/
        {
            path: '/pseudo',
            element: <Pseudo />
        },
        /*---------------------------------*/
        /*---------- Explaination ---------*/
        /*---------------------------------*/
        {
            path: '/explaination',
            element: <Explaination />
        },
        /*---------------------------------*/
        /*------------ Category -----------*/
        /*---------------------------------*/
        {
            path: '/category',
            element: <Category />
        },
        /*---------------------------------*/
        /*------------ Question -----------*/
        /*---------------------------------*/
        {
            path: '/question',
            element: <Question />
        },
    ]
    const router = createBrowserRouter([
        ...publicRoutes
    ])
    return <RouterProvider router={router} />
}

export default Routes;