import { useState, useRef, useEffect, Children, useCallback } from 'react';
import ArrowBackIcon from '../Icons/ArrowBackIcon';
import ArrowNextIcon from '../Icons/ArrowNextIcon';
import styles from './Carousel.module.css';

const Carousel = (props) => {
  const {
    children,
    showArrows = true,
    showIndicator,
    autoPlay,
    swipeable,
  } = props;
  const parentRef = useRef(null);
  const count = Children.count(children) - 1;
  const [parentWidth, setParentWidth] = useState();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isGrabbing, setIsGrabbing] = useState(false);

  const handleCarouselWidth = useCallback(() => {
    if(parentRef && parentRef.current) {
      setParentWidth(parentRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleCarouselWidth, false);
    handleCarouselWidth();
    return () => {
      window.removeEventListener('resize', handleCarouselWidth, false);
    };
  }, [handleCarouselWidth]);

  useEffect(() => {
    let intervalId;
    if(autoPlay || (!showArrows && !showIndicator)) {
      intervalId = setInterval(() => {
        if(currentIndex < count) {
          setCurrentIndex(prevState => prevState + 1);
        } else {
          setCurrentIndex(0);
        }
      }, 4000);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [autoPlay, count, currentIndex, showArrows, showIndicator]);

  const handleMouseDown = useCallback((e) => {
    if(!swipeable) return;
    const { offsetX } = e.nativeEvent;
    const {
      // width: imageWidth,
      left,
    } = e.currentTarget.getBoundingClientRect();
    // const DRAG_THRESHOLD = imageWidth / 4;
    const DRAG_THRESHOLD = 200;
    setIsGrabbing(true);
    const handleMouseMove = e => {
      const moveX = e.clientX - left;
      const movement = offsetX - moveX;
      if(movement > DRAG_THRESHOLD){
        setCurrentIndex(prevState => {
          return prevState + 1 > count ? count : prevState + 1;
        });
        document.removeEventListener('mousemove', handleMouseMove, false);
      } else if(Math.abs(movement) > DRAG_THRESHOLD) {
        setCurrentIndex(prevState => {
          return prevState - 1 < 0 ? 0 : prevState - 1;
        });
        document.removeEventListener('mousemove', handleMouseMove, false);
      }
    }

    const handleMouseUp = () => {
      setIsGrabbing(false);
      document.removeEventListener('mouseup', handleMouseUp, false);
      document.removeEventListener('mousemove', handleMouseMove, false);

    }
    document.addEventListener('mousemove', handleMouseMove, false);
    document.addEventListener('mouseup', handleMouseUp, false);
  }, [count, swipeable]);

  const handleIndex = useCallback((isNext = false) => {
    if(isNext){
      setCurrentIndex(prevState => {
        return prevState + 1 > count ? 0 : prevState + 1;
      });
    } else {
      setCurrentIndex(prevState => {
        return prevState - 1 < 0 ? count : prevState - 1;
      });
    }
  }, [count]);
  
  return (
    <div className={styles.carouselRoot} ref={parentRef} onTouchStart={handleMouseDown} onMouseDown={handleMouseDown}>
      <div
        style={{
          transform: `translate3d(-${parentWidth * currentIndex}px, 0, 0)`,
        }}
        className={`${styles.carousel} ${isGrabbing && styles.carouselGrabbing}`}
      >
        {Children.map(children, child => (
          <div className={styles.carouselUnit}>
            {child}
          </div>
        ))}
      </div>
      {showArrows && <div className={styles.arrowLeft} onClick={() => handleIndex()}>
        <ArrowBackIcon color="gray" />
      </div>}
      {showArrows && <div className={styles.arrowRight} onClick={() => handleIndex(true)}>
        <ArrowNextIcon color="gray" />
      </div>}
      {showIndicator && <div className={styles.dots}>
        {Array(count + 1).fill(undefined).map((item, index) => {
          return (
            <div
              key={index}
              className={`${styles.dot} ${index === currentIndex && styles.dotCurrent}`}
              onClick={() => { setCurrentIndex(index); }}
            ></div>
          )
        })}
      </div>}
    </div>
  );
}

export default Carousel;
