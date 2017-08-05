export default ({css}) => {
  css('.jobs', {
    borderCollapse: 'collapse',
    boxShadow: `
      0 1px 1px rgba(0, 0, 0, 0.2),
      0 8px 0 -3px #f6f6f6,
      0 9px 1px -3px rgba(0, 0, 0, 0.2),
      0 16px 0 -6px #f6f6f6,
      0 17px 2px -6px rgba(0, 0, 0, 0.2),
      0 2px 4px 0 rgba(0, 0, 0, 0.2),
      0 10px 50px 0 rgba(0, 0, 0, 0.1)
    `,
    backgroundColor: 'white',
    width: '100%',
  })

  css('.jobs thead td', {
    padding: '5px 7px',
    backgroundColor: '#f6f6f6',
  })
}
