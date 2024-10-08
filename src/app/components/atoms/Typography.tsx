import React from "react";
import Link from "next/link";

type TypographyProps = {
  text: string;
  onClick?: () => void;
  linkHref?: string;
  className?: string;
};
export function H1({ text }: TypographyProps) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {text}
    </h1>
  );
}
export function H2({ text }: { text: string }) {
  return (
    <h2 className="font-inter font-semibold text-[32px] leading-[1.25] text-[#20293A]">
      {text}
    </h2>
  );
}

export function H3({ text }: TypographyProps) {
  return (
    <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
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
export function P1({ text }: TypographyProps) {
  return (
    <p className="font-inter font-normal text-[14px] leading-[1.25] text-[#677489]">
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
