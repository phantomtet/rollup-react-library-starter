import { Meta, StoryFn } from '@storybook/react';
import { useCallback, useState } from 'react';
import { AsyncSelect, I_SearchParams } from '.';
import { Form } from 'antd';
import React from 'react';
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'ReactComponentLibrary/AsyncSelect',
  component: AsyncSelect,
} as Meta<typeof AsyncSelect>;

const getOptions = async (args?: I_SearchParams) =>
  (
    await fetch(
      'https://65ebf7df43ce16418934648c.mockapi.io/users' +
        `?search=${args?.search || ''}`,
    )
  )
    .json()
    .then((res) => res.map((i: any) => ({ label: i.name, value: i.id })));
// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: StoryFn<typeof AsyncSelect> = (args) => {
  const [state, setState] = useState(0);
  const [form] = Form.useForm();
  const userId = Form.useWatch('userId', form);
  const getInitialOptions = useCallback(
    async () =>
      userId &&
      (
        await fetch(
          `https://65ebf7df43ce16418934648c.mockapi.io/users/${userId}`,
        )
      )
        .json()
        .then((res) => [{ label: res.name, value: res.id }]),
    [userId],
  );
  console.log(userId);
  return (
    <Form form={form}>
      <button
        // onClick={() => form.setFieldValue('userId', (+userId + 1).toString())}
        onClick={() => setState(state + 1)}
      >
        {state}
      </button>
      <Form.Item name="userId" initialValue={['1', '2']}>
        <AsyncSelect
          mode="multiple"
          getOptions={getOptions}
          getInitialOptions={getOptions}
        />
      </Form.Item>
    </Form>
  );
};

export const HelloWorld = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
