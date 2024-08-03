// Calculate Safety Stock
export const calculateSafetyStock = (
    leadTime: number,
    demand: number,
    demandVariability: number,
    leadTimeVariability: number,
    z: number
): number => {
    return (
        z *
        Math.sqrt(
            leadTime * Math.pow(demandVariability, 2) + demand * Math.pow(leadTimeVariability, 2)
        )
    );
};

// Calculate Reorder Point
export const calculateReorderPoint = (leadTimeDemand: number, safetyStock: number): number => {
    return leadTimeDemand + safetyStock;
};
