import { AppLink } from "../../app/navigation";
import { navItems } from "../../data/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <AppLink to="/" className="brand" aria-label="На главную">
            <span className="brand__mark">UM</span>
            <span className="brand__text">UM Tech</span>
            <span className="brand__tag">TECH PARTNER</span>
          </AppLink>
          <p>
            UM Tech проектирует и внедряет AI/ML-решения, которые встраиваются в
            процессы, продукты и команды бизнеса.
          </p>
        </div>

        <nav className="site-footer__nav" aria-label="Навигация в подвале">
          {navItems.map((item) => (
            <AppLink key={item.href} to={item.href}>
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="site-footer__contacts">
          <span>Telegram: @ai_partner</span>
          <span>Email: hello@ai-partner.ru</span>
          <span>Россия</span>
        </div>
      </div>
    </footer>
  );
}
