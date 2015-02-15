var Generator = (function(){
    var self = {};

    var genEntrance = function(map){
        var variationList = [];
        for(var i=0; i< SectionData.Entrance.length; i++)
            variationList.push(i);
        variationList.randomize();
        var success = false;
        var entrance;
        while(variationList.length > 0 && success == false)
        {
            var variation = variationList[Random.int(variationList.length)];
            variationList.remove(variation);
            entrance = new Section.Entrance(variation);
            success = map.addSection(entrance,32,32);
        }
        if(success)
            return entrance;
        return false;
    };


    self.generateMap = function(x,y){
        var map = new Map(x,y);

        var entrance = genEntrance(map);
        if(!entrance)
            throw "Couldn't even find an Entrance!";

        while (true){
            var potentialDoorLocations = entrance.getUnconnectedDoorPotentials();
            if(potentialDoorLocations === false)
                break;
            var door = potentialDoorLocations.randomize()[0];
            entrance.setTileType(door.x,door.y,TileType.Door);
        }
        map.refreshMap();
        return map;
    };

    return self;
})();
