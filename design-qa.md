# Design QA

## Comparison setup

- Source visual truth:
  - `/var/folders/z4/2b8hwfls2ksbyzs0dh4l4lkw0000gn/T/codex-clipboard-70c3d54f-bfdb-46a2-9880-56b9464b16e3.png` — existing mobile faculty page and the issues to correct.
  - `/var/folders/z4/2b8hwfls2ksbyzs0dh4l4lkw0000gn/T/codex-clipboard-5ba7d505-bc3d-4f9d-9555-ab109aa6feba.png` — redundant teacher-detail header state.
  - `/var/folders/z4/2b8hwfls2ksbyzs0dh4l4lkw0000gn/T/codex-clipboard-098a840c-b16c-46ba-8a92-a9a93e03a133.png` — Airbnb structural reference for the mobile teacher detail page only.
  - User specification: 1:1.05 teacher-card photos, single-line degrees, one return action, fixed mobile booking bar, copyable contacts, and footer link removal.
- Browser-rendered implementation screenshots:
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/faculty-mobile-pass1.png`
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/faculty-desktop-pass1.png`
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/teacher-detail-mobile-pass1.png`
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/teacher-detail-desktop-pass1.png`
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/contact-mobile-anchor-pass2.png`
  - `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/contact-mobile-pass2.png`
- Viewports: `390 × 844` CSS px mobile and `1440 × 900` CSS px desktop, device scale factor 1.
- Source pixels: faculty `710 × 1558`; redundant-detail crop `1966 × 887`; Airbnb `986 × 1536`.
- Implementation pixels: mobile `390 × 844`; desktop `1440 × 900`.
- Density normalization:
  - Faculty source browser chrome was cropped, then the page content was resized to 390px wide and placed on a `390 × 844` canvas.
  - Airbnb reference was resized to 390px wide and placed on a `390 × 844` canvas. It is a cross-product structural reference, so imagery, copy, color and exact content density are intentionally not matched.
- States checked: faculty list default state, teacher detail default state, teacher detail booking modal open, contact anchor arrival, WeChat copy success, phone copy success, desktop faculty list, desktop teacher detail.

## Full-view comparison evidence

- Faculty side-by-side: `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/faculty-comparison.png`.
  - The result count no longer overflows the filter row.
  - Portrait containers are visibly taller and reveal more of each teacher.
  - Degree text is consistently one line with ellipsis; card bodies align across each row.
- Detail side-by-side: `/Users/hanchaoxu/.codex/visualizations/2026/07/22/019f89c4-5e99-7fd0-8a4b-c18d54f56e5e/jingshi-implementation-qa/detail-comparison.png`.
  - The implementation preserves the reference structure: compact top return bar, large image, overlapping rounded information sheet, and fixed conversion bar.
  - Brand colors, teacher imagery and education-specific content intentionally remain those of King's Academy.

Focused-region crops were not required after the normalized comparisons because card text, portrait crops, rounded sheet boundary and persistent booking control remain legible at original pixel size. Contact copy success was checked as a separate browser state because it is behavioral rather than a static reference match.

## Required fidelity surfaces

- Fonts and typography: existing PingFang/Hiragino/YaHei stack was preserved. Degrees now use one-line truncation; teacher names and booking-bar copy do not wrap at 390px.
- Spacing and layout rhythm: faculty cards retain the existing two-column grid with a taller 1:1.05 image area. The mobile detail page uses a 58px return bar, full-width portrait, 22px sheet overlap, 24px top radius, and 76px fixed booking surface.
- Colors and visual tokens: existing paper, navy and gold tokens are preserved. Airbnb's pink CTA was not copied because it would conflict with the selected brand system.
- Image quality: existing 591 × 827 WebP teacher portraits are used without new generated or placeholder assets. `object-position: center top` and the taller container reveal more vertical content while preserving sharpness.
- Copy and content: redundant breadcrumb and second return action are removed. Contact instructions now say to long-press the QR code on mobile, and both phone and WeChat rows explicitly say “点击复制” / “已复制”.
- Icons: existing project icon family is reused. No new image or icon assets were required.
- Responsiveness and accessibility: fixed mobile controls do not coexist or overlap; teacher details suppress the global mobile header and generic sticky CTA. Copy rows are semantic buttons with accessible labels and live success text.

## Comparison history

### Pass 1 findings

- [P1] Faculty filter result text overflowed the 390px viewport.
  - Fix: removed the low-value result-count label.
  - Evidence: `faculty-comparison.png`.
- [P1] Faculty portraits were too short and degrees wrapped to two lines, creating inconsistent cards.
  - Fix: changed image ratio from `1 / 0.95` to `1 / 1.05`; changed degree copy to a single ellipsized line.
  - Evidence: `faculty-mobile-pass1.png` and `faculty-desktop-pass1.png`.
- [P1] Teacher detail had redundant breadcrumb/return actions and lacked the requested mobile conversion structure.
  - Fix: removed the breadcrumb and lower return button; added the Airbnb-inspired mobile shell and fixed teacher-specific booking bar; suppressed competing global mobile controls on detail routes.
  - Evidence: `detail-comparison.png` and `teacher-detail-booking-mobile-pass1.png`.
- [P2] Contact anchor could place the section title underneath the sticky header.
  - Fix: added 76px scroll padding/margin for anchored sections.
  - Post-fix evidence: `contact-mobile-anchor-pass2.png` shows the title fully visible.

### Pass 2 result

- WeChat and phone rows each produced a visible `已复制` state when clicked.
- The mobile teacher booking bar opened the consultation dialog successfully.
- Desktop detail retained the global site header and a single return action.
- Footer no longer exposes the redundant faculty link.
- Browser console showed no warnings or errors.
- `npx tsc --noEmit`, `git diff --check`, and the optimized Next.js production build passed; all 26 routes remained statically generated.

## Remaining P3 polish

- The mobile contact copy status is intentionally compact. It could later become a small toast if broader user testing shows that inline feedback is missed.

final result: passed
