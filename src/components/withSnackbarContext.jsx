import React from "react";
import { SharedSnackbarConsumer } from "./SharedSnackbar.context";

/*
 * This is not currently used. Will use this in the future to create a HOC
 * to expose context.openSnackbar as a variable outside of the render function.
 * Currently having to render a new function for Delete Channel within chat to
 * get at the context.
 */

const withSnackbarContext = Component => {
  return props => (
    <SharedSnackbarConsumer>
      {context => <Component {...props} context={context} />}
    </SharedSnackbarConsumer>
  );
};

export default withSnackbarContext;
