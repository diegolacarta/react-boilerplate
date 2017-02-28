import React from 'react'
import renderer from 'react-test-renderer'
import Root from '../Root'
import Store from '../../Store'

test('Root', () => {
  const tree = renderer.create(
    <Root store={new Store()}>Hi</Root>
  ).toJSON()
  expect(tree).toMatchSnapshot()
})