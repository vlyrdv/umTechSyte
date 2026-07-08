import { useState } from "react";
import { AppLink, useNavigation } from "../../app/navigation";
import { navItems } from "../../data/navigation";
import { Button } from "../ui/Button";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isActive, navigate } = useNavigation();

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className="site-header">
      <div className="container site-header__inner">
        <AppLink to="/" className="brand" aria-label="На главную">
          <img
            className="brand__logo brand__logo--header"
            src="/assets/logo/header-logo.png"
            alt="UMO Tech"
          />
          <span className="brand__tag">AI SOLUTIONS</span>
        </AppLink>

        <nav className="site-nav" aria-label="Основная навигация">
          {navItems.map((item) => (
            <AppLink
              key={item.href}
              to={item.href}
              className={`site-nav__link ${isActive(item.href) ? "is-active" : ""}`}
            >
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Button href="/contacts" size="sm">
            Обсудить проект
          </Button>
          <button
            className={`burger ${isMenuOpen ? "is-open" : ""}`}
            type="button"
            aria-label={isMenuOpen ? "Закрыть меню" : "Открыть меню"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isMenuOpen ? "is-open" : ""}`}>
        <div className="container mobile-menu__inner">
          {navItems.map((item) => (
            <button
              key={item.href}
              className={`mobile-menu__link ${isActive(item.href) ? "is-active" : ""}`}
              type="button"
              onClick={() => {
                closeMenu();
                navigate(item.href);
              }}
            >
              {item.label}
            </button>
          ))}
          <Button
            href="/contacts"
            onClick={closeMenu}
            className="mobile-menu__button"
          >
            Обсудить проект
          </Button>
        </div>
      </div>
    </header>
  );
}
