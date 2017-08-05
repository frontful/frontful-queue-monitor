module.exports = {
  browser: {},
  common: {
    api: `http://${process.env.HOST || 'localhost'}:7010/api`,
    utcOffset: 60 * 3,
    content: {
      sample_job_foobar: {
        name: 'Foobar',
        task: {
          sample_task_foo: 'Foo',
          sample_task_bar: 'Bar',
        }
      },
    },
  },
  server: {},
}
