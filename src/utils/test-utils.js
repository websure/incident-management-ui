import React, { FC, ReactElement } from 'react';
import { render as rtlrender } from '@testing-library/react';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';
import { Router, Route, withRouter } from 'react-router-dom';
import StoreProvider from '../store/AppStore';
import IncidentApi from '../components/incident/Api.jsx';
import {
  IncidentDetailsMockResp,
  getIncidentListMockResp,
  deleteIncidentMockResp,
  updateIncidentMockResp,
  createIncidentMockResp,
} from '../components/incident/__mocks__/Api';

// jest.retryTimes(3);
const history = createMemoryHistory({ initialEntries: ['/incident/1234'] });
// mocking user
const user = {
  isadmin: true,
  password: 'admin',
  token: 'df34e.ffrh.mh7u8',
  userid: 'admin',
};
sessionStorage.setItem('currentUser', JSON.stringify(user));
sessionStorage.setItem('token', user.token);

// jest.spyOn(IncidentApi, 'getIncidentDetails').mockImplementation(() => {
//   console.log('---mock details called -- ');
//   return Promise.resolve(IncidentDetailsMockResp);
// });
// jest
//   .spyOn(IncidentApi, 'getIncidentList')
//   .mockImplementation(() => IncidentDetailsMockResp);
// jest
//   .spyOn(IncidentApi, 'deleteIncident')
//   .mockImplementation(() => deleteIncidentMockResp);
// jest
//   .spyOn(IncidentApi, 'updateIncident')
//   .mockImplementation(() => updateIncidentMockResp);
// jest
//   .spyOn(IncidentApi, 'createIncident')
//   .mockImplementation(() => createIncidentMockResp);

// function render(ui, options) {
//   function Wrapper(props) {
//     return <StoreProvider {...props} />;
//   }

//   const RouteWrapper = (
//     <Router history={history}>
//       <Route path="/incident/:id" component={ui} />
//     </Router>
//   );

//   return rtlrender(withRouter(RouteWrapper), { wrapper: Wrapper, ...options });
// }

// const render = (
//   ui,
//   {
//     path = '/',
//     route = '/',
//     // history = createMemoryHistory({ initialEntries: [route] }),
//   } = {},
// ) => ({
//   ...rtlrender(
//     <Router history={history}>
//       <Route path="/incident/:id" component={ui} />
//     </Router>,
//   ),
// });

// export { render };

const AllTheProviders = ({ children, ...rest }) => (
  <StoreProvider>
    <Router history={history} {...rest}>
      <Route path="/incident/:id">{children}</Route>
    </Router>
  </StoreProvider>
);

const customRender = (
  ui,
  options,
  // options?: Omit<RenderOptions, 'queries'>,
) =>
  // const RouteWrapper = <Router history={history}>{ui}</Router>;

  rtlrender(ui, { wrapper: AllTheProviders, ...options });

export * from '@testing-library/react';

export { customRender as render };
