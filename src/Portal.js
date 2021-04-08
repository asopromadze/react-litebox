import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const modalRoot = document.body.appendChild(document.createElement('div'))
const Portal = ({ children }) => {
  const elRef = useRef(null)
  if (!elRef.current) {
    elRef.current = document.createElement('div')
  }

  useEffect(() => {
    modalRoot.appendChild(elRef.current)
    return () => modalRoot.removeChild(elRef.current)
  }, [])

  return createPortal(<div>{children}</div>, elRef.current)
}

export default Portal
