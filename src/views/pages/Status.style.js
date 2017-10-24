export default ({css}) => {
  css('.status', {
    padding: '5px',
  })

  css('.status span', {
    marginRight: '10px',
  })

  css('.status button', {
    border: '1px solid silver',
    boxSizing: 'border-box',
    padding: '3px',
    lineHeight: '20px',
    backgroundColor: 'white',
    outline: 'none',
    minWidth: '100px',
    font: 'inherit',
  })
}
