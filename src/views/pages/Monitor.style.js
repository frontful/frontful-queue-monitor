export default ({css}) => {
  css('.monitor', {
  })

  css('.list_view', {
    backgroundColor: '#ffffff',
    height: '100%',
    minWidth: 'fit-content',
    width: '100%',
  })

  css('.details_view', {
    backgroundColor: '#ffffff',
    height: '100%',
    minWidth: 'fit-content',
  })

  css('.loading *', {
    cursor: 'wait !important',
  })
}
