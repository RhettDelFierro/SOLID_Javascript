import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {PaintJsClient, SuperInvestorClient} from './paint-data-client'

/**
 * Here, we are DECLARATIVELY creating the client, passing it into the Application (and the client could be anything).
 * We are making that high-level policy decision very early on so that this client can now be passed through.
 *
 * The additional benefit that is in our tests:
 * We can create different test clients and pass that into App and other modules and be able to see the kind
 * of test behavior that we expect.
 *
 * Deceptively simple, yet the Dependency Inversion Principle is terrific.
 * When you're able to:
 * 1. Declaratively state what these low-level implementation details are.
 * 2. Separate them out from your high-level policy.
 * 3. Pass them and cascade them through the system so that your policy then can use them without having intimate knowledge.
 * You end up decoupling your system very effectively:
 * 1. You decouple the implementation from the tests.
 * 2. You decouple high-level policy from low level implementation details.
 * 3. You have the ability to be flexible exactly when  you need it.
 *
 * @type {SuperInvestorClient}
 */
const client = new SuperInvestorClient()

ReactDOM.render(<App client={client}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
