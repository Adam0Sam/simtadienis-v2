import { useState } from 'react';

function BackArrow({ handleArrowClick }) {
  const [animationActive, setAnimationActive] = useState(false);

  return (
    <button className='arrow-btn'>
      <div className={`back-arrow ${animationActive ? 'fly-off' : ''}`}
        onClick={() => {
          setAnimationActive(true);
          const ANIMATION_DURATION = 500; // in ms
          setTimeout(() => {
            handleArrowClick()
          }, ANIMATION_DURATION / 5);
            setTimeout(() => {
              setAnimationActive(false);
            }, ANIMATION_DURATION);
        }}
        style={{
          width: '21.2px',
          height: '21.2px',
          transform: 'rotate(45deg)',
          borderLeft: '2px solid black',
          borderBottom: '2px solid black'
        }}
      >
      </div>
    </button>
  );
}

export default BackArrow;
