import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import {
  Grid,
  Button,
  Modal,
  Form as SemanticForm,
  Message,
} from 'semantic-ui-react';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import Header from '../incident/Header';

const PageLayout = ({ children, ...rest }) => {
  const childRef = useRef(null);

  const [reloadTable, setReloadTable] = useState(false);

  const newChildren = React.Children.map(children, (child) =>
    React.cloneElement(child, {
      reloadTable,
    }),
  );

  return (
    <Grid padded data-id="pagelayout">
      <Grid.Column width={16}>
        <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
          <Header reloadTable={setReloadTable} />
        </ErrorBoundary>
      </Grid.Column>
      <Grid.Column width={16} style={{ padding: '0px' }}>
        <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
          {newChildren}
        </ErrorBoundary>
      </Grid.Column>
    </Grid>
  );
};

export default withRouter(PageLayout);
