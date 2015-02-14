var SectionData = SectionData || {};

SectionData.Entrance = [
    {
        map: [
            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Door, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
            ], door: {west: 1}
        },
    {
        map: [
            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Door],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
        ], door: {east: 1}
    },
    {
        map: [
            [TileType.Wall, TileType.Wall, TileType.Door, TileType.Wall, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Floor, TileType.Floor, TileType.Floor, TileType.Wall],
            [TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall, TileType.Wall]
        ], door: {north: 1}
    }
];
