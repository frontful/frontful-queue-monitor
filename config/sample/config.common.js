module.exports = {
  browser: {},
  common: {
    queueUrl: 'http://localhost:7010',
    utcOffset: 0,
    xml: true,
    tags: [
      {
        name: 'tag01',
        title: 'Foobar id tag',
      },
      {
        name: 'tag02',
        title: 'Foo id tag',
      },
      {
        name: 'tag03',
        title: 'Bar id tag',
      }
    ],
    content: {
      sample_job_foobar: {
        name: 'FooBar job',
        task: {
          sample_task_foo: 'Foo task',
          sample_task_bar: 'Bar task',
        }
      },
    },
  },
  server: {},
}
