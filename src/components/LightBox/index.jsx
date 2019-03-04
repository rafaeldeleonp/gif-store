import './style.scss';
import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '../Button';
import LinearProgress from '../LinearProgress';
import CloseSVG from '../../resources/svg/close.svg';
import LeftArrowSVG from '../../resources/svg/left-arrow.svg';
import PlaySVG from '../../resources/svg/play.svg';
import PauseSVG from '../../resources/svg/pause.svg';
import RightArrowSVG from '../../resources/svg/right-arrow.svg';

const ESCAPE = 'Escape';
const DURATION = '3000';

function LighBox(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  const [isHover, setImageHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [loaded, setImageLoaded] = useState(false);
  const currentSlide = props.slides.length > 0 ? props.slides[currentIndex] : undefined;
  const isLeftArrowDisabled = currentIndex === 0;
  const isRightArrowDisabled = currentIndex === props.slides.length - 1;
  const cls = classnames('lightbox-dialog', {
    'back-drop': props.show,
    'is-hovering': isHover,
  });

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
  })

  useEffect(() => {
    setCurrentIndex(props.index);
  }, [props.index]);

  useEffect(() => {
    if (isPlaying) {
      const timeout = setTimeout(() => {
        setImageLoaded(false);
        setCurrentIndex((currentIndex + 1) % props.slides.length);
      }, DURATION);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, isPlaying])

  const removeListener = () => {
    window.removeEventListener('keyup', handleKeyUp);
  }

  const handleKeyUp = (e) => {
    const {onClose} = props;

    if (e.code === ESCAPE || e.keyCode === 27) {
      e.preventDefault();
      onClose();
      removeListener();
    }
  }

  const handleImageLoad = () => {
    setImageLoaded(true);
  }

  const handleMouseEnter = () => {
    setImageHover(true);
  }

  const handleMouseLeave = () => {
    setImageHover(false);
  }

  const handlePreviousSlide = () => {
    setCurrentIndex((currentIndex - 1) % props.slides.length);
    setImageLoaded(false);
  }

  const handlePause = () => {
    setIsPlaying(false);
  }

  const handlePlay = () => {
    setIsPlaying(true);
  }

  const handleNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % props.slides.length);
    setImageLoaded(false);
  }

  return (
    <Grid
      className={cls}
      container
      style={{
        transform: props.show ? 'translateY(0vh)' : 'translateY(-100vh)',
        opacity: props.show ? '1' : '0'
      }}
    >
      <Grid className="lightbox-content" container >
        <Button className="close-btn" onClick={props.onClose}>
          <SVG src={CloseSVG} />
        </Button>
        <LinearProgress loading={!loaded} />
        {currentSlide &&
          <Grid container>
            {currentSlide.displayName &&
              <Grid className="lightbox-display-name-container" container>
                <Typography className="lightbox-display-name">
                  {currentSlide.displayName}
                </Typography>
              </Grid>
            }
            <img
              className="lightbox-img"
              src={currentSlide.url}
              alt="Lightbox img"
              onLoad={handleImageLoad}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            />
            <Grid className="lightbox-info-container" container alignItems="center">
              <Typography className="lightbox-title" variant="body1">
                {currentSlide.title}
              </Typography>
              <Typography className="lightbox-counter" variant="body2">
                {`image ${currentIndex + 1} of ${props.slides.length}`}
              </Typography>
            </Grid>
            <Grid className="lightbox-actions">
              <Button
                className="btn-action"
                disabled={isLeftArrowDisabled}
                onClick={handlePreviousSlide}
              >
                <SVG src={LeftArrowSVG} />
              </Button>
              {isPlaying ? (
                <Button
                  className="btn-action"
                  onClick={handlePause}
                >
                  <SVG src={PauseSVG} />
                </Button>
              ) : (
                  <Button
                    className="btn-action"
                    onClick={handlePlay}
                  >
                    <SVG src={PlaySVG} />
                  </Button>
                )}
              <Button
                className="btn-action"
                disabled={isRightArrowDisabled}
                onClick={handleNextSlide}
              >
                <SVG src={RightArrowSVG} />
              </Button>
            </Grid>
          </Grid>
        }
      </Grid>
    </Grid>
  )
}

LighBox.propTypes = {
  show: PropTypes.bool,
  index: PropTypes.number,
  slides: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      url: PropTypes.string,
      displayName: PropTypes.string,
    })
  ),
  onClose: PropTypes.func.isRequired,
}

LighBox.defaultProps = {
  show: false,
  index: 0,
}

export default memo(LighBox);