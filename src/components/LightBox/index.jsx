import './style.scss';
import React, {memo, useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import SVG from 'react-inlinesvg';
import classnames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '../Button';
import CloseSVG from '../../resources/svg/close.svg';
import LeftArrowSVG from '../../resources/svg/left-arrow.svg';
import PlaySVG from '../../resources/svg/play.svg';
import RightArrowSVG from '../../resources/svg/right-arrow.svg';

const ESCAPE = 'Escape';

function LighBox(props) {
  const [currentIndex, setCurrentIndex] = useState(props.index);
  const [isHover, setImageHover] = useState(false);
  const currentSlide = props.slides.length > 0 ? props.slides[currentIndex] : undefined;
  const isLeftArrowDisabled = currentIndex === 0;
  const showRightArrow = currentIndex === props.slides.length - 1;
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

  const handleMouseEnter = () => {
    setImageHover(true);
  }

  const handleMouseLeave = () => {
    setImageHover(false);
  }

  const handleBack = () => {
    setCurrentIndex(currentIndex - 1);
  }

  const handleForward = () => {
    setCurrentIndex(currentIndex + 1);
  }

  console.log("INDEX", currentIndex);

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
                onClick={handleBack}
              >
                <SVG src={LeftArrowSVG} />
              </Button>
              <Button className="btn-action">
                <SVG src={PlaySVG} />
              </Button>
              <Button
                className="btn-action"
                disabled={showRightArrow}
                onClick={handleForward}
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