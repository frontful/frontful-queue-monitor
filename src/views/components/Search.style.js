export default ({css}) => {
  css('.search', {
    boxShadow: `inset 2px 6px 5px -5px rgba(0, 0, 0, 0.09)`,
    backgroundColor: '#f6f6f6',
    display: 'block',
    marginBottom: '15px',
    position: 'relative',
    padding: '0 30px',
    border: '1px solid #d2d2d2',
    borderRadius: '20px',
  })

  css('.search > input', {
    border: 'none',
    display: 'block',
    width: '100%',
    padding: '5px',
    boxSizing: 'border-box',
    textAlign: 'center',
    backgroundColor: 'transparent',
  })

  css('.prev, .next', {
    color: '#9c9c9c',
    position: 'absolute',
    lineHeight: '27px',
    cursor: 'pointer',
    fontSize: '12px',
  })

  css('.prev', {
    left: '10px',
  })

  css('.next', {
    right: '10px',
  })
}
