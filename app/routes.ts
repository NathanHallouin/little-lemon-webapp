import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("reservations", "routes/reservations.tsx"),
  route("about", "routes/about.tsx"),
  route("menu", "routes/menu.tsx"),
  route("order", "routes/order.tsx")
] satisfies RouteConfig;
