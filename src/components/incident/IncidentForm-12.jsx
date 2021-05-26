import React, {
  useEffect,
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react';
import {
  Grid,
  Button,
  Modal,
  Form,
  Dropdown,
  Message,
} from 'semantic-ui-react';
import {
  FORM_MODE,
  STATUS_OPTIONS,
  USERS,
  ACKNOWLEDGE,
  INCIDENT_TYPE,
} from './constants.js';

const IncidentForm = forwardRef(({ incidentId, closePopup }, ref) => {
  const FormRef = useRef(null);
  const DefaultFormStates = {
    title: '',
    description: '',
    status: STATUS_OPTIONS.ANALYSIS,
    assignee: '',
    createdBy: '',
    acknowledge: false,
    type: '',
  };

  /* states */
  const [formMode, setFormMode] = useState(
    incidentId ? FORM_MODE.EDIT : FORM_MODE.NEW,
  );

  const [isFormValid, setIsFormValid] = useState(false);
  const [formDetails, setFormDetails] = useState(DefaultFormStates);

  /* form states */
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState(STATUS_OPTIONS.ANALYSIS);
  const [assignee, setAssignee] = useState('');
  const [createdBy, setCreatedBy] = useState('');
  const [acknowledge, setAcknowledge] = useState(ACKNOWLEDGE.FALSE);
  const [type, setType] = useState('');

  const StatusOptions = Object.values(STATUS_OPTIONS).map((v) => ({
    key: v,
    text: v.toUpperCase(),
    value: v,
  }));

  const AssigneeOptions = USERS.map(({ userid }) => ({
    key: userid,
    text: userid.toUpperCase(),
    value: userid,
  }));

  const IncidentTypeOptions = Object.values(INCIDENT_TYPE).map((v) => ({
    key: v,
    text: v.toUpperCase(),
    value: v,
  }));

  useEffect(() => {
    if (incidentId) {
      // call api to fetch details - EDIT mode
    }
  }, [incidentId]);

  const handleAckChange = (e, { value }) => setAcknowledge(value);

  const getStates = {
    title,
    description,
    status,
    assignee,
    created_by: createdBy,
    acknowledge,
    type,
  };

  useImperativeHandle(ref, () => ({
    incidentValues: getStates,
  }));

  const onSubmit = () => {
    console.log(getStates);
  };

  const handleChange = (e) => {
    // error && reset()
    setFormDetails({
      ...formDetails,
      [e.target.name]: e.target.value,
    });
    console.log('handleChange');
    setIsFormValid(FormRef.current.checkValidity());
  };

  return (
    <form ref={FormRef} noValidate onSubmit={onSubmit}>
      <Form
        // error
        // success
        onSubmit={onSubmit}
      >
        <Message success content="Incident submitted Successfully" />
        <Message
          error
          header="Error in Incident Creation"
          content="Please try again"
        />
        <Form.Select
          required
          fluid
          label="Incident Type"
          selection
          value={type}
          options={IncidentTypeOptions}
          name="type"
          onChange={handleChange}
        // onChange={(e, { value }) => setType(value)}
        />
        <Form.Input
          required
          fluid
          label="Incident Title"
          placeholder="Title"
          value={title}
          name="title"
          onChange={handleChange}
          // onChange={(e) => setTitle(e.target.value)}
          autoComplete="off"
        />
        <Form.TextArea
          label="Description"
          placeholder="Add Description"
          value={description}
          name="description"
          onChange={handleChange}
          // onChange={(e) => setDescription(e.target.value)}
          autoComplete="off"
        />
        <Form.Select
          fluid
          label="Status"
          selection
          value={status}
          readOnly={formMode === FORM_MODE.NEW}
          defaultValue={STATUS_OPTIONS.ANALYSIS}
          options={StatusOptions}
          name="status"
          onChange={handleChange}
        // onChange={(e, { value }) => setStatus(value)}
        />
        <Form.Select
          fluid
          label="Assignee"
          value={assignee}
          selection
          options={AssigneeOptions}
          name="assignee"
          onChange={handleChange}
        // onChange={(e, { value }) => setAssignee(value)}
        />
        <Form.Input
          fluid
          readOnly
          label="Created By"
          name="created_by"
          onChange={handleChange}
          value={createdBy}
        />
        <Form.Group inline>
          <Form.Field>Acknowledge</Form.Field>
          <Form.Radio
            id="ack"
            label="True"
            value
            checked={acknowledge}
            name="acknowledge"
            onChange={handleChange}
          // onChange={handleAckChange}
          />
          <Form.Radio
            label="False"
            value={false}
            checked={!acknowledge}
            name="acknowledge"
            onChange={handleChange}
          // onChange={handleAckChange}
          />
        </Form.Group>
        <Button
          primary={isFormValid}
          floated="right"
          title="Add Incident"
          type="submit"
          disabled={isFormValid}
        // onClick={createIncident}
        >
          Add Incident
        </Button>
        <Button floated="right" title="Cancel" onClick={closePopup}>
          Cancel
        </Button>
      </Form>
    </form>
  );
});

export default IncidentForm;

// return (
//   <form ref={FormRef} noValidate onSubmit={onSubmit}>
//     <Form
//       // error
//       // success
//       onSubmit={onSubmit}
//     >
//       <Message success content="Incident submitted Successfully" />
//       <Message
//         error
//         header="Error in Incident Creation"
//         content="Please try again"
//       />
//       <Form.Select
//         required
//         fluid
//         label="Incident Type"
//         selection
//         value={type}
//         options={IncidentTypeOptions}
//         name="type"
//         onChange={handleChange}
//       // onChange={(e, { value }) => setType(value)}
//       />
//       <Form.Input
//         required
//         fluid
//         label="Incident Title"
//         placeholder="Title"
//         value={title}
//         name="title"
//         onChange={handleChange}
//         // onChange={(e) => setTitle(e.target.value)}
//         autoComplete="off"
//       />
//       <Form.TextArea
//         label="Description"
//         placeholder="Add Description"
//         value={description}
//         name="description"
//         onChange={handleChange}
//         // onChange={(e) => setDescription(e.target.value)}
//         autoComplete="off"
//       />
//       <Form.Select
//         fluid
//         label="Status"
//         selection
//         value={status}
//         readOnly={formMode === FORM_MODE.NEW}
//         defaultValue={STATUS_OPTIONS.ANALYSIS}
//         options={StatusOptions}
//         name="status"
//         onChange={handleChange}
//       // onChange={(e, { value }) => setStatus(value)}
//       />
//       <Form.Select
//         fluid
//         label="Assignee"
//         value={assignee}
//         selection
//         options={AssigneeOptions}
//         name="assignee"
//         onChange={handleChange}
//       // onChange={(e, { value }) => setAssignee(value)}
//       />
//       <Form.Input
//         fluid
//         readOnly
//         label="Created By"
//         name="created_by"
//         onChange={handleChange}
//         value={createdBy}
//       />
//       <Form.Group inline>
//         <Form.Field>Acknowledge</Form.Field>
//         <Form.Radio
//           id="ack"
//           label="True"
//           value
//           checked={acknowledge}
//           name="acknowledge"
//           onChange={handleChange}
//         // onChange={handleAckChange}
//         />
//         <Form.Radio
//           label="False"
//           value={false}
//           checked={!acknowledge}
//           name="acknowledge"
//           onChange={handleChange}
//         // onChange={handleAckChange}
//         />
//       </Form.Group>
//       <Button
//         primary={isFormValid}
//         floated="right"
//         title="Add Incident"
//         type="submit"
//         disabled={isFormValid}
//       // onClick={createIncident}
//       >
//         Add Incident
//       </Button>
//       <Button floated="right" title="Cancel" onClick={closePopup}>
//         Cancel
//       </Button>
//     </Form>
//   </form>
// );
