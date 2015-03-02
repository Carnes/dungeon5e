var Data = Data || {};

Data.Door = [
    { map: [
        [ ,2],
        [1,2,0],
        [ ,2]
        ]
        ,originX: 1, originY: 1
        ,direction: Enums.Cardinal.North
    },
    { map: [
        [ ,2],
        [0,2,1],
        [ ,2]
        ]
        ,originX: 1, originY: 1
        ,direction: Enums.Cardinal.South
    },
    { map: [
        [ ,0],
        [2,2,2],
        [ ,1]
        ]
        ,originX: 1, originY: 1
        ,direction: Enums.Cardinal.East
    },
    { map: [
        [ ,1],
        [2,2,2],
        [ ,0]
        ]
        ,originX: 1, originY: 1
        ,direction: Enums.Cardinal.West
    }
];
