import React, { useState, useRef } from 'react';
import { Grid, Button, Modal, Form, Icon, Message } from 'semantic-ui-react';
import { Route, withRouter, Redirect, Link } from 'react-router-dom';
import IncidentForm from './IncidentForm';
import IncidentApi from './Api';
import useAsync from '../common/hoc/useAsync';

const MsgTxt = 'Incident created successfully';
const Header = ({ history, location, match, reloadTable }) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccessMsg, setShowSuccessMsg] = useState(false);
  const FormRef = useRef(null);
  const { fetch, loading, data, reset, error } = useAsync();
  const closePopup = () => {
    setShowPopup(false);
  };

  const formValues = (values) => {
    console.log(values);
    fetch(
      IncidentApi.createIncident(values).then((res) => {
        console.log('create   ', res, location, match);
        setShowSuccessMsg(true);

        setTimeout(() => {
          setShowSuccessMsg(false);
          closePopup();
        }, 3000);

        reloadTable(true);
        // history.push('/incident');
      }),
    );
  };

  const logout = () => {
    sessionStorage.clear();
    history.push('/login');
  };
  return (
    <Grid
      style={{
        borderBottom: '2px solid #e0e1e2',
      }}
    >
      <Grid.Row textAlign="left" verticalAlign="middle">
        <Grid.Column width={12}>
          <h4>Welcome to Incident Management </h4>
        </Grid.Column>
        <Grid.Column floated="right" width={3}>
          <Button
            primary
            floated="right"
            compact
            title="Create Incident"
            onClick={() => setShowPopup(true)}
          >
            Create Incident
          </Button>
        </Grid.Column>
        <Grid.Column floated="right" width={1}>
          <Icon
            color="red"
            style={{
              cursor: 'pointer',
            }}
            title="Logout"
            name="sign-out"
            size="large"
            onClick={logout}
          />
        </Grid.Column>
      </Grid.Row>

      {showPopup && (
        <Modal
          onClose={() => setShowPopup(false)}
          open={showPopup}
          dimmer="blurring"
        >
          <Modal.Header>Add Incident</Modal.Header>
          <Modal.Content>
            {showSuccessMsg && <Message success content={MsgTxt} />}
            <IncidentForm
              ref={FormRef}
              formValues={formValues}
              closePopup={closePopup}
              loading={loading}
              error={error}
            />
          </Modal.Content>
        </Modal>
      )}
    </Grid>
  );
};

export default withRouter(Header);
