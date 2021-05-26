import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import moment from 'moment';
import { Grid, Segment, Container, Icon } from 'semantic-ui-react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import useAsync from '../common/hoc/useAsync';
import ErrorBoundary, { ERROR_TYPES } from '../common/ErrorBoundary';
import IncidentApi from './Api';
import PageLayout from '../layout/PageLayout';
import Loader from '../common/Loader';

const IncidentDetails = (props) => {
  const { history, location, match } = props;
  const { fetch, loading, data, reset, error } = useAsync();

  const FormRef = useRef(null);
  // console.log('details page  ', props);
  const [activity, setActivity] = useState([]);
  console.log('details page ', match);

  useEffect(() => {
    const { id } = match?.params;
    if (id) {
      fetch(IncidentApi.getIncidentDetails(id));
    }
  }, [match?.params?.id]);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      console.log('response details', data);
      const {
        incident_assignee: assigneeActivity,
        incident_status: statusActivity,
      } = data.activity;
      const activityArr = [
        ...assigneeActivity.map((v) => ({
          ...v,
          formattedTimestamp: moment(v.timestamp).format('DD-MM-YYYY HH:MM:SS'),
          msg: `Incident assigned ${v.from && 'from'} ${v.from} to ${v.to} `,
        })),
        ...statusActivity.map((v) => ({
          ...v,
          formattedTimestamp: moment(v.timestamp).format('DD-MM-YYYY HH:MM:SS'),
          msg: `Incident status updated ${v.from && 'from'} ${v.from} to ${v.to
            } `,
        })),
      ].sort((a, b) => {
        if (a.formattedTimestamp > b.formattedTimestamp) return -1;
        if (a.formattedTimestamp < b.formattedTimestamp) return 1;
        return 0;
      });
      console.log('data ', activityArr);
      setActivity(activityArr);
    }
    if (error) {
      console.log('error ', error);
    }
  }, [data, error]);

  const formValues = (values) => {
    console.log(values);
  };
  const deleteIncident = () => {
    console.log(data.id);
  };

  // style={{ flexDirection: 'column' }}

  const showActivities = activity.map((act, i) => (
    <>
      <Segment key={`a_${act.timestamp}`} style={{ margin: 0 }}>
        <p>
          {act.formattedTimestamp} - {act.msg} on
        </p>
      </Segment>
      {i !== activity.length - 1 && (
        <Icon
          name="long arrow alternate down"
          color="blue"
          style={{
            left: '50%',
            position: 'relative',
          }}
        />
      )}
    </>
  ));

  return (
    <PageLayout>
      <Grid padded data-id="detailsPage">
        <Grid.Row columns={2}>
          <Grid.Column largeScreen={10} computer={10} mobile={16}>
            <h4>Incident Details</h4>
            <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
              {data && (
                <IncidentForm
                  ref={FormRef}
                  formValues={formValues}
                  incidentDetails={data}
                  deleteIncident={deleteIncident}
                />
              )}
            </ErrorBoundary>
          </Grid.Column>
          <Grid.Column largeScreen={6} computer={6} mobile={16}>
            <h4>Incident Activity</h4>
            <ErrorBoundary type={ERROR_TYPES.APP_LEVEL}>
              <Segment
                style={{
                  maxHeight: window.innerHeight - 100,
                  overflow: 'auto',
                }}
              >
                {activity.length > 0 && <Container>{showActivities}</Container>}
              </Segment>
            </ErrorBoundary>
          </Grid.Column>
        </Grid.Row>
        {loading && <Loader />}
        {error && <span>Error in fetching Incident Details</span>}
      </Grid>
    </PageLayout>
  );
};

export default withRouter(IncidentDetails);
