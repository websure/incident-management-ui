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
  Message,
  Confirm,
  Segment,
} from 'semantic-ui-react';
import { Route, withRouter, Redirect } from 'react-router-dom';
import {
  Form,
  Input,
  Dropdown,
  TextArea,
} from 'semantic-ui-react-form-validator';

import useAsync from '../common/hoc/useAsync';
import UserApi from './Api';

const Login = ({ history }) => {
  const [formDetails, setFormDetails] = useState({ userid: '', password: '' });

  const { fetch, loading, data, reset, error } = useAsync();

  const submit = () => {

    fetch(UserApi.login(formDetails))
  };

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      sessionStorage.setItem('currentUser', JSON.stringify(data))
      sessionStorage.setItem('token', data.token)
      history.push('/incident')
    }
  }, [data])

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
            <Form onSubmit={submit} width="100%">
              <Input
                fluid
                label="User Name"
                placeholder="User Name"
                value={formDetails.userid}
                name="userid"
                onChange={(e, val) => handleChange(val)}
                validators={['required']}
                errorMessages={['User Name is required']}
                autoComplete="off"
              />

              <Input
                fluid
                label="Password"
                placeholder="Password"
                value={formDetails.password}
                name="password"
                onChange={(e, val) => handleChange(val)}
                validators={['required']}
                errorMessages={['Password is required']}
                type="password"
                autoComplete="off"
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
            {/* <Form onSubmit={submit}>
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
            </Form> */}
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default withRouter(Login);
