import type { SVGProps } from "react";

/**
 * 全站内联 SVG 图标（替代 tabler webfont）。
 * 描边图标：stroke=currentColor；Star 为实心填充。
 * 默认 16×16，可用 width/height 或 className 覆盖。
 */

type IconProps = SVGProps<SVGSVGElement>;

function Stroke({ children, ...props }: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {children}
    </svg>
  );
}

export function IconStar(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 2.5l2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.35l-5.8 3.05 1.1-6.47L2.6 9.35l6.5-.95z" />
    </svg>
  );
}

export function IconArrowRight(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </Stroke>
  );
}

export function IconArrowLeft(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M19 12H5M11 18l-6-6 6-6" />
    </Stroke>
  );
}

export function IconMenu(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Stroke>
  );
}

export function IconX(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Stroke>
  );
}

export function IconPhone(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.34 1.78.65 2.62a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.46-1.22a2 2 0 0 1 2.11-.45c.84.31 1.72.53 2.62.65A2 2 0 0 1 22 16.92z" />
    </Stroke>
  );
}

export function IconCalendar(props: IconProps) {
  return (
    <Stroke {...props}>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </Stroke>
  );
}

/** 微信气泡图标（用于微信相关入口） */
export function IconChat(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </Stroke>
  );
}

export function IconMapPin(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z" />
      <circle cx="12" cy="10" r="3" />
    </Stroke>
  );
}

export function IconPlus(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M12 5v14M5 12h14" />
    </Stroke>
  );
}

export function IconChevronDown(props: IconProps) {
  return (
    <Stroke {...props}>
      <path d="M6 9l6 6 6-6" />
    </Stroke>
  );
}

/** 闪电图标（教师经验亮点行） */
export function IconBolt(props: IconProps) {
  return (
    <svg
      width={16}
      height={16}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      {...props}
    >
      <path d="M13 2L4.9 13.2c-.3.4 0 .9.5.9H11l-1.8 7.4c-.13.55.6.83.93.38L19.1 10c.3-.4 0-.9-.5-.9H13l1.8-6.4c.13-.55-.6-.83-.93-.38z" />
    </svg>
  );
}
