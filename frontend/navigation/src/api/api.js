import axios from "axios";

const useLocal = process.env.VUE_APP_MODEL === "local";

// 创建 Axios 实例
const apiClient = axios.create({
  baseURL: "/api", // 使用代理的路径前缀
  headers: {
    "Content-Type": "application/json",
  },
});

// 获取所有网址信息
export const getWebsites = async () => {
  try {
    if (useLocal) {
      try {
        const websites = await import("./localData/websites.json");
        return { data: websites.default };
      } catch (error) {
        return console.error("Failed to fetch websites:", error);
      }
    }

    const response = await apiClient.get("/websites/?all_data=true");
    // 确保响应格式符合预期
    if (response.data && response.data.data) {
      return response.data; // 返回完整的响应数据
    } else {
      throw new Error("Invalid data format from /websites/ endpoint");
    }
  } catch (error) {
    console.error("Failed to fetch websites:", error);
    throw error; // 抛出错误以便在调用处处理
  }
};

// 获取分类信息
export const getCategories = async () => {
  try {
    if (useLocal) {
      try {
        const categories = await import("./localData/categories.json");
        return categories.default;
      } catch (error) {
        return console.error("Failed to fetch categories:", error);
      }
    }

    const response = await apiClient.get("/categories/");
    // 确保响应格式符合预期
    if (Array.isArray(response.data)) {
      return response.data; // 返回分类数据数组
    } else {
      throw new Error("Invalid data format from /categories/ endpoint");
    }
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    throw error; // 抛出错误以便在调用处处理
  }
};
