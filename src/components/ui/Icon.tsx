type IconProps = {
  /** Material Symbols ligature name, e.g. "arrow_forward". */
  name: string;
  className?: string;
};

/**
 * Decorative Material Symbols icon. Hidden from screen readers because the
 * ligature text ("arrow_forward") would otherwise be read aloud.
 */
export function Icon({ name, className = "" }: IconProps) {
  return (
    <span aria-hidden="true" className={`icon ${className}`}>
      {name}
    </span>
  );
}
