'use client';

import { useMemo, useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import { interpolate } from 'flubber';

export const AnimatedBackground = () => {
  const [step, setStep] = useState<number>(0);

  const firstPath =
    'M160.2,-177.9C203.9,-154.3 232.9,-100.2 235.1,-47.4C237.3,5.4 212.6,56.9 185.8,110.8C158.9,164.7 129.9,221 81.6,249.6C33.3,278.1 -34.3,279.1 -105.3,264.1C-176.2,249.2 -250.5,218.3 -276.2,164.1C-301.9,110 -279,32.4 -247.6,-26C-216.3,-84.5 -176.6,-123.8 -134,-147.6C-91.3,-171.3 -45.6,-179.4 6.3,-186.9C58.3,-194.5 116.6,-201.4 160.2,-177.9Z';

  const secondPath =
    'M175.5,-216.1C221.1,-170.8 247.4,-109.6 266.1,-41.4C284.7,26.8 295.6,101.9 268.7,161.3C241.8,220.7 177,264.5 115.2,264.3C53.4,264.2 -5.4,220.2 -59.7,189.4C-114.1,158.6 -164,141.1 -214.8,100.8C-265.7,60.6 -317.5,-2.2 -320.6,-69C-323.8,-135.8 -278.2,-206.6 -216.7,-249.1C-155.1,-291.5 -77.6,-305.8 -6.3,-298.2C64.9,-290.7 129.8,-261.4 175.5,-216.1Z';

  const thirdPath =
    'M160.2,-192.6C212.4,-147.1 262.8,-101.2 270.3,-49.1C277.8,3 242.4,61.3 211.6,129.2C180.7,197.1 154.5,274.8 102.7,302.3C51,329.8 -26.3,307.3 -93.6,275C-160.9,242.8 -218.1,200.9 -245.7,145.6C-273.2,90.2 -271,21.4 -245.2,-29C-219.4,-79.5 -170,-111.6 -125.2,-158.3C-80.4,-205.1 -40.2,-266.5 6.9,-274.8C54,-283 108,-238 160.2,-192.6Z';

  const pathPairs = useMemo(
    () => [
      interpolate(firstPath, secondPath, { maxSegmentLength: 2 }),
      interpolate(secondPath, thirdPath, { maxSegmentLength: 2 }),
      interpolate(thirdPath, firstPath, { maxSegmentLength: 2 }),
    ],
    [],
  );

  const { t } = useSpring({
    from: { t: 0 },
    to: { t: 1 },
    reset: true,
    config: { duration: 5000 },
    onRest: () => setStep((prev) => (prev + 1) % pathPairs.length),
  });

  return (
    <div
      className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      <svg viewBox="0 0 900 600" width="100%" height="100%">
        <g transform="translate(450 300)">
          <animated.path
            d={t.to(pathPairs[step])}
            fill="rgba(26, 110, 244, 0.6)"
          />
        </g>
      </svg>
    </div>
  );
};
