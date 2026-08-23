import { useSpring, animated } from '@react-spring/web';

// React Spring: a physics-based count-up (not a linear tween) so
// numbers settle with a natural, slightly bouncy weight — used for
// dashboard stats where a value "arriving" reads as more alive.
const AnimatedCounter = ({ value = 0, className = '' }) => {
  const { number } = useSpring({
    from: { number: 0 },
    number: Number(value) || 0,
    config: { mass: 1, tension: 120, friction: 22 },
  });

  return (
    <animated.span className={className}>
      {number.to((n) => Math.round(n).toLocaleString())}
    </animated.span>
  );
};

export default AnimatedCounter;
