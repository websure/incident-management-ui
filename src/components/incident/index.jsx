import React, { useEffect, useRef } from 'react';
import { Grid } from 'semantic-ui-react';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import Header from './Header';
import PageLayout from '../layout/PageLayout';
import IncidentTable from './IncidentTable';

const Incident = (props) => {
  console.log('home ', props);
  const { history } = props;
  return (
    <PageLayout>
      <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
        <IncidentTable />
      </ErrorBoundary>
      <Link to="/incident/60ab34635795305cb0de1d6d">details</Link>
    </PageLayout>
    // <Grid padded data-id="homePage">
    //   <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
    //     <Header />
    //   </ErrorBoundary>
    //   <Grid.Row>

    //   </Grid.Row>

    // </Grid>
  );
};

export default withRouter(Incident);
