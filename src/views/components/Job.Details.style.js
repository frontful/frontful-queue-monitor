export default ({css}) => {
  css('.job_details', {
    borderCollapse: 'collapse',
    backgroundColor: 'white',
    width: '100%',
  })

  css('.job_details thead td', {
    padding: '5px 7px',
    backgroundColor: '#f6f6f6',
  })

  css('.job', {
    backgroundColor: '#f7f7f7',
  })

  css('.is_editable_toggle', {
    fontWeight: '400',
  })

  css('.is_editable_toggle:hover', {
    textDecoration: 'underline',
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

  css('.details', {
    padding: '0 !important',
    height: 'auto',
  })

  css('.tabs', {
    paddingLeft: '28px !important',
    lineHeight: '22px',
  })

  css('.tab', {
    display: 'inline-block',
    border: '1px solid #dadada',
    borderBottom: 'none',
    marginRight: '3px',
    backgroundColor: '#fafafa',
    position: 'relative',
    top: '1px',
    padding: '0 5px',
    boxSizing: 'border-box',
    cursor: 'pointer',
  })

  css('.tab.active', {
    backgroundColor: 'white',
    zIndex: '1',
  })

  css('.button', {
    display: 'inline-block',
    marginLeft: '10px',
    cursor: 'pointer',
  })

  css('.button:hover', {
    textDecoration: 'underline',
  })

  css('.editor', {
  })

  css('.editor {.cm-s-default .cm-tag}', {
    opacity: '0.5'
  })

  css('.viewer', {
    fontSize: '12px',
  })

  css('.status_details', {
    color: '#D4421E',
    padding: '2px 5px 2px 30px',
    font: 'inherit',
    margin: '5px 0',
  })
}
