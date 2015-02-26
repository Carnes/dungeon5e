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
        if(self.potentialDoorLocations.length > 0){
            var pDoor = self.potentialDoorLocations.pop();
            return pDoor;
        }
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

    var northConfig = {map: [
        [ ,2],
        [1,2,0],
        [ ,2]
    ],originX: 1, originY: 1, direction: 'north'};
    var southConfig = {map: [
        [ ,2],
        [0,2,1],
        [ ,2]
    ], originX: 1, originY: 1, direction: 'south'};
    var eastConfig = {map: [
        [ ,0],
        [2,2,2],
        [ ,1]
    ], originX: 1, originY: 1, direction: 'east'};
    var westConfig = {map: [
        [ ,1],
        [2,2,2],
        [ ,0]
    ], originX: 1, originY: 1, direction: 'west'};

    p.getValidConfigsForDoor = function(direction){ //FIXME - this seems silly, needs refactor
        var self = this;
        var validConfigs = [];
        switch(direction){
            case 'east':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(eastConfig);
                break;
            case 'west':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(westConfig);
                break;
            case 'north':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(northConfig);
                break;
            case 'south':
                if(self.connectedDoors.any(function(door){return door.direction==direction})===false)
                    validConfigs.push(southConfig);
                break;
            case 'anyWhere':
                validConfigs.push(eastConfig);
                validConfigs.push(westConfig);
                validConfigs.push(northConfig);
                validConfigs.push(southConfig);
                break;
            case 'anyWall':
                if(self.connectedDoors.any(function(door){return door.direction=='east'})===false)
                    validConfigs.push(eastConfig);
                if(self.connectedDoors.any(function(door){return door.direction=='west'})===false)
                    validConfigs.push(westConfig);
                if(self.connectedDoors.any(function(door){return door.direction=='north'})===false)
                    validConfigs.push(northConfig);
                if(self.connectedDoors.any(function(door){return door.direction=='south'})===false)
                    validConfigs.push(southConfig);
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

    p.findPotentialDoors = function(door){
        var self = this;
        var validConfigs = self.getValidConfigsForDoor.call(self,door);
        var potentialDoors = [];
        validConfigs.forEach(function(config){
            self.map.forEach(function(mapY, y){
                mapY.forEach(function(tile, x){
                    var isValid = self.isConfigValid.call(self, config, x+config.originX, y+config.originY);
                    if(isValid)
                        potentialDoors.push({x:x, y:y, direction: config.direction, parent: self});
                });
            });
        });
        return potentialDoors;
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