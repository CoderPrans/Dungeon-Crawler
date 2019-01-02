const map = [
  [8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  [8, 9, 10, 16, 17, 18, 19, 20, 21, 22, 23, 24],
  [8, 9, 10],
  [8, 9, 10, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [
    3,
    4,
    5,
    6,
    8,
    9,
    10,
    12,
    14,
    15,
    16,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [3, 4, 5, 6, 8, 9, 10, 12, 14, 15],
  [3, 4, 5, 6, 8, 9, 10, 11, 12, 14, 15],
  [3, 4, 5, 6, 14, 15],
  [3, 4, 5, 6, 14, 15],
  [3, 4, 5, 6, 14, 15, 17, 18, 19, 20],
  [3, 4, 5, 6, 17, 18, 19, 20],
  [3, 4, 5, 6, 17, 18, 19, 20],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  [3, 4, 5, 6, 7, 8, 9, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 27, 28, 29],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 26, 27, 28, 29],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14],
  [9, 10, 11, 12, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [7, 8, 9, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [7, 8, 9, 10, 11, 13, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    13,
    14,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14],
  [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14],
  [0, 1, 2, 3, 4, 7, 8, 9, 10, 11, 12, 13, 14],
  [
    0,
    1,
    2,
    3,
    4,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    17,
    18,
    19,
    20,
    21,
    22,
    23,
    24,
    25,
    26,
    27,
    28
  ],
  [14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28],
  [14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28]
];

export default map;
