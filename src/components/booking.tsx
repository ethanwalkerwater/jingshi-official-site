"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { site } from "@/data/site";
import { IconCalendar, IconChat, IconPhone, IconX } from "./icons";

interface BookingCtx {
  open: () => void;
  /** 弹窗是否打开（供吸底条等组件联动隐藏） */
  isOpen: boolean;
}

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking 必须在 BookingProvider 内使用");
  return ctx;
}

/** 全站任意位置的预约触发按钮 */
export function BookingButton({
  children = "预约免费咨询",
  className = "btn btn-gold",
  withIcon = false,
}: {
  children?: ReactNode;
  className?: string;
  withIcon?: boolean;
}) {
  const { open } = useBooking();
  return (
    <button type="button" className={className} onClick={open}>
      {withIcon && <IconCalendar />}
      {children}
    </button>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, close]);

  const tel = site.contact.phone.replace(/\s/g, "");

  return (
    <Ctx.Provider value={{ open, isOpen }}>
      {children}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="modal-sheet" role="dialog" aria-modal="true" aria-label="预约咨询">
            <div className="modal-grab" />
            <button className="modal-close" onClick={close} aria-label="关闭">
              <IconX width={18} height={18} />
            </button>
            <h3>预约免费咨询</h3>
            <p className="modal-sub">扫码添加顾问微信，或直接电话联系我们</p>
            <img
              className="modal-qr"
              src={site.contact.wechatQr}
              alt="菁仕教育微信二维码"
            />
            <p className="modal-qr-cap">微信扫码 · 添加顾问</p>
            <div className="modal-rows">
              <div className="modal-row">
                <IconChat />
                <span>微信号</span>
                <b>{site.contact.wechat}</b>
              </div>
              <a className="modal-row" href={`tel:${tel}`}>
                <IconPhone />
                <span>咨询电话</span>
                <b>{site.contact.phone}</b>
              </a>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
