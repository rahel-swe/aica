import * as React from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(breakDown = MOBILE_BREAKPOINT) {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakDown}px)`);

    const onChange = () => {
      setIsMobile(window.innerWidth <= breakDown);
    };

    onChange();

    mql.addEventListener('change', onChange);

    return () => {
      mql.removeEventListener('change', onChange);
    };
  }, [breakDown]);

  return isMobile;
}
