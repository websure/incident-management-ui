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
  Message,
  Confirm,
  Segment,
} from 'semantic-ui-react';
import useAsync from '../common/hoc/useAsync';

const Login = () => {
  const [formDetails, setFormDetails] = useState({ userid: '', password: '' });

  const { fetch, loading, data, reset, error } = useAsync();

  const submit = () => {
    console.log(formDetails);
  };

  const handleChange = ({ name, value }) => {
    // error && reset()
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <Grid
      padded
      data-id="pagelayout"
      style={{
        top: '20%',
      }}
    >
      <Grid.Row>
        <Grid.Column width={10}>
          <h4>Welcome to Incident Management Dashboard </h4>
        </Grid.Column>
      </Grid.Row>

      <Grid.Row>
        <Grid.Column width={6} verticalAlign="middle">
          <Segment>
            {error && (
              <Message
                error
                content="Either User Name or Password is incorrect."
              />
            )}
            <Form onSubmit={submit}>
              <Form.Input
                fluid
                label="User Name"
                placeholder="User Name"
                name="userid"
                onChange={(e, val) => handleChange(val)}
              />
              <Form.Input
                fluid
                name="password"
                type="password"
                label="Password"
                onChange={(e, val) => handleChange(val)}
                placeholder="Password"
              />

              <Button
                type="submit"
                primary
                compact
                loading={loading}
                style={{
                  display: 'table',
                  marginRight: 'auto',
                  marginLeft: 'auto',
                }}
              >
                Login
              </Button>
            </Form>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default Login;
