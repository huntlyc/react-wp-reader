import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App';

import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });



it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders the correct header', () =>{
    const app = shallow(<App/>);
    const expectedH1 = <h1>WP API test</h1>;

    expect(app.contains(expectedH1)).toEqual(true);
});

