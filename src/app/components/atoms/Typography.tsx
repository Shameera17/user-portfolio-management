import React from "react";
import Link from "next/link";

type TypographyProps = {
  text: string;
  onClick?: () => void;
  linkHref?: string;
  className?: string;
  fontColor?: string;
};
export function H1({ text }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}
export function H2({ text, fontSize }: { text: string; fontSize?: string }) {
  const styles = `font-inter font-semibold text-[${
    fontSize ?? "32px"
  }] leading-[1.25] text-[#20293A]`;

  return <h2 className={styles}>{text}</h2>;
}

export function H3({ text, className }: TypographyProps) {
  return (
    <h3
      className={`font-inter scroll-m-20 text-2xl font-semibold tracking-tight ${className}`}
    >
      {text}
    </h3>
  );
}
export function H4({ text }: TypographyProps) {
  return (
    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{text}</h4>
  );
}
export function P({ text }: TypographyProps) {
  return <p className="leading-7 [&:not(:first-child)]:mt-6">{text}</p>;
}
export function P1({ text, fontColor }: TypographyProps) {
  return (
    <p
      className="font-inter font-normal text-[14px] leading-[1.25]"
      style={{ color: fontColor ?? "#677489" }} // Default to #677489 if fontColor is not provided
    >
      {text}
    </p>
  );
}

export function P2({ text, onClick }: TypographyProps) {
  return (
    <p
      onClick={onClick}
      className="font-inter font-normal text-[12px] leading-[1.25] text-[#677489]"
    >
      {text}
    </p>
  );
}
export function P3({ text, onClick }: TypographyProps) {
  return (
    <p
      onClick={onClick}
      className="font-inter font-semibold text-[12px] leading-[1.25] text-[#6466E9]"
    >
      {text}
    </p>
  );
}
export function P4({ text, onClick }: TypographyProps) {
  return (
    <p
      onClick={onClick}
      className="font-inter font-semibold text-[10px] leading-[1.25] text-[#677489]"
    >
      {text}
    </p>
  );
}
export function P5({ text, className }: TypographyProps) {
  return (
    <p
      className={` ${className} font-inter font-medium text-[16px] leading-[1.25] text-[#677489]`}
    >
      {text}
    </p>
  );
}

export function Blockquote({ text }: TypographyProps) {
  return (
    <blockquote className="mt-6 border-l-2 pl-6 italic">{text}</blockquote>
  );
}

export const LinkText = ({ text, linkHref, className }: TypographyProps) => (
  <Link className={className} href={linkHref!}>
    <P3 text={text} />
  </Link>
);
