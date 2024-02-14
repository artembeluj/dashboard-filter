export interface FilteredDashboardValues {
    name: string;
    category: string;
    priceRange: {
        minPrice: number;
        maxPrice: number;
    };
}
