const clothItems = [
    {
        id: 1,
        name: "Beige Business Suit with Short Skirt",
        modelSrc: "./models/cloths/beige_business_suit_with_short_skirt.glb",
        category: "Business",
        color: "Beige",
        price: {
            ETH: 0.03,
            Rupees: 7500,
            WallmartCoins: 2250,
        },
        description: "A sleek beige business suit with a short skirt, perfect for formal meetings.",
        stock: 12,
        ratings: 4.7,
        reviews: 85,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 2,
        name: "Black Sleeveless Cotton Dress with Chain",
        modelSrc: "./models/cloths/black_sleeveless_cotton_dress_with_chain.glb",
        category: "Casual",
        color: "Black",
        price: {
            ETH: 0.025,
            Rupees: 6000,
            WallmartCoins: 1800,
        },
        description: "A stylish black sleeveless cotton dress with an elegant chain accessory.",
        stock: 20,
        ratings: 4.8,
        reviews: 110,
        image: "./inventory/casual_blackfrock.png", // Updated image path
    },
    {
        id: 3,
        name: "Dr. Martens 1460 Subdiv",
        modelSrc: "./models/cloths/dr_martens1460subdiv.glb",
        category: "Footwear",
        color: "Black",
        price: {
            ETH: 0.015,
            Rupees: 3500,
            WallmartCoins: 1050,
        },
        description: "Classic Dr. Martens boots, known for their durability and style.",
        stock: 30,
        ratings: 4.9,
        reviews: 150,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 4,
        name: "High Wrap Dress",
        modelSrc: "./models/cloths/dress_high_unwrap.glb",
        category: "Formal",
        color: "Red",
        price: {
            ETH: 0.04,
            Rupees: 9500,
            WallmartCoins: 2850,
        },
        description: "An elegant high wrap dress, perfect for evening events and formal occasions.",
        stock: 8,
        ratings: 4.6,
        reviews: 70,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 5,
        name: "Fancy Tailcoat Suit",
        modelSrc: "./models/cloths/fancy_tailcoat_suit.glb",
        category: "Formal",
        color: "Black",
        price: {
            ETH: 0.05,
            Rupees: 12000,
            WallmartCoins: 3600,
        },
        description: "A stylish and classic tailcoat suit, ideal for black-tie events.",
        stock: 5,
        ratings: 4.9,
        reviews: 40,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 6,
        name: "Green and White Hoodie",
        modelSrc: "./models/cloths/green_and_white_hoodie.glb",
        category: "Casual",
        color: "Green and White",
        price: {
            ETH: 0.02,
            Rupees: 5000,
            WallmartCoins: 1500,
        },
        description: "A comfortable green and white hoodie for everyday wear.",
        stock: 18,
        ratings: 4.5,
        reviews: 60,
        image: "./inventory/casual_greenwhitehoddie.png", // Updated image path
    },
    {
        id: 7,
        name: "Green Shirt with Hood",
        modelSrc: "./models/cloths/green_shirt_hood_scan_medpoly.glb",
        category: "Casual",
        color: "Green",
        price: {
            ETH: 0.022,
            Rupees: 5300,
            WallmartCoins: 1590,
        },
        description: "A casual green shirt with a hood, perfect for a laid-back style.",
        stock: 22,
        ratings: 4.4,
        reviews: 50,
        image: "./inventory/GreenShirt.png", // Updated image path
    },
    {
        id: 8,
        name: "Black Business Suit",
        modelSrc: "./models/cloths/man_black_business_suit.glb",
        category: "Business",
        color: "Black",
        price: {
            ETH: 0.03,
            Rupees: 8000,
            WallmartCoins: 2400,
        },
        description: "A classic black business suit for professional settings.",
        stock: 14,
        ratings: 4.8,
        reviews: 90,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 9,
        name: "Modern Denim Jacket",
        modelSrc: "./models/cloths/modern_denim_jacket_miritebotman.glb",
        category: "Casual",
        color: "Blue",
        price: {
            ETH: 0.018,
            Rupees: 4500,
            WallmartCoins: 1350,
        },
        description: "A trendy modern denim jacket with a sleek fit.",
        stock: 25,
        ratings: 4.7,
        reviews: 80,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 10,
        name: "Old Boots",
        modelSrc: "./models/cloths/old_boots.glb",
        category: "Footwear",
        color: "Brown",
        price: {
            ETH: 0.012,
            Rupees: 3000,
            WallmartCoins: 900,
        },
        description: "Rugged old boots with a vintage look, perfect for casual outings.",
        stock: 35,
        ratings: 4.2,
        reviews: 65,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 11,
        name: "Realistic Dress Shirt",
        modelSrc: "./models/cloths/realistic_dress_shirt.glb",
        category: "Formal",
        color: "White",
        price: {
            ETH: 0.016,
            Rupees: 3800,
            WallmartCoins: 1140,
        },
        description: "A realistic dress shirt, ideal for formal occasions and office wear.",
        stock: 28,
        ratings: 4.6,
        reviews: 75,
        image: "https://via.placeholder.com/150", // No specific image provided
    },
    {
        id: 12,
        name: "Yellow Polo Shirt",
        modelSrc: "./models/cloths/realistic_yellow_polo_shirt.glb",
        category: "Casual",
        color: "Yellow",
        price: {
            ETH: 0.015,
            Rupees: 3600,
            WallmartCoins: 1080,
        },
        description: "A bright yellow polo shirt, perfect for casual wear.",
        stock: 26,
        ratings: 4.5,
        reviews: 58,
        image: "./inventory/YellowPoloshirt.png", // Updated image path
    },
    {
        id: 13,
        name: "T-Shirt",
        modelSrc: "./models/cloths/t_shirt.glb",
        category: "Casual",
        color: "Various",
        price: {
            ETH: 0.01,
            Rupees: 2500,
            WallmartCoins: 750,
        },
        description: "A comfortable T-shirt available in various colors.",
        stock: 50,
        ratings: 4.3,
        reviews: 100,
        image: "./inventory/WhiteTshirt.png", // Updated image path
    },
    {
        id: 14,
        name: "White Shirt with Black Leather Skirt Outfit",
        modelSrc: "./models/cloths/white_shirt_black_leather_skirt_outfit.glb",
        category: "Casual",
        color: "White and Black",
        price: {
            ETH: 0.032,
            Rupees: 7800,
            WallmartCoins: 2340,
        },
        description: "A chic white shirt paired with a black leather skirt, perfect for a night out.",
        stock: 10,
        ratings: 4.9,
        reviews: 85,
        image: "./inventory/whiteshirtwithblackleather.png", // Updated image path
    },
];

export default clothItems;