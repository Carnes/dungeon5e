var SectionBase = (function(){
    var base = function(){
        var self = this;
    };
    var p = base.prototype;

    p.getUnconnectedPotentialDoors = function(){
        var self = this;
        if(self.unconnectedDoors.length == 0 && self.potentialDoorLocations.length == 0)
            return false;
        if(self.unconnectedDoors.length > 0 && self.potentialDoorLocations.length == 0)
            self.setPotentialDoorsFromUnconnected.call(self);
        return self.getPotentialDoors.call(self);
    };

    p.placeDoor = function(door){
        var self = this;
        self.connectedDoors.push(door);
        self.setTileType(door.x,door.y,TileType.Door);
    };

    p.removeDoor = function(door){
        var self = this;
        self.connectedDoors.remove(door);
        self.setTileType(door.x,door.y,TileType.Wall);
    };

    p.getPotentialDoor = function(){
        var self = this;
        if(self.potentialDoorLocations.length > 0)
            return self.potentialDoorLocations.pop();
        return false;
    };

    p.getPotentialDoors = function(){
        var self = this;
        if(self.potentialDoorLocations.length > 0){
            var doors = self.potentialDoorLocations;
            self.potentialDoorLocations = [];
            return doors;
        }
        return false;
    };

    p.setPotentialDoorsFromUnconnected = function(){
        var self = this;
        if(self.unconnectedDoors.length == 0)
            return;
        var uDoor = self.unconnectedDoors.pop();
        self.potentialDoorLocations = self.findPotentialDoors.call(self, uDoor);
    };

    var doorConfig = {
        north: Data.Door.firstOrNull(function(d){return d.direction == Enums.Cardinal.North}),
        south: Data.Door.firstOrNull(function(d){return d.direction == Enums.Cardinal.South}),
        east: Data.Door.firstOrNull(function(d){return d.direction == Enums.Cardinal.East}),
        west: Data.Door.firstOrNull(function(d){return d.direction == Enums.Cardinal.West})
    };

    p.getValidConfigsForDoor = function(direction){ //FIXME - this seems silly, needs refactor
        var self = this;
        var validConfigs = [];
        switch(direction){
            case 'east':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(doorConfig.east);
                break;
            case 'west':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(doorConfig.west);
                break;
            case 'north':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(doorConfig.north);
                break;
            case 'south':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(doorConfig.south);
                break;
            case 'anyWall':
                validConfigs.push(doorConfig.east);
                validConfigs.push(doorConfig.west);
                validConfigs.push(doorConfig.north);
                validConfigs.push(doorConfig.south);
                break;
            case 'anyUnoccupiedWall':
                if(self.connectedDoors.any(function(door){return door.direction=='east'})===false)
                    validConfigs.push(doorConfig.east);
                if(self.connectedDoors.any(function(door){return door.direction=='west'})===false)
                    validConfigs.push(doorConfig.west);
                if(self.connectedDoors.any(function(door){return door.direction=='north'})===false)
                    validConfigs.push(doorConfig.north);
                if(self.connectedDoors.any(function(door){return door.direction=='south'})===false)
                    validConfigs.push(doorConfig.south);
                break;
            default:
                throw 'Unknown door type: '+direction;
        }
        return validConfigs;
    };

    p.isConfigValid = function(config, xOffset, yOffset){
        var self = this;
        var isValid = true;
        config.map.forEach(function(mapY, y){
            mapY.forEach(function(tileType, x){
                if(tileType == undefined)
                    return;
                var targetTile = self.getTile(xOffset-x,yOffset-y);
                if(targetTile == undefined && tileType == 0)
                    return;
                if(targetTile != undefined && targetTile.type == tileType)
                    return;
                isValid = false;
            });
        });
        return isValid;
    };

    p.findMapLocationsForConfigs = function(configs){
        var self = this;
        var locations = [];
        self.map.forEach(function(mapY, y){
            mapY.forEach(function(tile, x){
                configs.forEach(function(config) {
                    if (self.isConfigValid.call(self, config, x + config.originX, y + config.originY))
                        locations.push({x:x,y:y,config:config});
                });
            });
        });
        return locations;
    };

    p.findPotentialDoors = function(door){
        var self = this;
        var validConfigs = self.getValidConfigsForDoor.call(self,door);
        var locations = self.findMapLocationsForConfigs(validConfigs);
        return locations.select(function(location){ return {x:location.x, y:location.y, direction: location.config.direction, parent: self}; });
    };

    p.setUnconnectedDoors = function(){
        this.unconnectedDoors = (this.variation.door || []).clone();
    };
    p.setUnconnectedPassages = function(){
        this.unconnectedPassages = (this.variation.passage || []).clone();
    };

    p.getNewTileFromType = function(tileType){
        var self = this;
        var tile = null;
        switch(tileType) {
            case TileType.Wall:
                tile = new Tile.Wall();
                break;
            case TileType.Floor:
                tile = new Tile.Floor();
                break;
            case TileType.Door:
                tile = new Tile.Door();
                break;
            case TileType.Entrance:
                tile = new Tile.Entrance();
                break;
            default:
                tile = new TileBase();
        }
        tile.parent = self;
        return tile;
    };

    p.rotateMapCounterClockwise = function(){
        var self = this;
        var map = self.map;
        self.map = [];
        map.forEach(function(yGroup,y){
            yGroup.forEach(function(tile,x){
                self.setTile.call(self, y,x,tile);
            });
        });
    };

    p.setTile = function(x, y, tile){
        var self = this;
        if(!self.map[y])
            self.map[y]=[];
        self.map[y][x] = tile;
    };

    p.getTile = function(x, y){
        var self = this;
        if(!self.map[y])
            return undefined;
        return self.map[y][x];
    };

    p.setTileType = function(x,y,tileType){
        var self = this;
        var tile = self.getNewTileFromType.call(self, tileType);
        self.setTile(x,y,tile);
    };

    p.createMap = function(map){
        var self = this;
        map.forEach(function(xGroup,x){
            xGroup.forEach(function(tileType,y){
                self.setTileType.call(self, x,y,tileType);
            });
        });
    };
    return base;
})();