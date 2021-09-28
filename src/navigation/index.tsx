import React, { Suspense } from "react";
import { VscHome } from "react-icons/vsc";
import { Route, RouteProps, Switch } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";

import { FillLoader, SideBar } from "../components";
import PageNotFound from "../containers/PageNotFound";
import { PUBLIC_ROUTES } from "./routes";

interface RouteType extends RouteProps {
  component: any;
}

export type NavItem = {
  to: string;
  title: string;
  icon: React.ReactNode;
  subMenu?: Array<{ to: string; title: string }>;
};

const NAV_ITEMS: NavItem[] = [
  {
    to: `/`,
    title: "Home",
    icon: <VscHome size={16} color="white" className="sidebar-menu-icon" />,
  },
];

const PublicRoute = ({ component: Component, ...rest }: RouteType) => (
  <Route {...rest}>
    <Suspense fallback={<FillLoader color="black" />}>
      <Component {...rest} />
    </Suspense>
  </Route>
);

const Navigation = (): JSX.Element => (
  <Router>
    <Suspense fallback={<FillLoader />}>
      <Switch>
        <SideBar
          bg="gray.900"
          color="white"
          navItems={NAV_ITEMS}
          hoverColor="gray.800"
          accentColor="orange.600"
        >
          {PUBLIC_ROUTES.map((route) => {
            return <PublicRoute key={route.path} {...route} />;
          })}
        </SideBar>
        <Route render={PageNotFound} />
      </Switch>
    </Suspense>
  </Router>
);

export default Navigation;
