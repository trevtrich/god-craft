import React from 'react';
import {cleanup, fireEvent, render} from '@testing-library/react';
import {getByRole, getByText, screen} from '@testing-library/dom';
import HomePage from './index';

afterEach(cleanup);

test('that the title is displayed as h1', () => {
  const {getByText} = render(<HomePage allPosts={[]} />);
  const titleHeading = getByText(/welcome to god-craft/i);

  expect(titleHeading.tagName).toEqual('H1');
});

test('that we call out the recent posts section', () => {
  const {getByText} = render(<HomePage allPosts={[]} />);
  const recentPostsHeading = getByText(/recent posts/i);

  expect(recentPostsHeading.tagName).toEqual('H2');
});

test('that each post is displayed in a list', () => {
  const post1Title = 'Title 1';
  const post1Date = '2016-01-01';
  const post2Title = 'Title 2';
  const post2Date = '2019-01-05';
  const posts = [{id: '1', title: post1Title, date: post1Date}, {id: '2', title: post2Title, date: post2Date}];

  const {getAllByRole} = render(<HomePage allPosts={posts} />);
  const postElements = getAllByRole('article');

  expect(postElements).toHaveLength(2);
  getByText(postElements[0], post1Title, {selector: 'a'});
  getByText(postElements[1], post2Title, {selector: 'a'});
  getByText(postElements[0], 'January 1, 2016', {selector: 'time'});
  getByText(postElements[1], 'January 5, 2019', {selector: 'time'});
});
