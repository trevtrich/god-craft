import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {screen} from '@testing-library/dom';
import HomePage from './index';

afterEach(cleanup);

test('that the homepage renders', () => {
  render(<HomePage allPosts={[]} />);
  screen.getByText(/welcome to god-craft/i);
});
