import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import './index.css';
import ChatApp from './components/ChatApp';

ReactDOM.render(<ChatApp />, document.getElementById('root'));
registerServiceWorker();
