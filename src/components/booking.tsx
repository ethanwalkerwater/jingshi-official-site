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

interface BookingCtx {
  open: () => void;
}

const Ctx = createContext<BookingCtx | null>(null);

export function useBooking() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useBooking 必须在 BookingProvider 内使用");
  return ctx;
}

/** 全站任意位置的预约触发按钮 */
export function BookingButton({
  children = "预约试听",
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
      {withIcon && <i className="ti ti-calendar-event" aria-hidden="true" />}
      {children}
    </button>
  );
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => {
    setIsOpen(true);
  }, []);
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

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && (
        <div
          className="modal-overlay"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="modal" role="dialog" aria-modal="true">
            <aside className="modal-aside">
              <h3>预约试听</h3>
              <p>
                扫码添加菁仕官方微信，课程顾问将结合孩子现状，
                协助安排试听与升学规划沟通。
              </p>
              <ul>
                <li>名校师资 1v1 / 精品小班</li>
                <li>专属升学规划路径</li>
                <li>全天候响应 · 一站式服务</li>
              </ul>
            </aside>

            <div className="modal-form">
              <div className="modal-head">
                <h3>扫码预约试听</h3>
                <button
                  className="modal-close"
                  onClick={close}
                  aria-label="关闭"
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>

              <div className="booking-contact">
                <div className="booking-qr">
                  <img src={site.contact.wechatQr} alt="菁仕教育官方微信二维码" />
                </div>
                <p className="booking-qr-note">
                  微信扫码添加顾问，备注学生年级与意向方向。
                </p>
                <div className="booking-lines">
                  <div>
                    <span>联系电话</span>
                    <a href={`tel:${site.contact.phone.replace(/\s/g, "")}`}>
                      {site.contact.phone}
                    </a>
                  </div>
                  <div>
                    <span>官方微信</span>
                    <strong>{site.contact.wechat}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
