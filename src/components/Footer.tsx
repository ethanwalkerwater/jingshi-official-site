import { site, campuses } from "@/data/site";
import { IconChat, IconPhone } from "./icons";

/** 页脚：全站唯一保留深色的区域（ink 底） */
export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <span className="brand">
              <span className="brand-mark">
                <img src="/logo-white.svg" alt={`${site.name} ${site.nameEn}`} />
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
                <IconPhone width={13} height={13} />
                <span className="ct">{site.contact.phone}</span>
              </li>
              <li>
                <IconChat width={13} height={13} /> 微信：
                {site.contact.wechat}
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
          <a
            href="https://beian.miit.gov.cn/"
            target="_blank"
            rel="noopener noreferrer"
          >
            沪ICP备2026031554号-1
          </a>
        </div>
      </div>
    </footer>
  );
}
