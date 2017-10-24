export default ({css}) => {
  css('.job', {
    cursor: 'pointer',
  })

  css('.job:hover > tr', {
    backgroundColor: '#fafafa',
  })

  css('.job.active > tr', {
    backgroundColor: '#f7f7f7',
  })

  css('.job > tr > td', {
    verticalAlign: 'top',
    whiteSpace: 'nowrap',
    padding: '5px 7px',
  })

  css('.job > tr:first-child > td', {
    borderTop: '1px solid #dadada',
  })

  css('.job td:first-child', {
    paddingLeft: '5px',
    paddingRight: '0px',
  })

  css('.accent', {
    height: '16px',
    width: '16px',
    borderRadius: '10px',
  })

  css('.accent.success', {
    backgroundColor: '#73A937',
  })

  css('.accent.error', {
    backgroundColor: '#D4421E',
  })

  css('.accent.queued', {
    backgroundColor: '#F4D41D',
  })

  css('.accent.processing', {
    backgroundColor: '#2687C7',
    animation: 'pulse 1s 0s infinite',
  })

  css('@keyframes pulse', ({css}) => {
    css('0%', {
      transform: 'scale(1)'
    })
    css('50%', {
      transform: 'scale(.5)'
    })
  })
}
