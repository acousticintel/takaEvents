import dynamic from "next/dynamic";
import { withRouter } from "next/router";
//custom packs
const BiHomeSmile = dynamic(
  async () => (await import("react-icons/bi")).BiHomeSmile
);
const BiHistory = dynamic(
  async () => (await import("react-icons/bi")).BiHistory
);
const BiHelpCircle = dynamic(
  async () => (await import("react-icons/bi")).BiHelpCircle
);
const RiCouponLine = dynamic(
  async () => (await import("react-icons/ri")).RiCouponLine
);
const IoHappySharp = dynamic(
  async () => (await import("react-icons/io5")).IoHappySharp
);

const NavTab = dynamic(() => import("../elements/navTab"));

function BottomNav({router }) {
  if (router.pathname.indexOf("/auth/") === 0 || router.pathname === "/landing") {
    return null;
  } else {
    return (
      <div className="bottom__nav__cont">
        <div className="bottom__nav">
          <NavTab
            icon={<BiHistory size="1.5rem" />}
            href="/history"
            text={"history"}
          />
          <NavTab
            icon={<IoHappySharp size="1.5rem" />}
            href="/events"
            text={"Events"}
          />
          <NavTab
            icon={<BiHomeSmile size="1.5rem" />}
            href="/profile"
            text={"home"}
          />
          <NavTab
            icon={<RiCouponLine size="1.5rem" />}
            href="/offers"
            text={"offers"}
          />
          <NavTab
            icon={<BiHelpCircle size="1.5rem" />}
            href="/faq"
            text={"help"}
          />
        </div>
      </div>
    );
  }
}

export default withRouter(BottomNav);
