export default ({css}) => {
  css('.login', {
    position: 'absolute',
    top: '50%',
    width: '100%',
  })

  css('.login input', {
    marginLeft: 'auto',
    marginRight: 'auto',
    display: 'block',
    borderRadius: '35px',
    border: '1px solid #d2d2d2',
    padding: '0 20px',
    lineHeight: '30px',
    marginTop: '-15px',
  })
}
