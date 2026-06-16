import Link from "next/link";
import { site, campuses } from "@/data/site";

export default function Footer() {
  return (
    <footer className="footer" id="contact">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-mark">
                <img
                  className="logo-blue"
                  src="/logo-blue.svg"
                  alt={`${site.name} ${site.nameEn}`}
                />
                <img
                  className="logo-white"
                  src="/logo-white.svg"
                  alt=""
                  aria-hidden="true"
                />
              </span>
              <span className="brand-word">
                <span className="zh">{site.name}</span>
                <span className="en">{site.nameEn}</span>
              </span>
            </span>
            <p>
              {site.slogan}。{site.subSlogan}，菁仕与海外名校及上海各国际学校保持良好合作，
              为选择国际教育的家庭提供一站式信息同步与全天候响应。
            </p>
          </div>

          <div>
            <h4>校区</h4>
            <ul>
              {campuses.map((c) => (
                <li key={c.name} className="addr">
                  <span className="ct">{c.name}</span>
                  <br />
                  {c.address}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4>联系我们</h4>
            <ul>
              <li>
                <i className="ti ti-phone" aria-hidden="true" />{" "}
                <span className="ct">{site.contact.phone}</span>
              </li>
              <li>
                <i className="ti ti-brand-wechat" aria-hidden="true" /> 微信：
                {site.contact.wechat}
              </li>
              <li style={{ marginTop: 14 }}>
                <Link href="/faculty">名师团队 →</Link>
              </li>
            </ul>
            <div className="footer-qr">
              <img src={site.contact.wechatQr} alt="菁仕教育官方微信二维码" />
              <span>扫码添加官方微信</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} {site.copyright} · {site.nameEn}
          </span>
          <span>沪ICP备 XXXXXXXX 号（占位）</span>
        </div>
      </div>
    </footer>
  );
}
