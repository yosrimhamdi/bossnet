import axios from "axios";
import API_ROUTES from "../apiRoutes";
import { API_ENDPOINT } from "../config";

const getRouteByIdGenrator = (path) => (item) => `${path}/${item._id}`;

export default async () => {
  const { categories, offers, partners, customPages } = (
    await axios.get(`${API_ENDPOINT}${API_ROUTES.getSeoData}`)
  ).data;

  return [
    ...categories.map(getRouteByIdGenrator("/categories")),
    ...offers.map(getRouteByIdGenrator("/partners/offers")),
    ...partners.map(getRouteByIdGenrator("/partners")),
    ...customPages.map(getRouteByIdGenrator("/custom-pages")),
  ];
};
