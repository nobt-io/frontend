import { useEffect } from 'react';

export default function HookableRoute({ children, onEnter }) {
  useEffect(() => {
    onEnter();
  }, []);

  return children;
}
