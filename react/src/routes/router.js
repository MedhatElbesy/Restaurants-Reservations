import { lazy } from "react";
import { Navigate } from "react-router-dom";
import React from 'react';

/****Layouts*****/
// const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/

// const Starter = lazy(() => import("../views/Starter.js"));
const Main = lazy(() => import("../components/AdminDashboard/main"));
const About = lazy(() => import("../components/AdminDashboard/About"));
// const Alerts = lazy(() => import("../views/ui/Alerts"));
// const Badges = lazy(() => import("../views/ui/Badges"));
// const Buttons = lazy(() => import("../views/ui/Buttons"));
// const Cards = lazy(() => import("../views/ui/Cards"));
// const Grid = lazy(() => import("../views/ui/Grid"));
// const Tables = lazy(() => import("../views/ui/Tables"));
// const Forms = lazy(() => import("../views/ui/Forms"));
// const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));

/*****Routes******/

const ThemeRoutes = [
    {
      path: "/",
      // element: React.createElement(FullLayout),
      children: [
        { path: "/", element: React.createElement(Navigate, { to: "/main" }) },
        { path: "/main", exact: true, element: React.createElement(Main) },
        { path: "/about", exact: true, element: React.createElement(About) },
        // Other routes similarly converted
      ],
    },
  ];

  
export default ThemeRoutes;
