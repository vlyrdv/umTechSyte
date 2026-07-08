import { AppLink } from "../../app/navigation";
import { navItems } from "../../data/navigation";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container site-footer__grid">
        <div className="site-footer__brand">
          <AppLink to="/" className="brand" aria-label="На главную">
            <img
              className="brand__logo brand__logo--footer"
              src="/assets/logo/footer-logo.png"
              alt="UMO Tech"
            />
          </AppLink>
          <p>
            UMO Tech создаёт и запускает AI/ML-решения, которые помогают командам
            быстрее работать с заявками, данными, документами и клиентами.
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
          <span>Telegram: @umotech</span>
          <span>Email: umo-tech@mail.ru</span>
          <span>Россия</span>
        </div>
      </div>
    </footer>
  );
}
