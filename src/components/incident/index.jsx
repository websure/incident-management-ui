import React, { useEffect, useRef } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import Header from './Header';
import PageLayout from '../layout/PageLayout';
import IncidentTable from './IncidentTable';

const Incident = (props) => {
  const { history } = props;
  return (
    <PageLayout>
      <IncidentTable {...props} />
    </PageLayout>
  );
};

export default withRouter(Incident);
