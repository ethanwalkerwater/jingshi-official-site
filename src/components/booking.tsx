"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { courseCategories } from "@/data/courses";
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
  const [submitted, setSubmitted] = useState(false);

  const open = useCallback(() => {
    setSubmitted(false);
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // TODO：接入真实提交（如邮件 / 表单服务 / 企业微信）。当前仅做前端反馈。
    setSubmitted(true);
  }

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
              <h3>预约一次专属咨询</h3>
              <p>
                留下联系方式，菁仕课程顾问将在 1 个工作日内与您联系，
                结合孩子的现状定制留学规划与试听安排。
              </p>
              <ul>
                <li>
                  <i className="ti ti-school" aria-hidden="true" />
                  名校师资 1v1 / 精品小班
                </li>
                <li>
                  <i className="ti ti-map-2" aria-hidden="true" />
                  专属升学规划路径
                </li>
                <li>
                  <i className="ti ti-clock-hour-4" aria-hidden="true" />
                  全天候响应 · 一站式服务
                </li>
              </ul>
            </aside>

            <div className="modal-form">
              <div className="modal-head">
                <h3>{submitted ? "" : "预约试听"}</h3>
                <button
                  className="modal-close"
                  onClick={close}
                  aria-label="关闭"
                >
                  <i className="ti ti-x" aria-hidden="true" />
                </button>
              </div>

              {submitted ? (
                <div className="modal-success">
                  <div className="ok">
                    <i className="ti ti-check" aria-hidden="true" />
                  </div>
                  <h3>预约信息已提交</h3>
                  <p>
                    感谢您的信任，菁仕课程顾问将尽快与您联系。
                    <br />
                    如需即时沟通，欢迎添加官方微信 {site.contact.wechat}。
                  </p>
                  <button
                    className="btn btn-green"
                    style={{ marginTop: 24 }}
                    onClick={close}
                  >
                    完成
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="field">
                    <label>家长 / 学生称呼</label>
                    <input name="name" required placeholder="如：王女士 / 张同学" />
                  </div>
                  <div className="field">
                    <label>联系电话</label>
                    <input
                      name="phone"
                      type="tel"
                      required
                      placeholder="方便我们与您联系的手机号"
                    />
                  </div>
                  <div className="field">
                    <label>学生年级</label>
                    <select name="grade" defaultValue="">
                      <option value="" disabled>
                        请选择
                      </option>
                      <option>小学</option>
                      <option>初中（含小升初）</option>
                      <option>高中</option>
                      <option>本科 / 研究生申请</option>
                      <option>其他</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>意向方向</label>
                    <select name="interest" defaultValue="">
                      <option value="" disabled>
                        请选择
                      </option>
                      {courseCategories.map((c) => (
                        <option key={c.id}>{c.title}</option>
                      ))}
                      <option>暂不确定，想先咨询</option>
                    </select>
                  </div>
                  <div className="field">
                    <label>留言（选填）</label>
                    <textarea
                      name="message"
                      placeholder="可简单描述孩子的现状或目标院校"
                    />
                  </div>
                  <button type="submit" className="btn btn-gold">
                    提交预约
                  </button>
                  <p className="privacy">
                    我们仅将您的信息用于课程咨询，不会对外泄露。
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </Ctx.Provider>
  );
}
