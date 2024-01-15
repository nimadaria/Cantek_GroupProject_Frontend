import axios from "axios";
import { IApiResponse } from "../models/api/api-response.api.interface";
import { ISection } from "../models/api/section.api.interface";

const baseUrl = import.meta.env.VITE_FORUM_BASE_URL;

const sectionUrl = `${baseUrl}/section`;

const getAll = async () => {
  const { data }: { data: IApiResponse<ISection> } = await axios.get(
    sectionUrl
  );
  return data.body;
};

export default { getAll };
