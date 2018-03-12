import React from "react";
import Home from "./Home";
import CapturedImage from "./CapturedImage";

import {
  createRouter,
  NavigationProvider,
  StackNavigation,
  AndroidBackButtonBehavior
} from "@expo/ex-navigation";

const Router = createRouter(() => ({
  home: () => Home,
  image: () => CapturedImage
}));

export default class App extends React.Component {
  render() {
    return (
      <NavigationProvider router={Router}>
        <StackNavigation initialRoute={Router.getRoute("home")} />
      </NavigationProvider>
    );
  }
}
