export const staggerContainer = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

export const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

export const fadeLeft = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 },
};

export const popup = {
    hidden: { opacity: 0, scale: 0 },
    show: { opacity: 1, scale: 1 },
};
