import React, { useEffect, useRef } from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';

const PageRoute = (props) => {
  const { children, ...rest } = props;

  const auth = false;
  console.log(props);
  return (
    <Route
      exact
      {...rest}
      render={() =>
        auth ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
            }}
          />
        )
      }
    />
  );
};

export default PageRoute;
