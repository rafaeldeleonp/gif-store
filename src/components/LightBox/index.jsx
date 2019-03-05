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
import {numberWithCommas} from '../../utils';

const ESCAPE = 'Escape';
const SPACE = 'Space';
const ARROW_LEFT = 'ArrowLeft';
const ARROW_RIGHT = 'ArrowRight';
const DURATION = '3000';

const INITIAL_STATE = {
  currentIndex: 0,
  isHover: false,
  isPlaying: false,
  loaded: false,
}

function LighBox(props) {
  const [state, setLightBoxState] = useState(INITIAL_STATE);
  const currentSlide = props.slides.length > 0 ? props.slides[state.currentIndex] : undefined;
  const isLeftArrowDisabled = state.currentIndex === 0;
  const isRightArrowDisabled = state.currentIndex === props.slides.length - 1;
  const cls = classnames('lightbox-dialog', {
    'back-drop': props.show,
    'is-hovering': state.isHover,
  });

  useEffect(() => {
    window.addEventListener('keyup', handleKeyUp);
    return () => removeListener();
  });

  useEffect(() => {
    setLightBoxState({...state, currentIndex: props.index});
  }, [props.index]);

  useEffect(() => {
    if (state.isPlaying) {
      const timeout = setTimeout(() => {
        setLightBoxState({
          ...state,
          currentIndex: (state.currentIndex + 1) % props.slides.length,
          loaded: false
        });
      }, DURATION);

      return () => clearTimeout(timeout);
    }
  }, [state.currentIndex, state.isPlaying])

  const removeListener = () => {
    window.removeEventListener('keyup', handleKeyUp);
  }

  const handleKeyUp = (e) => {
    const {onClose} = props;
    e.preventDefault();

    if (e.code === ESCAPE || e.keyCode === 27) {
      onClose();
      removeListener();
    }

    if (e.code === SPACE || e.keyCode === 32) {
      if (state.isPlaying) handlePause();
      else handlePlay();
    }

    if (e.code === ARROW_LEFT || e.keyCode === 37) {
      handlePreviousSlide();
    }

    if (e.code === ARROW_RIGHT || e.keyCode === 39) {
      handleNextSlide();
    }
  }

  const handleImageLoad = () => {
    setLightBoxState({...state, loaded: true});
  }

  const handleMouseEnter = () => {
    setLightBoxState({...state, isHover: true});
  }

  const handleMouseLeave = () => {
    setLightBoxState({...state, isHover: false});
  }

  const handlePreviousSlide = () => {
    setLightBoxState({
      ...state,
      currentIndex: (state.currentIndex - 1) % props.slides.length,
      loaded: false,
    });
  }

  const handlePause = () => {
    setLightBoxState({...state, isPlaying: false});
  }

  const handlePlay = () => {
    setLightBoxState({...state, isPlaying: true});
  }

  const handleNextSlide = () => {
    setLightBoxState({
      ...state,
      currentIndex: (state.currentIndex + 1) % props.slides.length,
      loaded: false,
    });
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
        <LinearProgress loading={!state.loaded} />
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
                {`image ${state.currentIndex + 1} of ${numberWithCommas(props.totalCount)}`}
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
              {state.isPlaying ? (
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
  totalCount: PropTypes.number,
  onClose: PropTypes.func.isRequired,
}

LighBox.defaultProps = {
  show: false,
  index: 0,
  totalCount: 0,
}

export default memo(LighBox);