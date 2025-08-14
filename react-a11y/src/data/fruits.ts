export type Fruit = {
  id: string;
  name: string;
  image: string;
  alt: string;
  description: string;
};

export const fruits: Fruit[] = [
  {
    id: "apple",
    name: "Apple",
    description:
      "The apple (Malus domestica) is an edible fruit widely cultivated worldwide, with thousands of varieties differing in color, size, and flavor.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Scifresh_%28Apple%29.jpg",
    alt: "A red apple on a white background.",
  },
  {
    id: "cavendish-banana",
    name: "Cavendish banana",
    description:
      "Cavendish bananas are cultivars in the Cavendish subgroup (AAA) of Musa acuminata, dominating global banana exports.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/9/9b/Cavendish_Banana_DS.jpg",
    alt: "A bunch of Cavendish bananas on a white background.",
  },
  {
    id: "grape",
    name: "Grape",
    description:
      "A grape is a berry of the deciduous woody vines of the genus Vitis, occurring in clusters and used for eating fresh, drying, juice, and wine.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/bb/Table_grapes_on_white.jpg",
    alt: "Close-up of purple and green grapes with water droplets.",
  },
  {
    id: "kiwifruit",
    name: "Kiwifruit",
    description:
      "Kiwifruit (Chinese gooseberry) is the edible berry of several Actinidia species; it has thin, fuzzy brown skin and bright green flesh with tiny black seeds.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/b/b8/Kiwi_%28Actinidia_chinensis%29_1_Luc_Viatour.jpg",
    alt: "Kiwifruit cross-section showing green flesh and radiating seeds.",
  },
  {
    id: "mango",
    name: "Mango",
    description:
      "Mango (Mangifera indica) is a tropical stone fruit native to South Asia, now grown across many tropical regions; it has sweet, aromatic flesh.",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/40/Mango_4.jpg",
    alt: "Two ripe Alphonso (Hapus) mangoes.",
  },
  {
    id: "orange",
    name: "Orange",
    description:
      "The sweet orange (Citrus × sinensis) is a citrus tree and fruit — a hybrid of pomelo and mandarin — prized for its sweet, juicy segments.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/e/e3/Oranges_-_whole-halved-segment.jpg",
    alt: "Whole orange, a halved orange, and a peeled segment.",
  },
  {
    id: "papaya",
    name: "Papaya",
    description:
      "Papaya (Carica papaya) is a tropical fruit tree domesticated in Mesoamerica; ripe fruits have orange flesh and numerous black seeds.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/05/Carica_papaya_005.JPG",
    alt: "Papaya fruits ripening on the tree among green leaves.",
  },
  {
    id: "pear",
    name: "Pear",
    description:
      "Pears are pomaceous fruits from species in the genus Pyrus, grown worldwide and prized for their soft, buttery texture and sweet flavor.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/0/0b/D%27anjou_pear.jpg",
    alt: "Two ripe pears with green-yellow skin.",
  },
  {
    id: "pineapple",
    name: "Pineapple",
    description:
      "Pineapple (Ananas comosus) is a tropical plant whose multiple fruit develops from fused berries; it has spiky leaves and sweet, fibrous flesh.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/c/cb/Pineapple_and_cross_section.jpg",
    alt: "Whole pineapple next to a vertical cross-section.",
  },
  {
    id: "strawberry",
    name: "Strawberry",
    description:
      "The garden strawberry (Fragaria × ananassa) is a widely grown hybrid known for its bright red color, juicy texture, and characteristic aroma.",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/2/29/PerfectStrawberry.jpg",
    alt: "Single ripe strawberry on a white background.",
  },
];
