import React from 'react';
import ErrorBoundary, {
  ERROR_TYPES,
} from './components/common/ErrorBoundary.jsx';
// /import StoreProvider from './store/ContextManagement';
import Routes from './Routes';

function App() {
  return (
    <div className="App">
      <ErrorBoundary type={ERROR_TYPES.DEFAULT}>
        <Routes />
      </ErrorBoundary>
    </div>
  );
}

export default App;
