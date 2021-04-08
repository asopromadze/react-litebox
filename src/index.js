import React, { useState } from 'react'
import CloseSvg from './CloseSvg'
import NextSvg from './NextSvg'
import Portal from './Portal'
import PrevSvg from './PrevSvg'
import styles from './styles.module.css'

const Gallery = ({ images, thumbnailSize }) => {
  const [imageToShow, setImageToShow] = useState('')
  const [lightboxDisplay, setLightBoxDisplay] = useState(false)
  const [disablePrev, setDisablePrev] = useState(false)
  const [disableNext, setDisableNext] = useState(false)

  const imageSrc = images.map((el) => el.src)

  const showImage = (image) => {
    setImageToShow(image)
    setLightBoxDisplay(true)
    const currentIndex = imageSrc.indexOf(image)
    if (currentIndex === 0) {
      setDisablePrev(true)
    }
    if (currentIndex === imageSrc.length - 1) {
      setDisableNext(true)
    }
  }

  const hideLightBox = () => {
    setLightBoxDisplay(false)
    setImageToShow('')
    setDisablePrev(false)
    setDisableNext(false)
  }

  const showNext = () => {
    const currentIndex = imageSrc.indexOf(imageToShow)
    if (currentIndex < imageSrc.length - 1) {
      const nextImage = imageSrc[currentIndex + 1]
      setImageToShow(nextImage)
      setDisablePrev(false)
    }
    if (currentIndex === imageSrc.length - 2) {
      setDisableNext(true)
    }
  }

  const showPrev = () => {
    const currentIndex = imageSrc.indexOf(imageToShow)
    if (currentIndex > 0) {
      const nextImage = imageSrc[currentIndex - 1]
      setImageToShow(nextImage)
      setDisableNext(false)
    }
    if (currentIndex === 1) {
      setDisablePrev(true)
    }
  }

  function showButton(disable) {
    return disable ? { visibility: 'hidden' } : { visibility: 'visible' }
  }

  return (
    <div>
      <ul className={styles.gallery}>
        {images.map(({ src, alt }, i) => (
          <li key={i} onClick={() => showImage(src)}>
            <img
              src={src}
              alt={alt}
              style={{
                maxWidth: `${thumbnailSize.width}px`,
                maxHeight: `${thumbnailSize.height}px`
              }}
            />
          </li>
        ))}
      </ul>

      {lightboxDisplay ? (
        <Portal>
          <div className={styles.lightbox}>
            <div>
              <span className={styles.close} onClick={hideLightBox}>
                <CloseSvg />
              </span>
              <img className={styles.lightboxImg} src={imageToShow} alt='alt' />
              <div className={styles.imageCount}>
                <span>
                  {imageSrc.indexOf(imageToShow) + 1} of {imageSrc.length}
                </span>
              </div>
            </div>
            <span
              className={styles.prev}
              onClick={showPrev}
              style={showButton(disablePrev)}
            >
              <PrevSvg />
            </span>
            <span
              className={styles.next}
              onClick={showNext}
              style={showButton(disableNext)}
            >
              <NextSvg />
            </span>
          </div>
        </Portal>
      ) : null}
    </div>
  )
}

Gallery.defaultProps = {
  thumbnailSize: {
    width: 220,
    height: 212
  },
  images: []
}

export { Gallery }
