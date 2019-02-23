import React from 'react';
import ReactDOM from 'react-dom';
import AppContent from './AppContent';

import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';


Enzyme.configure({ adapter: new Adapter() });


it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<AppContent />, div);
    ReactDOM.unmountComponentAtNode(div);
  });


it('displays the correct heading', () => {
    const appContent = shallow(<AppContent/>);
    const expectedH1 = <h1>Hello, Huntly</h1>;

    expect(appContent.contains(expectedH1)).toEqual(true);

})
