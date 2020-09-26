import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
const routes = [
    {
        path:'/',
        component: ()=>import('../pages/App/App'),
    },
    {
        path:'/List',
        component: ()=>import('../pages/App/List/List'),
    }
];

export default routes;
