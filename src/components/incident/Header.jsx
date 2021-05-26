import React, { useState, useRef } from 'react';
import { Grid, Button, Modal, Form } from 'semantic-ui-react';
import IncidentForm from './IncidentForm';

const Header = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const FormRef = useRef(null);
  const closePopup = () => {
    setShowPopup(false);
  };

  const formValues = (values) => {
    console.log(values);
    closePopup();
  };

  return (
    <Grid
      style={{
        borderBottom: '2px solid #e0e1e2',
      }}
    >
      <Grid.Row textAlign="left" verticalAlign="middle">
        <Grid.Column width={10}>
          <h4>Welcome to Incident Management </h4>
        </Grid.Column>
        <Grid.Column floated="right" width={4}>
          <Button
            primary
            floated="right"
            title="Create Incident"
            onClick={() => setShowPopup(true)}
          >
            Create Incident
          </Button>
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
            <IncidentForm
              ref={FormRef}
              formValues={formValues}
              closePopup={closePopup}
            />
          </Modal.Content>
        </Modal>
      )}
    </Grid>
  );
};

export default Header;
