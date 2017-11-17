export default ({css}) => {
  css('.filters', {
    backgroundColor: '#f6f6f6',
    border: '1px solid #d2d2d2',
    borderLeft: 'none',
    borderRight: 'none',
    borderTop: 'none',
    padding: '3px 0',
  })

  css('.filters button', {
    border: '1px solid #d2d2d2',
    backgroundColor: 'white',
    font: 'inherit',
    minWidth: '48%',
    cursor: 'pointer',
    outline: 'none',
    padding: '3px',
    borderRadius: '3px',
    userSelect: 'none',
  })

  css('.filters button:disabled', {
    opacity: '0.5',
  })

  css('.back', {
    float: 'left',
  })

  css('.forward', {
    float: 'right'
  })

  css('.filters ul', {
    paddingLeft: '0',
  })

  css('.filters > table', {
    float: 'left',
    marginRight: '10px',
    borderCollapse: 'collapse',
  })

  css('.filters > table td', {
    padding: '3px 5px',
  })

  css('.title', {
    textAlign: 'right'
  })

  css('.filters input, .filters select', {
    width: '150px',
    display: 'block',
    boxSizing: 'border-box',
    border: '1px solid #d2d2d2',
    borderRadius: '0',
    appearance: 'none',
    backgroundColor: 'white',
    lineHeight: '23px',
    padding: '3px',
    font: 'inherit',
    outline: 'none',
  })
}
