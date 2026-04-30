import { siteConfig } from "@/config/siteConfig";
import raviusLogoDefault from "../../../ravius.svg";
import raviusLogoPrimary from "../../../ravius-primary.svg";

interface NavbarProps {
  isHeroVisible: boolean;
}

const Navbar = ({ isHeroVisible }: NavbarProps) => {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isHeroVisible
          ? "bg-transparent"
          : "glass-strong"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between py-4 px-6">
        <a href="#scroll-video" className="flex items-center" aria-label={siteConfig.name}>
          <span className="relative block h-5 w-[60px]">
            <img
              src={raviusLogoPrimary}
              alt={siteConfig.name}
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${
                isHeroVisible
                  ? "opacity-100"
                  : "opacity-0"
              }`}
            />
            <img
              src={raviusLogoDefault}
              alt=""
              aria-hidden="true"
              className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-500 ease-out ${
                isHeroVisible
                  ? "opacity-0"
                  : "opacity-100"
              }`}
            />
          </span>
        </a>
        <div className="hidden md:flex gap-8">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
