import type { MouseEventHandler, ReactNode } from "react";
import { AppLink } from "../../app/navigation";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  icon?: ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
};

export function Button({
  children,
  href,
  variant = "primary",
  size = "md",
  icon,
  className = "",
  ...props
}: ButtonProps) {
  const classes = ["button", `button--${variant}`, `button--${size}`, className]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      <span>{children}</span>
      {icon ? <span className="button__icon">{icon}</span> : null}
    </>
  );

  if (href) {
    return (
      <AppLink to={href} className={classes} onClick={props.onClick as MouseEventHandler<HTMLAnchorElement>}>
        {content}
      </AppLink>
    );
  }

  return (
    <button
      className={classes}
      disabled={props.disabled}
      type={props.type ?? "button"}
      onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}
    >
      {content}
    </button>
  );
}
