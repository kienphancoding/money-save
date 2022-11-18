import Home from "../pages/Home";
import Paybook from "../pages/Paybook";
import Tools from "../pages/Tools";
import Plan from "../pages/Plan";
import Wallets from "../pages/Wallets";
import Statics from "../pages/Statics";

const routes = [
  { path: "/", component: Home },
  { path: "/plan", component: Plan },
  { path: "/tools", component: Tools },
  { path: "/paybook", component: Paybook },
  { path: "/wallets", component: Wallets },
  { path: "/statics", component: Statics },
];

export { routes };
