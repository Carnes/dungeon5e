var SectionData = SectionData || {};
//Magic numbers were actually easier than an enum here.  See TileType for reference.
SectionData.Entrance = [
//    {
//        map: [
//            [2,2,2,2,2,2],
//            [2,1,1,1,1,2],
//            [2,1,1,1,1,2],
//            [2,1,1,1,1,2],
//            [2,1,1,1,1,2],
//            [2,2,2,2,2,2]
//        ], door: [], passage: ['north','east','south','west']
//    },
//    {
//        map: [
//            [2,2,2],
//            [2,1,2],
//            [2,2,2]
//        ], door: ['north'], passage: ['any','any']
//    }
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: ['any','any'], passage: ['any','any']
    },
    {
        map: [
            [2,2,2,2,2,2,2,2,2,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2]
        ], door: ['any','any','any'], passage: []
    }
//    ,
//    {
//        map: [
//            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Door, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
//            ], door: {west: 1}
//        },
//    {
//        map: [
//            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Door],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
//        ], door: {east: 1}
//    },
//    {
//        map: [
//            [TileType.Wall, TileType.Wall, TileType.Door, TileType.Wall, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
//            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
//        ], door: {north: 1}
//    }
];
