import React from 'react'
import renderer from 'react-test-renderer'
import Profile from '../Profile'
import Store from '../../Store'

test('Profile', () => {
  const tree = renderer.create(
    <Profile store={new Store()}/>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})