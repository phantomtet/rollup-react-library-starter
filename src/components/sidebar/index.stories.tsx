import { Meta, StoryFn } from '@storybook/react';
import React from 'react';
import { Sidebar } from '.';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ReactComponentLibrary/Sidebar',
  component: Sidebar,
} as Meta<typeof Sidebar>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof Sidebar> = (args) => <Sidebar {...args} />;

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
HelloWorld.args = {
  routers: [
    { key: '/hello', label: 'a' },
    { key: '/hello1', label: 'ab' },
  ],
};
