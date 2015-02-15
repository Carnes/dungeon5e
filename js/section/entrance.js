var Section = Section || {};

Section.Entrance = (function(){

    var section = function(variationNumber){

        var self = this;
        self.map=[];
        self.variation = SectionData.Entrance[variationNumber];
        if(!self.variation)
            throw 'Cannot create Entrance '+variationNumber;
        self.unconnectedDoors = [];
        self.unconnectedPassages = [];
        self.potentialDoors = [];
        self.potentialPassages = [];
        self.setUnconnectedDoors();
        self.setUnconnectedPassages();
        self.createMap(self.variation.map);
    };

    section.prototype.getUnconnectedDoorPotentials = function(){
        var self = this;
        if(self.unconnectedDoors.length == 0 && self.potentialDoors.length == 0)
            return false;
        if(self.unconnectedDoors.length > 0 && self.potentialDoors.length == 0)
            self.setPotentialDoorsFromUnconnected.call(self);
        return self.getPotentialDoors.call(self);
    };

    section.prototype.getPotentialDoor = function(){
        var self = this;
        if(self.potentialDoors.length > 0){
            var pDoor = self.potentialDoors.pop();
            //self.potentialDoors.remove(pDoor);
            return pDoor;
        }
        return false;
    };

    section.prototype.getPotentialDoors = function(){
        var self = this;
        if(self.potentialDoors.length > 0){
            var doors = self.potentialDoors;
            self.potentialDoors = [];
            return doors;
        }
        return false;
    };

    section.prototype.setPotentialDoorsFromUnconnected = function(){
        var self = this;
        if(self.unconnectedDoors.length == 0)
            return;
        var uDoor = self.unconnectedDoors.pop();
        //self.unconnectedDoors.remove(uDoor);
        self.potentialDoors = self.findPotentialDoor.call(self, uDoor);
    };
    //FIXME - need description of direction
    var eastConfig = {map: [
        [ ,2],
        [1,2,0],
        [ ,2]
    ],originX: 1, originY: 1};
    var westConfig = {map: [
        [ ,2],
        [0,2,1],
        [ ,2]
    ], originX: 1, originY: 1};
    var northConfig = {map: [
        [ ,0],
        [2,2,2],
        [ ,1]
    ], originX: 1, originY: 1};
    var southConfig = {map: [
        [ ,1],
        [2,2,2],
        [ ,0]
    ], originX: 1, originY: 1};

    section.prototype.getValidConfigsForDoor = function(door){
        var validConfigs = [];
        switch(door){
            case 'east':
                validConfigs.push(eastConfig);
                break;
            case 'west':
                validConfigs.push(westConfig);
                break;
            case 'north':
                validConfigs.push(northConfig);
                break;
            case 'south':
                validConfigs.push(southConfig);
                break;
            case 'any':
                validConfigs.push(eastConfig);
                validConfigs.push(westConfig);
                validConfigs.push(northConfig);
                validConfigs.push(southConfig);
                break;
            default:
                throw 'Unknown door type: '+door;
        }
        return validConfigs;
    };

    section.prototype.isConfigValid = function(config, xOffset, yOffset){
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

    section.prototype.findPotentialDoor = function(door){
        var self = this;
        var validConfigs = self.getValidConfigsForDoor.call(self,door);
        var potentialDoors = [];
        validConfigs.forEach(function(config){
            self.map.forEach(function(mapY, y){
                mapY.forEach(function(tile, x){
                    var isValid = self.isConfigValid.call(self, config, x+config.originX, y+config.originY);
                    if(isValid)
                        potentialDoors.push({x:x, y:y}); //FIXME - need direction
                });
            });
        });
        return potentialDoors;
    };

    section.prototype.setUnconnectedDoors = function(){
        this.unconnectedDoors = (this.variation.door || []).clone();
    };
    section.prototype.setUnconnectedPassages = function(){
        this.unconnectedPassages = (this.variation.passage || []).clone;
    };

    section.prototype.getNewTileFromType = function(tileType){
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
            default:
                tile = new TileBase();
        }
        tile.parent = self;
        return tile;
    };

    section.prototype.setTile = function(x, y, tile){
        var self = this;
        if(!self.map[y])
            self.map[y]=[];
        self.map[y][x] = tile;
    };

    section.prototype.getTile = function(x, y){
        var self = this;
        if(!self.map[y])
            return undefined;
        return self.map[y][x];
    };

    section.prototype.setTileType = function(x,y,tileType){
        var self = this;
        var tile = self.getNewTileFromType.call(self, tileType);
        self.setTile(x,y,tile);
    };

    section.prototype.createMap = function(map){
        var self = this;
        map.forEach(function(row,x){
            row.forEach(function(tileType,y){
                self.setTileType.call(self, x,y,tileType);
            });
        });
    };

    return section;
})();