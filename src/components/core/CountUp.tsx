import { useEffect, useCallback } from 'react';
// ─── Centralized GSAP module: single registration, no duplicate side-effects ──
import { gsap } from '@/lib/gsap';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export interface CountUpProps {
  to: number;
  from?: number;
  direction?: 'up' | 'down';
  delay?: number;
  duration?: number;
  className?: string;
  startWhen?: boolean;
  separator?: string;
  onStart?: () => void;
  onEnd?: () => void;
}

export default function CountUp({
  to,
  from = 0,
  direction = 'up',
  delay = 0,
  duration = 2,
  className = '',
  startWhen = true,
  separator = '',
  onStart,
  onEnd
}: CountUpProps) {
  const { ref, isVisible } = useScrollReveal<HTMLSpanElement>(0);

  const getDecimalPlaces = (num: number): number => {
    const str = num.toString();
    if (str.includes('.')) {
      const decimals = str.split('.')[1];
      if (parseInt(decimals) !== 0) {
        return decimals.length;
      }
    }
    return 0;
  };

  const maxDecimals = Math.max(getDecimalPlaces(from), getDecimalPlaces(to));

  const formatValue = useCallback(
    (latest: number) => {
      const hasDecimals = maxDecimals > 0;

      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: hasDecimals ? maxDecimals : 0,
        maximumFractionDigits: hasDecimals ? maxDecimals : 0
      };

      const formattedNumber = Intl.NumberFormat('en-US', options).format(latest);

      return separator ? formattedNumber.replace(/,/g, separator) : formattedNumber;
    },
    [maxDecimals, separator]
  );

  // Set initial value
  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === 'down' ? to : from);
    }
  }, [from, to, direction, formatValue, ref]);

  // Animate value when in view
  useEffect(() => {
    if (isVisible && startWhen && ref.current) {
      const targetValue = direction === 'down' ? from : to;
      const startValue = direction === 'down' ? to : from;
      
      const obj = { val: startValue };
      
      const animation = gsap.to(obj, {
        val: targetValue,
        duration: duration,
        delay: delay,
        ease: "power2.out",
        onStart: () => {
          if (typeof onStart === 'function') onStart();
        },
        onUpdate: () => {
          if (ref.current) {
            ref.current.textContent = formatValue(obj.val);
          }
        },
        onComplete: () => {
          if (typeof onEnd === 'function') onEnd();
        }
      });

      return () => {
        animation.kill();
      };
    }
  }, [isVisible, startWhen, direction, from, to, delay, duration, formatValue, onStart, onEnd, ref]);

  return <span className={className} ref={ref} />;
}
