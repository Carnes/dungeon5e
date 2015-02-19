var SectionData = SectionData || {};
//Magic numbers were actually easier than an enum here.  See TileType for reference.
SectionData.Entrance = [
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,4,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: [], passage: ['north','east','south','west']
        ,name: '1'
    },
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,4,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: ['anyWall','anyWall'], passage: ['anyWall','anyWall']
        ,name: '2'
    },
    {
        map: [
            [2,2,2,2,2,2,2,2,2,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,4,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,2,2,2,2,2,2,2,2,2]
        ], door: ['anyWall','anyWall','anyWall'], passage: []
        ,name: '3'
    },
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,4,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: ['south','north'], passage: ['east','west']
        ,name: '4'
    },
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,4,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: [], passage: ['anyWall','anyWall','anyWall','anyWall']
        ,name: '5'
    },
    {
        map: [
            [ , , ,2,2,2,2],
            [ , ,2,1,1,1,1,2],
            [ ,2,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,4,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [ ,2,1,1,1,1,1,1,2],
            [ , ,2,1,1,1,1,2],
            [ , , ,2,2,2,2]
        ], door: [], passage: ['east','west','north','south']
        ,name: '6'
    },
    {
        map: [
            [ , , ,2,2,2,2],
            [ , ,2,1,1,1,1,2],
            [ ,2,1,1,1,1,1,1,2],
            [2,1,1,4,1,1,1,1,1,2],
            [2,1,1,1,2,2,1,1,1,2],
            [2,1,1,1,2,2,1,1,1,2],
            [2,1,1,1,1,1,1,1,1,2],
            [ ,2,1,1,1,1,1,1,2],
            [ , ,2,1,1,1,1,2],
            [ , , ,2,2,2,2]
        ], door: [], passage: ['east','west','north','south']
        ,name: '7'
    },
    {
        map: [
            [2,2,2,2,2,2],
            [2,1,1,1,1,2],
            [2,1,4,1,1,2],
            [2,1,1,1,1,2],
            [2,1,1,1,1,2],
            [2,2,2,2,2,2]
        ], door: ['anyWall','anyWall'], passage: ['anyWall'], secretDoor: ['anyWall']
        ,name: '8'
    }
];
