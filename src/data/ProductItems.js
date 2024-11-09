const productItems = [
  {
    id: 1,
    name: "Sheen Chair",
    modelSrc: "./models/sheenchair.glb",
    category: "Furniture",
    color: "Orange",
    price: {
      ETH: 0.02,
      Rupees: 5000,
      WallmartCoins: 1500,
      coins: 3, // New attribute
    },
    description:
      "A comfortable and stylish chair perfect for any modern living room.",
    stock: 15, // Available stock
    ratings: 4.5, // Average customer rating
    reviews: 120, // Number of reviews
    image: "./inventory/SheenChair.png", // Image path added
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 2,
    name: "Office Chair",
    modelSrc: "./models/OfficeChair.glb",
    category: "Furniture",
    color: "Black",
    price: {
      ETH: 0.025,
      Rupees: 6000,
      WallmartCoins: 1800,
      coins: 4, // New attribute
    },
    description:
      "An ergonomic office chair with lumbar support for long working hours.",
    stock: 30, // Available stock
    ratings: 4.8, // Average customer rating
    reviews: 95, // Number of reviews
    image: "./inventory/OfficeChair.png", // Image path added
    annotations: [
      {
        title: "comfortable-back",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "comfortable-seat",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 3,
    name: "Pot",
    modelSrc: "./models/pot.glb",
    category: "Environment",
    color: "Red",
    price: {
      ETH: 0.01,
      Rupees: 2500,
      WallmartCoins: 750,
      coins: 2, // New attribute
    },
    description: "A decorative pot that adds a touch of nature to your space.",
    stock: 50, // Available stock
    ratings: 4.3, // Average customer rating
    reviews: 45, // Number of reviews
    image: "https://via.placeholder.com/150", // Placeholder image
    annotations: [
      {
        title: "pot-structure",
        slot: "hotspot-1",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 4,
    name: "Painting",
    modelSrc: "/models/Painting.glb",
    category: "Art",
    color: "Brown",
    price: {
      ETH: 0.035,
      Rupees: 9000,
      WallmartCoins: 2700,
      coins: 5, // New attribute
    },
    description:
      "A beautiful hand-painted canvas artwork for your living space.",
    stock: 10, // Available stock
    ratings: 4.9, // Average customer rating
    reviews: 30, // Number of reviews
    image: "https://via.placeholder.com/150", // Placeholder image
    annotations: [
      {
        title: "wooden-frame",
        slot: "hotspot-1",
        position:
          "0.011597651675006926m 0.5744572599492905m -0.1383899854988515m",
        normal: "0.028332494851243895m 0.2137467602998606m 0.9764781575625839m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "pure-canvas",
        slot: "hotspot-2",
        position:
          "0.008754174027053235m 0.3513235856998005m 0.1658749505478343m",
        normal:
          "-0.30988561688489596m 0.9507625837296717m -0.004627507703580716m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 5,
    name: "Car",
    modelSrc: "./models/car.glb",
    category: "Vehicle",
    color: "Blue",
    price: {
      ETH: 0.5,
      Rupees: 120000,
      WallmartCoins: 36000,
      coins: 5, // New attribute
    },
    description:
      "A sleek, modern car with a stunning design and powerful performance.",
    stock: 5, // Available stock
    ratings: 4.7, // Average customer rating
    reviews: 12, // Number of reviews
    image: "https://via.placeholder.com/150", // Placeholder image
    annotations: [
      {
        title: "plastic-structure",
        slot: "hotspot-1",
        position:
          "-0.0036662781627494825m 0.11165170707633758m 0.07931578568217246m",
        normal:
          "-0.007882343763611447m 0.9530143214961644m 0.30282267365571863m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "glossy-color",
        slot: "hotspot-2",
        position:
          "-0.09202904871903242m 0.05133736629679797m 0.0013477452825590153m",
        normal:
          "-0.9976942525197127m 0.061837681663106964m 0.027969261979253417m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  {
    id: 6,
    name: "Sport Car",
    modelSrc: "./models/sportcar.glb",
    category: "Vehicle",
    color: "Red",
    price: {
      ETH: 0.65,
      Rupees: 155000,
      WallmartCoins: 46500,
      coins: 6, // New attribute
    },
    description: "A fast, high-performance sport car for enthusiasts.",
    stock: 3, // Available stock
    ratings: 5.0, // Average customer rating
    reviews: 8, // Number of reviews
    image: "https://via.placeholder.com/150", // Placeholder image
    annotations: [
      {
        title: "chrome-body",
        slot: "hotspot-1",
        position:
          "-0.0036662781627494825m 0.11165170707633758m 0.07931578568217246m",
        normal:
          "-0.007882343763611447m 0.9530143214961644m 0.30282267365571863m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
      {
        title: "leather-seats",
        slot: "hotspot-2",
        position:
          "-0.09202904871903242m 0.05133736629679797m 0.0013477452825590153m",
        normal:
          "-0.9976942525197127m 0.061837681663106964m 0.027969261979253417m",
        orbit: "10.89188deg 119.9775deg 0.03543022m",
        target: "-0.1053838m 0.01610652m 0.1076345m",
      },
    ],
  },
  // New avatar items

  {
    id: 3,

    name: "Cyberpunk Avatar",

    modelSrc: "./models/char01.glb",

    category: "Avatar",

    color: "Neon Blue",

    price: {
      ETH: 0.05,

      Rupees: 12000,

      WallmartCoins: 3600,

      coins: 7,
    },

    description:
      "A futuristic cyberpunk-style avatar with customizable neon accents.",

    stock: 100,

    ratings: 4.7,

    reviews: 50,

    image: "./inventory/cyberpunk_avatar.png",

    annotations: [
      {
        title: "customizable-hair",

        slot: "hotspot-1",

        position: "0m 1.7m 0m",

        normal: "0m 1m 0m",

        orbit: "0deg 90deg 0.5m",

        target: "0m 1.6m 0m",
      },

      {
        title: "neon-outfit",

        slot: "hotspot-2",

        position: "0m 1m 0.2m",

        normal: "0m 0m 1m",

        orbit: "0deg 0deg 0.5m",

        target: "0m 1m 0m",
      },
    ],
  },

  {
    id: 4,

    name: "Fantasy Warrior Avatar",

    modelSrc: "./models/char02.glb",

    category: "Avatar",

    color: "Silver",

    price: {
      ETH: 0.06,

      Rupees: 14000,

      WallmartCoins: 4200,

      coins: 8,
    },

    description:
      "A detailed fantasy warrior avatar with customizable armor and weapons.",

    stock: 80,

    ratings: 4.9,

    reviews: 75,

    image: "./inventory/fantasy_warrior.png",

    annotations: [
      {
        title: "armor-details",

        slot: "hotspot-1",

        position: "0m 1.2m 0.3m",

        normal: "0m 0m 1m",

        orbit: "0deg 0deg 0.5m",

        target: "0m 1.2m 0m",
      },

      {
        title: "weapon-choice",

        slot: "hotspot-2",

        position: "0.5m 1m 0m",

        normal: "1m 0m 0m",

        orbit: "0deg -90deg 0.5m",

        target: "0m 1m 0m",
      },
    ],
  },

  // New educational course items

  {
    id: 5,

    name: "Introduction to 3D Modeling",

    modelSrc: "./models/3d_modeling_course.glb",

    category: "Course",

    color: "N/A",

    price: {
      ETH: 0.1,

      Rupees: 24000,

      WallmartCoins: 7200,

      coins: 12,
    },

    description:
      "Learn the basics of 3D modeling with industry-standard software.",

    stock: 999, // Digital product, high stock

    ratings: 4.6,

    reviews: 320,

    image: "./inventory/3d_modeling_course.png",

    annotations: [
      {
        title: "course-modules",

        slot: "hotspot-1",

        position: "0m 0.5m 0m",

        normal: "0m 1m 0m",

        orbit: "45deg 60deg 0.5m",

        target: "0m 0m 0m",
      },
    ],
  },

  {
    id: 6,

    name: "Advanced VR Development",

    modelSrc: "./models/vr_dev_course.glb",

    category: "Course",

    color: "N/A",

    price: {
      ETH: 0.15,

      Rupees: 36000,

      WallmartCoins: 10800,

      coins: 18,
    },

    description:
      "Master VR development techniques and create immersive experiences.",

    stock: 999, // Digital product, high stock

    ratings: 4.8,

    reviews: 180,

    image: "./inventory/vr_dev_course.png",

    annotations: [
      {
        title: "vr-projects",

        slot: "hotspot-1",

        position: "0.3m 0.3m 0.3m",

        normal: "1m 1m 1m",

        orbit: "45deg 45deg 0.5m",

        target: "0m 0m 0m",
      },
    ],
  },
];

export default productItems;