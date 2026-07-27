"use client";

import Image from "next/image";
import { createPortal } from "react-dom";
import {
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import type { StudentReview } from "@/data/teacher-feedback";
import { IconX } from "./icons";

const PREVIEW_COUNT = 4;

function ReviewItem({
  review,
  modal = false,
}: {
  review: StudentReview;
  modal?: boolean;
}) {
  return (
    <article className={`student-review${modal ? " student-review-modal" : ""}`}>
      <header>
        <Image src={review.avatar} width={42} height={42} alt="" />
        <div>
          <strong>{review.author}</strong>
          <time>{review.date}</time>
        </div>
      </header>
      <p>{review.content}</p>
    </article>
  );
}

export function TeacherReviews({
  teacherName,
  reviews,
}: {
  teacherName: string;
  reviews: StudentReview[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  const titleId = useId();
  const openerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previewReviews = reviews.slice(0, PREVIEW_COUNT);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        return;
      }

      if (event.key !== "Tab" || !dialogRef.current) return;
      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
        ),
      );
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      openerRef.current?.focus();
    };
  }, [isOpen]);

  if (!reviews.length) {
    return <p className="detail-empty">暂无可公开的文字评价。</p>;
  }

  return (
    <>
      <div className="student-reviews">
        {previewReviews.map((review) => (
          <ReviewItem review={review} key={review.id} />
        ))}
      </div>

      {reviews.length > PREVIEW_COUNT && (
        <button
          ref={openerRef}
          type="button"
          className="reviews-all-button"
          onClick={() => setIsOpen(true)}
        >
          查看全部 {reviews.length} 条评价
        </button>
      )}

      {isOpen &&
        createPortal(
          <div
            className="reviews-modal-overlay"
            onClick={(event) =>
              event.target === event.currentTarget && setIsOpen(false)
            }
          >
            <div
              ref={dialogRef}
              className="reviews-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
            >
              <header className="reviews-modal-header">
                <div>
                  <h3 id={titleId}>{teacherName}老师的学生评价</h3>
                  <p>共 {reviews.length} 条匿名评价</p>
                </div>
                <button
                  ref={closeRef}
                  type="button"
                  className="reviews-modal-close"
                  onClick={() => setIsOpen(false)}
                  aria-label="关闭全部评价"
                >
                  <IconX width={18} height={18} />
                </button>
              </header>
              <div className="reviews-modal-list">
                {reviews.map((review) => (
                  <ReviewItem review={review} key={review.id} modal />
                ))}
              </div>
            </div>
          </div>,
          document.body,
        )}
    </>
  );
}
