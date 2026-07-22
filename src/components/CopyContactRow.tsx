"use client";

import { useEffect, useRef, useState } from "react";
import { IconChat, IconPhone } from "./icons";

type ContactKind = "wechat" | "phone";

function legacyCopy(value: string) {
  const input = document.createElement("textarea");
  input.value = value;
  input.setAttribute("readonly", "");
  input.style.position = "fixed";
  input.style.opacity = "0";
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  input.remove();
}

export default function CopyContactRow({
  kind,
  label,
  value,
  variant = "contact",
}: {
  kind: ContactKind;
  label: string;
  value: string;
  variant?: "contact" | "modal";
}) {
  const [copied, setCopied] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const Icon = kind === "wechat" ? IconChat : IconPhone;

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      legacyCopy(value);
    }

    setCopied(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setCopied(false), 1800);
  }

  return (
    <button
      type="button"
      className={`${variant === "modal" ? "modal-row" : "contact-row"} copy-contact-row`}
      onClick={copy}
      aria-label={`复制${label} ${value}`}
    >
      <Icon />
      <span>
        {label}&nbsp;<b>{value}</b>
      </span>
      <span className={`copy-feedback${copied ? " copied" : ""}`} aria-live="polite">
        {copied ? "已复制" : "点击复制"}
      </span>
    </button>
  );
}
