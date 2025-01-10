// services/api.js
export const fetchCategories = async () => {
    const response = await fetch('/api/categories');
        // const response = ("health", "fitness", "dating", "mindfulness", "family")


    const categories = await response.json();
    return categories;
  };
  